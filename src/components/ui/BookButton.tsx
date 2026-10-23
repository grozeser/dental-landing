"use client";

import type { ReactNode } from "react";
import { useBooking, type Prefill } from "@/components/BookingProvider";

// A real link to #booking, so it still works before hydration; with JS it also prefills the form.
export function BookButton({ prefill, className, children }: { prefill: Prefill; className?: string; children: ReactNode }) {
  const { book } = useBooking();
  return (
    <a
      href="#booking"
      onClick={(e) => {
        e.preventDefault();
        book(prefill);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
