// Clinic hours in minutes from midnight, Moscow time. Day: 0 = Sunday … 6 = Saturday.
const WEEKDAY = [9 * 60, 21 * 60];
const WEEKEND = [10 * 60, 18 * 60];
const LEAD = 60; // the earliest slot is at least an hour from now
const STEP = 30; // slots start on :00 and :30
const LAST = 60; // the last appointment starts an hour before closing

const hoursFor = (day: number) => (day === 0 || day === 6 ? WEEKEND : WEEKDAY);

export function nextSlot(day: number, minutes: number) {
  const [open, close] = hoursFor(day);
  const earliest = Math.max(open, Math.ceil((minutes + LEAD) / STEP) * STEP);
  if (earliest <= close - LAST) return { today: true, minutes: earliest };
  return { today: false, minutes: hoursFor((day + 1) % 7)[0] };
}

export const formatSlot = ({ today, minutes }: ReturnType<typeof nextSlot>) =>
  `${today ? "сегодня" : "завтра"}, ${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** The visitor's clock converted to Moscow time, wherever they are. */
export function moscowNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Moscow",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return { day: DAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}
