export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-muted/60 ${className}`} />
);

export const CenterCardSkeleton = () => (
  <div className="bg-gradient-surface rounded-2xl overflow-hidden border border-border">
    <Skeleton className="aspect-square rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-2/3 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
      <Skeleton className="h-3 w-1/3 mx-auto" />
    </div>
  </div>
);
