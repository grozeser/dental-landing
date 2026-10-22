import { Section } from "@/components/ui/Section";
import { steps } from "@/data/content";

export function Steps() {
  return (
    <Section id="steps" eyebrow="Как всё проходит" title="Четыре шага от звонка до улыбки" className="bg-surface">
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} data-reveal className="rounded-3xl bg-white p-7 shadow-card">
            <span className="text-5xl font-extrabold text-teal-100" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
