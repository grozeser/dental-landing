"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { clinic, nav } from "@/data/content";

const navIds = new Set(nav.map((n) => n.href));

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scrollspy: the section crossing a thin band in the middle of the screen is "current".
  // Sections that aren't in the menu (FAQ, quiz…) clear the highlight instead of keeping a stale one.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const href = `#${e.target.id}`;
          setActive(navIds.has(href) ? href : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-shadow ${scrolled ? "border-transparent shadow-card" : "border-line"}`}
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <a href="#top" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex gap-7 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className="relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-teal-600 after:transition-transform hover:text-teal-700 hover:after:scale-x-100 aria-[current=true]:text-teal-700 aria-[current=true]:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={clinic.phoneHref} className="text-sm font-semibold whitespace-nowrap hover:text-teal-700">
            {clinic.phone}
          </a>
          <a href="#booking" className={button.primary}>
            Записаться
          </a>
        </div>

        <a
          href={clinic.phoneHref}
          aria-label={`Позвонить: ${clinic.phone}`}
          className="ml-auto grid size-11 place-items-center rounded-full bg-teal-50 text-teal-800 lg:hidden"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Мобильное меню" className="shell py-4">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={close} className="block py-3 text-lg font-medium">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 pb-2">
              <a href={clinic.phoneHref} className={button.secondary}>
                <Phone className="size-4" aria-hidden="true" /> {clinic.phone}
              </a>
              <a href="#booking" onClick={close} className={button.primary}>
                Записаться на приём
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
