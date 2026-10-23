"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const btn =
  "grid size-11 place-items-center rounded-full border border-field bg-white text-teal-800 transition-colors hover:bg-teal-50";

/** Prev/next buttons for a horizontal scroll-snap list; swipe and keyboard scrolling keep working without them. */
export function ScrollButtons({ target, label }: { target: string; label: string }) {
  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: smooth ? "smooth" : "auto" });
  };
  return (
    <div className="hidden gap-2 sm:flex">
      <button type="button" aria-controls={target} aria-label={`Предыдущие ${label}`} onClick={() => scroll(-1)} className={btn}>
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button type="button" aria-controls={target} aria-label={`Следующие ${label}`} onClick={() => scroll(1)} className={btn}>
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
