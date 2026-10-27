"use client";

import { useState } from "react";
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

export default function BookingMatrix() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedVia, setCompletedVia] = useState<
    "email" | "whatsapp" | null
  >(null);
  const [formData, setFormData] =
    useState<BookingForm>(INITIAL_FORM_DATA);
  const [validationMessage, setValidationMessage] = useState("");

  const selectedTreatment = SERVICES_DATA.find(
    (service) => service.id === formData.treatmentId,
  );

  const treatmentOptions = selectedTreatment?.benefits ?? [];

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      const updated = { ...previous, [name]: value };

      // Clear a previously selected option when changing services.
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
        setValidationMessage("Please select a valid service to continue.");
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

  const validateBooking = (): boolean => {
    if (!selectedTreatment) {
      setStep(1);
      setValidationMessage("Please select a valid service.");
      return false;
    }

    if (
      treatmentOptions.length > 0 &&
      !treatmentOptions.includes(formData.serviceOption)
    ) {
      setStep(1);
      setValidationMessage(
        "Please choose a valid option for your selected service.",
      );
      return false;
    }

    if (!formData.date || !formData.timeSlot) {
      setStep(2);
      setValidationMessage("Please select your preferred date and time.");
      return false;
    }

    if (formData.date < getLocalDateString()) {
      setStep(2);
      setValidationMessage(
        "Your selected date has passed. Please choose today or a future date.",
      );
      return false;
    }

    if (
      formData.clientName.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail.trim()) ||
      formData.clientPhone.trim().length < 7
    ) {
      setStep(3);
      setValidationMessage(
        "Please provide a valid name, email address, and phone number.",
      );
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (step !== 3 || isSubmitting) return;
    if (!validateBooking()) return;

    setIsSubmitting(true);
    setValidationMessage("");

    try {
      const payload = {
        ...formData,
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        clientPhone: formData.clientPhone.trim(),
        specialNotes: formData.specialNotes.trim(),
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch (error) {
      setValidationMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (isSubmitting || !validateBooking()) return;

    const phoneNumber =
      process.env.NEXT_PUBLIC_SALON_WHATSAPP_NUMBER?.replace(/\D/g, "");

    if (!phoneNumber) {
      setValidationMessage(
        "WhatsApp booking is not configured. Please submit your request by email instead.",
      );
      return;
    }

    const message = [
      "Hello Chezmelove! I would like to request a salon appointment.",
      "",
      `Service: ${selectedTreatment?.title ?? ""}`,
      `Starting price: ${selectedTreatment?.price ?? ""}`,
      ...(formData.serviceOption
        ? [`Selected option: ${formData.serviceOption}`]
        : []),
      `Preferred date: ${formData.date}`,
      `Preferred time: ${formData.timeSlot}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${formData.clientName.trim()}`,
      `Email: ${formData.clientEmail.trim()}`,
      `Phone: ${formData.clientPhone.trim()}`,
      "",
      `Special requests: ${formData.specialNotes.trim() || "None"}`,
      "",
      "Please let me know whether this date and time are available. I understand this is a request, not a confirmed appointment.",
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
    setValidationMessage("");
  };

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setStep(1);
    setCompletedVia(null);
    setValidationMessage("");
    setIsSubmitting(false);
  };

  return (
    <section
      id="booking"
      className="w-full scroll-mt-16 border-b border-neutral-200 bg-white px-6 py-24 text-neutral-900 md:px-12"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-3xl">
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

          {!completedVia && (
            <div
              className="flex items-center justify-center gap-3 text-[10px] font-mono text-neutral-400 sm:gap-4 sm:text-xs"
              aria-label={`Booking step ${step} of 3`}
            >
              <span className={step === 1 ? "font-bold text-neutral-950" : ""}>
                01 Service
              </span>
              <span aria-hidden="true">→</span>
              <span className={step === 2 ? "font-bold text-neutral-950" : ""}>
                02 Schedule
              </span>
              <span aria-hidden="true">→</span>
              <span className={step === 3 ? "font-bold text-neutral-950" : ""}>
                03 Details
              </span>
            </div>
          )}
        </div>

        <div className="flex min-h-[380px] flex-col justify-between border border-neutral-200 bg-neutral-50/50 p-6 shadow-sm sm:p-8 md:p-12">
          {completedVia ? (
            <div className="my-auto py-8 text-center" role="status" aria-live="polite">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                <span aria-hidden="true">✓</span>
              </div>

              <h3 className="mb-3 text-xl font-light tracking-tight">
                {completedVia === "email"
                  ? "Request Sent Successfully"
                  : "WhatsApp Message Prepared"}
              </h3>

              <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-neutral-500">
                Thank you,{" "}
                <strong className="font-normal text-neutral-800">
                  {formData.clientName}
                </strong>
                . Your request is for{" "}
                <strong className="font-normal text-neutral-800">
                  {selectedTreatment?.title}
                </strong>
                {formData.serviceOption ? ` — ${formData.serviceOption}` : ""}{" "}
                on {formData.date} at {formData.timeSlot}.
              </p>

              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-neutral-500">
                {completedVia === "email"
                  ? "Your request has been emailed to the salon. Your appointment is not confirmed until the salon contacts you."
                  : "WhatsApp has opened with your booking details. Press Send in WhatsApp to deliver your request. Your appointment is not confirmed until the salon responds."}
              </p>

              <button
                type="button"
                onClick={resetForm}
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
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="treatmentId"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Select Service
                    </label>

                    <select
                      id="treatmentId"
                      name="treatmentId"
                      value={formData.treatmentId}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
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
                    <div className="border border-neutral-200 bg-white p-4">
                      <p className="text-sm font-medium text-neutral-900">
                        {selectedTreatment.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        {selectedTreatment.description}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-neutral-800">
                        {selectedTreatment.price}
                      </p>
                    </div>
                  )}

                  {selectedTreatment && treatmentOptions.length > 0 && (
                    <div>
                      <label
                        htmlFor="serviceOption"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Choose Service Option
                      </label>

                      <select
                        id="serviceOption"
                        name="serviceOption"
                        value={formData.serviceOption}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
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

                  <p className="text-[11px] font-light leading-relaxed text-neutral-400">
                    Prices and appointment availability must be confirmed by
                    the salon.
                  </p>
                </div>
              )}

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
                        minLength={2}
                        maxLength={120}
                        placeholder="Your full name"
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
                        minLength={7}
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
                      placeholder="you@example.co.za"
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
                      maxLength={1500}
                      placeholder="Any preferences or additional requests?"
                      className="w-full resize-y rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="border-t border-neutral-200 pt-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      Request Summary
                    </p>
                    <div className="space-y-2 text-xs text-neutral-600">
                      <div className="flex justify-between gap-4">
                        <span>Service</span>
                        <span className="text-right text-neutral-900">
                          {selectedTreatment?.title ?? "Not selected"}
                        </span>
                      </div>

                      {formData.serviceOption && (
                        <div className="flex justify-between gap-4">
                          <span>Option</span>
                          <span className="text-right text-neutral-900">
                            {formData.serviceOption}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between gap-4">
                        <span>Starting price</span>
                        <span className="text-neutral-900">
                          {selectedTreatment?.price ?? "To be confirmed"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Date</span>
                        <span className="text-neutral-900">{formData.date}</span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Time</span>
                        <span className="text-neutral-900">{formData.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      disabled={isSubmitting}
                      className="border border-neutral-300 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-900 transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continue with WhatsApp
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-neutral-900 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending Request..." : "Send by Email"}
                    </button>
                  </div>
                </div>
              )}

              {validationMessage && (
                <p className="text-xs leading-relaxed text-red-600" role="alert">
                  {validationMessage}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-6">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="border border-neutral-300 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Back
                    </button>
                  )}
                </div>

                {step < 3 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="ml-auto bg-neutral-900 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue →
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