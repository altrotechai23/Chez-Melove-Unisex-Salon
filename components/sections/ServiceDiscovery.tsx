"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import { SERVICES_DATA } from "@/data/services";

const SITE_NAME = "Chez Melove Unisex Salon";
const MAX_FEATURED_SERVICES = 6;

const CATEGORY_ORDER = [
  "hair",
  "braiding",
  "aesthetics",
  "wellness",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  hair: "Hair",
  braiding: "Braids & Locs",
  aesthetics: "Nails & Beauty",
  wellness: "Wellness",
};

export default function FeaturedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const featuredServices = useMemo(() => {
    const selected = new Set<string>();

    // First, include one service from each available category.
    for (const category of CATEGORY_ORDER) {
      const service = SERVICES_DATA.find(
        (item) =>
          item.category === category &&
          !selected.has(item.slug),
      );

      if (service) {
        selected.add(service.slug);
      }
    }

    // Add a second service from each category where available.
    for (const category of CATEGORY_ORDER) {
      if (selected.size >= MAX_FEATURED_SERVICES) break;

      const service = SERVICES_DATA.find(
        (item) =>
          item.category === category &&
          !selected.has(item.slug),
      );

      if (service) {
        selected.add(service.slug);
      }
    }

    // Fill remaining spaces from the existing catalogue.
    for (const service of SERVICES_DATA) {
      if (selected.size >= MAX_FEATURED_SERVICES) break;
      selected.add(service.slug);
    }

    // Preserve the original catalogue order in the rendered cards.
    return SERVICES_DATA.filter((service) =>
      selected.has(service.slug),
    ).slice(0, MAX_FEATURED_SERVICES);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const context = gsap.context(() => {
      const heading = section.querySelectorAll("[data-featured-heading]");
      const serviceCards = cards.querySelectorAll(
        "[data-featured-card]",
      );
      const footer = section.querySelector("[data-featured-footer]");

      gsap.fromTo(
        heading,
        {
          autoAlpha: 0,
          y: 22,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: undefined,
        },
      );

      gsap.fromTo(
        serviceCards,
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.12,
          clearProps: "transform",
        },
      );

      if (footer) {
        gsap.fromTo(
          footer,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            delay: 0.3,
            ease: "power2.out",
          },
        );
      }
    }, section);

    return () => context.revert();
  }, []);

  if (featuredServices.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-services-heading"
      className="relative overflow-hidden bg-[#faf9f6] py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-stone-200/40 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div
              data-featured-heading
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3.5 py-2"
            >
              <Sparkles
                size={14}
                className="text-stone-600"
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                {SITE_NAME} · Cape Town
              </span>
            </div>

            <h2
              id="featured-services-heading"
              data-featured-heading
              className="text-4xl font-normal leading-[1.08] tracking-[-0.045em] text-stone-900 sm:text-5xl lg:text-6xl"
            >
              Discover your
              <br />
              <span className="font-serif italic text-stone-500">
                signature look.
              </span>
            </h2>

            <p
              data-featured-heading
              className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8"
            >
              From beautiful braids to hair styling and beauty essentials,
              explore a few of our services and find your next look.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
          >
            Explore all services
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Featured cards */}
        <div
          ref={cardsRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:gap-5 sm:px-8 lg:-mx-12 lg:gap-6 lg:px-12"
        >
          {featuredServices.map((service) => {
            const previewItems = service.benefits
              .filter(Boolean)
              .slice(0, 2);

            return (
              <article
                key={service.id}
                data-featured-card
                className="group flex w-[82%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-[border-color,box-shadow] duration-300 hover:border-stone-300 hover:shadow-[0_24px_60px_-32px_rgba(41,37,36,0.3)] sm:w-[45%] lg:w-[calc((100%-3rem)/3)]"
              >
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`Discover ${service.title}`}
                  className="relative block overflow-hidden bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-inset"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.imageUrl}
                      alt={`${service.title} at ${SITE_NAME}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md sm:left-4 sm:top-4">
                      {CATEGORY_LABELS[service.category] ??
                        service.category}
                    </span>

                    <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-stone-900 sm:bottom-4 sm:right-4">
                      <ArrowUpRight size={18} strokeWidth={1.6} />
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-lg font-medium leading-snug tracking-tight text-stone-900 sm:text-xl">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors hover:text-stone-500 focus-visible:outline-none focus-visible:underline"
                    >
                      {service.title}
                    </Link>
                  </h3>

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
                            className="mt-0.5 shrink-0 text-stone-400"
                            aria-hidden="true"
                          />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-5">
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                        Listed price
                      </p>
                      <p className="mt-1 break-words text-lg font-semibold tracking-tight text-stone-900">
                        {service.price.replace(/^From\s*/i, "")}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-stone-200 px-3.5 py-2 text-xs font-semibold text-stone-800 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
                    >
                      Explore
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer link and swipe cue */}
        <div
          data-featured-footer
          className="flex flex-col gap-4 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs leading-6 text-stone-500">
            A selection of {featuredServices.length} services from our full
            salon menu.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400 sm:hidden">
              Swipe to explore
            </span>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-800 transition-colors hover:text-stone-500"
            >
              View the full service menu
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
