import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import type { EchoMedia } from "@/types/echo";
import { Frame } from "./SceneFrame";

/**
 * A framed photograph with its provenance line.
 *
 * The plate is the visual anchor of a scene: the frame keeps its aspect
 * ratio, the caption sits directly beneath it, and the credit always points
 * back at the original source.
 */
export function Plate({
  media,
  locale,
  size = "default",
  priority = false,
}: {
  media: EchoMedia;
  locale: Locale;
  size?: "default" | "wide";
  priority?: boolean;
}) {
  return (
    <figure className={`plate plate--${size}`}>
      <Frame media={media} priority={priority} />
      <figcaption className="plate__caption">
        <span className="plate__kind">{t(locale, `echo.kind.${media.kind}`)}</span>
        {media.nasaId ? <span className="plate__id">{media.nasaId}</span> : null}
        <span className="plate__text">{pick(locale, media.caption)}</span>
        <a className="plate__credit" href={media.sourceUrl} target="_blank" rel="noreferrer">
          {media.credit}
        </a>
      </figcaption>
    </figure>
  );
}
