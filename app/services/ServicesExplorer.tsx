"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import { SERVICES_DATA } from "@/data/services";

const CATEGORY_DETAILS = [
  {
    slug: "hair",
    eyebrow: "01 / Hair",
    title: "Hair, your way.",
    description:
      "Explore cuts, styling, treatments, colour and finishing services tailored to your look.",
  },
  {
    slug: "braiding",
    eyebrow: "02 / Braiding & Locs",
    title: "Made to stand out.",
    description:
      "Discover braids, cornrows, twists, locs and protective styles in different sizes and lengths.",
  },
  {
    slug: "aesthetics",
    eyebrow: "03 / Beauty",
    title: "The finishing touch.",
    description:
      "Complete your look with nail care, manicures, pedicures, lashes and beauty services.",
  },
  {
    slug: "wellness",
    eyebrow: "04 / Wellness",
    title: "Time for yourself.",
    description:
      "Explore our wellness offerings and find the right service for your next visit.",
  },
] as const;

type CategorySlug = (typeof CATEGORY_DETAILS)[number]["slug"];

const CATEGORY_LABELS: Record<string, string> = {
  hair: "Hair",
  braiding: "Braids & Locs",
  aesthetics: "Nails & Beauty",
  wellness: "Wellness",
};

export default function ServicesExplorer() {
  const availableCategories = CATEGORY_DETAILS.filter((category) =>
    SERVICES_DATA.some((service) => service.category === category.slug),
  );

  const [activeCategory, setActiveCategory] = useState<CategorySlug>(
    availableCategories[0]?.slug ?? "hair",
  );

  const railRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const animationContext = useRef<gsap.Context | null>(null);

  const activeDetails = availableCategories.find(
    (category) => category.slug === activeCategory,
  );

  const visibleServices = SERVICES_DATA.filter(
    (service) => service.category === activeCategory,
  );

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    animationContext.current?.revert();

    animationContext.current = gsap.context(() => {
      const cards = rail.querySelectorAll<HTMLElement>(
        "[data-service-card]",
      );

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          x: 34,
          y: 12,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.55,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, rail);

    return () => {
      animationContext.current?.revert();
      animationContext.current = null;
    };
  }, [activeCategory]);

  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector<HTMLElement>(
      `[data-category-tab="${activeCategory}"]`,
    );

    activeTab?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  function moveRail(direction: "previous" | "next") {
    const rail = railRef.current;

    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>(
      "[data-service-card]",
    );

    const distance = firstCard
      ? firstCard.getBoundingClientRect().width + 20
      : rail.clientWidth * 0.8;

    rail.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="service-menu"
      className="scroll-mt-24 bg-[#faf9f6] pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24"
      aria-label="Explore salon services"
    >
      {/* Sticky category navigation */}
      <div className="sticky top-16 z-30 border-y border-stone-200/80 bg-[#faf9f6]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filter services by category"
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {availableCategories.map((category) => {
              const selected = activeCategory === category.slug;
              const count = SERVICES_DATA.filter(
                (service) => service.category === category.slug,
              ).length;

              return (
                <button
                  key={category.slug}
                  id={`tab-${category.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="service-category-panel"
                  data-category-tab={category.slug}
                  onClick={() =>
                    setActiveCategory(category.slug as CategorySlug)
                  }
                  className={`group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 ${
                    selected
                      ? "border-stone-900 bg-stone-900 text-white shadow-md"
                      : "border-stone-200 bg-white/80 text-stone-600 hover:border-stone-400 hover:bg-white hover:text-stone-950"
                  }`}
                >
                  <span>{CATEGORY_LABELS[category.slug]}</span>

                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] ${
                      selected
                        ? "bg-white/15 text-white"
                        : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active category content */}
      <div className="mx-auto max-w-7xl px-4 pt-9 sm:px-8 sm:pt-12 lg:px-12 lg:pt-16">
        <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
              {activeDetails?.eyebrow ?? "Chez Melove / Services"}
            </p>

            <h2 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-6xl">
              {activeDetails?.title ?? "Find your look."}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
              {activeDetails?.description}
            </p>
          </div>

          {/* Desktop carousel controls */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => moveRail("previous")}
              aria-label="Scroll to previous services"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={() => moveRail("next")}
              aria-label="Scroll to more services"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Horizontal swipeable service cards */}
        <div
          id="service-category-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
        >
          <div
            ref={railRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-7 pt-2 sm:-mx-8 sm:gap-5 sm:px-8 lg:-mx-12 lg:gap-6 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visibleServices.map((service) => {
              const previewItems = service.benefits
                .filter(Boolean)
                .slice(0, 2);

              return (
                <article
                  key={service.id}
                  data-service-card
                  className="group flex w-[84%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_8px_30px_-24px_rgba(28,25,23,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-stone-300 hover:shadow-[0_24px_55px_-30px_rgba(28,25,23,0.32)] sm:w-[48%] lg:w-[calc((100%-3rem)/3)]"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="relative block overflow-hidden bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-inset"
                    aria-label={`View ${service.title} details`}
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={`${service.title} at Chez Melove Unisex Salon`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

                      <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-4 sm:top-4">
                        {CATEGORY_LABELS[service.category] ??
                          service.category}
                      </span>

                      <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-stone-900 sm:bottom-4 sm:right-4">
                        <ArrowUpRight size={18} strokeWidth={1.6} />
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-medium leading-snug tracking-tight text-stone-900 sm:text-xl">
                        <Link
                          href={`/services/${service.slug}`}
                          className="transition-colors hover:text-stone-500 focus-visible:outline-none focus-visible:underline"
                        >
                          {service.title}
                        </Link>
                      </h3>

                      <Sparkles
                        size={16}
                        strokeWidth={1.4}
                        className="mt-1 shrink-0 text-stone-400"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-3 line-clamp-3 text-xs leading-6 text-stone-500 sm:text-sm">
                      {service.description}
                    </p>

                    {previewItems.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                        {previewItems.map((item, index) => (
                          <li
                            key={`${service.id}-${index}`}
                            className="flex items-start gap-2 text-xs leading-5 text-stone-600"
                          >
                            <Check
                              size={14}
                              strokeWidth={1.8}
                              className="mt-0.5 shrink-0 text-stone-400"
                              aria-hidden="true"
                            />
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-5">
                      <div className="flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                            Listed price
                          </p>
                          <p className="mt-1 break-words text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
                            {service.price.replace(/^From\s*/i, "")}
                          </p>
                        </div>

                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-stone-200 px-3.5 py-2 text-xs font-semibold text-stone-800 transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
                        >
                          Details
                          <ArrowRight
                            size={13}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile scroll hint */}
          {visibleServices.length > 1 && (
            <div className="flex items-center justify-between gap-4 sm:hidden">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
                Swipe to explore
              </p>

              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-1.5 w-6 rounded-full bg-stone-900" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
              </div>
            </div>
          )}

          {visibleServices.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center">
              <p className="text-sm text-stone-500">
                No services are currently listed in this category.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-stone-500">
            Showing {visibleServices.length}{" "}
            {visibleServices.length === 1 ? "service" : "services"} in{" "}
            {CATEGORY_LABELS[activeCategory]}.
          </p>

          <Link
            href="/booking"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
          >
            Book an appointment
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
