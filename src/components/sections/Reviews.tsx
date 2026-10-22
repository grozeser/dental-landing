import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { reviews } from "@/data/content";

export function Reviews() {
  return (
    <Section id="reviews" eyebrow="Отзывы" title="Что говорят пациенты">
      {/* CSS scroll-snap carousel: swipe on touch, keyboard arrows once focused. No JS. */}
      <ul
        tabIndex={0}
        aria-label="Отзывы пациентов, прокручиваются по горизонтали"
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 [scrollbar-color:var(--color-teal-200)_transparent] [scrollbar-width:thin] sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {reviews.map((r) => (
          <li
            key={r.name}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-line p-7 sm:w-[24rem]"
          >
            <Quote className="size-8 text-teal-200" aria-hidden="true" />
            <p className="mt-4 grow text-pretty">{r.text}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p>
                <span className="block font-bold">{r.name}</span>
                <span className="text-sm text-muted">{r.service}</span>
              </p>
              <p className="flex text-amber-500" role="img" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
