import { Counter } from "@/components/ui/Counter";
import { Section } from "@/components/ui/Section";
import { features, stats } from "@/data/content";

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Почему мы"
      title="Спокойное лечение, честные цены"
      lead="Мы знаем, почему визит к стоматологу откладывают: страшно и непонятно, сколько это будет стоить. Поэтому убрали обе причины."
    >
      <dl className="grid grid-cols-2 gap-6 rounded-3xl bg-teal-700 p-8 text-white sm:p-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1">
            <dt className="text-sm text-teal-50">{s.label}</dt>
            <dd className="text-4xl font-extrabold sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title} data-reveal className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
