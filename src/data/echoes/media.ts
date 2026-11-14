import manifestJson from "./media-manifest.json";
import type { EchoMedia, Localized, LocalizedList, MediaKind } from "@/types/echo";

/**
 * ECHOES media registry.
 *
 * `media-manifest.json` is written by `scripts/fetch-echo-media.mjs`, which
 * downloads the curated NASA Image and Video Library assets into `public/` and
 * records the NASA metadata for each one. The story files then attach the
 * bilingual alt text and caption; everything else (credit, organisation,
 * original URL, access date) comes from the manifest so it stays consistent.
 *
 * Nothing is fetched from the network at render time: the experience must not
 * break when NASA is unreachable.
 */

interface ManifestImage {
  nasaId: string;
  story: string;
  role: string;
  title: string;
  description: string;
  center: string;
  secondaryCreator: string;
  photographer: string;
  dateCreated: string;
  keywords: string[];
  local: string;
  thumb: string;
  sourceUrl: string;
  assetUrl: string;
  accessedAt: string;
}

interface ManifestVideo extends ManifestImage {
  local: string;
  poster: string;
  originalUrl: string;
  captionsUrl: string;
}

interface Manifest {
  generatedAt: string;
  accessedAt: string;
  libraryUrl: string;
  apiUrl: string;
  usageNote: string;
  images: Record<string, ManifestImage>;
  videos: Record<string, ManifestVideo>;
}

export const echoMediaManifest = manifestJson as unknown as Manifest;

export const ECHO_MEDIA_USAGE: Localized = {
  en: "NASA media. Generally not subject to copyright, and may not be used to imply endorsement of a commercial product or service. Third-party credited assets keep their original credit line.",
  ar: "وسائط من ناسا. غير مشمولة عادةً بحقوق النشر، ولا يجوز استخدامها بما يوحي بتأييد ناسا لمنتج أو خدمة تجارية. أما الأصول المنسوبة إلى أطراف ثالثة فتحتفظ بإسنادها الأصلي.",
};

export const ECHO_MEDIA_USAGE_MODEL: Localized = {
  en: "3D model from NASA 3D Resources. Free to download and use under the NASA media usage guidelines. Model simplification and rendering differ from the flight article.",
  ar: "نموذج ثلاثي الأبعاد من مصادر ناسا ثلاثية الأبعاد. متاح مجاناً للتنزيل والاستخدام وفق إرشادات استخدام وسائط ناسا. يختلف تبسيط النموذج وعرضه عن القطعة الفعلية المُطلقة.",
};

export const ECHO_MEDIA_USAGE_RECONSTRUCTION: Localized = {
  en: "Educational illustration drawn by GRAVERSE. It is a labelled reconstruction for teaching, not a NASA photograph.",
  ar: "رسم تعليمي من إعداد GRAVERSE. إنه إعادة رسم مُعنونة للتعليم، وليس صورة فوتوغرافية من ناسا.",
};

function creditFor(entry: ManifestImage): string {
  const parts: string[] = [];
  if (entry.photographer && entry.photographer !== "NASA or National Aeronautics and Space Administration") {
    parts.push(entry.photographer);
  }
  if (entry.secondaryCreator) parts.push(entry.secondaryCreator);
  parts.push(entry.center || "NASA");
  return [...new Set(parts)].join(", ");
}

function organisationFor(entry: ManifestImage): string {
  if (entry.center && entry.center !== "NASA") return `NASA/${entry.center}`;
  return "NASA";
}

/** The NASA id -> local path, so a story can reference an asset by id. */
export function echoImagePath(nasaId: string): string | undefined {
  return echoMediaManifest.images[nasaId]?.local;
}

export function echoVideoPath(nasaId: string): string | undefined {
  return echoMediaManifest.videos[nasaId]?.local;
}

/**
 * Builds a media record for a NASA image that has already been downloaded by
 * the retrieval script.
 */
export function echoImage(
  nasaId: string,
  options: {
    alt: Localized;
    caption: Localized;
    kind?: MediaKind;
    usage?: Localized;
  }
): EchoMedia {
  const entry = echoMediaManifest.images[nasaId];
  if (!entry) {
    throw new Error(
      `Unknown ECHOES media id "${nasaId}". Run scripts/fetch-echo-media.mjs first.`
    );
  }
  return {
    id: nasaId,
    kind: options.kind ?? "photograph",
    src: entry.local,
    thumb: entry.thumb,
    alt: options.alt,
    caption: options.caption,
    credit: creditFor(entry),
    organization: organisationFor(entry),
    sourceUrl: entry.sourceUrl,
    nasaId: entry.nasaId,
    usage: options.usage ?? ECHO_MEDIA_USAGE,
    accessedAt: entry.accessedAt,
  };
}

/** Builds a media record for a NASA video with its local mp4 and poster. */
export function echoVideo(
  nasaId: string,
  options: {
    alt: Localized;
    caption: Localized;
    transcript: LocalizedList;
    usage?: Localized;
  }
): EchoMedia {
  const entry = echoMediaManifest.videos[nasaId];
  if (!entry) {
    throw new Error(
      `Unknown ECHOES video id "${nasaId}". Run scripts/fetch-echo-media.mjs first.`
    );
  }
  return {
    id: nasaId,
    kind: "video",
    src: entry.local,
    poster: entry.poster,
    thumb: entry.poster,
    alt: options.alt,
    caption: options.caption,
    credit: creditFor(entry),
    organization: organisationFor(entry),
    sourceUrl: entry.sourceUrl,
    nasaId: entry.nasaId,
    usage: options.usage ?? ECHO_MEDIA_USAGE,
    accessedAt: entry.accessedAt,
    transcript: options.transcript,
    captionsUrl: entry.captionsUrl || undefined,
  };
}

/**
 * Builds a media record for an illustration or diagram that GRAVERSE draws
 * itself. These are labelled as reconstructions so they are never mistaken
 * for NASA photographs.
 */
export function echoIllustration(
  id: string,
  options: {
    src: string;
    alt: Localized;
    caption: Localized;
    kind?: MediaKind;
    credit?: string;
    organization?: string;
    sourceUrl?: string;
    accessedAt?: string;
  }
): EchoMedia {
  return {
    id,
    kind: options.kind ?? "illustration",
    src: options.src,
    alt: options.alt,
    caption: options.caption,
    credit: options.credit ?? "GRAVERSE",
    organization: options.organization ?? "GRAVERSE",
    sourceUrl: options.sourceUrl ?? "https://graverse.app/stories",
    usage: ECHO_MEDIA_USAGE_RECONSTRUCTION,
    accessedAt: options.accessedAt ?? echoMediaManifest.accessedAt,
  };
}
