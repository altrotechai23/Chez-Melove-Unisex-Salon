"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { SERVICES_DATA } from "@/data/services";

interface BookingForm {
  treatmentId: string;
  serviceOption: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialNotes: string;
}

type BookingChannel = "email" | "whatsapp";

const TIME_SLOTS = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
] as const;

const INITIAL_FORM_DATA: BookingForm = {
  treatmentId: "",
  serviceOption: "",
  date: "",
  timeSlot: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  specialNotes: "",
};

function getLocalDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

interface BookingContextType {
  openBooking: (treatmentId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

export const useGlobalBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useGlobalBooking must be used inside BookingDialogProvider.",
    );
  }

  return context;
};

export default function BookingDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedVia, setCompletedVia] = useState<BookingChannel | null>(
    null,
  );
  const [formData, setFormData] =
    useState<BookingForm>(INITIAL_FORM_DATA);
  const [validationMessage, setValidationMessage] = useState("");

  const sheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const selectedTreatment = SERVICES_DATA.find(
    (service) => service.id === formData.treatmentId,
  );

  const treatmentOptions = selectedTreatment?.benefits ?? [];

  const openBooking = (treatmentId?: string) => {
    if (isSubmitting) return;

    timelineRef.current?.kill();

    const matchingService = SERVICES_DATA.find(
      (service) => service.id === treatmentId,
    );

    setFormData({
      ...INITIAL_FORM_DATA,
      treatmentId: matchingService?.id ?? "",
    });

    // Keep the service step visible so customers can select an option.
    setStep(1);
    setIsSubmitted(false);
    setCompletedVia(null);
    setValidationMessage("");
    setIsOpen(true);
  };

  const closeBooking = () => {
    if (isSubmitting) return;

    const sheet = sheetRef.current;
    const overlay = overlayRef.current;

    if (!sheet || !overlay) {
      setIsOpen(false);
      return;
    }

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
      },
    });

    timelineRef.current
      .to(sheet, {
        yPercent: 100,
        duration: 0.45,
        ease: "power3.inOut",
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.3",
      );
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const sheet = sheetRef.current;
    const overlay = overlayRef.current;

    if (sheet && overlay) {
      timelineRef.current?.kill();

      gsap.set(overlay, { opacity: 0 });
      gsap.set(sheet, { yPercent: 100 });

      timelineRef.current = gsap.timeline();

      timelineRef.current
        .to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          sheet,
          {
            yPercent: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.25",
        );
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      const updated = { ...previous, [name]: value };

      if (name === "treatmentId") {
        updated.serviceOption = "";
      }

      return updated;
    });

    setValidationMessage("");
  };

  const handleNextStep = () => {
    if (isSubmitting) return;

    if (step === 1) {
      if (!selectedTreatment) {
        setValidationMessage("Please select a valid service.");
        return;
      }

      if (
        treatmentOptions.length > 0 &&
        !treatmentOptions.includes(formData.serviceOption)
      ) {
        setValidationMessage(
          "Please choose an option for your selected service.",
        );
        return;
      }
    }

    if (step === 2) {
      if (!formData.date || !formData.timeSlot) {
        setValidationMessage(
          "Please select your preferred date and time.",
        );
        return;
      }

      if (formData.date < getLocalDateString()) {
        setValidationMessage(
          "Please choose today or a future date.",
        );
        return;
      }
    }

    setValidationMessage("");
    setStep((previous) => Math.min(previous + 1, 3));
  };

  const handlePrevStep = () => {
    if (isSubmitting) return;

    setValidationMessage("");
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const handleSubmit = async (channel: BookingChannel) => {
    if (step !== 3 || isSubmitting) return;

    if (!selectedTreatment) {
      setStep(1);
      setValidationMessage("Please select a valid service.");
      return;
    }

    if (
      treatmentOptions.length > 0 &&
      !treatmentOptions.includes(formData.serviceOption)
    ) {
      setStep(1);
      setValidationMessage(
        "Please choose a valid option for your selected service.",
      );
      return;
    }

    if (!formData.date || !formData.timeSlot) {
      setStep(2);
      setValidationMessage("Please select your preferred date and time.");
      return;
    }

    if (
      formData.clientName.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail.trim()) ||
      formData.clientPhone.trim().length < 7
    ) {
      setValidationMessage(
        "Please provide a valid name, email address, and phone number.",
      );
      return;
    }

    if (formData.date < getLocalDateString()) {
      setStep(2);
      setValidationMessage(
        "Please choose today or a future date.",
      );
      return;
    }

    setValidationMessage("");
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        clientPhone: formData.clientPhone.trim(),
        specialNotes: formData.specialNotes.trim(),
      };

      if (channel === "whatsapp") {
        const phoneNumber =
          process.env.NEXT_PUBLIC_SALON_WHATSAPP_NUMBER?.replace(
            /\D/g,
            "",
          );

        if (!phoneNumber) {
          setValidationMessage(
            "WhatsApp booking is not configured yet. Please choose email instead.",
          );
          return;
        }

        const message = [
          "Hello Chezmelove! I'd like to request a salon appointment.",
          "",
          `Service: ${selectedTreatment.title}`,
          `Starting price: ${selectedTreatment.price}`,
          ...(formData.serviceOption
            ? [`Selected option: ${formData.serviceOption}`]
            : []),
          `Preferred date: ${formData.date}`,
          `Preferred time: ${formData.timeSlot}`,
          "",
          "CUSTOMER DETAILS",
          `Name: ${payload.clientName}`,
          `Email: ${payload.clientEmail}`,
          `Phone: ${payload.clientPhone}`,
          "",
          `Notes: ${payload.specialNotes || "None"}`,
          "",
          "Please confirm whether this date and time are available. I understand this is a request, not a confirmed appointment.",
        ].join("\n");

        const whatsappWindow = window.open(
          `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
          "_blank",
        );

        if (!whatsappWindow) {
          setValidationMessage(
            "Your browser blocked the WhatsApp window. Please allow pop-ups and try again.",
          );
          return;
        }

        whatsappWindow.opener = null;
        setCompletedVia("whatsapp");
        setIsSubmitted(true);

        confetti({
          particleCount: 100,
          spread: 65,
          origin: { y: 0.7 },
        });

        return;
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error ??
            "We couldn't send your booking request. Please try again.",
        );
      }

      setCompletedVia("email");
      setIsSubmitted(true);

      confetti({
        particleCount: 100,
        spread: 65,
        origin: { y: 0.7 },
      });
    } catch (error) {
      setValidationMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or use WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="global-booking-title"
        >
          <div
            ref={overlayRef}
            onClick={closeBooking}
            className="pointer-events-auto absolute inset-0 bg-neutral-950/60 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          <div
            ref={sheetRef}
            className="relative z-10 flex h-[95dvh] max-h-[100dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-3xl border-t border-neutral-200/80 bg-white p-6 pb-[calc(24px+env(safe-area-inset-bottom))] text-neutral-900 shadow-2xl sm:max-h-[95dvh] sm:rounded-t-[2.5rem] will-change-transform"
          >
            <div className="mx-auto mb-6 h-1.5 w-12 shrink-0 rounded-full bg-neutral-200" />

            <button
              type="button"
              onClick={closeBooking}
              disabled={isSubmitting}
              className="absolute right-6 top-6 p-2 text-neutral-400 transition-colors hover:text-neutral-950 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close booking drawer"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>

            <div className="mb-3 shrink-0 border-b border-neutral-100 pb-2 pr-8">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.35em] text-neutral-400">
                Reservation Portal
              </span>

              <h2
                id="global-booking-title"
                className="mb-4 text-xl font-light tracking-tight text-neutral-900 sm:text-2xl"
              >
                Secure Your Session
              </h2>

              {!isSubmitted && (
                <div
                  className="flex flex-wrap items-center gap-2 text-[9px] font-mono text-neutral-400 sm:gap-3"
                  aria-label={`Step ${step} of 3`}
                >
                  <span className={step === 1 ? "font-bold text-neutral-950" : ""}>
                    01 Service
                  </span>
                  <span aria-hidden="true">→</span>
                  <span className={step === 2 ? "font-bold text-neutral-950" : ""}>
                    02 Timeline
                  </span>
                  <span aria-hidden="true">→</span>
                  <span className={step === 3 ? "font-bold text-neutral-950" : ""}>
                    03 Details
                  </span>
                </div>
              )}
            </div>

            {validationMessage && (
              <div
                role="alert"
                className="mb-4 shrink-0 bg-neutral-950 p-3 text-center text-[11px] font-medium leading-relaxed text-white"
              >
                {validationMessage}
              </div>
            )}

            <div className="flex min-h-0 flex-1 flex-col">
              {isSubmitted ? (
                <div
                  className="my-auto py-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <span aria-hidden="true">✓</span>
                  </div>

                  <h3 className="mb-2 text-lg font-light tracking-tight">
                    {completedVia === "whatsapp"
                      ? "WhatsApp Message Prepared"
                      : "Request Sent Successfully"}
                  </h3>

                  <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-neutral-500">
                    Thank you,{" "}
                    <strong className="font-normal text-neutral-800">
                      {formData.clientName}
                    </strong>
                    . Your request is for{" "}
                    <strong className="font-normal text-neutral-800">
                      {selectedTreatment?.title ?? "your selected service"}
                    </strong>
                    {formData.serviceOption
                      ? ` — ${formData.serviceOption}`
                      : ""}{" "}
                    on {formData.date} at {formData.timeSlot}.
                  </p>

                  <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-500">
                    {completedVia === "whatsapp"
                      ? "Please press Send in WhatsApp to deliver your message to the salon. Your appointment is not confirmed until the salon responds."
                      : "Your booking request has been emailed to the salon. Your appointment is not confirmed until the salon contacts you."}
                  </p>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="mt-6 bg-neutral-950 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                  >
                    Return to Site
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSubmit("email");
                  }}
                  className="flex flex-col gap-5"
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="global-treatmentId"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Select Service
                        </label>

                        <select
                          id="global-treatmentId"
                          name="treatmentId"
                          value={formData.treatmentId}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
                        >
                          <option value="">Choose a service</option>
                          {SERVICES_DATA.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title} — {service.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedTreatment && (
                        <div className="border border-neutral-200 bg-neutral-50 p-4">
                          <p className="text-sm font-medium">
                            {selectedTreatment.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                            {selectedTreatment.description}
                          </p>
                          <p className="mt-2 text-xs font-semibold">
                            {selectedTreatment.price}
                          </p>
                        </div>
                      )}

                      {selectedTreatment && treatmentOptions.length > 0 && (
                        <div className="space-y-2">
                          <label
                            htmlFor="global-serviceOption"
                            className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                          >
                            Select Service Option
                          </label>

                          <select
                            id="global-serviceOption"
                            name="serviceOption"
                            value={formData.serviceOption}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                          >
                            <option value="">Choose an option</option>
                            {treatmentOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="global-date"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Preferred Date
                        </label>

                        <input
                          id="global-date"
                          name="date"
                          type="date"
                          min={getLocalDateString()}
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full min-w-0 border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="global-timeSlot"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Preferred Time
                        </label>

                        <select
                          id="global-timeSlot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                        >
                          <option value="">Choose a time</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>

                      <p className="text-[11px] leading-relaxed text-neutral-400 sm:col-span-2">
                        These are preferred times, not live availability.
                        The salon must confirm your appointment.
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="global-clientName"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Full Name
                        </label>
                        <input
                          id="global-clientName"
                          name="clientName"
                          type="text"
                          autoComplete="name"
                          minLength={2}
                          maxLength={120}
                          value={formData.clientName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="global-clientPhone"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Contact Phone
                        </label>
                        <input
                          id="global-clientPhone"
                          name="clientPhone"
                          type="tel"
                          autoComplete="tel"
                          minLength={7}
                          maxLength={30}
                          value={formData.clientPhone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="global-clientEmail"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Email Address
                        </label>
                        <input
                          id="global-clientEmail"
                          name="clientEmail"
                          type="email"
                          autoComplete="email"
                          maxLength={254}
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="global-specialNotes"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Special Requests (Optional)
                        </label>
                        <textarea
                          id="global-specialNotes"
                          name="specialNotes"
                          maxLength={1500}
                          value={formData.specialNotes}
                          onChange={handleInputChange}
                          placeholder="Any preferences or additional information?"
                          rows={3}
                          className="w-full resize-y border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="border-t border-neutral-100 pt-4">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                          Send Your Request
                        </p>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => void handleSubmit("whatsapp")}
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 border border-neutral-300 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-900 transition-colors hover:border-neutral-950 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isSubmitting
                              ? "Please wait..."
                              : "Continue with WhatsApp"}
                          </button>

                          <button
                            type="button"
                            onClick={() => void handleSubmit("email")}
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 bg-neutral-950 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isSubmitting ? "Sending..." : "Send by Email"}
                          </button>
                        </div>

                        <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">
                          Your preferred date and time are requests only.
                          The salon must confirm your appointment separately.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={isSubmitting}
                        className="border border-neutral-200 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}

                    {step < 3 && (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-3 bg-neutral-950 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Continue <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}