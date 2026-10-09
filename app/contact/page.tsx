"use client";

import { useEffect, useRef } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  ArrowUpRight,
  Navigation,
  MapPin,
} from "lucide-react";
import gsap from "gsap";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawPhone = "0680678559";
  const internationalPhone = "27680678559";
  const displayPhone = "068 067 8559";
  const email = "concierge@melove.co.za";

  const salonAddress =
    "128 Long Street, Cape Town City Centre, Cape Town, Western Cape, South Africa";

  const whatsappMessage =
    "Hello Chez Melove. I would like to coordinate a salon appointment.";

  const whatsappUrl = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
    "Salon Appointment Inquiry — Chez Melove"
  )}`;

  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    salonAddress
  )}`;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>(".animate-meta");
      const cards = gsap.utils.toArray<HTMLElement>(
        ".animate-contact-card"
      );

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([...headings, ...cards], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          headings,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
          }
        )
        .fromTo(
          cards,
          {
            opacity: 0,
            y: 28,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.09,
            clearProps: "transform",
          },
          "-=0.25"
        );
    }, container);

    return () => ctx.revert();
  }, []);

  const contactLocalSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Chez Melove Unisex Salon",
    mainEntity: {
      "@type": "BeautySalon",
      name: "Chez Melove Unisex Salon",
      telephone: `+${internationalPhone}`,
      email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "128 Long Street",
        addressLocality: "Cape Town",
        addressRegion: "Western Cape",
        postalCode: "7708",
        addressCountry: "ZA",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactLocalSchema),
        }}
      />

      <section
        ref={containerRef}
        className="flex min-h-[90vh] items-center bg-neutral-50 px-5 py-20 font-sans text-neutral-900 antialiased sm:px-8 md:px-12 md:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="mb-12 max-w-2xl border-b border-neutral-200 pb-8 sm:mb-16 sm:pb-10">
            <span className="animate-meta mb-3 block text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400 sm:tracking-[0.4em]">
              05 / Connect Gateway
            </span>

            <h1 className="animate-meta mb-5 text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl md:mb-6 md:text-6xl">
              Let&apos;s Connect.
            </h1>

            <p className="animate-meta max-w-xl text-sm font-light leading-7 text-neutral-500 sm:text-base">
              Your next salon experience starts here. Contact our Cape Town
              team to discuss your appointment, ask a question, or find your
              way to Chez Melove.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-8">
            {/* Primary WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-contact-card group relative block overflow-hidden border border-neutral-200 bg-white p-6 transition-all duration-500 hover:border-neutral-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:p-8 md:p-10 lg:col-span-7"
              aria-label={`Chat with Chez Melove on WhatsApp at ${displayPhone}`}
            >
              <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-5 -translate-y-5 rounded-bl-full bg-[#25D366]/5 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex h-full flex-col justify-between gap-12">
                <div className="flex items-start justify-between">
                  <div className="bg-[#25D366]/10 p-3 text-[#25D366]">
                    <MessageSquare
                      className="h-6 w-6"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-neutral-900">
                    <span>Instant Chat</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                    WhatsApp Concierge
                  </h2>

                  <p className="mb-6 font-mono text-xs tracking-wide text-neutral-400">
                    {displayPhone}
                  </p>

                  <p className="max-w-md text-sm font-light leading-7 text-neutral-500">
                    Have a question or want to book your next appointment?
                    Message our team directly for appointment inquiries,
                    service information, and scheduling assistance.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-neutral-900">
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </a>

            {/* Secondary Contact Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {/* Email */}
              <a
                href={emailUrl}
                className="animate-contact-card group flex flex-col justify-between border border-neutral-200 bg-white p-6 transition-all duration-500 hover:border-neutral-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
                aria-label={`Email Chez Melove at ${email}`}
              >
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-900 p-2.5 text-white">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-neutral-900">
                    Email Desk
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="mb-1 text-lg font-light tracking-tight text-neutral-900">
                    Email Correspondence
                  </h3>

                  <p className="break-all text-sm font-light leading-6 text-neutral-500">
                    {email}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-end text-neutral-400 transition-colors group-hover:text-neutral-900">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${rawPhone}`}
                className="animate-contact-card group flex flex-col justify-between border border-neutral-200 bg-white p-6 transition-all duration-500 hover:border-neutral-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
                aria-label={`Call Chez Melove at ${displayPhone}`}
              >
                <div className="flex items-center justify-between">
                  <div className="border border-neutral-200 bg-neutral-100 p-2.5 text-neutral-900">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-neutral-900">
                    Voice Line
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="mb-1 text-lg font-light tracking-tight text-neutral-900">
                    Direct Phone Call
                  </h3>

                  <p className="font-mono text-sm tracking-wide text-neutral-500">
                    {displayPhone}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-end text-neutral-400 transition-colors group-hover:text-neutral-900">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            </div>

            {/* Google Maps Directions Card */}
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-contact-card group relative mt-2 block min-h-[220px] overflow-hidden border border-neutral-800 bg-neutral-950 text-white transition-all duration-500 hover:border-neutral-600 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:min-h-[200px] lg:col-span-12"
              aria-label="Get directions to Chez Melove Unisex Salon in Cape Town"
            >
              {/* Decorative Background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/60"
              />

              {/* Location Content */}
              <div className="relative flex h-full min-h-[220px] flex-col justify-between gap-10 p-6 sm:min-h-[200px] sm:flex-row sm:items-center sm:p-8 md:p-10">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 border border-white/15 bg-white/5 p-3">
                    <MapPin
                      className="h-6 w-6 text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="max-w-xl">
                    <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                      Visit Our Salon
                    </span>

                    <h2 className="mb-3 text-2xl font-light tracking-tight sm:text-3xl">
                      Chez Melove Unisex Salon
                    </h2>

                    <p className="max-w-lg text-sm font-light leading-7 text-neutral-400">
                      {salonAddress}
                    </p>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                      Cape Town · South Africa
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-5 border-t border-white/10 pt-5 sm:justify-end sm:border-0 sm:pt-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 transition-colors group-hover:text-white">
                    Get Directions
                  </span>

                  <div className="border border-white/20 p-3 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950">
                    <Navigation
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Footer Note */}
          <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Your experience. Our craft.
            </p>

            <p className="text-xs font-light text-neutral-500">
              Chez Melove <span className="mx-2 text-neutral-300">/</span>{" "}
              Cape Town, South Africa
            </p>
          </div>
        </div>
      </section>
    </>
  );
}