"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ImageOff,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { EchoDiagram, EchoModel } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ScientificDiagram } from "./ScientificDiagram";
import { ViewerErrorBoundary } from "./artifact/ViewerErrorBoundary";

const ArtifactScene = dynamic(() => import("./artifact/ArtifactScene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * The interactive artifact, integrated into the narrative.
 *
 * The visitor rotates and zooms a real NASA 3D model of the machine and
 * selects numbered markers to learn what each component does — or reads the
 * same components from the list under the viewer, which works without the
 * 3D view at all. When WebGL is unavailable, the printed schematic takes the
 * canvas's place, so the scene never leaves a dark hole in the page.
 */
export function Interactive3DArtifact({
  model,
  locale,
  accent = "#6d4aff",
  fallbackDiagram,
}: {
  model: EchoModel;
  locale: Locale;
  accent?: string;
  fallbackDiagram?: EchoDiagram;
}) {
  const reduced = useReducedMotion();
  const [support, setSupport] = useState<"checking" | "yes" | "no">("checking");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [zoomSignal, setZoomSignal] = useState(0);
  const [zoomDir, setZoomDir] = useState<1 | -1>(1);

  useEffect(() => {
    setSupport(supportsWebGL() ? "yes" : "no");
  }, []);

  const labels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const hotspot of model.hotspots) {
      map[hotspot.id] = pick(locale, hotspot.label);
    }
    return map;
  }, [model.hotspots, locale]);

  const active = model.hotspots.find((hotspot) => hotspot.id === activeId) ?? null;

  const zoom = (dir: 1 | -1) => {
    setZoomDir(dir);
    setZoomSignal((value) => value + 1);
  };

  return (
    <div className="gn-viewer">
      <div className="gn-viewer__stage">
        {support === "yes" ? (
          <ViewerErrorBoundary
            fallback={<StageFallback locale={locale} />}
          >
            <ArtifactScene
              url={model.src}
              procedural={model.procedural}
              hotspots={model.hotspots}
              activeId={activeId}
              onSelect={setActiveId}
              accent={accent}
              labels={labels}
              resetSignal={resetSignal}
              zoomSignal={zoomSignal}
              zoomDir={zoomDir}
              idleSpin={!reduced}
            />
          </ViewerErrorBoundary>
        ) : support === "no" ? (
          fallbackDiagram ? (
            <div className="gn-viewer__fallback">
              <ScientificDiagram
                diagram={fallbackDiagram}
                locale={locale}
                accent={accent}
              />
              <p className="gn-viewer__fallback-note">
                {t(locale, "gallery.unavailable")}
              </p>
            </div>
          ) : (
            <StageFallback locale={locale} />
          )
        ) : (
          <div className="gn-viewer__loading" aria-hidden="true" />
        )}

        {support === "yes" ? (
          <>
            <p className="gn-viewer__hint">
              {t(locale, "echo.rotate")}
            </p>
            <div className="gn-viewer__controls">
              <button
                type="button"
                onClick={() => zoom(-1)}
                aria-label={t(locale, "echo.zoomOut")}
                className="gn-viewer__btn"
              >
                <ZoomOut aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => zoom(1)}
                aria-label={t(locale, "echo.zoomIn")}
                className="gn-viewer__btn"
              >
                <ZoomIn aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveId(null);
                  setResetSignal((value) => value + 1);
                }}
                aria-label={t(locale, "echo.resetView")}
                className="gn-viewer__btn"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="gn-viewer__parts">
        <h4 className="sr-only">{t(locale, "echo.hotspots")}</h4>
        <ul className="gn-viewer__list">
          {model.hotspots.map((hotspot, index) => {
            const selected = activeId === hotspot.id;
            return (
              <li key={hotspot.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(selected ? null : hotspot.id)}
                  aria-expanded={selected}
                  className={`gn-part ${selected ? "gn-part--active" : ""}`}
                  style={selected ? { borderColor: accent } : undefined}
                >
                  <span
                    aria-hidden="true"
                    className="gn-part__number"
                    style={{ backgroundColor: accent }}
                  >
                    {index + 1}
                  </span>
                  {pick(locale, hotspot.label)}
                </button>
              </li>
            );
          })}
        </ul>

        {active ? (
          <p className="gn-viewer__detail">
            <strong>{pick(locale, active.label)}:</strong>{" "}
            {pick(locale, active.detail)}
          </p>
        ) : (
          <p className="gn-viewer__detail gn-viewer__detail--idle">
            {pick(locale, model.description)}
          </p>
        )}

        <p className="gn-viewer__provenance">
          {pick(locale, model.provenance)} · {model.credit} ·{" "}
          <a
            href={model.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-[#5b3fe0] hover:underline"
          >
            {t(locale, "echo.mediaSource")}
          </a>
        </p>
      </div>
    </div>
  );
}

function StageFallback({ locale }: { locale: Locale }) {
  return (
    <div className="gn-viewer__fallback-plain">
      <ImageOff aria-hidden="true" className="h-6 w-6" />
      <p className="text-sm">{t(locale, "gallery.unavailable")}</p>
    </div>
  );
}
