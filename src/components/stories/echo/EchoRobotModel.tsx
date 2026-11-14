"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { EchoAnimationState } from "@/lib/echo/provider";

/**
 * ECHO — the GRAVERSE space story companion.
 *
 * An original GRAVERSE character, built from Three.js primitives. It is not a
 * NASA robot and it carries no NASA insignia.
 *
 * The model is a small hovering robot: a rounded body, an expressive visor
 * with two digital eyes, an antenna, a chest light and two articulated arms.
 * Every animation state is driven in `useFrame`, with all motion damped so
 * transitions between states read as one continuous character rather than a
 * set of clips.
 */

export interface EchoRobotProps {
  state: EchoAnimationState;
  /** Reduced-motion: hold a still pose instead of animating. */
  reducedMotion?: boolean;
  /** World-space point the robot points at when in the "pointing" state. */
  pointTarget?: [number, number, number];
  /** Scale applied to the whole robot. */
  scale?: number;
  /** Called once the model is mounted, so the host can enable interaction. */
  onReady?: () => void;
}

const SHELL = "#f3efe6";
const SHELL_DARK = "#d8d2c4";
const SILVER = "#aeb8cc";
const TEAL = "#35e0c8";
const SKY = "#7dd3fc";
const VIOLET = "#8f7bff";
const VISOR = "#181233";

type Pose = {
  bob: number;
  sway: number;
  headTilt: number;
  headTurn: number;
  headForward: number;
  armLeft: [number, number, number];
  armRight: [number, number, number];
  eyeOpen: number;
  eyeGlow: number;
  mouth: number;
  antenna: number;
  ring: number;
};

const NEUTRAL: Pose = {
  bob: 0,
  sway: 0,
  headTilt: 0,
  headTurn: 0,
  headForward: 0,
  armLeft: [0.12, 0, 0.12],
  armRight: [0.12, 0, -0.12],
  eyeOpen: 1,
  eyeGlow: 1,
  mouth: 0.18,
  antenna: 0,
  ring: 0,
};

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function dampVec(
  current: [number, number, number],
  target: [number, number, number],
  lambda: number,
  dt: number
): [number, number, number] {
  return [
    damp(current[0], target[0], lambda, dt),
    damp(current[1], target[1], lambda, dt),
    damp(current[2], target[2], lambda, dt),
  ];
}

export function EchoRobotModel({
  state,
  reducedMotion = false,
  pointTarget,
  scale = 1,
  onReady,
}: EchoRobotProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armLeftRef = useRef<THREE.Group>(null);
  const armRightRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const chestRef = useRef<THREE.MeshStandardMaterial>(null);

  const pose = useRef<Pose>({ ...NEUTRAL });
  const blink = useRef({ next: 2.4, closed: 0 });
  const clock = useRef(0);

  const shellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SHELL,
        roughness: 0.34,
        metalness: 0.08,
      }),
    []
  );
  const silverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SILVER,
        roughness: 0.24,
        metalness: 0.85,
      }),
    []
  );
  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SHELL_DARK,
        roughness: 0.55,
        metalness: 0.15,
      }),
    []
  );
  const visorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: VISOR,
        roughness: 0.16,
        metalness: 0.5,
      }),
    []
  );

  const target = useMemo<[number, number, number]>(() => {
    if (!pointTarget) return [0, 0, -1];
    const vector = new THREE.Vector3(...pointTarget).normalize();
    return [vector.x, vector.y, vector.z];
  }, [pointTarget]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    clock.current += dt;
    const time = clock.current;
    const current = pose.current;

    let next: Pose = {
      ...NEUTRAL,
      armLeft: [...NEUTRAL.armLeft] as [number, number, number],
      armRight: [...NEUTRAL.armRight] as [number, number, number],
    };

    switch (state) {
      case "greeting": {
        const wave = Math.sin(time * 7);
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 3.2) * 0.02,
          sway: reducedMotion ? 0.12 : Math.sin(time * 2.2) * 0.06,
          headTilt: reducedMotion ? 0.12 : Math.sin(time * 1.4) * 0.06,
          headTurn: reducedMotion ? -0.18 : Math.sin(time * 1.1) * 0.12,
          armLeft: [-0.5, 0, 0.4],
          armRight: reducedMotion
            ? [-0.5, 0, -0.5]
            : [-1.9 + wave * 0.35, 0, -0.55],
          eyeOpen: 1,
          eyeGlow: 1.5,
          mouth: 0.5,
          ring: 1,
        };
        break;
      }
      case "talking": {
        const talk = Math.abs(Math.sin(time * 9));
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 4.4) * 0.016,
          sway: reducedMotion ? 0 : Math.sin(time * 1.7) * 0.04,
          headTilt: reducedMotion ? 0 : Math.sin(time * 2.3) * 0.05,
          headTurn: reducedMotion ? 0 : Math.sin(time * 1.1) * 0.09,
          armLeft: [0.3, 0, 0.28],
          armRight: reducedMotion
            ? [0.3, 0, -0.28]
            : [0.34 + Math.sin(time * 5.4) * 0.14, 0, -0.3],
          eyeOpen: 1,
          eyeGlow: 1.35,
          mouth: reducedMotion ? 0.3 : 0.16 + talk * 0.6,
          ring: 0.5,
        };
        break;
      }
      case "pointing": {
        const armX = reducedMotion ? -1.15 : -1.15 + Math.sin(time * 6) * 0.05;
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 2.6) * 0.02,
          sway: 0,
          headTurn: reducedMotion ? target[0] * 0.5 : target[0] * 0.5,
          headTilt: reducedMotion ? 0 : Math.sin(time * 3) * 0.03,
          armLeft: [0.2, 0, 0.2],
          armRight: [armX, 0, -0.34],
          eyeOpen: 1,
          eyeGlow: 1.6,
          mouth: 0.24,
          ring: 0.8,
        };
        break;
      }
      case "thinking": {
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 1.6) * 0.012,
          sway: reducedMotion ? 0.2 : Math.sin(time * 0.9) * 0.09,
          headTilt: reducedMotion ? 0.3 : 0.3 + Math.sin(time * 1.4) * 0.08,
          headTurn: reducedMotion ? 0.25 : 0.25 + Math.sin(time * 0.7) * 0.16,
          armLeft: [0.1, 0, 0.34],
          armRight: [0.5, 0, -0.55],
          eyeOpen: 0.72,
          eyeGlow: 0.85,
          mouth: 0.14,
          antenna: reducedMotion ? 1.4 : time * 3.4,
          ring: 0.25,
        };
        break;
      }
      case "celebrating": {
        const bounce = reducedMotion ? 0 : Math.abs(Math.sin(time * 7)) * 0.1;
        next = {
          ...next,
          bob: bounce,
          sway: reducedMotion ? 0 : Math.sin(time * 4) * 0.1,
          headTilt: reducedMotion ? 0 : Math.sin(time * 3) * 0.09,
          armLeft: [-2.1, 0, 0.5],
          armRight: [-2.1, 0, -0.5],
          eyeOpen: 1,
          eyeGlow: 2,
          mouth: 0.55,
          antenna: reducedMotion ? 0.8 : time * 6,
          ring: 1,
        };
        break;
      }
      case "listening": {
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 5.5) * 0.01,
          sway: 0,
          headTilt: reducedMotion ? -0.12 : -0.12 + Math.sin(time * 2.4) * 0.04,
          headForward: 0.12,
          armLeft: [0.4, 0, 0.22],
          armRight: [0.4, 0, -0.22],
          eyeOpen: 1,
          eyeGlow: 1.7,
          mouth: 0.1,
          ring: 0.7,
        };
        break;
      }
      case "idle":
      default: {
        next = {
          ...next,
          bob: reducedMotion ? 0 : Math.sin(time * 1.3) * 0.025,
          sway: reducedMotion ? 0 : Math.sin(time * 0.55) * 0.045,
          headTilt: reducedMotion ? 0 : Math.sin(time * 0.8) * 0.035,
          headTurn: reducedMotion ? 0 : Math.sin(time * 0.45) * 0.12,
          eyeOpen: 1,
          eyeGlow: 1.1,
          mouth: 0.18,
          antenna: reducedMotion ? 0 : time * 0.9,
          ring: 0.4,
        };
        break;
      }
    }

    // Blink: a short squash of the eyelids, only while the robot is calm.
    if (!reducedMotion) {
      blink.current.next -= dt;
      if (blink.current.next <= 0) {
        blink.current.closed = 0.16;
        blink.current.next = 2.2 + Math.random() * 3.4;
      }
      if (blink.current.closed > 0) {
        blink.current.closed -= dt;
        next.eyeOpen = Math.min(next.eyeOpen, 0.12);
      }
    }

    const lambda = 9;
    current.bob = damp(current.bob, next.bob, lambda, dt);
    current.sway = damp(current.sway, next.sway, lambda, dt);
    current.headTilt = damp(current.headTilt, next.headTilt, lambda, dt);
    current.headTurn = damp(current.headTurn, next.headTurn, lambda, dt);
    current.headForward = damp(current.headForward, next.headForward, lambda, dt);
    current.armLeft = dampVec(current.armLeft, next.armLeft, lambda, dt);
    current.armRight = dampVec(current.armRight, next.armRight, lambda, dt);
    current.eyeOpen = damp(current.eyeOpen, next.eyeOpen, 22, dt);
    current.eyeGlow = damp(current.eyeGlow, next.eyeGlow, 8, dt);
    current.mouth = damp(current.mouth, next.mouth, 14, dt);
    current.antenna = damp(current.antenna, next.antenna, 8, dt);
    current.ring = damp(current.ring, next.ring, 6, dt);

    if (rootRef.current) {
      rootRef.current.position.y = current.bob;
      rootRef.current.rotation.z = current.sway;
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = current.sway * 0.6;
    }
    if (headRef.current) {
      headRef.current.rotation.z = current.headTilt;
      headRef.current.rotation.y = current.headTurn;
      headRef.current.rotation.x = current.headForward;
    }
    if (armLeftRef.current) {
      armLeftRef.current.rotation.set(...current.armLeft);
    }
    if (armRightRef.current) {
      armRightRef.current.rotation.set(...current.armRight);
    }
    if (eyeLeftRef.current && eyeRightRef.current) {
      const open = Math.max(current.eyeOpen, 0.06);
      eyeLeftRef.current.scale.y = open;
      eyeRightRef.current.scale.y = open;
    }
    if (mouthRef.current) {
      mouthRef.current.scale.y = Math.max(current.mouth, 0.08);
      mouthRef.current.scale.x = 1 + current.mouth * 0.5;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.y = current.antenna;
    }
    if (ringRef.current) {
      const material = ringRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.6 + current.ring * 1.8;
      ringRef.current.rotation.z = current.antenna * 0.3;
    }
    if (chestRef.current) {
      chestRef.current.emissiveIntensity = 0.5 + current.eyeGlow * 0.8;
    }
  });

  return (
    <group
      ref={rootRef}
      scale={scale}
      onUpdate={onReady}
      dispose={null}
    >
      {/* Hover ring */}
      <mesh ref={ringRef} position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.37, 0.032, 16, 48]} />
        <meshStandardMaterial
          color={TEAL}
          emissive={TEAL}
          emissiveIntensity={1}
          roughness={0.3}
        />
      </mesh>

      {/* Lower skirt */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.27, 0.35, 0.15, 32]} />
        <primitive object={darkMaterial} attach="material" />
      </mesh>

      <group ref={bodyRef}>
        {/* Body shell */}
        <mesh position={[0, 0.52, 0]} scale={[0.38, 0.32, 0.38]} castShadow>
          <sphereGeometry args={[1, 36, 24]} />
          <primitive object={shellMaterial} attach="material" />
        </mesh>

        {/* Waist band */}
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.33, 0.33, 0.06, 32]} />
          <primitive object={silverMaterial} attach="material" />
        </mesh>

        {/* Chest light */}
        <mesh position={[0, 0.54, 0.33]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial
            ref={chestRef}
            color={TEAL}
            emissive={TEAL}
            emissiveIntensity={1}
            roughness={0.25}
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.86, 0]}>
          <cylinderGeometry args={[0.1, 0.13, 0.18, 20]} />
          <primitive object={silverMaterial} attach="material" />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 1.08, 0]}>
          <RoundedBox args={[0.62, 0.5, 0.52]} radius={0.16} smoothness={4} castShadow>
            <primitive object={shellMaterial} attach="material" />
          </RoundedBox>

          {/* Visor */}
          <RoundedBox
            args={[0.52, 0.34, 0.08]}
            radius={0.1}
            smoothness={4}
            position={[0, 0.02, 0.25]}
          >
            <primitive object={visorMaterial} attach="material" />
          </RoundedBox>

          {/* Eyes */}
          <mesh ref={eyeLeftRef} position={[-0.13, 0.05, 0.29]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial
              color={SKY}
              emissive={SKY}
              emissiveIntensity={2.4}
              roughness={0.2}
            />
          </mesh>
          <mesh ref={eyeRightRef} position={[0.13, 0.05, 0.29]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial
              color={SKY}
              emissive={SKY}
              emissiveIntensity={2.4}
              roughness={0.2}
            />
          </mesh>

          {/* Mouth */}
          <mesh ref={mouthRef} position={[0, -0.1, 0.29]}>
            <boxGeometry args={[0.16, 0.05, 0.02]} />
            <meshStandardMaterial
              color={TEAL}
              emissive={TEAL}
              emissiveIntensity={1.6}
              roughness={0.3}
            />
          </mesh>

          {/* Ear pods */}
          <mesh position={[-0.33, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 20]} />
            <primitive object={silverMaterial} attach="material" />
          </mesh>
          <mesh position={[0.33, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 20]} />
            <primitive object={silverMaterial} attach="material" />
          </mesh>

          {/* Antenna */}
          <group ref={antennaRef} position={[0, 0.26, 0]}>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.014, 0.02, 0.26, 12]} />
              <primitive object={silverMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0.27, 0]}>
              <sphereGeometry args={[0.05, 18, 18]} />
              <meshStandardMaterial
                color={VIOLET}
                emissive={VIOLET}
                emissiveIntensity={1.8}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>

        {/* Arms */}
        <group ref={armLeftRef} position={[-0.45, 0.62, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 18, 18]} />
            <primitive object={silverMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.23, 0]}>
            <capsuleGeometry args={[0.055, 0.32, 6, 14]} />
            <primitive object={shellMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.078, 18, 18]} />
            <primitive object={darkMaterial} attach="material" />
          </mesh>
        </group>

        <group ref={armRightRef} position={[0.45, 0.62, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 18, 18]} />
            <primitive object={silverMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.23, 0]}>
            <capsuleGeometry args={[0.055, 0.32, 6, 14]} />
            <primitive object={shellMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.078, 18, 18]} />
            <primitive object={darkMaterial} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
