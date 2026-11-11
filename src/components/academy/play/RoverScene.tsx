"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { MathUtils, type Group, type Mesh } from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  ROVER_BASE,
  ROVER_GRID,
  ROVER_ROCKS,
  ROVER_SAMPLES,
  type RoverPoint,
} from "@/lib/rover-quest";

const HALF = (ROVER_GRID - 1) / 2;
const TILE = 1;

function offset(point: RoverPoint): [number, number] {
  return [point.x - HALF, point.z - HALF];
}

function ToyRover({
  position,
  reduced,
}: {
  position: RoverPoint;
  reduced: boolean;
}) {
  const group = useRef<Group>(null);
  const target = useMemo(() => ({ x: 0, z: 0 }), []);
  const [tx, tz] = offset(position);
  target.x = tx;
  target.z = tz;

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    if (reduced) {
      group.current.position.x = target.x;
      group.current.position.z = target.z;
      group.current.position.y = 0.36;
      return;
    }
    group.current.position.x = MathUtils.damp(group.current.position.x, target.x, 8, delta);
    group.current.position.z = MathUtils.damp(group.current.position.z, target.z, 8, delta);
    group.current.position.y = 0.36 + Math.sin(clock.elapsedTime * 3.2) * 0.015;
  });

  return (
    <group ref={group} position={[tx, 0.36, tz]}>
      <mesh castShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[0.72, 0.3, 0.92]} />
        <meshStandardMaterial color="#F5E6C8" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh castShadow position={[0, 0.47, 0.06]}>
        <boxGeometry args={[0.46, 0.22, 0.5]} />
        <meshStandardMaterial color="#D8C7A5" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.5, 0.31]}>
        <boxGeometry args={[0.24, 0.1, 0.03]} />
        <meshStandardMaterial color="#1F3A5F" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0.2, 0.7, -0.18]}>
        <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
        <meshStandardMaterial color="#5F6B83" />
      </mesh>
      <mesh position={[0.2, 0.93, -0.18]}>
        <boxGeometry args={[0.18, 0.08, 0.1]} />
        <meshStandardMaterial color="#F5A524" emissive="#F5A524" emissiveIntensity={0.4} />
      </mesh>
      {[-0.38, 0.38].flatMap((x) =>
        [-0.3, 0.02, 0.34].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.15, z]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.16, 0.16, 0.1, 14]} />
            <meshStandardMaterial color="#2C3440" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Sample({
  point,
  collected,
  reduced,
}: {
  point: (typeof ROVER_SAMPLES)[number];
  collected: boolean;
  reduced: boolean;
}) {
  const mesh = useRef<Mesh>(null);
  const [x, z] = offset(point);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    if (!reduced) {
      mesh.current.rotation.y = clock.elapsedTime * 1.3;
      mesh.current.position.y = 0.55 + Math.sin(clock.elapsedTime * 2.4 + x) * 0.06;
    }
  });

  if (collected) return null;

  return (
    <group position={[x, 0, z]}>
      <mesh ref={mesh} position={[0, 0.55, 0]} castShadow>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#FFC93C"
          emissive="#FFB347"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>
      <pointLight position={[0, 0.6, 0]} intensity={5} distance={1.6} color="#FFC93C" />
    </group>
  );
}

export default function RoverScene({
  position,
  collected,
  won,
}: {
  position: RoverPoint;
  collected: string[];
  won: boolean;
}) {
  const reduced = useReducedMotion();
  const [baseX, baseZ] = offset(ROVER_BASE);

  return (
    <Canvas
      camera={{ position: [6.2, 7.6, 7.8], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <color attach="background" args={["#2A120C"]} />
      <fog attach="fog" args={["#2A120C", 10, 26]} />
      <ambientLight intensity={0.55} color="#FFD9B0" />
      <directionalLight position={[5, 9, 4]} intensity={1.4} color="#FFC98C" castShadow />

      {/* Terrain tiles */}
      {Array.from({ length: ROVER_GRID }).flatMap((_, x) =>
        Array.from({ length: ROVER_GRID }).map((__, z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x - HALF, 0, z - HALF]}
            receiveShadow
          >
            <boxGeometry args={[TILE * 0.96, 0.16, TILE * 0.96]} />
            <meshStandardMaterial
              color={(x + z) % 2 === 0 ? "#A84B2A" : "#93401F"}
              roughness={0.95}
            />
          </mesh>
        ))
      )}

      {/* Base pad */}
      <group position={[baseX, 0, baseZ]}>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.46, 0.5, 0.12, 28]} />
          <meshStandardMaterial
            color={won ? "#34D399" : "#0F766E"}
            emissive={won ? "#34D399" : "#0F766E"}
            emissiveIntensity={won ? 0.8 : 0.25}
            roughness={0.5}
          />
        </mesh>
        <mesh position={[0.3, 0.55, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#E5E7EB" />
        </mesh>
        <mesh position={[0.42, 0.83, 0]}>
          <boxGeometry args={[0.24, 0.16, 0.02]} />
          <meshStandardMaterial color="#9C4321" />
        </mesh>
      </group>

      {ROVER_SAMPLES.map((sample) => (
        <Sample
          key={sample.id}
          point={sample}
          collected={collected.includes(sample.id)}
          reduced={reduced}
        />
      ))}

      {ROVER_ROCKS.map((rock) => {
        const [x, z] = offset(rock);
        return (
          <mesh key={`${rock.x}-${rock.z}`} position={[x, 0.3, z]} castShadow>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color="#4B342A" roughness={1} />
          </mesh>
        );
      })}

      <ToyRover position={position} reduced={reduced} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={7}
        maxDistance={16}
        minPolarAngle={0.5}
        maxPolarAngle={1.28}
        target={[0, 0, 0]}
        autoRotate={false}
        makeDefault
      />
    </Canvas>
  );
}
