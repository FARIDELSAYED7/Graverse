"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Points } from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function StarField({ animate }: { animate: boolean }) {
  const points = useRef<Points>(null);

  const positions = useMemo(() => {
    const count = 420;
    const array = new Float32Array(count * 3);
    let seed = 42;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      const radius = 1.4 + random() * 1.9;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[index * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (animate && points.current) {
      points.current.rotation.y += delta * 0.018;
      points.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9fd8ff"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitRings({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.z += delta * 0.012;
    }
  });

  return (
    <group ref={group} rotation={[1.12, 0.18, 0]}>
      <mesh>
        <torusGeometry args={[1.55, 0.004, 8, 160]} />
        <meshBasicMaterial color="#4aa8e8" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0.5, 0.2, 0]}>
        <torusGeometry args={[1.95, 0.003, 8, 160]} />
        <meshBasicMaterial color="#8b7bd8" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function SpaceScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 4.1], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <StarField animate={!reduced} />
      <OrbitRings animate={!reduced} />
    </Canvas>
  );
}
