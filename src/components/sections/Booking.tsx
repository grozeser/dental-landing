"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, X } from "lucide-react";
import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useBooking } from "@/components/BookingProvider";
import { button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { booking, clinic, services } from "@/data/content";
import { bookingSchema, todayISO, type BookingInput } from "@/lib/booking-schema";
import { maskPhone } from "@/lib/phone";
import { formatRub } from "@/lib/price";

const field =
  "mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 text-base outline-none transition-colors focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15 aria-invalid:border-red-600";

const FIELD_ORDER = ["name", "phone", "service", "date", "time", "comment", "consent"] as const;

// The site is static, so "today" must come from the visitor's clock, not the build machine.
const noop = () => () => {};
const useToday = () => useSyncExternalStore(noop, todayISO, () => undefined);

export function Booking() {
  const { estimate, setEstimate } = useBooking();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const today = useToday();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    shouldFocusError: false, // RHF's own order depends on registration; focus in visual order instead

    defaultValues: { name: "", phone: "", service: "", date: "", time: "", comment: "", consent: false },
  });

  const onSubmit = async (data: BookingInput) => {
    // shortcut: no backend on GitHub Pages, so sending is simulated; plug in Formspree or a Telegram bot here.
    await new Promise((r) => setTimeout(r, 1000));
    setSentTo(data.phone);
    setEstimate(null);
    reset();
  };

  return (
    <Section id="booking" eyebrow="Запись" title={booking.title} lead={booking.lead}>
      {/* Live region exists before submit, so screen readers announce the success message. */}
      <div aria-live="polite">
        {sentTo && (
          <div className="max-w-2xl rounded-3xl bg-teal-50 p-8 sm:p-10">
            <CircleCheckBig className="size-12 text-teal-700" aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-bold">Заявка принята</h3>
            <p className="mt-2 text-muted">
              Администратор позвонит на номер {sentTo} в течение 15 минут в рабочее время. Удобнее самим?
              Звоните: <a href={clinic.phoneHref} className="font-semibold text-teal-800 underline">{clinic.phone}</a>
            </p>
            <button type="button" onClick={() => setSentTo(null)} className={`${button.secondary} mt-6`}>
              Отправить ещё одну заявку
            </button>
          </div>
        )}
      </div>
      {!sentTo && (
          <form
            onSubmit={handleSubmit(onSubmit, (errs) => {
              const first = FIELD_ORDER.find((k) => errs[k]);
              if (first) setFocus(first);
            })}
            noValidate className="grid max-w-3xl gap-5 sm:grid-cols-2">
            {estimate && (
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-teal-50 p-5 sm:col-span-2">
                <p>
                  <span className="block font-semibold">Ваш расчёт: {formatRub(estimate.total)}</span>
                  <span className="text-sm text-muted">{estimate.lines.join(", ")}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setEstimate(null)}
                  aria-label="Убрать расчёт из заявки"
                  className="rounded-full p-1.5 hover:bg-white"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}

            <Field label="Имя" error={errors.name?.message}>
              {(p) => <input {...p} {...register("name")} autoComplete="given-name" placeholder="Как к вам обращаться" className={field} />}
            </Field>

            <Field label="Телефон" error={errors.phone?.message}>
              {(p) => {
                const phone = register("phone");
                return (
                  <input
                    {...p}
                    {...phone}
                    onChange={(e) => {
                      e.target.value = maskPhone(e.target.value);
                      phone.onChange(e);
                    }}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    className={field}
                  />
                );
              }}
            </Field>

            <Field label="Услуга" error={errors.service?.message} wide>
              {(p) => (
                <select {...p} {...register("service")} className={field}>
                  <option value="">Выберите услугу</option>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>{booking.unknownService}</option>
                </select>
              )}
            </Field>

            <Field label="Дата" error={errors.date?.message}>
              {(p) => <input {...p} {...register("date")} type="date" min={today} className={field} />}
            </Field>

            <Field label="Время" error={errors.time?.message}>
              {(p) => (
                <select {...p} {...register("time")} className={field}>
                  <option value="">Когда удобно</option>
                  {booking.timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              )}
            </Field>

            <Field label="Комментарий (необязательно)" error={errors.comment?.message} wide>
              {(p) => (
                <textarea
                  {...p}
                  {...register("comment")}
                  rows={3}
                  placeholder="Например: болит зуб справа внизу"
                  className={`${field} resize-y`}
                />
              )}
            </Field>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  {...register("consent")}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-teal-700"
                />
                <span>Согласен на обработку персональных данных для записи на приём</span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-1.5 text-sm text-red-700">
                  {errors.consent.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" disabled={isSubmitting} className={button.primary}>
                {isSubmitting ? "Отправляем…" : "Записаться"}
              </button>
              <p className="text-sm text-muted">Перезвоним в течение 15 минут в рабочее время.</p>
            </div>
          </form>
      )}
    </Section>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  wide?: boolean;
  children: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

function Field({ label, error, wide, children }: FieldProps) {
  const id = useId();
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-error` : undefined })}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
