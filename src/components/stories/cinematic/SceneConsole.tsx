import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Localized } from "@/types/echo";
import type { Locale } from "@/lib/i18n";

export interface ConsoleScene {
  id: string;
  title: Localized;
  tone: "dark" | "light";
}

/**
 * The presentation console.
 *
 * A compact pill that carries three things at once: the previous and next
 * controls, the current scene with its counter, and a scrubber with one tick
 * per scene so any moment of the story can be reached directly.
 */
export function SceneConsole({
  scenes,
  active,
  index,
  locale,
  onJump,
  onPrev,
  onNext,
  title,
}: {
  scenes: ConsoleScene[];
  active: number;
  index: number;
  locale: Locale;
  onJump: (next: number) => void;
  onPrev: () => void;
  onNext: () => void;
  title: string;
}) {
  const total = scenes.length;
  const current = scenes[active];
  const tone = current?.tone ?? "dark";

  return (
    <div className="cine-console" data-tone={tone}>
      <button
        type="button"
        className="cine-console__btn"
        onClick={onPrev}
        disabled={active <= 0}
        aria-label={locale === "ar" ? "المشهد السابق" : "Previous scene"}
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
      </button>

      <div className="cine-console__meter">
        <div className="cine-console__row">
          <span className="cine-console__count">
            {String(index + 1).padStart(2, "0")}
            <span className="cine-console__sep">/</span>
            {String(total).padStart(2, "0")}
          </span>
          <span className="cine-console__title">
            {current ? (locale === "ar" ? current.title.ar : current.title.en) : title}
          </span>
        </div>
        <div
          className="cine-console__scrubber"
          role="tablist"
          aria-label={locale === "ar" ? "مشاهد القصة" : "Story scenes"}
        >
          {scenes.map((scene, sceneIndex) => (
            <button
              key={scene.id}
              type="button"
              role="tab"
              aria-selected={sceneIndex === active}
              aria-label={`${sceneIndex + 1}. ${scene.title.en}`}
              className="cine-console__tick"
              data-state={
                sceneIndex === active
                  ? "active"
                  : sceneIndex < active
                    ? "passed"
                    : "ahead"
              }
              onClick={() => onJump(sceneIndex)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="cine-console__btn"
        onClick={onNext}
        disabled={active >= total - 1}
        aria-label={locale === "ar" ? "المشهد التالي" : "Next scene"}
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
      </button>
    </div>
  );
}
