import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ExperienceTheme } from "@/components/layout/ExperienceTheme";
import { getLocale, localeAttributes } from "@/lib/locale";
import { t } from "@/lib/i18n";

const inter = localFont({
  src: "../fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "GRAVERSE — An Interactive Space Heritage Timeline & Digital Museum",
    template: "%s · GRAVERSE",
  },
  description:
    "Explore NASA space hardware through an interactive timeline and a source-linked digital museum. Discover what each artifact did, what it taught us, and what is known about its fate.",
  applicationName: "GRAVERSE",
  keywords: [
    "NASA",
    "space exploration",
    "space heritage",
    "artifacts",
    "timeline",
    "digital museum",
    "Apollo",
    "Mars",
    "Voyager",
  ],
  authors: [{ name: "GRAVERSE" }],
  openGraph: {
    title: "GRAVERSE — An Interactive Space Heritage Timeline & Digital Museum",
    description:
      "Explore the timeline. Discover the artifacts. Understand their legacy.",
    type: "website",
    siteName: "GRAVERSE",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRAVERSE — An Interactive Space Heritage Timeline",
    description:
      "Explore NASA space hardware through time, destination and artifact type.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050B18",
  colorScheme: "dark",
};

const motionScript = `try{var m=localStorage.getItem("graverse-motion");if(m==="reduced"){document.documentElement.dataset.motion="reduced"}else if(m==="full"){document.documentElement.dataset.motion="full"}}catch(e){}`;

// Runs before paint so the Academy never flashes the dark Museum theme.
const experienceScript = `try{var p=location.pathname;var e=p==="/academy"||p.indexOf("/academy/")===0?"academy":p==="/museum"||p.indexOf("/museum/")===0?"museum":p==="/explorer"||p.indexOf("/explorer/")===0?"explorer":"home";document.documentElement.dataset.experience=e}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = getLocale();
  const attributes = localeAttributes(locale);
  return (
    <html
      lang={attributes.lang}
      dir={attributes.dir}
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script dangerouslySetInnerHTML={{ __html: experienceScript }} />
        <ExperienceTheme />
        <a
          href="#main-content"
          className="btn-primary fixed left-4 top-4 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-semibold transition-transform focus:translate-y-0"
        >
          {t(locale, "common.skip")}
        </a>
        <div className="space-backdrop" aria-hidden="true">
          <div className="space-backdrop__photo" />
          <div className="space-backdrop__aurora" />
          <div className="space-backdrop__stars" />
          <div className="space-backdrop__veil" />
        </div>
        <SiteHeader locale={locale} />
        <main id="main-content" className="min-h-[70vh]">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
