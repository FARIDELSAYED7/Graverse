"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { GalleryItem } from "@/types/gallery";

type GalleryCanvasProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const FRAME_WIDTH = 1.9;
const FRAME_HEIGHT = 2.4;
const FRAME_CENTER_Y = 0.55;
const FLOOR_Y = -1.55;

const DESTINATION_ACCENTS: Record<GalleryItem["destinationGroup"], string> = {
  moon: "#8fc7ff",
  mars: "#ff9d7a",
  "deep-space": "#c3a6ff",
};

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

function Pedestal({ accent }: { accent: string }) {
  return (
    <group position={[0, FLOOR_Y, 0]}>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.58, 0.76, 0.76, 24]} />
        <meshStandardMaterial color="#071626" metalness={0.55} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.58, 0.7, 40]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ExhibitFrame({
  item,
  index,
  angle,
  radius,
  selected,
  reduced,
  accent,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  angle: number;
  radius: number;
  selected: boolean;
  reduced: boolean;
  accent: string;
  onSelect: (index: number) => void;
}) {
  const bob = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { texture, failed } = useArtifactTexture(item.texture);
  const active = selected || hovered;

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

    const targetScale = selected ? 1.16 : hovered ? 1.06 : 1;
    const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 7, delta);
    group.scale.setScalar(scale);

    if (reduced) {
      group.position.y = 0;
      group.rotation.z = 0;
      return;
    }

    const time = state.clock.elapsedTime;
    group.position.y = Math.sin(time * 0.55 + index * 0.72) * 0.045;
    group.rotation.z = Math.sin(time * 0.4 + index * 0.5) * 0.006;
  });

  function handleSelect(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onSelect(index);
  }

  return (
    <group
      position={[Math.sin(angle) * radius, FRAME_CENTER_Y, Math.cos(angle) * radius]}
      rotation={[0, angle, 0]}
    >
      <Pedestal accent={accent} />

      <group ref={bob}>
        {/* Frame body */}
        <mesh
          position={[0, 0, -0.04]}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={handleSelect}
        >
          <boxGeometry args={[2.24, 2.78, 0.14]} />
          <meshStandardMaterial
            color={active ? "#12395a" : "#07182a"}
            metalness={0.72}
            roughness={0.3}
            emissive={active ? accent : "#000000"}
            emissiveIntensity={active ? 0.32 : 0}
          />
        </mesh>

        {/* Accent rim */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.02, 2.56]} />
          <meshBasicMaterial
            color={active ? accent : "#2b506f"}
            transparent
            opacity={active ? 0.96 : 0.55}
          />
        </mesh>

        {/* NASA image */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#08182b" />
          )}
        </mesh>

        {!texture ? (
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
            <meshBasicMaterial color="#0a2036" transparent opacity={0.72} />
          </mesh>
        ) : null}

        {/* Plaque bar beneath the image */}
        <mesh position={[0, -1.38, 0.06]}>
          <planeGeometry args={[0.72, 0.045]} />
          <meshBasicMaterial
            color={active ? accent : "#2f6d99"}
            transparent
            opacity={active ? 0.95 : 0.55}
          />
        </mesh>

        {/* Soft selection halo */}
        <mesh position={[0, 0, -0.22]}>
          <planeGeometry args={[3.1, 3.6]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={selected ? 0.16 : 0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {failed ? (
        <group position={[0, -1.66, 0.12]}>
          <mesh>
            <planeGeometry args={[1.4, 0.08]} />
            <meshBasicMaterial color="#f0bd67" transparent opacity={0.6} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

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
      const distance = 1.6 + random() * (radius + 3.2);
      array[index * 3] = Math.cos(theta) * distance;
      array[index * 3 + 1] = -0.8 + random() * 4.4;
      array[index * 3 + 2] = Math.sin(theta) * distance;
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!reduced && points.current) {
      points.current.rotation.y += delta * 0.014;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a8dcff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({ radius, reduced }: { radius: number; reduced: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((state, delta) => {
    if (reduced) {
      camera.position.set(0, 1.35, radius + 6.8);
      camera.lookAt(0, FRAME_CENTER_Y, radius);
      return;
    }

    const targetX = pointer.current.x * 0.5;
    const targetY = 1.35 - pointer.current.y * 0.12;
    const targetZ = radius + 6.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.2, delta);
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      state.clock.elapsedTime < 3 ? 0.85 : 2.6,
      delta
    );
    camera.lookAt(0, FRAME_CENTER_Y, radius);
  });

  return null;
}

function Rotunda({ radius }: { radius: number }) {
  const wallRadius = radius + 8.2;
  const wallHeight = 11.4;
  const wallCenterY = FLOOR_Y + wallHeight / 2;
  const ceilingY = FLOOR_Y + wallHeight;

  const ribs = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2;
    return { angle, key: index };
  }), []);

  return (
    <group>
      {/* Curved gallery wall */}
      <mesh position={[0, wallCenterY, 0]}>
        <cylinderGeometry args={[wallRadius, wallRadius, wallHeight, 72, 1, true]} />
        <meshStandardMaterial
          color="#06101d"
          metalness={0.32}
          roughness={0.82}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Vertical ribs and inlaid light strips */}
      {ribs.map(({ angle, key }) => (
        <group
          key={key}
          position={[
            Math.sin(angle) * (wallRadius - 0.14),
            wallCenterY,
            Math.cos(angle) * (wallRadius - 0.14),
          ]}
          rotation={[0, angle, 0]}
        >
          <mesh>
            <boxGeometry args={[0.22, wallHeight, 0.22]} />
            <meshStandardMaterial
              color="#0a1e33"
              metalness={0.55}
              roughness={0.44}
            />
          </mesh>
          <mesh position={[0, 0, 0.13]}>
            <boxGeometry args={[0.03, wallHeight - 2.6, 0.02]} />
            <meshBasicMaterial color="#2f7fb8" transparent opacity={0.42} />
          </mesh>
        </group>
      ))}

      {/* Floor and ceiling trim rings */}
      {[FLOOR_Y + 0.04, ceilingY - 0.06].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[wallRadius - 0.5, wallRadius - 0.18, 96]} />
          <meshBasicMaterial color="#2a7cad" transparent opacity={0.34} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Ceiling with a glowing oculus */}
      <mesh position={[0, ceilingY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[wallRadius - 0.12, 96]} />
        <meshStandardMaterial color="#030914" metalness={0.42} roughness={0.68} />
      </mesh>
      <mesh position={[0, ceilingY - 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial color="#123c5c" transparent opacity={0.62} />
      </mesh>
      <mesh position={[0, ceilingY - 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 3.1, 72]} />
        <meshBasicMaterial color="#4ba9df" transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
      <pointLight
        position={[0, ceilingY - 1.6, 0]}
        intensity={26}
        distance={24}
        color="#2f86c4"
      />
    </group>
  );
}

function Hall({
  items,
  selectedIndex,
  onSelect,
  reduced,
}: GalleryCanvasProps & { reduced: boolean }) {
  const ring = useRef<THREE.Group>(null);
  const step = (Math.PI * 2) / Math.max(items.length, 1);
  const radius = Math.max(5.2, 3.6 + items.length * 0.22);
  const targetRotation = -selectedIndex * step;

  useFrame((state, delta) => {
    const group = ring.current;
    if (!group) return;
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      3.4,
      delta
    );
    if (!reduced) {
      group.position.y = Math.sin(state.clock.elapsedTime * 0.24) * 0.04;
    } else {
      group.position.y = 0;
    }
  });

  return (
    <>
      <CameraRig radius={radius} reduced={reduced} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[0, 8, 7]} intensity={1.4} color="#dff3ff" />
      <pointLight position={[0, 3, radius]} intensity={20} distance={18} color="#4db8ff" />
      <pointLight position={[0, 2, -radius]} intensity={10} distance={16} color="#8b7bd8" />

      <fog attach="fog" args={["#030812", 10, 30]} />

      <Rotunda radius={radius} />

      <group ref={ring}>
        {items.map((item, index) => (
          <ExhibitFrame
            key={item.id}
            item={item}
            index={index}
            angle={index * step}
            radius={radius}
            selected={index === selectedIndex}
            reduced={reduced}
            accent={DESTINATION_ACCENTS[item.destinationGroup] ?? "#83d7ff"}
            onSelect={onSelect}
          />
        ))}
      </group>

      <Dust count={240} radius={radius} reduced={reduced} />

      {/* Reflective rotunda floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y - 0.01, 0]}>
        <circleGeometry args={[radius + 8.8, 96]} />
        <meshStandardMaterial color="#040b15" metalness={0.78} roughness={0.34} />
      </mesh>

      {[radius * 0.55, radius * 0.78, radius * 1.02].map((ringRadius) => (
        <mesh
          key={ringRadius}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, FLOOR_Y, 0]}
        >
          <ringGeometry args={[ringRadius, ringRadius + 0.018, 72]} />
          <meshBasicMaterial color="#3ba7e8" transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
}

export default function GalleryCanvas(props: GalleryCanvasProps) {
  const reduced = useReducedMotion();
  const count = Math.max(props.items.length, 1);
  const radius = Math.max(5.2, 3.6 + count * 0.22);

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 1.35, radius + 7.7], fov: 38, near: 0.1, far: 70 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.45 }}
      style={{ touchAction: "pan-y" }}
    >
      <Hall {...props} reduced={reduced} />
    </Canvas>
  );
}
