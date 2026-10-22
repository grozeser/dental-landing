import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { clinic, priceList } from "@/data/content";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const SITE_URL = "https://grozeser.github.io/dental-landing";
const title = `${clinic.name} — стоматология в центре Москвы`;
const description =
  "Лечение кариеса, имплантация, брекеты и отбеливание без боли. Бесплатная консультация, цена фиксируется в договоре. Запишитесь онлайн.";

export const metadata: Metadata = {
  // Origin only: Next already prefixes basePath to opengraph-image, a full SITE_URL would double it.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title,
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: { type: "website", locale: "ru_RU", siteName: clinic.name, title, description, url: `${SITE_URL}/` },
  twitter: { card: "summary_large_image" },
  // The clinic is fictional: keep it out of search so nobody mistakes it for a real dentist.
  // Link previews (Open Graph) still work. Remove for a real client.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0f766e" };

// schema.org data for rich results; the clinic is fictional, values come from content.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: clinic.phoneHref.replace("tel:", ""),
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Примерная, 12",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  openingHours: ["Mo-Fr 09:00-21:00", "Sa-Su 10:00-18:00"],
  priceRange: `${Math.min(...priceList.map((p) => p.price))}–${Math.max(...priceList.map((p) => p.price))} RUB`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-teal-700 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Перейти к содержимому
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
