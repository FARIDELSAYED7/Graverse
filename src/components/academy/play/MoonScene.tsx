"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const ORBIT = 3.1;

function Moon({ phase }: { phase: number }) {
  const group = useRef<Group>(null);
  const angle = (phase / 8) * Math.PI * 2;

  useFrame(() => {
    if (!group.current) return;
    group.current.position.x = -Math.cos(angle) * ORBIT;
    group.current.position.z = Math.sin(angle) * ORBIT;
  });

  return (
    <group ref={group} position={[-Math.cos(angle) * ORBIT, 0, Math.sin(angle) * ORBIT]}>
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 24]} />
        <meshStandardMaterial color="#D8D2C4" roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function MoonScene({ phase }: { phase: number }) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 6.2, 8.2], fov: 46 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.16} />
      <pointLight position={[-6.5, 1.5, 0]} intensity={105} distance={22} color="#FFF1C9" />
      <directionalLight position={[-5, 3, 2]} intensity={0.45} color="#FFDFA0" />

      <Stars
        radius={28}
        depth={14}
        count={650}
        factor={3}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.25}
      />

      {/* Sun */}
      <mesh position={[-6.5, 0, 0]}>
        <sphereGeometry args={[0.55, 28, 24]} />
        <meshBasicMaterial color="#FFC93C" />
      </mesh>
      <pointLight position={[-6.5, 0, 0]} intensity={30} distance={5} color="#FFB347" />

      {/* Earth */}
      <mesh>
        <sphereGeometry args={[0.78, 36, 28]} />
        <meshStandardMaterial color="#2B7FFF" roughness={0.72} metalness={0.05} />
      </mesh>
      <mesh rotation={[0.4, 0.8, 0.2]}>
        <sphereGeometry args={[0.79, 24, 18]} />
        <meshStandardMaterial color="#34D399" roughness={1} transparent opacity={0.55} />
      </mesh>

      {/* Orbit guide */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT, 0.012, 8, 180]} />
        <meshBasicMaterial color="#B9A6FF" transparent opacity={0.55} />
      </mesh>

      <Moon phase={phase} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5.5}
        maxDistance={14}
        target={[0, 0, 0]}
        autoRotate={false}
        makeDefault
      />
    </Canvas>
  );
}
