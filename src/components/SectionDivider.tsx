export const SectionDivider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
    <div className="h-px flex-1 bg-primary/8" />
    <div className="flex gap-1.5">
      <span className="h-1 w-1 rounded-full bg-accent/40" />
      <span className="h-1 w-1 rounded-full bg-accent/70" />
      <span className="h-1 w-1 rounded-full bg-accent/40" />
    </div>
    <div className="h-px flex-1 bg-primary/8" />
  </div>
);
