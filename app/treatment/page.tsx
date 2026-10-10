
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb, Clock, Tag, Sparkles } from "lucide-react";
import gsap from "gsap";

interface TreatmentItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  price: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  posterUrl: string;
  alt: string;
}

const TREATMENTS_DATABASE: TreatmentItem[] = [
  {
    id: "t1",
    slug: "facial-skincare",
    title: "Facial",
    subtitle: "Skin Care Treatments & Dermal Refinement",
    category: "Aesthetics",
    duration: "60–75 min",
    price: "R 850 – R 1,400",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
    posterUrl: "",
    alt: "Professional facial skincare treatment in a spa"
  },
  {
    id: "t2",
    slug: "eyebrows-lashes",
    title: "Eyebrows & Lashes",
    subtitle: "Bespoke Brow and Lash Treatments",
    category: "Beauty",
    duration: "45 min",
    price: "R 450 – R 750",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85",
    posterUrl: "",
    alt: "Beauty portrait showcasing eye and brow styling"
  },
  {
    id: "t3",
    slug: "hair-removal",
    title: "Hair Removal",
    subtitle: "Professional Waxing & Threading",
    category: "Aesthetics",
    duration: "30–60 min",
    price: "R 250 – R 600",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85",
    posterUrl: "",
    alt: "Skincare and professional beauty treatment"
  },
  {
    id: "t4",
    slug: "manicure-handcare",
    title: "Manicure",
    subtitle: "Professional Hand Care & Nail Artistry",
    category: "Wellness",
    duration: "45–60 min",
    price: "R 400 – R 850",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85",
    posterUrl: "",
    alt: "Manicure and nail care treatment"
  }
];

export default function TreatmentPage() {
  const [ambientIntensity, setAmbientIntensity] = useState(100);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const ambientBackgroundStyle = useMemo(() => {
    const factor = ambientIntensity / 100;

    const r = Math.round(10 + (253 - 10) * factor);
    const g = Math.round(10 + (251 - 10) * factor);
    const b = Math.round(10 + (247 - 10) * factor);

    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      color: ambientIntensity < 45 ? "#F5F5F5" : "#171717",
      transition: "background-color 0.3s ease, color 0.3s ease"
    } as React.CSSProperties;
  }, [ambientIntensity]);

  const isDark = ambientIntensity < 45;

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(
      ".treatment-card-node"
    );

    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnterMedia = (
    id: string,
    type: "image" | "video"
  ) => {
    if (type !== "video") return;

    const video = videoRefs.current[id];

    if (video) {
      void video.play().catch(() => {
        // Autoplay may be restricted by the browser.
      });
    }
  };

  const handleMouseLeaveMedia = (
    id: string,
    type: "image" | "video"
  ) => {
    if (type !== "video") return;

    const video = videoRefs.current[id];

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <main
      ref={containerRef}
      style={ambientBackgroundStyle}
      className="min-h-screen px-5 pb-20 pt-28 font-sans antialiased sm:px-8 md:px-12 md:pt-32"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Ambient light control */}
        <div
          className={`absolute right-0 top-[-4.5rem] z-30 flex items-center gap-3 border px-4 py-3 shadow-sm backdrop-blur-xl sm:top-[-5rem] ${
            isDark
              ? "border-white/15 bg-white/5"
              : "border-black/10 bg-white/60"
          }`}
        >
          <Lightbulb
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 ${
              isDark ? "text-amber-400" : "text-neutral-500"
            }`}
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="ambient-bulb-slider"
              className={`block text-[9px] font-bold uppercase tracking-[0.18em] ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              Atmosphere
            </label>

            <input
              id="ambient-bulb-slider"
              type="range"
              min={5}
              max={100}
              value={ambientIntensity}
              onChange={(event) =>
                setAmbientIntensity(Number(event.target.value))
              }
              className="h-1 w-24 cursor-pointer appearance-none rounded-lg accent-neutral-800 sm:w-32"
              aria-label="Adjust page illumination"
            />
          </div>

          <span
            className={`min-w-8 text-right text-[10px] tabular-nums ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {ambientIntensity}%
          </span>
        </div>

        {/* Page heading */}
        <header
          className={`mb-12 max-w-2xl border-b pb-8 sm:mb-16 ${
            isDark ? "border-white/15" : "border-black/10"
          }`}
        >
          <span
            className={`mb-4 block text-[10px] font-bold uppercase tracking-[0.35em] ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            01 / Curated Collections
          </span>

          <h1 className="mb-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Our Treatments
            <span
              className={`mt-1 block text-2xl italic sm:text-3xl md:text-4xl ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Your moment, your ritual.
            </span>
          </h1>

          <p
            className={`max-w-xl text-sm font-light leading-7 sm:text-base ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Explore our collection of beauty, skincare and self-care
            treatments, thoughtfully curated to help you look and feel
            your best.
          </p>
        </header>

        {/* Treatment cards */}
        <section
          ref={cardsRef}
          aria-label="Available treatments"
          className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 sm:gap-8 lg:gap-10"
        >
          {TREATMENTS_DATABASE.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/services/${treatment.slug}`}
              className={`treatment-card-node group flex min-w-0 flex-col overflow-hidden border shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-4 ${
                isDark
                  ? "border-white/10 bg-white/[0.03] hover:border-white/30"
                  : "border-black/10 bg-white/70 hover:border-black/30"
              }`}
              onMouseEnter={() =>
                handleMouseEnterMedia(
                  treatment.id,
                  treatment.mediaType
                )
              }
              onMouseLeave={() =>
                handleMouseLeaveMedia(
                  treatment.id,
                  treatment.mediaType
                )
              }
              onTouchStart={() =>
                handleMouseEnterMedia(
                  treatment.id,
                  treatment.mediaType
                )
              }
              onTouchEnd={() =>
                handleMouseLeaveMedia(
                  treatment.id,
                  treatment.mediaType
                )
              }
            >
              <article className="flex h-full flex-col">
                {/* Media viewport */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                  {treatment.mediaType === "video" ? (
                    <video
                      ref={(element) => {
                        videoRefs.current[treatment.id] = element;
                      }}
                      src={treatment.mediaUrl}
                      poster={treatment.posterUrl || undefined}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={treatment.alt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={treatment.mediaUrl}
                      alt={treatment.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Category badge */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="flex items-center gap-2 bg-black/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <Sparkles
                        aria-hidden="true"
                        className="h-3 w-3"
                      />
                      {treatment.category}
                    </span>
                  </div>

                  {treatment.mediaType === "video" && (
                    <div className="pointer-events-none absolute bottom-4 right-4 rounded-sm bg-black/55 px-3 py-2 text-[9px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-md">
                      Preview
                    </div>
                  )}

                  {/* Media title */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 sm:bottom-5 sm:left-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
                      Chez Melove
                    </p>
                    <p className="mt-1 text-xl font-light tracking-wide text-white sm:text-2xl">
                      {treatment.title}
                    </p>
                  </div>
                </div>

                {/* Treatment information */}
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <div className="flex-1">
                    <h2
                      className={`mb-2 text-2xl font-light tracking-tight transition-colors ${
                        isDark
                          ? "text-white group-hover:text-neutral-300"
                          : "text-neutral-900 group-hover:text-neutral-600"
                      }`}
                    >
                      {treatment.title}
                    </h2>

                    <p
                      className={`mb-6 text-xs font-light leading-6 sm:text-sm ${
                        isDark
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {treatment.subtitle}
                    </p>

                    {/* Treatment details */}
                    <div
                      className={`flex flex-wrap items-center gap-x-5 gap-y-3 border-t py-4 ${
                        isDark
                          ? "border-white/10"
                          : "border-black/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock
                          aria-hidden="true"
                          className={`h-4 w-4 ${
                            isDark
                              ? "text-neutral-400"
                              : "text-neutral-500"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            isDark
                              ? "text-neutral-300"
                              : "text-neutral-700"
                          }`}
                        >
                          {treatment.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag
                          aria-hidden="true"
                          className={`h-4 w-4 ${
                            isDark
                              ? "text-neutral-400"
                              : "text-neutral-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            isDark
                              ? "text-neutral-200"
                              : "text-neutral-800"
                          }`}
                        >
                          {treatment.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div
                    className={`mt-2 flex items-center justify-between border-t pt-5 ${
                      isDark
                        ? "border-white/10"
                        : "border-black/10"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                        isDark
                          ? "text-neutral-300 group-hover:text-white"
                          : "text-neutral-600 group-hover:text-black"
                      }`}
                    >
                      Explore Treatment
                    </span>

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1 ${
                        isDark
                          ? "bg-white text-neutral-900"
                          : "bg-neutral-900 text-white"
                      }`}
                    >
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {/* Closing CTA */}
        <section
          className={`mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 sm:mt-24 sm:flex-row sm:items-center ${
            isDark ? "border-white/15" : "border-black/10"
          }`}
        >
          <div>
            <p
              className={`mb-2 text-[10px] font-bold uppercase tracking-[0.25em] ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Your next self-care moment
            </p>

            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
              Ready for your appointment?
            </h2>
          </div>

          <Link
            href="/contact"
            className={`inline-flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
              isDark
                ? "bg-white text-neutral-900 hover:bg-neutral-200"
                : "bg-neutral-900 text-white hover:bg-neutral-700"
            }`}
          >
            Book a Consultation
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}