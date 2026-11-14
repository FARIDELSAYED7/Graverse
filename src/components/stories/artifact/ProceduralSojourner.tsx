"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { EchoHotspot } from "@/types/echo";
import { ArtifactHotspots } from "./ArtifactModel";

/**
 * A procedural reconstruction of the Sojourner rover.
 *
 * NASA 3D Resources does not publish a Sojourner model, so GRAVERSE builds
 * one from primitives using the published dimensions of the real rover:
 * about 65 cm long, 30 cm wide and 15 cm tall. It is drawn in the same fit
 * space as the NASA models — 2.4 units along the longest dimension — centred
 * on the origin and standing on its wheels, always labelled a reconstruction.
 */
export function ProceduralSojourner({
  hotspots,
  activeId,
  onSelect,
  accent,
  labels,
}: {
  hotspots: EchoHotspot[];
  activeId: string | null;
  onSelect: (id: string) => void;
  accent: string;
  labels: Record<string, string>;
}) {
  const parts = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: "#efe9da",
        roughness: 0.4,
        metalness: 0.12,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: "#d9b45c",
        roughness: 0.35,
        metalness: 0.7,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: "#b6bfd2",
        roughness: 0.26,
        metalness: 0.85,
      }),
      panel: new THREE.MeshStandardMaterial({
        color: "#26346b",
        roughness: 0.28,
        metalness: 0.32,
      }),
      cell: new THREE.MeshStandardMaterial({
        color: "#1a2554",
        roughness: 0.3,
        metalness: 0.35,
      }),
      wheel: new THREE.MeshStandardMaterial({
        color: "#465072",
        roughness: 0.78,
        metalness: 0.08,
      }),
      hub: new THREE.MeshStandardMaterial({
        color: "#c9d1e2",
        roughness: 0.3,
        metalness: 0.7,
      }),
      lens: new THREE.MeshStandardMaterial({
        color: "#0c1226",
        emissive: "#7dd3fc",
        emissiveIntensity: 0.9,
        roughness: 0.2,
      }),
    }),
    []
  );

  // Fit space: 2.4 long (x), 1.1 wide (z). The body sits above the wheels,
  // the lowest point of the wheels is y = -0.36.
  const bodyY = 0.16;

  return (
    <group>
      {/* Body — the low white chassis. */}
      <mesh position={[0, bodyY, 0]} castShadow>
        <boxGeometry args={[2.0, 0.3, 0.94]} />
        <primitive object={parts.shell} attach="material" />
      </mesh>

      {/* Front slope — the wedge nose of the real rover. */}
      <mesh position={[1.04, bodyY - 0.04, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.36, 0.22, 0.9]} />
        <primitive object={parts.shell} attach="material" />
      </mesh>

      {/* Solar lid, tilted a few degrees. */}
      <group position={[0, bodyY + 0.19, 0]} rotation={[0.06, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.92, 0.05, 0.9]} />
          <primitive object={parts.panel} attach="material" />
        </mesh>
        {/* Cell columns. */}
        {[-0.72, -0.54, -0.36, -0.18, 0, 0.18, 0.36, 0.54, 0.72].map((x) => (
          <mesh key={x} position={[x, 0.031, 0]}>
            <boxGeometry args={[0.016, 0.008, 0.8]} />
            <primitive object={parts.cell} attach="material" />
          </mesh>
        ))}
      </group>

      {/* Stereo camera pair on the front corners. */}
      {[-0.36, 0.36].map((z) => (
        <group key={z} position={[1.02, bodyY + 0.05, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.16, 18]} />
            <primitive object={parts.metal} attach="material" />
          </mesh>
          <mesh position={[0.085, 0, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <primitive object={parts.lens} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Alpha Proton X-ray Spectrometer — the gold eye on the nose. */}
      <mesh position={[1.16, bodyY - 0.07, 0]}>
        <boxGeometry args={[0.18, 0.16, 0.34]} />
        <primitive object={parts.gold} attach="material" />
      </mesh>
      <mesh position={[1.26, bodyY - 0.07, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.05, 18]} />
        <primitive object={parts.lens} attach="material" />
      </mesh>

      {/* Rocker-bogie suspension. */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {/* Rear and middle wheels share the bogie; the front wheel rides
              the rocker with its differential lift. */}
          <RockerWheel
            x={0.86}
            y={-0.14}
            z={0.52 * side}
            parts={parts}
            lifted
          />
          <RockerWheel x={0} y={-0.2} z={0.52 * side} parts={parts} />
          <RockerWheel x={-0.86} y={-0.2} z={0.52 * side} parts={parts} />

          {/* Differential bar across the front axle. */}
          <mesh position={[0.86, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.92, 10]} />
            <primitive object={parts.metal} attach="material" />
          </mesh>
          {/* Bogie link between the rear wheels. */}
          <mesh position={[-0.43, -0.22, 0.52 * side]} rotation={[0, 0, 0.04]}>
            <boxGeometry args={[0.96, 0.06, 0.07]} />
            <primitive object={parts.metal} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Antenna at the rear. */}
      <mesh position={[-1.14, bodyY + 0.24, 0]} rotation={[0, 0, 0.32]}>
        <cylinderGeometry args={[0.017, 0.017, 0.5, 10]} />
        <primitive object={parts.metal} attach="material" />
      </mesh>
      <mesh position={[-1.22, bodyY + 0.47, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <primitive object={parts.gold} attach="material" />
      </mesh>

      <ArtifactHotspots
        hotspots={hotspots}
        activeId={activeId}
        onSelect={onSelect}
        accent={accent}
        labels={labels}
      />
    </group>
  );
}

function RockerWheel({
  x,
  y,
  z,
  lifted = false,
  parts,
}: {
  x: number;
  y: number;
  z: number;
  lifted?: boolean;
  parts: {
    wheel: THREE.Material;
    hub: THREE.Material;
    metal: THREE.Material;
  };
}) {
  const radius = 0.19;
  const lift = lifted ? 0.16 : 0;
  return (
    <group position={[x, y + lift, z]}>
      {/* Drums — the real wheels were flexible stainless steel with
          cleats, here read as a dark rim with a bright hub. */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, 0.11, 24]} />
        <primitive object={parts.wheel} attach="material" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, 0.13, 18]} />
        <primitive object={parts.hub} attach="material" />
      </mesh>
      {/* Cleats around the rim. */}
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.06, 0.022, 0.11]} />
            <primitive object={parts.metal} attach="material" />
          </mesh>
        );
      })}
      {/* Steering stub into the chassis. */}
      <mesh position={[0, radius * 0.9, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.2, 10]} />
        <primitive object={parts.metal} attach="material" />
      </mesh>
    </group>
  );
}
