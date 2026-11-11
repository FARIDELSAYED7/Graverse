"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { planets } from "@/data/space/bodies";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Schematic orrery.
 *
 * Distances and sizes are compressed for legibility. The map is explicitly
 * labelled as not to scale. The scene is decorative and aria-hidden; the
 * SVG OrbitMap is the accessible equivalent.
 */

const SCALE = 0.12;

function Planet({
  orbit,
  animate,
  offset,
}: {
  orbit: NonNullable<(typeof planets)[number]["orbit"]>;
  animate: boolean;
  offset: number;
}) {
  const mesh = useRef<Mesh>(null);
  const radius = orbit.visualRadius * SCALE;

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const elapsed = clock.getElapsedTime();
    const periods = Math.max(orbit.periodYears, 0.24);
    const angle = animate
      ? (elapsed / (periods * 2.2)) * Math.PI * 2 + offset
      : offset;
    mesh.current.position.x = Math.cos(angle) * radius;
    mesh.current.position.z = Math.sin(angle) * radius;
  });

  return (
    <mesh
      ref={mesh}
      position={[Math.cos(offset) * radius, 0, Math.sin(offset) * radius]}
    >
      <sphereGeometry args={[Math.max(orbit.visualSize * 0.5, 0.16), 24, 24]} />
      <meshStandardMaterial
        color={orbit.color}
        roughness={0.75}
        metalness={0.05}
      />
    </mesh>
  );
}

function OrbitRing({
  radius,
  color,
}: {
  radius: number;
  color: string;
}) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 6, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.32} />
    </mesh>
  );
}

export default function OrreryScene() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  const rings = useMemo(
    () =>
      planets
        .filter((planet) => planet.orbit)
        .map((planet) => ({
          id: planet.id,
          radius: planet.orbit!.visualRadius * SCALE,
          color: planet.orbit!.color,
        })),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 5.6, 7.4], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 0, 0]} intensity={40} distance={12} color="#ffe7b0" />
      <directionalLight position={[4, 6, 3]} intensity={0.7} color="#9fd8ff" />

      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ffc93c" />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={8} distance={4} color="#ffb347" />

      {rings.map((ring) => (
        <OrbitRing key={ring.id} radius={ring.radius} color={ring.color} />
      ))}

      {planets.map((planet, index) =>
        planet.orbit ? (
          <Planet
            key={planet.id}
            orbit={planet.orbit}
            animate={animate}
            offset={(index / planets.length) * Math.PI * 2}
          />
        ) : null
      )}

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4.5}
        maxDistance={13}
        autoRotate={animate}
        autoRotateSpeed={0.25}
        makeDefault
      />
    </Canvas>
  );
}
