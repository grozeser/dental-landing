// zod/mini: same validation as classic zod, tree-shakable functions instead of methods — a much smaller bundle.
import * as z from "zod/mini";
import { isFullPhone } from "./phone";

// "sv-SE" formats as YYYY-MM-DD in the visitor's local time zone, same as <input type="date">.
export const todayISO = () => new Date().toLocaleDateString("sv-SE");

export const bookingSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Введите имя, хотя бы 2 буквы"),
      z.maxLength(60, "Имя слишком длинное, сократите до 60 символов"),
    ),
  phone: z.string().check(z.refine(isFullPhone, "Введите номер полностью: +7 и ещё 10 цифр")),
  service: z.string().check(z.minLength(1, "Выберите услугу или «Пока не знаю»")),
  date: z
    .string()
    .check(
      z.minLength(1, "Выберите дату визита"),
      z.refine((v) => v >= todayISO(), "Эта дата уже прошла, выберите сегодня или позже"),
    ),
  time: z.string().check(z.minLength(1, "Выберите удобное время")),
  comment: z.string().check(z.maxLength(500, "Не больше 500 символов")),
  consent: z.boolean().check(z.refine(Boolean, "Без согласия мы не сможем вам перезвонить")),
});

export type BookingInput = z.input<typeof bookingSchema>;
