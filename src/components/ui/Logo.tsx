import { clinic } from "@/data/content";

export function ToothMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="#0f766e" />
      <path
        fill="#fff"
        d="M11.4 7.5c-2.9 0-4.9 2.2-4.9 5.3 0 2.4.8 4.1 1.6 6.1.7 1.6.8 3.7 1.2 5.7.3 1.6 1 2.4 1.9 2.4 1.1 0 1.5-1 1.8-2.6l.5-2.4c.3-1.2.7-1.9 1.5-1.9s1.2.7 1.5 1.9l.5 2.4c.3 1.6.7 2.6 1.8 2.6.9 0 1.6-.8 1.9-2.4.4-2 .5-4.1 1.2-5.7.8-2 1.6-3.7 1.6-6.1 0-3.1-2-5.3-4.9-5.3-1.9 0-3 1-4.6 1s-2.7-1-4.6-1z"
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <ToothMark className="size-9 shrink-0" />
      <span className="leading-tight">
        <span className={`block text-lg font-bold ${light ? "text-white" : "text-ink"}`}>{clinic.name}</span>
        <span className={`block text-xs ${light ? "text-white/70" : "text-muted"}`}>{clinic.tagline}</span>
      </span>
    </span>
  );
}
