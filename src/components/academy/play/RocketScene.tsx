"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";
import { DoubleSide } from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { RocketConfig } from "@/types/play";

/**
 * A toy rocket assembled from primitives. It is explicitly not a reconstruction
 * of any real launch vehicle. The 3D canvas is decorative; the part checklist
 * outside the canvas is the accessible description.
 */
function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function Rocket({
  config,
  launching,
  launchKey,
  reduced,
}: {
  config: RocketConfig;
  launching: boolean;
  launchKey: number;
  reduced: boolean;
}) {
  const rocket = useRef<Group>(null);
  const flame = useRef<Mesh>(null);
  const progress = useRef(0);
  const bodyHeight = config.body === "tall" ? 2.8 : 1.9;
  const engineScale = config.engine === "big" ? 1.25 : 0.9;

  useEffect(() => {
    progress.current = 0;
  }, [launchKey]);

  useFrame(({ clock }, delta) => {
    const group = rocket.current;
    if (!group) return;

    if (launching) {
      // Reduced motion jumps to the final position instead of animating.
      progress.current = reduced
        ? 1
        : Math.min(1, progress.current + delta / 2.1);
      const p = progress.current;
      group.position.y = 0.35 + easeOutCubic(p) * 6.5;
      group.rotation.z = reduced ? 0 : Math.sin(p * 16) * 0.05 * (1 - p);
    } else {
      group.position.y = 0.35;
      group.rotation.z = 0;
    }

    if (flame.current) {
      const active = launching && progress.current < 0.92;
      flame.current.visible = active;
      flame.current.scale.y = active
        ? 1 + Math.sin(clock.elapsedTime * 26) * (reduced ? 0 : 0.14)
        : 0.01;
    }
  });

  return (
    <group ref={rocket}>
      <mesh position={[0, bodyHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.54, bodyHeight, 28]} />
        <meshStandardMaterial color={config.bodyColor} roughness={0.55} metalness={0.08} />
      </mesh>

      {/* Window */}
      <mesh position={[0, bodyHeight * 0.6, 0.47]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial color="#BFE9FF" roughness={0.2} metalness={0.4} />
      </mesh>

      {config.nose === "pointy" ? (
        <mesh position={[0, bodyHeight + 0.58, 0]} castShadow>
          <coneGeometry args={[0.48, 1.2, 28]} />
          <meshStandardMaterial color={config.noseColor} roughness={0.5} />
        </mesh>
      ) : (
        <mesh position={[0, bodyHeight + 0.2, 0]} scale={[1, 0.75, 1]} castShadow>
          <sphereGeometry args={[0.5, 28, 20]} />
          <meshStandardMaterial color={config.noseColor} roughness={0.5} />
        </mesh>
      )}

      {/* Fins */}
      {Array.from({ length: config.fins }).map((_, index) => {
        const angle = (index / config.fins) * Math.PI * 2;
        return (
          <group key={angle} rotation={[0, angle, 0]}>
            <mesh position={[0.62, 0.45, 0]} rotation={[0, 0, -0.32]} castShadow>
              <boxGeometry args={[0.08, 0.95, 0.55]} />
              <meshStandardMaterial color={config.finColor} roughness={0.55} />
            </mesh>
          </group>
        );
      })}

      {/* Engine and nozzle */}
      <mesh position={[0, 0.08, 0]} scale={[engineScale, 1, engineScale]}>
        <cylinderGeometry args={[0.36, 0.4, 0.4, 24]} />
        <meshStandardMaterial color="#34445C" roughness={0.45} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]} scale={[engineScale, 1, engineScale]}>
        <coneGeometry args={[0.34, 0.42, 24, 1, true]} />
        <meshStandardMaterial color="#252F3F" roughness={0.5} metalness={0.55} side={DoubleSide} />
      </mesh>

      <mesh ref={flame} position={[0, -0.95, 0]} rotation={[Math.PI, 0, 0]} visible={false}>
        <coneGeometry args={[0.28, 1.2, 18]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#FF7A18"
          emissiveIntensity={2.2}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  );
}

export default function RocketScene({
  config,
  launching,
  launchKey,
}: {
  config: RocketConfig;
  launching: boolean;
  launchKey: number;
}) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [5.4, 4.2, 7.4], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 5]} intensity={1.3} color="#FFF2D6" />
      <pointLight position={[-4, 2, 3]} intensity={35} distance={12} color="#8FD8FF" />

      <Stars
        radius={26}
        depth={14}
        count={700}
        factor={3}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.35}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[5.2, 56]} />
        <meshStandardMaterial color="#12243F" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.15, 1.35, 0.28, 28]} />
        <meshStandardMaterial color="#223A5E" roughness={0.8} />
      </mesh>

      <Rocket config={config} launching={launching} launchKey={launchKey} reduced={reduced} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={13}
        target={[0, 1.35, 0]}
        autoRotate={!reduced && !launching}
        autoRotateSpeed={0.5}
        makeDefault
      />
    </Canvas>
  );
}
