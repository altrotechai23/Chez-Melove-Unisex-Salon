
"use client";

import { useState, useTransition } from "react";
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
];

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

function formatDate(date: string): string {
  if (!date) return "Not selected";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCategory(category: string): string {
  const categories: Record<string, string> = {
    hair: "Hair Services",
    braiding: "Braiding & Plaiting",
    aesthetics: "Beauty & Aesthetics",
  };

  return categories[category] ?? category;
}

export default function BookingMatrix() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] =
    useState<BookingForm>(INITIAL_FORM_DATA);

  const [validationMessage, setValidationMessage] = useState("");

  // Always use the actual salon service catalogue.
  const selectedTreatment = SERVICES_DATA.find(
    (service) => service.id === formData.treatmentId
  );

  const serviceOptions = selectedTreatment?.benefits ?? [];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      // Reset the option when the customer changes services.
      ...(name === "treatmentId" ? { serviceOption: "" } : {}),
    }));

    setValidationMessage("");
  };

  const handleNextStep = () => {
    if (isPending) return;

    if (step === 1) {
      if (!formData.treatmentId) {
        setValidationMessage("Please select a salon service to continue.");
        return;
      }

      if (
        serviceOptions.length > 0 &&
        !serviceOptions.includes(formData.serviceOption)
      ) {
        setValidationMessage(
          "Please select your preferred service option."
        );
        return;
      }
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
      !selectedTreatment ||
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
        "Your selected date has passed. Please choose another date."
      );
      return;
    }

    if (
      serviceOptions.length > 0 &&
      !serviceOptions.includes(formData.serviceOption)
    ) {
      setStep(1);
      setValidationMessage(
        "Please select a valid option for your chosen service."
      );
      return;
    }

    setValidationMessage("");

    /*
     * IMPORTANT:
     * This retains the original demo submission behavior.
     * Connect your real booking API before treating requests
     * as saved appointments.
     */
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
    });
  };

  const resetBooking = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setStep(1);
    setIsSubmitted(false);
    setValidationMessage("");
  };

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
            03 / Salon Reservations
          </span>

          <h2
            id="booking-heading"
            className="mb-6 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl"
          >
            Book Your Appointment.
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
                Request Submitted
              </h3>

              <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-neutral-500">
                Thank you,{" "}
                <strong className="font-normal text-neutral-800">
                  {formData.clientName}
                </strong>
                . Your demo booking request is ready for{" "}
                <strong className="font-normal text-neutral-800">
                  {selectedTreatment?.title}
                </strong>
                {formData.serviceOption
                  ? ` — ${formData.serviceOption}`
                  : ""}
                {" "}on {formatDate(formData.date)} at{" "}
                {formData.timeSlot}.
              </p>

              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-neutral-400">
                This is still a demonstration submission. No
                appointment has been saved and no email or SMS
                has been sent. Please await salon confirmation
                before considering an appointment confirmed.
              </p>

              <button
                type="button"
                onClick={resetBooking}
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
              {/* Step 1: Actual salon services */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="treatmentId"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Select Salon Service
                    </label>

                    <select
                      id="treatmentId"
                      name="treatmentId"
                      value={formData.treatmentId}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    >
                      <option value="">
                        Choose your service
                      </option>

                      {SERVICES_DATA.map((service) => (
                        <option
                          key={service.id}
                          value={service.id}
                        >
                          {service.title} — {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedTreatment && (
                    <div className="border border-neutral-200 bg-white p-5">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        Selected Service
                      </p>

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-medium text-neutral-900">
                            {selectedTreatment.title}
                          </h3>

                          <p className="mt-1 text-xs text-neutral-500">
                            {formatCategory(selectedTreatment.category)}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-medium text-neutral-900">
                          {selectedTreatment.price}
                        </span>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                        {selectedTreatment.description}
                      </p>

                      <p className="mt-3 text-[10px] text-neutral-400">
                        {selectedTreatment.duration !== "Price list"
                          ? selectedTreatment.duration
                          : "Prices vary according to your selected option."}
                      </p>
                    </div>
                  )}

                  {selectedTreatment && serviceOptions.length > 0 && (
                    <div>
                      <label
                        htmlFor="serviceOption"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Choose Your Preferred Option
                      </label>

                      <select
                        id="serviceOption"
                        name="serviceOption"
                        value={formData.serviceOption}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      >
                        <option value="">
                          Select a style or treatment option
                        </option>

                        {serviceOptions.map((option, index) => (
                          <option
                            key={`${selectedTreatment.id}-${index}`}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">
                        Choose the option that best matches the
                        service you want. Prices shown are from
                        the salon&apos;s service price list.
                      </p>
                    </div>
                  )}

                  {selectedTreatment && serviceOptions.length === 0 && (
                    <p className="border border-neutral-200 bg-white p-4 text-xs leading-relaxed text-neutral-500">
                      A specific option is not currently listed
                      for this service. Continue and describe your
                      preferred style in the special requests
                      section. The salon can confirm the details
                      and price.
                    </p>
                  )}

                  {!selectedTreatment && (
                    <p className="text-[11px] font-light leading-relaxed text-neutral-400">
                      Browse our hair services, braiding, nail
                      services, eyelashes and makeup. Select a
                      service to view its description and pricing.
                    </p>
                  )}
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

                  <div className="border border-neutral-200 bg-white p-4">
                    <p className="text-xs font-medium text-neutral-900">
                      {selectedTreatment?.title}
                    </p>

                    {formData.serviceOption && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {formData.serviceOption}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-neutral-500">
                      Starting price: {selectedTreatment?.price}
                    </p>
                  </div>

                  <p className="text-[11px] font-light leading-relaxed text-neutral-400">
                    These are preferred time slots, not live
                    availability. Your appointment requires
                    confirmation from the salon.
                  </p>
                </div>
              )}

              {/* Step 3: Customer details */}
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
                      maxLength={1000}
                      placeholder="Tell us about your preferred style, hair length, colour, or other requirements..."
                      className="w-full resize-y rounded-none border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  {/* Booking summary */}
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      Booking Request Summary
                    </p>

                    <div className="space-y-3 text-xs text-neutral-600">
                      <div className="flex justify-between gap-4">
                        <span>Service</span>
                        <span className="text-right text-neutral-900">
                          {selectedTreatment?.title ?? "Not selected"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Category</span>
                        <span className="text-right text-neutral-900">
                          {selectedTreatment
                            ? formatCategory(selectedTreatment.category)
                            : "Not selected"}
                        </span>
                      </div>

                      {formData.serviceOption && (
                        <div className="flex justify-between gap-4">
                          <span>Option</span>
                          <span className="max-w-[65%] text-right text-neutral-900">
                            {formData.serviceOption}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between gap-4">
                        <span>Listed price</span>
                        <span className="text-right text-neutral-900">
                          {selectedTreatment?.price ?? "To be confirmed"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Date</span>
                        <span className="text-right text-neutral-900">
                          {formatDate(formData.date)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Time</span>
                        <span className="text-right text-neutral-900">
                          {formData.timeSlot || "Not selected"}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-[10px] leading-relaxed text-neutral-400">
                      Final pricing and appointment availability
                      must be confirmed by the salon.
                    </p>
                  </div>
                </div>
              )}

              {/* Validation */}
              {validationMessage && (
                <p
                  className="text-xs leading-relaxed text-red-600"
                  role="alert"
                >
                  {validationMessage}
                </p>
              )}

              {/* Navigation */}
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
                      (step === 1 &&
                        (!formData.treatmentId ||
                          (serviceOptions.length > 0 &&
                            !serviceOptions.includes(
                              formData.serviceOption
                            )))) ||
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
          Submitting a request does not guarantee an appointment.
          The salon must confirm your preferred date, time, and final price.
        </p>
      </div>
    </section>
  );
}
