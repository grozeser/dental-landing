import { describe, expect, it } from "vitest";
import { bookingSchema } from "./booking-schema";
import { maskPhone } from "./phone";
import { pluralYears } from "./plural";
import { calcTotal, monthly } from "./price";
import { formatSlot, moscowNow, nextSlot } from "./slots";

describe("nextSlot", () => {
  const MON = 1,
    FRI = 5,
    SAT = 6,
    SUN = 0;
  it.each([
    ["Fri 11:58 → today 13:00", FRI, 11 * 60 + 58, "сегодня, 13:00"],
    ["Mon 7:00, before opening → today 9:00", MON, 7 * 60, "сегодня, 9:00"],
    ["Mon 19:00 → today 20:00, the last slot", MON, 19 * 60, "сегодня, 20:00"],
    ["Mon 19:01, too late → tomorrow 9:00", MON, 19 * 60 + 1, "завтра, 9:00"],
    ["Fri 22:00 → Saturday opens at 10:00", FRI, 22 * 60, "завтра, 10:00"],
    ["Sat 16:30 → Sunday 10:00", SAT, 16 * 60 + 30, "завтра, 10:00"],
    ["Sun 16:55 → Monday 9:00", SUN, 16 * 60 + 55, "завтра, 9:00"],
  ])("%s", (_, day, minutes, expected) => expect(formatSlot(nextSlot(day, minutes))).toBe(expected));

  it("reads Moscow time regardless of the machine time zone", () => {
    // 08:58 UTC on Friday 23 Oct 2026 is 11:58 in Moscow (UTC+3).
    expect(moscowNow(new Date("2026-10-23T08:58:00Z"))).toEqual({ day: 5, minutes: 11 * 60 + 58 });
    // 22:30 UTC on Saturday is already Sunday 01:30 in Moscow.
    expect(moscowNow(new Date("2026-10-24T22:30:00Z"))).toEqual({ day: 0, minutes: 90 });
  });
});

describe("maskPhone", () => {
  it.each([
    ["9", "+7 (9"],
    ["9991", "+7 (999) 1"],
    ["9991234567", "+7 (999) 123-45-67"],
    ["89991234567", "+7 (999) 123-45-67"],
    ["+7 999 123 45 67", "+7 (999) 123-45-67"],
    ["8 (999) 123-45-67", "+7 (999) 123-45-67"],
    ["8121234567", "+7 (812) 123-45-67"],
    ["+7 (999) 123-45-678", "+7 (999) 123-45-67"],
    ["8", ""],
    ["abc", ""],
  ])("%s → %s", (raw, expected) => expect(maskPhone(raw)).toBe(expected));

  it("Backspace after a separator removes a digit", () => {
    expect(maskPhone("+7 (999) ")).toBe("+7 (999");
    expect(maskPhone("+7 (999) 123-")).toBe("+7 (999) 123");
    expect(maskPhone("+7 (")).toBe("");
  });
});

describe("calcTotal", () => {
  const list = [
    { id: "a", price: 1000 },
    { id: "b", price: 2500 },
  ];
  it("sums price × quantity of selected items", () => expect(calcTotal(list, { a: 1, b: 2 })).toBe(6000));
  it("ignores unselected, unknown and negative entries", () =>
    expect(calcTotal(list, { a: 0, x: 5, b: -1 })).toBe(0));
  it("rounds the installment up", () => expect(monthly(1000)).toBe(84));
});

describe("pluralYears", () => {
  it.each([
    [1, "год"],
    [2, "года"],
    [5, "лет"],
    [11, "лет"],
    [12, "лет"],
    [21, "год"],
    [22, "года"],
  ])("%i %s", (n, word) => expect(pluralYears(n)).toBe(word));
});

describe("bookingSchema", () => {
  const valid = {
    name: "Анна",
    phone: "+7 (999) 123-45-67",
    service: "Отбеливание",
    date: "2999-01-01",
    time: "Утро, 9:00–12:00",
    comment: "",
    consent: true,
  };

  it("accepts a complete form", () => expect(bookingSchema.safeParse(valid).success).toBe(true));

  it.each([
    ["name", " А "],
    ["phone", "+7 (999) 123-45"],
    ["service", ""],
    ["date", "2000-01-01"],
    ["time", ""],
    ["consent", false],
  ])("rejects bad %s", (field, value) => {
    const r = bookingSchema.safeParse({ ...valid, [field]: value });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path[0]).toBe(field);
  });
});
