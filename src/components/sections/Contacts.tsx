import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { clinic } from "@/data/content";

import { button } from "@/components/ui/button";

// The address is fictional, so links just point at central Moscow.
// A drawn map instead of an iframe: no third-party scripts, cookies or promo banners.
const COORDS = { lat: 55.7637, lon: 37.6056 };
const YANDEX_URL = `https://yandex.ru/maps/?pt=${COORDS.lon},${COORDS.lat}&z=16&l=map`;
const TWOGIS_URL = `https://2gis.ru/moscow/geo/${COORDS.lon},${COORDS.lat}`;

function MapCard() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-3xl border border-line bg-teal-50/60">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 size-full">
        <rect x="380" y="-20" width="260" height="170" rx="24" fill="#ccfbf1" />
        <g fill="#fff">
          <rect x="20" y="20" width="150" height="110" rx="14" />
          <rect x="200" y="20" width="150" height="110" rx="14" />
          <rect x="20" y="170" width="110" height="120" rx="14" />
          <rect x="160" y="170" width="190" height="120" rx="14" />
          <rect x="380" y="180" width="200" height="110" rx="14" />
          <rect x="20" y="320" width="230" height="100" rx="14" />
          <rect x="280" y="320" width="300" height="100" rx="14" />
        </g>
        <path d="M-10 152 H620 M365 -10 V420 M140 160 L140 420" stroke="#d6e4e3" strokeWidth="14" fill="none" />
        <path d="M-10 305 C150 290 300 320 620 300" stroke="#d6e4e3" strokeWidth="10" fill="none" />
      </svg>
      <div className="absolute top-[38%] left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-full bg-teal-700 px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-card">
          {clinic.name}
        </span>
        <span className="size-3 -translate-y-1.5 rotate-45 bg-teal-700" />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <a href={YANDEX_URL} target="_blank" rel="noopener noreferrer" className={button.secondary}>
          Открыть в Яндекс Картах<span className="sr-only"> (в новой вкладке)</span>
        </a>
        <a href={TWOGIS_URL} target="_blank" rel="noopener noreferrer" className={button.secondary}>
          Открыть в 2ГИС<span className="sr-only"> (в новой вкладке)</span>
        </a>
      </div>
    </div>
  );
}

export function Contacts() {
  return (
    <Section id="contacts" eyebrow="Контакты" title="Ждём вас в центре Москвы">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        <ul className="space-y-6">
          <li className="flex gap-4">
            <MapPin className="mt-0.5 size-6 shrink-0 text-teal-700" aria-hidden="true" />
            <p>
              <span className="block font-semibold">{clinic.address}</span>
              <span className="text-muted">{clinic.metro}</span>
            </p>
          </li>
          <li className="flex gap-4">
            <Phone className="mt-0.5 size-6 shrink-0 text-teal-700" aria-hidden="true" />
            <a href={clinic.phoneHref} className="font-semibold hover:text-teal-700">
              {clinic.phone}
            </a>
          </li>
          <li className="flex gap-4">
            <Mail className="mt-0.5 size-6 shrink-0 text-teal-700" aria-hidden="true" />
            <a href={`mailto:${clinic.email}`} className="hover:text-teal-700">
              {clinic.email}
            </a>
          </li>
          <li className="flex gap-4">
            <Clock className="mt-0.5 size-6 shrink-0 text-teal-700" aria-hidden="true" />
            <p>
              {clinic.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: <span className="font-semibold">{h.time}</span>
                </span>
              ))}
            </p>
          </li>
        </ul>
        <MapCard />
      </div>
    </Section>
  );
}
