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
            className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-transform hover:-translate-y-1"
          >
            <Icon className="size-8 text-teal-700" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-2 grow text-muted">{text}</p>
            <p className="mt-6 text-lg font-bold text-teal-800">от {formatRub(priceFrom)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
