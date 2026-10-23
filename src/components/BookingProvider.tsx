"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Estimate = { lines: string[]; total: number };
export type Prefill = { service?: string; comment?: string };

const BookingContext = createContext<{
  estimate: Estimate | null;
  setEstimate: (e: Estimate | null) => void;
  prefill: Prefill | null;
  /** Fills the booking form (service, comment) and scrolls to it. */
  book: (p: Prefill) => void;
} | null>(null);

// Carries choices from the calculator, quiz and service cards into the booking form further down the page.
export function BookingProvider({ children }: { children: ReactNode }) {
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const book = (p: Prefill) => {
    setPrefill({ ...p }); // a fresh object, so picking the same service twice still re-applies it
    document.getElementById("booking")?.scrollIntoView();
  };
  return <BookingContext value={{ estimate, setEstimate, prefill, book }}>{children}</BookingContext>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
