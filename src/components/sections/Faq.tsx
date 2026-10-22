import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { faq } from "@/data/content";

export function Faq() {
  return (
    <Section id="faq" eyebrow="Вопросы" title="Частые вопросы" className="bg-surface">
      <div className="max-w-3xl divide-y divide-line rounded-3xl bg-white px-6 shadow-card sm:px-8">
        {faq.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className="size-5 shrink-0 text-teal-700 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
