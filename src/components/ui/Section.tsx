import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, lead, className = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="shell">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-semibold tracking-wider text-teal-700 uppercase">{eyebrow}</p>
          )}
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-lg text-pretty text-muted">{lead}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
