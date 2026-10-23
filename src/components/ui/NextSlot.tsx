"use client";

import { useSyncExternalStore } from "react";
import { formatSlot, moscowNow, nextSlot } from "@/lib/slots";

// Re-read the clock every minute; the string snapshot only re-renders when the text changes.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
};
const read = () => {
  const { day, minutes } = moscowNow();
  return `Ближайшая запись: ${formatSlot(nextSlot(day, minutes))}`;
};

/** Computed from the visitor's clock in Moscow time; the static HTML shows a neutral fallback. */
export function NextSlot() {
  return <>{useSyncExternalStore(subscribe, read, () => "Есть свободные окна на ближайшие дни")}</>;
}
