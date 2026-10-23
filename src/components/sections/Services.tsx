import { ArrowRight } from "lucide-react";
import { BookButton } from "@/components/ui/BookButton";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/content";
import { formatRub } from "@/lib/price";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Услуги"
      title="Всё для здоровья зубов в одной клинике"
      lead="От профгигиены до имплантации. Цены — ориентир, точную сумму врач назовёт после диагностики."
      className="bg-surface"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, text, priceFrom }) => (
          <li
            key={title}
            data-reveal
            className="group flex flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-2 grow text-muted">{text}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-lg font-bold text-teal-800">от {formatRub(priceFrom)}</p>
              <BookButton
                prefill={{ service: title }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50"
              >
                Записаться<span className="sr-only">: {title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </BookButton>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
