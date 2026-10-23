"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { cases } from "@/data/content";

// Demo only: "before" is the same photo with a CSS filter that yellows and dulls the teeth.
const BEFORE_FILTER = "sepia(0.6) saturate(1.25) brightness(0.96) contrast(0.92)";

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const c = cases[active];
  const frameRef = useRef<HTMLDivElement>(null);
  const hint = useRef(0);

  // First time the photo is in view, the handle wiggles once to show it can be dragged.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1600, 1);
          setPos(Math.round(50 + 22 * Math.sin(t * 2 * Math.PI) * (1 - t))); // damped swing back to 50
          if (t < 1) hint.current = requestAnimationFrame(tick);
        };
        hint.current = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(hint.current);
    };
  }, []);
  const stopHint = () => cancelAnimationFrame(hint.current);

  return (
    <Section
      id="cases"
      eyebrow="До и после"
      title="Результаты, которые видно сразу"
      lead="Потяните ползунок, чтобы сравнить состояние зубов до лечения и после."
      className="bg-surface"
    >
      <div
        role="tablist"
        aria-label="Примеры работ"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {cases.map((item, i) => (
          <button
            key={item.title}
            id={`case-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="case-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => {
              stopHint();
              setActive(i);
              setPos(50);
            }}
            onKeyDown={(e) => {
              const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
              if (!step) return;
              const next = (i + step + cases.length) % cases.length;
              setActive(next);
              setPos(50);
              document.getElementById(`case-tab-${next}`)?.focus();
            }}
            className="shrink-0 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors aria-selected:border-teal-700 aria-selected:bg-teal-700 aria-selected:text-white"
          >
            {item.title}
          </button>
        ))}
      </div>

      <div id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${active}`} className="mt-6">
        <div ref={frameRef} className="relative aspect-[3/2] overflow-hidden rounded-3xl select-none lg:aspect-video">
          <Image
            src={c.image}
            alt={`${c.title}: результат лечения`}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
          <Image
            src={c.image}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="absolute inset-0 size-full object-cover"
            style={{ filter: BEFORE_FILTER, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />
          <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-sm font-semibold text-white">До</span>
          <span className="absolute top-4 right-4 rounded-full bg-teal-700 px-3 py-1 text-sm font-semibold text-white">
            После
          </span>

          {/* Native range input on top: mouse, touch, keyboard and screen readers work out of the box. */}
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onPointerDown={stopHint}
            onKeyDown={stopHint}
            onChange={(e) => {
              stopHint();
              setPos(Number(e.target.value));
            }}
            aria-label="Сравнение до и после"
            aria-valuetext={`Показано ${pos}% фото «до»`}
            className="peer absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
          />
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white peer-focus-visible:[&>span]:ring-4"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-full bg-white text-teal-700 shadow-card ring-teal-400">
              <ChevronsLeftRight className="size-5" aria-hidden="true" />
            </span>
          </div>
        </div>
        <p className="mt-4 text-muted">{c.details}</p>
      </div>
    </Section>
  );
}
