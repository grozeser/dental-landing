import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { doctors } from "@/data/content";
import { pluralYears } from "@/lib/plural";

export function Doctors() {
  return (
    <Section
      id="doctors"
      eyebrow="Врачи"
      title="Врачи, к которым возвращаются"
      lead="Каждый врач ежегодно проходит обучение и повышает квалификацию. Средний стаж команды — 12 лет."
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
        {doctors.map((d) => (
          <li key={d.name} data-reveal>
            <Image
              src={d.image}
              alt={`${d.name}, ${d.role.toLowerCase()}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />
            <h3 className="mt-4 text-lg font-bold">{d.name}</h3>
            <p className="text-sm font-medium text-teal-700">{d.role}</p>
            <p className="mt-2 text-sm text-muted">
              Стаж {d.experience} {pluralYears(d.experience)} · {d.note}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
