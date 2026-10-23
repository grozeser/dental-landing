"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { button } from "@/components/ui/button";
import { clinic } from "@/data/content";

// Places where the bar would duplicate a CTA or cover one (the calculator total is sticky there too).
const HIDE_IN = ["#top", "#calculator", "#booking", "#contacts", "footer"];

/** Phone-only bottom bar with the main CTA, shown between the hero and the booking form. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setShow(visible.size === 0);
    });
    HIDE_IN.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full bg-white/95 p-2 shadow-card ring-1 ring-line backdrop-blur transition duration-300 motion-reduce:transition-none lg:hidden ${show ? "" : "pointer-events-none translate-y-[150%] opacity-0"}`}
    >
      <a href="#booking" className={`${button.primary} flex-1`}>
        Записаться на приём
      </a>
      <a
        href={clinic.phoneHref}
        aria-label={`Позвонить: ${clinic.phone}`}
        className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-800"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}
