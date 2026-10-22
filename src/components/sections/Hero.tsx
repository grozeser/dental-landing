import { CheckCircle2 } from "lucide-react";
import heroSmall from "@/assets/images/hero-800.webp";
import heroImg from "@/assets/images/hero.webp";
import { button } from "@/components/ui/button";
import { hero } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 to-white">
      <div className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <p className="text-sm font-semibold tracking-wider text-teal-700 uppercase">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className={button.primary}>
              Записаться на консультацию
            </a>
            <a href="#calculator" className={button.secondary}>
              Рассчитать стоимость
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
          <p className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold shadow-card sm:bottom-6 sm:left-6">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-teal-600" />
            </span>
            {hero.nextSlot}
          </p>
        </div>
      </div>
    </section>
  );
}
