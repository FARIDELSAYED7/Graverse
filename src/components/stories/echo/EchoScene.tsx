"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { EchoRobotModel } from "./EchoRobotModel";
import type { EchoAnimationState } from "@/lib/echo/provider";

/**
 * The ECHO scene: a small studio in deep space with a soft ground glow, a
 * rim light and a warm key light. The robot is lit rather than lit-and-
 * shadowed, so the scene stays cheap on a school laptop.
 *
 * Framing: the robot occupies roughly y 0 … 1.66 (antenna tip), with its
 * visual mass centred near y 0.6. The camera is aimed there — not at the
 * origin — so the robot sits centred in every container, including the
 * small circular dock toggle, instead of riding high with its antenna
 * clipped by the top edge.
 */
export default function EchoScene({
  state,
  reducedMotion = false,
  pointTarget,
}: {
  state: EchoAnimationState;
  reducedMotion?: boolean;
  pointTarget?: [number, number, number];
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.85, 3.6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ camera, gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
        camera.lookAt(0, 0.6, 0);
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} color="#cfd8ff" />
        <directionalLight position={[2.4, 3.4, 2.6]} intensity={2.1} color="#fff4e2" />
        <directionalLight position={[-2.6, 1.2, -2.2]} intensity={1.3} color="#7dd3fc" />
        <pointLight position={[0, 1.1, 2]} intensity={8} distance={8} color="#8f7bff" />

        <Float
          speed={reducedMotion ? 0 : 1.4}
          rotationIntensity={reducedMotion ? 0 : 0.08}
          floatIntensity={reducedMotion ? 0 : 0.12}
          floatingRange={[-0.04, 0.04]}
        >
          <EchoRobotModel
            state={state}
            reducedMotion={reducedMotion}
            pointTarget={pointTarget}
          />
        </Float>

        <ContactShadows
          position={[0, -0.6, 0]}
          opacity={0.35}
          scale={5}
          blur={2.6}
          far={2}
          color="#1a1338"
        />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
