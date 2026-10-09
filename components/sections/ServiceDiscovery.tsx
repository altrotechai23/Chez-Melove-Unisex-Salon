"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "hair" | "aesthetics" | "wellness";
  duration: string;
  price: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "h1",
    slug: "editorial-cut-style",
    title: "Editorial Precision Cut & Style",
    category: "hair",
    duration: "60 min",
    price: "R 650 - R 950",
    description:
      "High-end bespoke structural cutting tailored to individual texture and identity, including a luxury scalp massage and premium blowout finish.",
    benefits: [
      "Bespoke mapping",
      "Premium styling",
      "Scalp detox therapy",
    ],
    imageUrl: "/images/chezmelove/hair-men.jpeg",
  },
  {
    id: "h2",
    slug: "signature-balayage-dimensional-tone",
    title: "Signature Balayage & Dimensional Tone",
    category: "hair",
    duration: "180 min",
    price: "R 1,800 - R 2,600",
    description:
      "Hand-painted, fluid color gradients that grow out gracefully. Customized processing to preserve hair strand health and structure.",
    benefits: [
      "Olaplex bond shield",
      "Custom tone calibration",
      "UV defense glaze",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "a1",
    slug: "advanced-microneedling-collagen-therapy",
    title: "Advanced Micro-Needling Collagen Therapy",
    category: "aesthetics",
    duration: "75 min",
    price: "R 1,400",
    description:
      "Precision-focused skin rejuvenation designed to improve the appearance of fine lines, uneven tone, and skin texture.",
    benefits: [
      "Personalized skin consultation",
      "Targeted skin treatment",
      "Post-treatment care guidance",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "a2",
    slug: "hydro-infusion-deep-pore-resurfacing",
    title: "Hydro-Infusion Deep Pore Resurfacing",
    category: "aesthetics",
    duration: "45 min",
    price: "R 850",
    description:
      "A refreshing facial treatment combining deep cleansing and targeted serum application for a smoother, revitalized-looking complexion.",
    benefits: [
      "Deep pore cleansing",
      "Hydration boost",
      "Antioxidant skincare",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "w1",
    slug: "aromatherapy-stress-release",
    title: "Aromatherapy Stress Release",
    category: "wellness",
    duration: "90 min",
    price: "R 1,100",
    description:
      "A restorative relaxation experience combining massage techniques and aromatic oils to help ease everyday tension.",
    benefits: [
      "Relaxing massage experience",
      "Aromatic oil selection",
      "Restorative atmosphere",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "w2",
    slug: "detoxifying-scalp-spa-blowout",
    title: "Detoxifying Scalp Spa & Blowout Combination",
    category: "hair",
    duration: "75 min",
    price: "R 750",
    description:
      "A scalp-care experience paired with deep conditioning and a polished blowout for refreshed roots and a glossy finish.",
    benefits: [
      "Scalp exfoliation",
      "Conditioning treatment",
      "High-gloss styling finish",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
];

const CATEGORIES = [
  { slug: "all", label: "All Treatments" },
  { slug: "hair", label: "Hair Crafting" },
  { slug: "aesthetics", label: "Modern Aesthetics" },
  { slug: "wellness", label: "Luxury Wellness" },
] as const;

type Category = (typeof CATEGORIES)[number]["slug"];

export default function ServiceDiscovery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [visibleServices, setVisibleServices] =
    useState<ServiceItem[]>(SERVICES_DATA);

  const gridRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const activeCategoryRef = useRef<Category>("all");

  const handleCategoryChange = useCallback(
    (category: Category) => {
      if (category === activeCategoryRef.current) return;

      activeCategoryRef.current = category;
      setActiveCategory(category);

      // Stop any unfinished filter animation.
      animationRef.current?.kill();

      const grid = gridRef.current;

      if (!grid) {
        setVisibleServices(
          category === "all"
            ? SERVICES_DATA
            : SERVICES_DATA.filter(
                (service) => service.category === category,
              ),
        );
        return;
      }

      const cards = grid.querySelectorAll<HTMLElement>(".service-card");

      if (cards.length === 0) {
        setVisibleServices(
          category === "all"
            ? SERVICES_DATA
            : SERVICES_DATA.filter(
                (service) => service.category === category,
              ),
        );
        return;
      }

      animationRef.current = gsap.timeline({
        onComplete: () => {
          setVisibleServices(
            category === "all"
              ? SERVICES_DATA
              : SERVICES_DATA.filter(
                  (service) => service.category === category,
                ),
          );
        },
      });

      animationRef.current.to(cards, {
        opacity: 0,
        y: 15,
        scale: 0.98,
        duration: 0.25,
        stagger: 0.035,
        ease: "power2.in",
      });
    },
    [],
  );

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".service-card");

    if (cards.length === 0) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 24,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, grid);

    return () => {
      context.revert();
      animationRef.current?.kill();
      animationRef.current = null;
    };
  }, [visibleServices]);

  return (
    <section
      id="services"
      className="w-full scroll-mt-16 border-b border-neutral-200 bg-neutral-50 px-5 py-20 text-neutral-900 sm:px-8 md:px-12 md:py-24"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-xl md:mb-12">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
            01 / Core Capabilities
          </span>

          <h2
            id="services-title"
            className="text-3xl font-light leading-tight tracking-tight text-neutral-900 md:text-5xl"
          >
            The Menu Matrix.
          </h2>

          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-neutral-500">
            Discover considered treatments, refined techniques, and
            personalized experiences designed around you.
          </p>
        </header>

        {/* Horizontally scrollable category filters */}
        <div className="relative mb-12 border-b border-neutral-200/80 md:mb-16">
          <div
            className="flex snap-x snap-mandatory items-center gap-8 overflow-x-auto pb-4 sm:gap-12"
            role="tablist"
            aria-label="Treatment categories"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <button
                  key={category.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="service-results"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`relative flex-shrink-0 snap-start whitespace-nowrap py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:text-xs ${
                    isActive
                      ? "font-bold text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {category.label}

                  {isActive && (
                    <span className="absolute -bottom-[17px] left-0 z-10 h-[2px] w-full bg-neutral-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service cards */}
        <div
          id="service-results"
          ref={gridRef}
          role="tabpanel"
          className="grid min-h-[500px] grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {visibleServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-label={`View details for ${service.title}`}
              className="service-card group flex flex-col overflow-hidden border border-neutral-200/80 bg-white shadow-sm transition-colors duration-500 hover:border-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
            >
              <article className="flex h-full w-full flex-col justify-between">
                <div>
                  {/* Editorial image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <div className="absolute left-4 top-4 z-10">
                      <span className="bg-neutral-950/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Service details */}
                  <div className="p-6 pb-4 md:p-8 md:pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400">
                        {service.duration}
                      </span>

                      <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400">
                        Treatment
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-light tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600">
                      {service.title}
                    </h3>

                    <p className="mb-6 text-xs font-light leading-relaxed text-neutral-500">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Benefits and pricing */}
                <div className="mt-auto p-6 pt-0 md:p-8 md:pt-0">
                  <ul
                    className="mb-6 space-y-2 border-t border-neutral-100 pt-4"
                    aria-label="Treatment benefits"
                  >
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-xs font-light text-neutral-500"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-400"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between gap-4 border-t border-neutral-100 pt-5">
                    <div>
                      <span className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                        From
                      </span>

                      <p className="text-sm font-medium tracking-tight text-neutral-950">
                        {service.price}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-900 transition-transform duration-300 group-hover:translate-x-1">
                      View Details
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {visibleServices.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <p className="text-lg font-light text-neutral-700">
              More treatments are on the way.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Please check back soon.
            </p>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs font-light leading-relaxed text-neutral-500">
            Not sure which treatment is right for you?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            Speak to our team
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}