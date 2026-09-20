export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="h-9 w-40 animate-pulse rounded-lg bg-steel/25" />
      <div className="mt-3 h-5 w-64 animate-pulse rounded bg-steel/20" />

      <div className="mt-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-steel/20" />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-steel/35 bg-navy">
            <div className="aspect-square w-full animate-pulse bg-steel/20" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-16 animate-pulse rounded bg-steel/20" />
              <div className="h-4 w-full animate-pulse rounded bg-steel/20" />
              <div className="h-5 w-24 animate-pulse rounded bg-steel/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
