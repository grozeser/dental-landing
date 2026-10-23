"use client";

import Image from "next/image";
import { ArrowLeft, Check, Quote, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import doctor1 from "@/assets/images/doctor-1.webp";
import { useBooking } from "@/components/BookingProvider";
import { button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { booking, quiz, services } from "@/data/content";
import { formatRub } from "@/lib/price";

const { questions } = quiz;

export function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const { book } = useBooking();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = answers.length; // 0..2 — a question, 3 — the result
  const done = step === questions.length;

  // Options are buttons (not radios): arrow keys in a radio group would auto-advance on every key press.
  // After each answer, move focus to the new heading so keyboard and screen reader users follow along.
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step]);
  const go = (next: number[]) => {
    moved.current = true;
    setAnswers(next);
  };

  const recommended = questions[0].options[answers[0] ?? 0].service ?? booking.unknownService;
  const service = services.find((s) => s.title === recommended);
  const notes = answers.map((a, i) => questions[i].options[a].note).filter((n): n is string => !!n);
  const summary = answers.map((a, i) => `${questions[i].q} ${questions[i].options[a].label}`).join("; ");

  return (
    <Section
      id="quiz"
      eyebrow="Подбор лечения"
      title="Не знаете, с чего начать? Ответьте на 3 вопроса"
      lead="Подскажем, какой врач нужен и сколько это примерно стоит. Займёт 30 секунд, телефон не спрашиваем."
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
          <div className="flex items-center gap-2" aria-hidden="true">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < step ? "bg-teal-600" : "bg-teal-100"}`}
              />
            ))}
          </div>

          {!done ? (
            <div key={step} className="animate-[fade-in_0.35s_ease] motion-reduce:animate-none">
              <p className="mt-6 text-sm font-semibold text-teal-700">
                Вопрос {step + 1} из {questions.length}
              </p>
              <h3 ref={headingRef} tabIndex={-1} id="quiz-question" className="mt-2 text-2xl font-bold outline-none">
                {questions[step].q}
              </h3>
              <div role="group" aria-labelledby="quiz-question" className="mt-6 grid gap-3 sm:grid-cols-2">
                {questions[step].options.map((o, i) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => go([...answers, i])}
                    className="rounded-2xl border border-field px-5 py-4 text-left font-medium transition-colors hover:border-teal-600 hover:bg-teal-50"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => go(answers.slice(0, -1))}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:underline"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" /> Назад
                </button>
              )}
            </div>
          ) : (
            <div className="animate-[fade-in_0.35s_ease] motion-reduce:animate-none">
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
                <Sparkles className="size-4" aria-hidden="true" /> Наша рекомендация
              </p>
              <h3 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-bold outline-none sm:text-3xl">
                {recommended}
                {service &&<span className="text-teal-700"> — от {formatRub(service.priceFrom)}</span>}
              </h3>
              <ul className="mt-6 space-y-3">
                {notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => book({ service: recommended, comment: `Ответы из подбора: ${summary}` })}
                  className={button.primary}
                >
                  Записаться на бесплатную консультацию
                </button>
                <button type="button" onClick={() => go([])} className={button.secondary}>
                  <RotateCcw className="size-4" aria-hidden="true" /> Пройти заново
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="relative hidden overflow-hidden rounded-3xl bg-teal-700 p-8 text-white lg:flex lg:flex-col">
          <div aria-hidden="true" className="absolute -right-16 -bottom-16 size-56 rounded-full bg-teal-500/40 blur-2xl" />
          <Quote className="size-10 text-teal-300" aria-hidden="true" />
          <blockquote className="mt-4 text-lg leading-relaxed text-pretty">{quiz.quote.text}</blockquote>
          <div className="mt-6 flex items-center gap-3">
            <Image src={doctor1} alt="" sizes="48px" className="size-12 rounded-full object-cover ring-2 ring-white/40" />
            <p className="text-sm text-teal-50">{quiz.quote.by}</p>
          </div>
          <ul className="relative mt-auto space-y-2.5 border-t border-white/15 pt-6">
            {quiz.perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Check className="size-5 text-teal-300" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
