"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/components/BookingProvider";
import { button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { priceList } from "@/data/content";
import { calcTotal, formatRub, monthly } from "@/lib/price";

const MAX_TEETH = 32;

export function Calculator() {
  const [qty, setQty] = useState<Record<string, number>>({ scan: 1, hygiene: 1 });
  const { setEstimate } = useBooking();
  const total = calcTotal(priceList, qty);
  const set = (id: string, n: number) => setQty((q) => ({ ...q, [id]: Math.min(MAX_TEETH, Math.max(0, n)) }));

  const book = () => {
    const lines = priceList
      .filter((p) => qty[p.id])
      .map((p) => (p.perTooth && qty[p.id] > 1 ? `${p.title} × ${qty[p.id]}` : p.title));
    setEstimate({ lines, total });
    document.getElementById("booking")?.scrollIntoView();
  };

  return (
    <Section
      id="calculator"
      eyebrow="Калькулятор"
      title="Узнайте примерную стоимость за минуту"
      lead="Отметьте нужные процедуры. Точную сумму врач назовёт после диагностики и зафиксирует в договоре."
    >
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <fieldset>
          <legend className="sr-only">Процедуры</legend>
          <ul className="divide-y divide-line rounded-3xl border border-line">
            {priceList.map((p) => {
              const n = qty[p.id] ?? 0;
              return (
                <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4 sm:px-6">
                  <label className="flex grow cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={n > 0}
                      onChange={(e) => set(p.id, e.target.checked ? 1 : 0)}
                      className="size-5 shrink-0 accent-teal-700"
                    />
                    <span>
                      <span className="block font-semibold">{p.title}</span>
                      <span className="text-sm text-muted">
                        {formatRub(p.price)}
                        {p.perTooth && " за зуб"}
                      </span>
                    </span>
                  </label>
                  {p.perTooth && n > 0 && (
                    <div className="ml-8 flex items-center gap-1 rounded-full border border-field sm:ml-0">
                      <button
                        type="button"
                        onClick={() => set(p.id, n - 1)}
                        disabled={n <= 1}
                        aria-label={`Меньше зубов: ${p.title}`}
                        className="grid size-9 place-items-center rounded-full hover:bg-teal-50 disabled:opacity-40"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <output aria-live="polite" className="w-6 text-center font-semibold tabular-nums">
                        {n}
                      </output>
                      <button
                        type="button"
                        onClick={() => set(p.id, n + 1)}
                        disabled={n >= MAX_TEETH}
                        aria-label={`Больше зубов: ${p.title}`}
                        className="grid size-9 place-items-center rounded-full hover:bg-teal-50 disabled:opacity-40"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* Sticks to the bottom on phones so the total stays in view while ticking items. */}
        <div className="sticky bottom-3 self-start rounded-3xl bg-teal-700 p-5 text-white shadow-card sm:p-7 lg:top-24 lg:bottom-auto">

          <p className="text-teal-50">Предварительно</p>
          <p aria-live="polite" className="mt-1 text-4xl font-extrabold tabular-nums">
            {formatRub(total)}
          </p>
          {total > 0 && (
            <p className="mt-2 text-teal-50">или от {formatRub(monthly(total))} в месяц в рассрочку на 12 месяцев</p>
          )}
          <button
            type="button"
            onClick={book}
            disabled={total === 0}
            className={`${button.secondary} mt-4 w-full border-white sm:mt-6`}
          >
            Записаться с этим расчётом
          </button>
          <p className="mt-4 hidden text-sm text-teal-50 sm:block">Консультация бесплатна. Стоимость 3D-снимка вычтем из лечения.</p>
        </div>
      </div>
    </Section>
  );
}
