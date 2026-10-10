
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useTransition,
  useEffect,
  useRef,
} from "react";
import { X } from "lucide-react";
import gsap from "gsap";

interface BookingForm {
  treatmentId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialNotes: string;
}

const TREATMENT_SELECTION = [
  { id: "h1", name: "Editorial Precision Cut & Style (R650 - R950)" },
  { id: "h2", name: "Signature Balayage & Dimensional Tone (R1800 - R2600)" },
  { id: "a1", name: "Advanced Micro-Needling Therapy (R1400)" },
  { id: "a2", name: "Hydro-Infusion Pore Resurfacing (R850)" },
  { id: "w1", name: "Aromatherapy Stress Release (R1100)" },
  { id: "w2", name: "Detoxifying Scalp Spa & Blowout (R750)" },
];

const TIME_SLOTS = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];

const INITIAL_FORM_DATA: BookingForm = {
  treatmentId: "",
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
  undefined
);

export const useGlobalBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useGlobalBooking must be utilized inside a BookingDialogProvider wrapper Layout"
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
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] =
    useState<BookingForm>(INITIAL_FORM_DATA);
  const [validationMessage, setValidationMessage] = useState("");

  const sheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const openBooking = (treatmentId?: string) => {
    timelineRef.current?.kill();

    setFormData({
      ...INITIAL_FORM_DATA,
      treatmentId: treatmentId || "",
    });

    setStep(treatmentId ? 2 : 1);
    setIsSubmitted(false);
    setValidationMessage("");
    setIsOpen(true);
  };

  const closeBooking = () => {
    if (isPending) return;

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
        "-=0.3"
      );
  };

  // Entrance animation and background scroll locking.
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
          "-=0.25"
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
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationMessage("");
  };

  const handleNextStep = () => {
    if (isPending) return;

    if (step === 1 && !formData.treatmentId) {
      setValidationMessage(
        "Please select a treatment before continuing."
      );
      return;
    }

    if (step === 2) {
      if (!formData.date || !formData.timeSlot) {
        setValidationMessage(
          "Please select your preferred date and time."
        );
        return;
      }

      if (formData.date < getLocalDateString()) {
        setValidationMessage(
          "Your selected date has passed. Please choose today or a future date."
        );
        return;
      }
    }

    setValidationMessage("");
    setStep((previous) => Math.min(previous + 1, 3));
  };

  const handlePrevStep = () => {
    if (isPending) return;

    setValidationMessage("");
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (step !== 3 || isPending) return;

    if (
      !formData.treatmentId ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.clientName.trim() ||
      !formData.clientEmail.trim() ||
      !formData.clientPhone.trim()
    ) {
      setValidationMessage(
        "Please complete all required booking details."
      );
      return;
    }

    if (formData.date < getLocalDateString()) {
      setValidationMessage(
        "Your selected date has passed. Please choose today or a future date."
      );
      return;
    }

    setValidationMessage("");

    // Demo submission only. Connect this to your booking API to save bookings.
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setIsSubmitted(true);
    });
  };

  const selectedTreatment = TREATMENT_SELECTION.find(
    (treatment) => treatment.id === formData.treatmentId
  );

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
          {/* Backdrop Mask Sheet */}
          <div
            ref={overlayRef}
            onClick={closeBooking}
            className="pointer-events-auto absolute inset-0 bg-neutral-950/60 backdrop-blur-md transition-opacity"
            aria-hidden="true"
    
    />

          {/* Premium Bottom Sheet Drawer */}
          <div
            ref={sheetRef}
            className="relative z-10 flex h-[95dvh] max-h-[100dvh] w-full max-w-2xl flex-col overflow-y-auto rounded-t-3xl border-t border-neutral-200/80 bg-white p-6 pb-[calc(24px+env(safe-area-inset-bottom))] text-neutral-900 shadow-2xl sm:max-h-[95dvh] sm:rounded-t-[2.5rem] will-change-transform"
          >
            {/* Pull Handle */}
            <div className="mx-auto mb-6 h-1.5 w-12 shrink-0 rounded-full bg-neutral-200" />

            {/* Close Toggle Action */}
            <button
              type="button"
              onClick={closeBooking}
              disabled={isPending}
              className="absolute right-6 top-6 p-2 text-neutral-400 transition-colors hover:text-neutral-950 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close booking drawer"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Header and Progress Indicator */}
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
                  <span
                    className={
                      step === 1 ? "font-bold text-neutral-950" : ""
                    }
                  >
                    01 Service
                  </span>

                  <span aria-hidden="true">&rarr;</span>

                  <span
                    className={
                      step === 2 ? "font-bold text-neutral-950" : ""
                    }
                  >
                    02 Timeline
                  </span>

                  <span aria-hidden="true">&rarr;</span>

                  <span
                    className={
                      step === 3 ? "font-bold text-neutral-950" : ""
                    }
                  >
                    03 Details
                  </span>
                </div>
              )}
            </div>

            {/* Validation Notification */}
            {validationMessage && (
              <div
                role="alert"
                className="mb-4 shrink-0 bg-neutral-950 p-3 text-center text-[11px] font-medium uppercase tracking-wide text-white"
              >
                {validationMessage}
              </div>
            )}

            {/* Form Content */}
            <div className="flex min-h-0 flex-1 flex-col">
              {isSubmitted ? (
                <div
                  className="my-auto py-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <span>✓</span>
                  </div>

                  <h3 className="mb-2 text-lg font-light tracking-tight">
                    Request Logged
                  </h3>

                  <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-neutral-500">
                    Thank you,{" "}
                    <strong className="font-normal text-neutral-800">
                      {formData.clientName}
                    </strong>
                    . Your booking request is for{" "}
                    <strong className="font-normal text-neutral-800">
                      {selectedTreatment?.name ?? "your selected service"}
                    </strong>{" "}
                    on {formData.date} at {formData.timeSlot}.
                  </p>

                  <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-400">
                    This is a demonstration confirmation. Your request
                    has not been saved to a booking system.
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
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* STEP 1: Treatment Selector */}
                  {step === 1 && (
                    <div className="space-y-3">
                      <label
                        htmlFor="treatmentId"
                        className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                      >
                        Select Care Classification
                      </label>

                      <select
                        id="treatmentId"
                        name="treatmentId"
                        value={formData.treatmentId}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
                      >
                        <option value="">
                          -- Choose a treatment --
                        </option>

                        {TREATMENT_SELECTION.map((treatment) => (
                          <option
                            key={treatment.id}
                            value={treatment.id}
                          >
                            {treatment.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* STEP 2: Time and Date Setup */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="date"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Target Date
                        </label>

                        <input
                          id="date"
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
                          htmlFor="timeSlot"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Timeline Block
                        </label>

                        <select
                          id="timeSlot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                        >
                          <option value="">-- Choose timing --</option>

                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Client Identity */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="clientName"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Full Name
                        </label>

                        <input
                          id="clientName"
                          name="clientName"
                          type="text"
                          autoComplete="name"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="clientPhone"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Contact Phone
                        </label>

                        <input
                          id="clientPhone"
                          name="clientPhone"
                          type="tel"
                          autoComplete="tel"
                          value={formData.clientPhone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="clientEmail"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Email Address
                        </label>

                        <input
                          id="clientEmail"
                          name="clientEmail"
                          type="email"
                          autoComplete="email"
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          required
                          className="w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="specialNotes"
                          className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
                        >
                          Special Notes (Optional)
                        </label>

                        <textarea
                          id="specialNotes"
                          name="specialNotes"
                          value={formData.specialNotes}
                          onChange={handleInputChange}
                          placeholder="Any preferences or additional information?"
                          rows={3}
                          className="w-full resize-y border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* Controller Action Row Navigation */}
                  <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={isPending}
                        className="border border-neutral-200 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isPending}
                        className="flex items-center justify-center gap-3 bg-neutral-950 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Continue <span aria-hidden="true">→</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isPending}
                        className="bg-neutral-950 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isPending ? "Transmitting..." : "Confirm Booking"}
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