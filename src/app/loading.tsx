export default function Loading() {
  return (
    <div className="container-content pb-20 pt-12">
      <div className="max-w-2xl space-y-4">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-10 w-full max-w-xl rounded-lg" />
        <div className="skeleton h-4 w-full max-w-lg rounded-full" />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-bg-elevated/50 p-4">
        <div className="flex flex-wrap gap-2">
          <div className="skeleton h-9 w-28 rounded-full" />
          <div className="skeleton h-9 w-28 rounded-full" />
          <div className="skeleton h-9 w-24 rounded-full" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-card border border-white/10 bg-surface/60"
          >
            <div className="skeleton aspect-[4/3] w-full" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-3 w-32 rounded-full" />
              <div className="skeleton h-5 w-3/4 rounded-md" />
              <div className="skeleton h-3 w-full rounded-full" />
              <div className="skeleton h-3 w-2/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only" role="status">
        Loading GRAVERSE content
      </p>
    </div>
  );
}
