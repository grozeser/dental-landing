import { describe, expect, it } from "vitest";
import { bookingSchema } from "./booking-schema";
import { maskPhone } from "./phone";
import { pluralYears } from "./plural";
import { calcTotal, monthly } from "./price";

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
