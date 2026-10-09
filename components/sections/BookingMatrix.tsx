"use client";

import { useState, useTransition } from "react";

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

export default function BookingMatrix() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] =
    useState<BookingForm>(INITIAL_FORM_DATA);
  const [validationMessage, setValidationMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationMessage("");
  };

  const handleNextStep = () => {
    if (isPending) return;

    if (step === 1 && !formData.treatmentId) {
      setValidationMessage("Please select a treatment to continue.");
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
          "Please choose today or a future date."
        );
        return;
      }
    }

    setValidationMessage("");
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    if (isPending) return;

    setValidationMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        "Please complete all required fields before submitting."
      );
      return;
    }

    if (formData.date < getLocalDateString()) {
      setStep(2);
      setValidationMessage(
        "Your selected date has passed. Please choose a future date."
      );
      return;
    }

    setValidationMessage("");

    // Demo submission only. Connect this to a booking API
    // before accepting real customer reservations.
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
    });
  };

  const selectedTreatment = TREATMENT_SELECTION.find(
    (treatment) => treatment.id === formData.treatmentId
  );

  return (
    <section
      id="booking"
      className="w-full scroll-mt-16 border-b border-neutral-200 bg-white px-6 py-24 text-neutral-900 md:px-12"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
            03 / Reservation Engine
          </span>

          <h2
            id="booking-heading"
            className="mb-6 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl"
          >
            Book Your Session.
          </h2>

          {!isSubmitted && (
            <div
              className="flex items-center justify-center gap-3 text-[10px] font-mono text-neutral-400 sm:gap-4 sm:text-xs"
              aria-label={`Booking step ${step} of 3`}
            >
              <span
                className={
                  step === 1 ? "font-bold text-neutral-950" : ""
                }
              >
                01 Service
              </span>

              <span aria-hidden="true">→</span>

              <span
                className={
                  step === 2 ? "font-bold text-neutral-950" : ""
                }
              >
                02 Schedule
              </span>

              <span aria-hidden="true">→</span>

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

        {/* Booking panel */}
        <div className="flex min-h-[380px] flex-col justify-between border border-neutral-200 bg-neutral-50/50 p-6 shadow-sm sm:p-8 md:p-12">
          {isSubmitted ? (
            <div
              className="my-auto py-8 text-center"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                <span aria-hidden="true">✓</span>
              </div>

              <h3 className="mb-3 text-xl font-light tracking-tight">
                Demo Request Complete
              </h3>

              <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-neutral-500">
                Thank you,{" "}
                <strong className="font-normal text-neutral-800">
                  {formData.clientName}
                </strong>
                . Your booking details have been processed by this demo
                interface for{" "}
                {selectedTreatment?.name ?? "your selected treatment"} on{" "}
                {formData.date} at {formData.timeSlot}.
              </p>

              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-neutral-400">
                This is a demonstration only. No appointment has been
                saved, and no SMS or email has been sent.
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...INITIAL_FORM_DATA });
                  setStep(1);
                  setIsSubmitted(false);
                  setValidationMessage("");
                }}
                className="mt-8 border border-neutral-300 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:border-neutral-900"
              >
                Make Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col justify-between gap-8"
            >
              {/* Step 1: Treatment */}
              {step === 1 && (
                <div className="space-y-4">
                  <label
                    htmlFor="treatmentId"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Select Treatment
                  </label>

                  <select
                    id="treatmentId"
                    name="treatmentId"
                    value={formData.treatmentId}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="">Choose your treatment</option>

                    {TREATMENT_SELECTION.map((treatment) => (
                      <option key={treatment.id} value={treatment.id}>
                        {treatment.name}
                      </option>
                    ))}
                  </select>

                  <p className="text-[11px] font-light leading-relaxed text-neutral-400">
                    Choose your preferred service. Final pricing and
                    availability should be confirmed by the salon.
                  </p>
                </div>
              )}

              {/* Step 2: Date and time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Preferred Date
                      </label>

                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        min={getLocalDateString()}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="timeSlot"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Preferred Time
                      </label>

                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      >
                        <option value="">Choose a time</option>

                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] font-light leading-relaxed text-neutral-400">
                    These are preferred time slots, not live availability.
                    Your appointment requires salon confirmation.
                  </p>
                </div>
              )}

              {/* Step 3: Client details */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="clientName"
                        className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Full Name
                      </label>

                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        autoComplete="name"
                        required
                        maxLength={100}
                        placeholder="Alex Johnson"
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="clientPhone"
                        className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Contact Number
                      </label>

                      <input
                        type="tel"
                        id="clientPhone"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        autoComplete="tel"
                        required
                        maxLength={30}
                        placeholder="+27 82 123 4567"
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="clientEmail"
                      className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="clientEmail"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="alex@example.co.za"
                      className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="specialNotes"
                      className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Special Requests{" "}
                      <span className="font-normal normal-case tracking-normal text-neutral-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="specialNotes"
                      name="specialNotes"
                      value={formData.specialNotes}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={1000}
                      placeholder="Tell us about any preferences or requests..."
                      className="w-full resize-y rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  {/* Booking summary */}
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      Request Summary
                    </p>

                    <div className="space-y-2 text-xs text-neutral-600">
                      <div className="flex justify-between gap-4">
                        <span>Treatment</span>
                        <span className="text-right text-neutral-900">
                          {selectedTreatment?.name ?? "Not selected"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Date</span>
                        <span className="text-neutral-900">
                          {formData.date}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Time</span>
                        <span className="text-neutral-900">
                          {formData.timeSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation message */}
              {validationMessage && (
                <p
                  className="text-xs leading-relaxed text-red-600"
                  role="alert"
                >
                  {validationMessage}
                </p>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-6">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isPending}
                      className="border border-neutral-300 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Back
                    </button>
                  )}
                </div>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={
                      isPending ||
                      (step === 1 && !formData.treatmentId) ||
                      (step === 2 &&
                        (!formData.date ||
                          !formData.timeSlot ||
                          formData.date < getLocalDateString()))
                    }
                    className="ml-auto bg-neutral-900 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="ml-auto bg-neutral-900 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? "Processing..." : "Submit Request →"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[10px] font-light leading-relaxed text-neutral-400">
          Submitting a request does not guarantee an appointment. The salon
          must confirm your preferred date and time.
        </p>
      </div>
    </section>
  );
}