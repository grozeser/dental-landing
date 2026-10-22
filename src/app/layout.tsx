import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Белая Мята — стоматология в Москве",
  description: "Лечение, имплантация, брекеты и отбеливание зубов без боли. Запишитесь онлайн.",
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
      </body>
    </html>
  );
}
