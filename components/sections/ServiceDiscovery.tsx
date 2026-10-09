"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import gsap from "gsap";

interface ServiceItem {
  id: string;
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
    title: "Editorial Precision Cut & Style",
    category: "hair",
    duration: "60 min",
    price: "R 650 - R 950",
    description: "High-end bespoke structural cutting tailored to individual texture and identity, including a luxury scalp massage and premium blowout finish.",
    benefits: ["Bespoke mapping", "Premium styling", "Scalp detox therapy"],
    imageUrl: "https://unsplash.com"
  },
  {
    id: "h2",
    title: "Signature Balayage & Dimensional Tone",
    category: "hair",
    duration: "180 min",
    price: "R 1,800 - R 2,600",
    description: "Hand-painted, fluid color gradients that grow out gracefully. Customized processing to preserve hair strand health and structure.",
    benefits: ["Olaplex bond shield", "Custom tone calibration", "UV defense glaze"],
    imageUrl: "https://unsplash.com"
  },
  {
    id: "a1",
    title: "Advanced Micro-Needling Collagen Therapy",
    category: "aesthetics",
    duration: "75 min",
    price: "R 1,400",
    description: "Medical-grade precision dermal remodeling to smooth out fine lines, correct hyperpigmentation, and naturally trigger cell renewal.",
    benefits: ["Hyaluronic moisture pack", "Zero recovery peeling", "Cellular rejuvenation"],
    imageUrl: "https://unsplash.com"
  },
  {
    id: "a2",
    title: "Hydro-Infusion Deep Pore Resurfacing",
    category: "aesthetics",
    duration: "45 min",
    price: "R 850",
    description: "Multistep vortex extraction and custom serum infusion targeting urban environmental stressors specific to Cape Town coastal humidity.",
    benefits: ["Instant cellular glow", "Deep blackhead removal", "Antioxidant seal"],
    imageUrl: "https://unsplash.com"
  },
  {
    id: "w1",
    title: "Aromatherapy Stress Release",
    category: "wellness",
    duration: "90 min",
    price: "R 1,100",
    description: "Deep tissue physical tension resetting using targeted essential oil infusions designed to mitigate executive burnout stressors.",
    benefits: ["Lymphatic system flush", "Hot basalt stone finish", "Mindfulness focus"],
    imageUrl: "https://unsplash.com"
  },
  {
    id: "w2",
    title: "Detoxifying Scalp Spa & Blowout Combination",
    category: "hair",
    duration: "75 min",
    price: "R 750",
    description: "Micro-circulation hair root exfoliation treatment paired with deep structural conditioning to counter mineral hard-water exposure.",
    benefits: ["Follicle clear scaling", "Aromatheraputic rinse", "High-gloss editorial finish"],
    imageUrl: "https://unsplash.com"
  }
];

const CATEGORIES = [
  { slug: "all", label: "All Treatments" },
  { slug: "hair", label: "Hair Crafting" },
  { slug: "aesthetics", label: "Modern Aesthetics" },
  { slug: "wellness", label: "Luxury Wellness" }
] as const;

export default function ServiceDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleServices, setVisibleServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    const cards = gridRef.current?.querySelectorAll(".service-card");
    if (!cards || cards.length === 0) {
      setActiveCategory(category);
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: 15,
      scale: 0.97,
      duration: 0.3,
      stagger: 0.04,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(category);
        const nextServices = category === "all" 
          ? SERVICES_DATA 
          : SERVICES_DATA.filter((item) => item.category === category);
        setVisibleServices(nextServices);
      }
    });
  };

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".service-card");
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power4.out",
        clearProps: "all"
      }
    );
  }, [visibleServices]);

  return (
    <section 
      id="services" 
      className="bg-neutral-50 text-neutral-900 py-24 px-6 md:px-12 w-full border-b border-neutral-200 scroll-mt-16"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold block mb-3">
            01 / Core Capabilities
          </span>
          <h2 
            id="services-title"
            className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight"
          >
            The Menu Matrix.
          </h2>
        </div>

        {/* Horizontal Navigation Tab Rail */}
        <div className="w-full border-b border-neutral-200/80 mb-16 relative">
          <div 
            className="flex items-center space-x-12 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory touch-pan-x"
            role="tablist"
            aria-label="Treatment Category Filter Rail"
            style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                role="tab"
                aria-selected={activeCategory === cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-xs uppercase tracking-[0.25em] font-medium py-2 transition-all duration-300 relative focus:outline-none flex-shrink-0 snap-start whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.slug 
                    ? "text-neutral-950 font-bold" 
                    : "text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {cat.label}
                {activeCategory === cat.slug && (
                  <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-neutral-950 z-10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Service Grid Workspace */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]"
        >
          {visibleServices.map((service) => (
            <article 
              key={service.id}
              className="service-card bg-white border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-900 transition-colors duration-500 group shadow-sm will-change-transform overflow-hidden"
            >
              <div>
                {/* Immersive Editorial Image Mask Container */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] uppercase tracking-[0.25em] bg-neutral-950/80 backdrop-blur-md text-white font-bold px-2.5 py-1">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content Payload Padding Wrapper */}
                <div className="p-8 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neutral-400 font-mono">
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-neutral-900 tracking-tight mb-3">
                    {service.title}
                  </h3>

                  <p className="text-neutral-500 font-light text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <ul className="space-y-2 mb-6 border-t border-neutral-100 pt-4" aria-label="Treatment metrics">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-[11px] text-neutral-400 font-light tracking-wide">
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full mr-2.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
                  <span className="text-sm font-semibold tracking-wide text-neutral-900">
                    {service.price}
                  </span>
                                    <a
                    href="#booking"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300"
                    aria-label={`Book ${service.title}`}
                  >
                    Select →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Closing Editorial Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Every treatment is tailored to your individual needs.
          </p>

          <a
            href="#booking"
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            Discover Your Treatment
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}