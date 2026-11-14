"use client";

import { useMemo } from "react";
import { Clone, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { EchoHotspot } from "@/types/echo";

/**
 * The 3D artifact.
 *
 * NASA 3D Resources models are loaded on demand and fitted into a fixed
 * "fit space": the longest dimension becomes 2.4 units and the model is
 * centred on the origin. Hotspot coordinates are written in that same
 * space, so a marker always lands on the part of the machine it names.
 *
 * The Draco decoder is served from `public/draco` rather than a third-party
 * CDN, so the viewer works offline.
 */

export const FIT_SIZE = 2.4;

export function FittedGltf({
  url,
  target = FIT_SIZE,
  children,
}: {
  url: string;
  target?: number;
  children?: React.ReactNode;
}) {
  const { scene } = useGLTF(url, "/draco/");

  const { scale, position } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const factor = target / maxDimension;
    const center = box.getCenter(new THREE.Vector3());
    return {
      scale: factor,
      position: [
        -center.x * factor,
        -center.y * factor,
        -center.z * factor,
      ] as [number, number, number],
    };
  }, [scene, target]);

  return (
    <group>
      <Clone object={scene} scale={scale} position={position} />
      {children}
    </group>
  );
}

/** Marker buttons rendered in 3D space so they follow the camera. */
export function ArtifactHotspots({
  hotspots,
  activeId,
  onSelect,
  accent = "#6d4aff",
  labels,
}: {
  hotspots: EchoHotspot[];
  activeId: string | null;
  onSelect: (id: string) => void;
  accent?: string;
  labels: Record<string, string>;
}) {
  return (
    <>
      {hotspots.map((hotspot, index) => {
        const active = activeId === hotspot.id;
        return (
          <Html
            key={hotspot.id}
            position={hotspot.position}
            center
            distanceFactor={5.4}
            zIndexRange={[20, 10]}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(hotspot.id);
              }}
              aria-expanded={active}
              className={`gn-marker ${active ? "gn-marker--active" : ""}`}
              style={{ backgroundColor: accent }}
            >
              {index + 1}
              <span
                className={`gn-marker-label ${active ? "gn-marker-label--show" : ""}`}
              >
                {labels[hotspot.id] ?? hotspot.id}
              </span>
              <span className="sr-only">{labels[hotspot.id] ?? hotspot.id}</span>
            </button>
          </Html>
        );
      })}
    </>
  );
}
