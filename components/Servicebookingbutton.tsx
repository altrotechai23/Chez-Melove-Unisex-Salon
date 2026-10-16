"use client";

import type { ReactNode } from "react";
import { useGlobalBooking } from "@/components/providers/BookingDialogProvider";

interface ServiceBookingButtonProps {
  className: string;
  children: ReactNode;
}

export default function ServiceBookingButton({
  className,
  children,
}: ServiceBookingButtonProps) {
  const { openBooking } = useGlobalBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking()}
      className={className}
    >
      {children}
    </button>
  );
}
