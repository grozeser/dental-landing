import { Logo } from "@/components/ui/Logo";
import { clinic, nav } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-ink text-sm text-white/70">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p>{clinic.address}</p>
        </div>

        <nav aria-label="Меню в подвале">
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2.5">
          <a href={clinic.phoneHref} className="block text-base font-semibold text-white hover:text-teal-300">
            {clinic.phone}
          </a>
          <a href={`mailto:${clinic.email}`} className="block hover:text-white">
            {clinic.email}
          </a>
          {clinic.hours.map((h) => (
            <p key={h.days}>
              {h.days}: {h.time}
            </p>
          ))}
        </div>

        <div className="space-y-2.5">
          <p>{clinic.legal}</p>
          <p>{clinic.license}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell space-y-3 py-6">
          <p className="text-base font-semibold tracking-wide text-white/90 uppercase">
            Имеются противопоказания, необходима консультация специалиста
          </p>
          <p>
            Демо-проект для портфолио. Клиника, врачи, отзывы и контакты вымышлены. ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
