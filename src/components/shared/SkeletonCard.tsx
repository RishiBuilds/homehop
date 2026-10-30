export function SkeletonCard({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="rounded-xl border bg-card p-4 flex gap-4 animate-pulse">
        <div className="h-20 w-28 rounded-lg bg-muted shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-2/3" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 w-14 bg-muted rounded-full" />
            <div className="h-5 w-14 bg-muted rounded-full" />
          </div>
        </div>
        <div className="w-24 space-y-2 text-right">
          <div className="h-5 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-3/4 ml-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-pulse">
      <div className="h-44 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-4/5" />
        <div className="h-3 bg-muted rounded w-3/5" />
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-muted rounded-full" />
          <div className="h-5 w-16 bg-muted rounded-full" />
        </div>
        <div className="h-px bg-muted" />
        <div className="flex justify-between">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

