"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Estimate = { lines: string[]; total: number };

const BookingContext = createContext<{
  estimate: Estimate | null;
  setEstimate: (e: Estimate | null) => void;
} | null>(null);

// Carries the calculator result into the booking form further down the page.
export function BookingProvider({ children }: { children: ReactNode }) {
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  return <BookingContext value={{ estimate, setEstimate }}>{children}</BookingContext>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
