import { z } from "zod";
import { isFullPhone } from "./phone";

// "sv-SE" formats as YYYY-MM-DD in the visitor's local time zone, same as <input type="date">.
export const todayISO = () => new Date().toLocaleDateString("sv-SE");

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Введите имя, хотя бы 2 буквы").max(60, "Имя слишком длинное, сократите до 60 символов"),
  phone: z.string().refine(isFullPhone, "Введите номер полностью: +7 и ещё 10 цифр"),
  service: z.string().min(1, "Выберите услугу или «Пока не знаю»"),
  date: z
    .string()
    .min(1, "Выберите дату визита")
    .refine((v) => v >= todayISO(), "Эта дата уже прошла, выберите сегодня или позже"),
  time: z.string().min(1, "Выберите удобное время"),
  comment: z.string().max(500, "Не больше 500 символов"),
  consent: z.boolean().refine(Boolean, "Без согласия мы не сможем вам перезвонить"),
});

export type BookingInput = z.input<typeof bookingSchema>;
