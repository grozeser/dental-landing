import { CheckCircle2, Star } from "lucide-react";
import heroSmall from "@/assets/images/hero-800.webp";
import heroImg from "@/assets/images/hero.webp";
import { button } from "@/components/ui/button";
import { NextSlot } from "@/components/ui/NextSlot";
import { hero, rating } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-to-b from-teal-50/70 to-white">
      {/* Soft mint glows behind the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-32 right-[-10%] size-[32rem] rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[26rem] rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      <div className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-teal-800 shadow-card ring-1 ring-teal-100">
            <span className="size-1.5 rounded-full bg-teal-600" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className={`${button.primary} shadow-lg shadow-teal-700/20`}>
              Записаться на консультацию
            </a>
            <a href="#quiz" className={button.secondary}>
              Подобрать лечение за 30 секунд
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-teal-600" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-2 rounded-[2.5rem] bg-teal-100/70" />
          {/* Plain <img>: static export has no image optimizer, so next/image can't build a srcset.
              The 800px file cuts the mobile LCP image from 141 KB to 31 KB. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImg.src}
            srcSet={`${heroSmall.src} 800w, ${heroImg.src} 1400w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={heroImg.width}
            height={heroImg.height}
            alt="Врач-стоматолог беседует с пациенткой в светлом кабинете"
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card"
          />

          <div className="absolute top-4 right-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card sm:top-6 sm:right-6">
            <div className="flex -space-x-2" aria-hidden="true">
              {rating.initials.map((n, i) => (
                <span
                  key={n}
                  className={`grid size-8 place-items-center rounded-full text-xs font-bold text-white ring-2 ring-white ${["bg-teal-600", "bg-teal-700", "bg-teal-800"][i]}`}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="leading-tight">
              <span className="flex items-center gap-1 font-extrabold">
                {rating.value}
                <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              </span>
              <span className="text-xs text-muted">{rating.count}</span>
            </p>
          </div>

          <p className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold shadow-card sm:bottom-6 sm:left-6">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-teal-600" />
            </span>
            <NextSlot />
          </p>
        </div>
      </div>
    </section>
  );
}
