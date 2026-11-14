"use client";

import { OrbitControls } from "@react-three/drei";
import { ContactShadows } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import type { EchoHotspot } from "@/types/echo";
import { ArtifactHotspots, FittedGltf } from "./ArtifactModel";
import { ProceduralSojourner } from "./ProceduralSojourner";

/**
 * The artifact scene: the machine itself, the markers that name its parts,
 * and an orbit control the visitor can drive.
 *
 * The rover is framed by the camera, lit with a warm key and a cool rim,
 * and grounded by a soft contact shadow over a faint mission grid — the
 * canvas should read as a model on a bench, never as a machine lost in a
 * dark void.
 */

/** Dolly rig: the zoom buttons move the camera along its view vector. */
function Dolly({ nonce, dir }: { nonce: number; dir: 1 | -1 }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    if (nonce === 0) return;
    const offset = camera.position.clone();
    const next = THREE.MathUtils.clamp(
      offset.length() * (dir > 0 ? 0.82 : 1.22),
      2.2,
      7
    );
    camera.position.copy(offset.setLength(next));
  }, [nonce, dir, camera]);
  return null;
}

export default function ArtifactScene({
  url,
  procedural,
  hotspots,
  activeId,
  onSelect,
  accent,
  labels,
  resetSignal,
  zoomSignal,
  zoomDir,
  idleSpin = true,
}: {
  url?: string;
  procedural?: "sojourner";
  hotspots: EchoHotspot[];
  activeId: string | null;
  onSelect: (id: string) => void;
  accent: string;
  labels: Record<string, string>;
  resetSignal: number;
  zoomSignal: number;
  zoomDir: 1 | -1;
  idleSpin?: boolean;
}) {
  // A slow presentation spin until the visitor takes control — never
  // fighting the drag once the orbit begins.
  const [spinning, setSpinning] = useState(true);
  useEffect(() => {
    setSpinning(idleSpin);
  }, [idleSpin]);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [2.7, 1.35, 3.1], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
    >
      <Suspense fallback={null}>
        <hemisphereLight args={["#9fb4ff", "#17112e", 0.5]} />
        <ambientLight intensity={0.45} color="#e8ecff" />
        <directionalLight position={[3, 4.2, 2.4]} intensity={2.5} color="#fff3df" />
        <directionalLight position={[-3.4, 1.8, -2.4]} intensity={1.05} color="#8fc7ff" />
        <pointLight position={[0, 1.4, 2.8]} intensity={5} distance={9} color={accent} />

        <group position={[0, 0, 0]}>
          {procedural === "sojourner" ? (
            <ProceduralSojourner
              hotspots={hotspots}
              activeId={activeId}
              onSelect={onSelect}
              accent={accent}
              labels={labels}
            />
          ) : url ? (
            <FittedGltf url={url}>
              <ArtifactHotspots
                hotspots={hotspots}
                activeId={activeId}
                onSelect={onSelect}
                accent={accent}
                labels={labels}
              />
            </FittedGltf>
          ) : null}

          {/* A soft shadow grounds the machine. */}
          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={0.5}
            scale={7}
            blur={2.4}
            far={1.6}
            resolution={512}
            color="#05040f"
          />
        </group>

        <OrbitControls
          key={resetSignal}
          target={[0, 0.05, 0]}
          enablePan={false}
          minDistance={2.2}
          maxDistance={7}
          minPolarAngle={0.4}
          maxPolarAngle={1.52}
          autoRotate={spinning}
          autoRotateSpeed={0.7}
          onStart={() => setSpinning(false)}
          makeDefault
        />
        <Dolly nonce={zoomSignal} dir={zoomDir} />
      </Suspense>
    </Canvas>
  );
}
