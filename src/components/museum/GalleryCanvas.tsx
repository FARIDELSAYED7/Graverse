"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  accentFor,
  bayAngle,
  frameHeight,
  frameWidth,
  hallRadius,
  HALL_GEOMETRY,
} from "@/lib/gallery";
import type { GalleryItem, HallControls } from "@/types/gallery";

type GalleryCanvasProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  /** Shared, mutable view state. Reading it inside the render loop avoids
   *  re-rendering the React tree on every pointer move. */
  controls: React.MutableRefObject<HallControls>;
  /** Called when the visitor grabs the room to look around. */
  onLookChange?: (looking: boolean) => void;
};

const FLOOR_Y = -1.5;
const CEILING_Y = 3.35;
const FRAME_CENTER_Y = 0.78;
const WALL_COLOR = "#071320";
const WALL_TRIM = "#0d2438";

/* ------------------------------------------------------------------ helpers */

/** A soft radial falloff used for light pools and contact shadows. */
function useSoftDiscTexture(): THREE.CanvasTexture | null {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/** The bay number engraved on the plinth of each exhibit. */
function usePlaqueTexture(index: number, accent: string) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#081524";
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 5, 246, 118);
    ctx.globalAlpha = 1;

    ctx.fillStyle = accent;
    ctx.font = "600 52px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(index + 1).padStart(2, "0"), 128, 54);

    ctx.fillStyle = "rgba(214,233,255,0.68)";
    ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("BAY", 128, 96);

    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    return map;
  }, [index, accent]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture;
}

function useArtifactTexture(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [failed, setFailed] = useState(false);
  const textureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    setTexture(null);
    setFailed(false);

    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (loaded) => {
        if (!active) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.anisotropy = 4;
        textureRef.current = loaded;
        setTexture(loaded);
      },
      undefined,
      () => {
        if (active) setFailed(true);
      }
    );

    return () => {
      active = false;
      textureRef.current?.dispose();
      textureRef.current = null;
    };
  }, [src]);

  return { texture, failed };
}

/* --------------------------------------------------------------------- bay */

function ExhibitBay({
  item,
  index,
  count,
  radius,
  width,
  height,
  selected,
  reduced,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  count: number;
  radius: number;
  width: number;
  height: number;
  selected: boolean;
  reduced: boolean;
  onSelect: (index: number) => void;
}) {
  const bob = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { texture, failed } = useArtifactTexture(item.texture);
  const accent = accentFor(item.destinationGroup);
  const active = selected || hovered;

  const angle = bayAngle(index, count);
  const disc = useSoftDiscTexture();
  const plaque = usePlaqueTexture(index, accent);

  const frameBottom = FRAME_CENTER_Y - height / 2;
  const frameTop = FRAME_CENTER_Y + height / 2;
  const plinthHeight = frameBottom - FLOOR_Y;

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((state, delta) => {
    const group = bob.current;
    if (!group) return;

    const targetScale = selected ? 1.05 : hovered ? 1.02 : 1;
    const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 7, delta);
    group.scale.setScalar(scale);

    if (reduced) {
      group.position.y = 0;
      group.rotation.z = 0;
      return;
    }

    const time = state.clock.elapsedTime;
    group.position.y = Math.sin(time * 0.5 + index * 0.72) * 0.03;
    group.rotation.z = Math.sin(time * 0.36 + index * 0.5) * 0.005;
  });

  function handleSelect(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onSelect(index);
  }

  function handleOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    setHovered(true);
  }

  function handleOut() {
    setHovered(false);
  }

  return (
    <group
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, angle + Math.PI, 0]}
    >
      {/* Recessed alcove in the wall behind the exhibit. */}
      <mesh position={[0, FRAME_CENTER_Y, -HALL_GEOMETRY.wallGap + 0.04]}>
        <planeGeometry args={[width + 1.25, height + 1.1]} />
        <meshStandardMaterial
          color="#12304c"
          metalness={0.25}
          roughness={0.8}
          emissive={accent}
          emissiveIntensity={active ? 0.22 : 0.08}
        />
      </mesh>

      {/* Cove light above the alcove. */}
      <mesh position={[0, frameTop + 0.52, -HALL_GEOMETRY.wallGap + 0.12]}>
        <planeGeometry args={[width + 0.5, 0.045]} />
        <meshBasicMaterial color={accent} transparent opacity={active ? 0.95 : 0.5} />
      </mesh>

      <group ref={bob}>
        {/* Frame body */}
        <mesh
          position={[0, FRAME_CENTER_Y, -0.05]}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
          onClick={handleSelect}
        >
          <boxGeometry args={[width + 0.16, height + 0.16, 0.14]} />
          <meshStandardMaterial
            color={active ? "#1b4368" : "#0b1d30"}
            metalness={0.82}
            roughness={0.26}
            emissive={active ? accent : "#000000"}
            emissiveIntensity={active ? 0.24 : 0}
          />
        </mesh>

        {/* Accent rim */}
        <mesh position={[0, FRAME_CENTER_Y, 0.03]}>
          <planeGeometry args={[width + 0.05, height + 0.05]} />
          <meshBasicMaterial
            color={active ? accent : "#27506f"}
            transparent
            opacity={active ? 0.95 : 0.6}
          />
        </mesh>

        {/* Exhibit image */}
        <mesh position={[0, FRAME_CENTER_Y, 0.045]}>
          <planeGeometry args={[width, height]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#0a1c30" />
          )}
        </mesh>

        {!texture ? (
          <mesh position={[0, FRAME_CENTER_Y, 0.05]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial color="#0c2439" transparent opacity={0.78} />
          </mesh>
        ) : null}

        {/* Selection halo */}
        <mesh position={[0, FRAME_CENTER_Y, -0.16]}>
          <planeGeometry args={[width * 1.55, height * 1.4]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={selected ? 0.2 : 0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Plinth */}
      <mesh position={[0, FLOOR_Y + plinthHeight / 2, 0.32]}>
        <cylinderGeometry args={[0.4, 0.48, plinthHeight, 20]} />
        <meshStandardMaterial color="#15314a" metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[0, FLOOR_Y + plinthHeight + 0.02, 0.32]}>
        <cylinderGeometry args={[0.44, 0.44, 0.05, 20]} />
        <meshStandardMaterial
          color="#1d4467"
          metalness={0.7}
          roughness={0.28}
          emissive={accent}
          emissiveIntensity={active ? 0.55 : 0.2}
        />
      </mesh>

      {/* Engraved bay number on the plinth */}
      {plaque ? (
        <mesh position={[0, FLOOR_Y + plinthHeight * 0.62, 0.735]}>
          <planeGeometry args={[0.34, 0.17]} />
          <meshBasicMaterial map={plaque} toneMapped={false} transparent />
        </mesh>
      ) : null}

      {/* Light pool on the floor beneath the plinth */}
      {disc ? (
        <mesh
          position={[0, FLOOR_Y + 0.012, 0.32]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.45, 1.45]} />
          <meshBasicMaterial
            map={disc}
            color={accent}
            transparent
            opacity={active ? 0.16 : 0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : null}

      {/* Volumetric shaft from the ceiling light onto the exhibit */}
      <mesh position={[0, (CEILING_Y + frameTop) / 2, 0.05]}>
        <coneGeometry
          args={[width * 0.62, CEILING_Y - frameTop, 22, 1, true]}
        />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={active ? 0.055 : 0.022}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {failed ? (
        <mesh position={[0, frameBottom - 0.16, 0.08]}>
          <planeGeometry args={[0.9, 0.06]} />
          <meshBasicMaterial color="#f0bd67" transparent opacity={0.6} />
        </mesh>
      ) : null}
    </group>
  );
}

/* ---------------------------------------------------------------- rotunda */

function Rotunda({
  radius,
  wallRadius,
  count,
  accents,
}: {
  radius: number;
  wallRadius: number;
  count: number;
  accents: string[];
}) {
  const wallHeight = CEILING_Y - FLOOR_Y;
  const wallCenterY = FLOOR_Y + wallHeight / 2;
  const disc = useSoftDiscTexture();

  const ribs = useMemo(() => {
    const ribCount = Math.max(count * 2, 12);
    return Array.from({ length: ribCount }, (_, index) => {
      const angle = (index / ribCount) * Math.PI * 2;
      return { angle, key: index };
    });
  }, [count]);

  return (
    <group>
      {/* Curved gallery wall */}
      <mesh position={[0, wallCenterY, 0]}>
        <cylinderGeometry args={[wallRadius, wallRadius, wallHeight, 84, 1, true]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          metalness={0.36}
          roughness={0.8}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pilasters with inlaid light strips */}
      {ribs.map(({ angle, key }) => (
        <group
          key={key}
          position={[
            Math.sin(angle) * (wallRadius - 0.12),
            wallCenterY,
            Math.cos(angle) * (wallRadius - 0.12),
          ]}
          rotation={[0, angle, 0]}
        >
          <mesh>
            <boxGeometry args={[0.26, wallHeight, 0.2]} />
            <meshStandardMaterial
              color={WALL_TRIM}
              metalness={0.5}
              roughness={0.48}
            />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.035, wallHeight - 2.4, 0.02]} />
            <meshBasicMaterial color="#2f7fb8" transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Baseboard and cornice */}
      {[FLOOR_Y + 0.12, CEILING_Y - 0.18].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[wallRadius - 0.42, wallRadius - 0.1, 96]} />
          <meshBasicMaterial
            color="#2a7cad"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Ceiling with an oculus */}
      <mesh position={[0, CEILING_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[wallRadius - 0.1, 96]} />
        <meshStandardMaterial color="#040d1a" metalness={0.4} roughness={0.7} />
      </mesh>
      {[0.32, 0.58, 0.82].map((ratio) => (
        <mesh
          key={ratio}
          position={[0, CEILING_Y - 0.05, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[wallRadius * ratio - 0.04, wallRadius * ratio, 84]} />
          <meshBasicMaterial
            color="#1c4f74"
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh position={[0, CEILING_Y - 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.9, 48]} />
        <meshBasicMaterial color="#1a4f72" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, CEILING_Y - 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.3, 64]} />
        <meshBasicMaterial
          color="#5bb8ea"
          transparent
          opacity={0.34}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ring of ceiling downlights */}
      {ribs
        .filter((_, index) => index % 2 === 0)
        .map(({ angle, key }) => (
          <mesh
            key={`lamp-${key}`}
            position={[
              Math.sin(angle) * wallRadius * 0.72,
              CEILING_Y - 0.24,
              Math.cos(angle) * wallRadius * 0.72,
            ]}
          >
            <sphereGeometry args={[0.075, 10, 8]} />
            <meshBasicMaterial color="#f2fbff" fog={false} />
          </mesh>
        ))}

      {/* Polished floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y - 0.01, 0]}>
        <circleGeometry args={[wallRadius + 0.2, 96]} />
        <meshStandardMaterial color="#071527" metalness={0.8} roughness={0.26} />
      </mesh>

      {/* Floor inlay rings */}
      {[0.34, 0.62, 0.88].map((ratio) => (
        <mesh
          key={`inlay-${ratio}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, FLOOR_Y + 0.008, 0]}
        >
          <ringGeometry args={[radius * ratio, radius * ratio + 0.028, 84]} />
          <meshBasicMaterial color="#54bdf5" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Compass spokes pointing from the centre of the room to each bay */}
      {accents.map((accent, index) => {
        const angle = bayAngle(index, count);
        return (
          <mesh
            key={`spoke-${index}`}
            position={[
              (Math.sin(angle) * radius) / 2,
              FLOOR_Y + 0.006,
              (Math.cos(angle) * radius) / 2,
            ]}
            rotation={[-Math.PI / 2, 0, -angle]}
          >
            <planeGeometry args={[radius, 0.08]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {/* Soft glow on the floor under the oculus */}
      {disc ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y + 0.004, 0]}>
          <planeGeometry args={[radius * 2.1, radius * 2.1]} />
          <meshBasicMaterial
            map={disc}
            color="#2f86c4"
            transparent
            opacity={0.17}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

/* ------------------------------------------------------------------ dust */

function Dust({ count, radius, reduced }: { count: number; radius: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    let seed = 19;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      const theta = random() * Math.PI * 2;
      const distance = 1.2 + random() * (radius + 2.6);
      array[index * 3] = Math.cos(theta) * distance;
      array[index * 3 + 1] = FLOOR_Y + 0.4 + random() * 4.4;
      array[index * 3 + 2] = Math.sin(theta) * distance;
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!reduced && points.current) {
      points.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a8dcff"
        size={0.024}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- camera */

/**
 * The visitor stands on a small circle inside the rotunda and walks around it
 * as the selection changes, so moving through the collection feels like
 * walking a room rather than spinning a carousel.
 */
function HallCamera({
  count,
  radius,
  selectedIndex,
  controls,
  reduced,
}: {
  count: number;
  radius: number;
  selectedIndex: number;
  controls: React.MutableRefObject<HallControls>;
  reduced: boolean;
}) {
  const { camera } = useThree();
  const angleRef = useRef(bayAngle(selectedIndex, count) + Math.PI);
  const fovRef = useRef(38);
  const scratch = useMemo(
    () => ({
      target: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      spherical: new THREE.Spherical(),
      look: new THREE.Vector3(),
    }),
    []
  );

  useFrame((_, delta) => {
    const desired = bayAngle(selectedIndex, count) + Math.PI;
    let difference = desired - angleRef.current;
    difference = Math.atan2(Math.sin(difference), Math.cos(difference));
    const lambda = reduced ? 60 : 3.1;
    angleRef.current += difference * (1 - Math.exp(-lambda * delta));

    const { yaw, pitch, zoom } = controls.current;
    const cameraRadius = HALL_GEOMETRY.visitorRadius;

    camera.position.set(
      Math.sin(angleRef.current) * cameraRadius,
      HALL_GEOMETRY.eyeHeight,
      Math.cos(angleRef.current) * cameraRadius
    );

    const bay = bayAngle(selectedIndex, count);
    scratch.target.set(
      Math.sin(bay) * radius,
      FRAME_CENTER_Y + 0.22,
      Math.cos(bay) * radius
    );
    scratch.direction.copy(scratch.target).sub(camera.position);
    scratch.spherical.setFromVector3(scratch.direction);
    scratch.spherical.theta += yaw;
    scratch.spherical.phi = THREE.MathUtils.clamp(
      scratch.spherical.phi - pitch,
      0.4,
      Math.PI - 0.4
    );
    scratch.direction.setFromSpherical(scratch.spherical);
    scratch.look.copy(camera.position).add(scratch.direction);
    camera.lookAt(scratch.look);

    const targetFov = THREE.MathUtils.clamp(38 / zoom, 26, 58);
    if (Math.abs(fovRef.current - targetFov) > 0.01) {
      fovRef.current = reduced
        ? targetFov
        : THREE.MathUtils.damp(fovRef.current, targetFov, 6, delta);
      const perspective = camera as THREE.PerspectiveCamera;
      perspective.fov = fovRef.current;
      perspective.updateProjectionMatrix();
    }
  });

  return null;
}

/** A gallery light that follows the visitor to whichever bay is selected. */
function FollowLight({
  count,
  radius,
  selectedIndex,
  accents,
}: {
  count: number;
  radius: number;
  selectedIndex: number;
  accents: string[];
}) {
  const light = useRef<THREE.PointLight>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const lamp = light.current;
    if (!lamp) return;
    const bay = bayAngle(selectedIndex, count);
    target.set(
      Math.sin(bay) * (radius - 1.3),
      FRAME_CENTER_Y + 1.5,
      Math.cos(bay) * (radius - 1.3)
    );
    lamp.position.lerp(target, 1 - Math.exp(-4 * delta));
    lamp.color.set(accents[selectedIndex] ?? "#83d7ff");
  });

  return (
    <pointLight
      ref={light}
      position={[0, FRAME_CENTER_Y + 1.5, radius - 1.3]}
      intensity={26}
      distance={7.5}
      decay={2}
      color="#83d7ff"
    />
  );
}

/* ------------------------------------------------------------------ scene */

function Hall({
  items,
  selectedIndex,
  onSelect,
  controls,
  onLookChange,
  reduced,
}: GalleryCanvasProps & { reduced: boolean }) {
  const count = Math.max(items.length, 1);
  const radius = hallRadius(count);
  const wallRadius = radius + HALL_GEOMETRY.wallGap;
  const width = frameWidth(count, radius);
  const height = frameHeight(width);
  const accents = useMemo(
    () => items.map((item) => accentFor(item.destinationGroup)),
    [items]
  );

  return (
    <>
      <HallCamera
        count={count}
        radius={radius}
        selectedIndex={selectedIndex}
        controls={controls}
        reduced={reduced}
      />

      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#9fdcff", "#08131f", 0.7]} />
      <directionalLight position={[0, 7, 5]} intensity={1.35} color="#e4f4ff" />
      <pointLight
        position={[0, CEILING_Y - 1.1, 0]}
        intensity={38}
        distance={wallRadius * 2.6}
        decay={1.5}
        color="#3f95cf"
      />

      <fog attach="fog" args={["#030812", radius * 0.85, radius * 3.6]} />

      <Rotunda
        radius={radius}
        wallRadius={wallRadius}
        count={count}
        accents={accents}
      />

      {items.map((item, index) => (
        <ExhibitBay
          key={item.id}
          item={item}
          index={index}
          count={count}
          radius={radius}
          width={width}
          height={height}
          selected={index === selectedIndex}
          reduced={reduced}
          onSelect={onSelect}
        />
      ))}

      <FollowLight
        count={count}
        radius={radius}
        selectedIndex={selectedIndex}
        accents={accents}
      />

      <Dust count={220} radius={radius} reduced={reduced} />
    </>
  );
}

/* ----------------------------------------------------------------- canvas */

/**
 * Lets the visitor grab the room and look around. Listeners live on the
 * renderer element so the drag never fights the exhibit frames underneath.
 */
function DragLook({
  controls,
  onLookChange,
}: {
  controls: React.MutableRefObject<HallControls>;
  onLookChange?: (looking: boolean) => void;
}) {
  const gl = useThree((state) => state.gl);
  const callbackRef = useRef(onLookChange);
  callbackRef.current = onLookChange;

  useEffect(() => {
    const element = gl.domElement;
    if (!element) return;

    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      element.style.cursor = "grabbing";
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      moved += Math.abs(deltaX) + Math.abs(deltaY);
      if (moved < 3) return;

      const state = controls.current;
      state.yaw = THREE.MathUtils.clamp(state.yaw - deltaX * 0.004, -0.9, 0.9);
      state.pitch = THREE.MathUtils.clamp(
        state.pitch + deltaY * 0.003,
        -0.45,
        0.55
      );
      callbackRef.current?.(true);
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      element.style.cursor = "grab";
    };

    element.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      element.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      element.style.cursor = "grab";
    };
  }, [gl, controls]);

  return null;
}

export default function GalleryCanvas(props: GalleryCanvasProps) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      aria-hidden="true"
      camera={{
        position: [0, HALL_GEOMETRY.eyeHeight, 6],
        fov: 38,
        near: 0.1,
        far: 90,
      }}
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.45 }}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      <Hall {...props} reduced={reduced} />
      <DragLook controls={props.controls} onLookChange={props.onLookChange} />
    </Canvas>
  );
}
