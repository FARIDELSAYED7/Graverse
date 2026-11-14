import { EchoProvider } from "@/lib/echo/provider";

/**
 * ECHOES — Stories Beyond Earth.
 *
 * The whole surface shares one companion state, so ECHO keeps talking about
 * the same story as the reader moves between chapters.
 */
export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="stories-shell">
      <EchoProvider>{children}</EchoProvider>
    </div>
  );
}
