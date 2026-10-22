"use client";

import { useEffect, useRef, useState } from "react";

const fmt = new Intl.NumberFormat("ru-RU");

// Renders the final value on the server (SEO, no-JS), counts up once when scrolled into view.
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1400, 1);
        setShown(Math.round(value * (1 - (1 - t) ** 3))); // ease-out cubic
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    // Screen readers get the final number, not every animation frame.
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {fmt.format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt.format(value)}
        {suffix}
      </span>
    </span>
  );
}
