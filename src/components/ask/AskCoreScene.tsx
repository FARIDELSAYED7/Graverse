"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh, Points, Sprite } from "three";

/**
 * The GRAVERSE Astrolabe — the assistant's 3D identity.
 *
 * One concept, three placements: a warm faceted core wrapped in a
 * translucent teal shell, crossed by two thin orbital rings, floating in a
 * soft bloom with a sparse halo of drifting motes. It is the same object at
 * three scales, so the assistant reads as a single continuous identity
 * whether it is a 36px mark on the launcher or a 128px presence in the empty
 * state.
 *
 * The scene is deliberately tiny — five meshes and 120 points — and it is
 * projected into the page with drei's `<View>`, so the whole assistant costs
 * a single WebGL context no matter how many places it appears.
 *
 * Palette: GRAVERSE gold `#f2b33d`, teal `#5eead4`, sky `#7dd3fc`,
 * coral `#f08a6a`.
 */

const CORE_GOLD = "#f2b33d";
const SHELL_TEAL = "#5eead4";
const RING_SKY = "#7dd3fc";
const RING_CORAL = "#f08a6a";
const HALO_SKY = "#9fd8ff";

/* ------------------------------------------------------------------ core */

function CoreObject({
  animate,
  thinking,
}: {
  animate: boolean;
  thinking: boolean;
}) {
  const core = useRef<Mesh>(null);
  const shell = useRef<Mesh>(null);
  const bloom = useRef<Sprite>(null);
  const ringA = useRef<Group>(null);
  const ringB = useRef<Group>(null);
  const halo = useRef<Points>(null);

  const positions = useMemo(() => {
    const count = 120;
    const array = new Float32Array(count * 3);
    let seed = 20261110;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      const radius = 0.52 + random() * 0.3;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[index * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  /**
   * A soft radial bloom behind the core.
   *
   * The texture is drawn once on a 2D canvas, so it costs no image request
   * and no extra dependency. It is disposed with the component, because a
   * texture created outside the renderer is not cleaned up by React Three
   * Fiber.
   */
  const glow = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255,240,205,0.92)");
      gradient.addColorStop(0.22, "rgba(250,205,120,0.42)");
      gradient.addColorStop(0.55, "rgba(94,234,212,0.14)");
      gradient.addColorStop(1, "rgba(94,234,212,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => () => glow.dispose(), [glow]);

  useFrame((state, delta) => {
    if (!animate) return;
    const elapsed = state.clock.getElapsedTime();

    if (core.current) {
      const pulse =
        1 +
        Math.sin(elapsed * (thinking ? 3.1 : 1.5)) * (thinking ? 0.07 : 0.022);
      core.current.scale.setScalar(pulse);
      const material = core.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = thinking ? 1.25 : 0.62;
    }
    if (shell.current) {
      const material = shell.current.material as THREE.MeshBasicMaterial;
      material.opacity = thinking ? 0.24 : 0.13;
    }
    if (bloom.current) {
      const material = bloom.current.material as THREE.SpriteMaterial;
      const scale = thinking ? 1.75 + Math.sin(elapsed * 3.1) * 0.12 : 1.5;
      bloom.current.scale.set(scale, scale, 1);
      material.opacity = thinking ? 0.95 : 0.7;
    }
    if (ringA.current) {
      ringA.current.rotation.z += delta * (thinking ? 0.85 : 0.3);
    }
    if (ringB.current) {
      ringB.current.rotation.y -= delta * (thinking ? 0.6 : 0.2);
      ringB.current.rotation.z += delta * 0.08;
    }
    if (halo.current) {
      halo.current.rotation.y += delta * (thinking ? 0.45 : 0.13);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 0, 0]}
        intensity={4.5}
        distance={5}
        color="#ffe0ad"
      />

      {/* The bloom. */}
      <sprite ref={bloom} scale={[1.5, 1.5, 1]}>
        <spriteMaterial
          map={glow}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </sprite>

      {/* The archive core: warm, faceted, luminous. */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.34, 2]} />
        <meshStandardMaterial
          color="#f8d79a"
          emissive={CORE_GOLD}
          emissiveIntensity={0.62}
          roughness={0.38}
          metalness={0.12}
          flatShading
        />
      </mesh>

      {/* The holographic shell around it. */}
      <mesh ref={shell}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial
          color={SHELL_TEAL}
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Two orbital rings on different axes — the instrument reading. */}
      <group ref={ringA} rotation={[1.15, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[0.62, 0.0055, 6, 96]} />
          <meshBasicMaterial color={RING_SKY} transparent opacity={0.6} />
        </mesh>
      </group>
      <group ref={ringB} rotation={[0.35, 0.95, 0.55]}>
        <mesh>
          <torusGeometry args={[0.78, 0.004, 6, 96]} />
          <meshBasicMaterial color={RING_CORAL} transparent opacity={0.34} />
        </mesh>
      </group>

      {/* A sparse halo of drifting motes. */}
      <points ref={halo}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={HALO_SKY}
          size={0.013}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ----------------------------------------------------------------- views */

export interface AskCoreSlot {
  /** The DOM element the scene is projected into. */
  ref: React.MutableRefObject<HTMLElement | null>;
  /**
   * Whether the element is actually on screen.
   *
   * The canvas is a fixed overlay above the whole page, so an element that
   * has scrolled out of its clipping container would still be painted — over
   * the page instead of inside the console. The owner of the slot decides
   * when that happens and switches the view off.
   */
  visible: boolean;
}

export interface AskCoreSlots {
  launcher: AskCoreSlot;
  header: AskCoreSlot;
  empty: AskCoreSlot;
}

/**
 * drei's `track` prop is typed for a non-nullable element, so the nullable
 * refs are narrowed once, here.
 */
function trackOf(
  ref: React.MutableRefObject<HTMLElement | null>
): React.MutableRefObject<HTMLElement> {
  return ref as React.MutableRefObject<HTMLElement>;
}

/**
 * The single WebGL surface for the assistant.
 *
 * The canvas is a fixed, transparent, pointer-transparent overlay. drei's
 * `<View>` scissors the shared scene into each tracked element, so the
 * launcher, the console header and the empty state all show the same object
 * without a second context, a second bundle or a second animation loop.
 */
export default function AskCoreScene({
  slots,
  thinking,
  animate,
}: {
  slots: AskCoreSlots;
  thinking: boolean;
  animate: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={animate ? "always" : "demand"}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 70,
      }}
    >
      <View track={trackOf(slots.launcher.ref)} visible={slots.launcher.visible} index={1}>
        <CoreObject animate={animate} thinking={thinking} />
      </View>
      <View track={trackOf(slots.header.ref)} visible={slots.header.visible} index={2}>
        <CoreObject animate={animate} thinking={thinking} />
      </View>
      <View track={trackOf(slots.empty.ref)} visible={slots.empty.visible} index={3}>
        <CoreObject animate={animate} thinking={thinking} />
      </View>
    </Canvas>
  );
}
