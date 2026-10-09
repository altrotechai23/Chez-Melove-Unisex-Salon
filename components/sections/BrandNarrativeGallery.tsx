"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  aspect: string;
}

const GALLERY_COLLECTION: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional hair styling in a luxury salon",
    aspect: "aspect-[3/4]",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=85",
    alt: "Contemporary salon interior and styling stations",
    aspect: "aspect-square",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    alt: "Hair styling and beauty craftsmanship",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    alt: "Relaxing facial skincare treatment",
    aspect: "aspect-[3/4]",
  },
];

export default function BrandNarrativeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const gallery = galleryRef.current;

    if (!section || !text || !gallery) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Narrative reveal animation
      const revealItems =
        text.querySelectorAll<HTMLElement>(".reveal-item");

      if (revealItems.length > 0) {
        gsap.fromTo(
          revealItems,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Asymmetric gallery parallax
      const galleryItems =
        gallery.querySelectorAll<HTMLElement>(".gallery-card");

      galleryItems.forEach((item, index) => {
        // Keep parallax restrained for a more premium, stable feel.
        const shift = index % 2 === 0 ? -12 : 12;

        gsap.to(item, {
          yPercent: shift,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="w-full overflow-hidden scroll-mt-16 bg-neutral-900 px-6 py-24 text-neutral-100 md:px-12 md:py-32"
      aria-labelledby="narrative-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Brand narrative */}
        <div
          ref={textRef}
          className="space-y-8 lg:sticky lg:top-32 lg:col-span-5"
        >
          <span className="reveal-item mb-3 block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
            02 / The Philosophy
          </span>

          <h2
            id="narrative-heading"
            className="reveal-item text-4xl font-light leading-tight tracking-tight text-white md:text-5xl"
          >
            Sanctuary of
            <br />
            <span className="font-serif italic text-neutral-400">
              Identity &amp; Form.
            </span>
          </h2>

          <p className="reveal-item text-sm font-light leading-relaxed text-neutral-400">
            Founded in the creative epicenter of Cape Town,{" "}
            <strong className="font-normal text-white">
              Chez Melove Unisex Salon
            </strong>{" "}
            brings together thoughtful hair design and personalized beauty
            experiences in a refined, welcoming environment.
          </p>

          <p className="reveal-item text-sm font-light leading-relaxed text-neutral-400">
            Every treatment is tailored to your natural texture, individual
            style, and personal needs. Take a moment away from the everyday
            and enjoy a considered salon experience designed around you.
          </p>

          <div className="reveal-item pt-4">
            <div className="inline-flex flex-col space-y-1 border-l border-neutral-700 pl-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Your Moment of Luxury
              </span>

              <span className="text-sm font-light text-neutral-300">
                Thoughtful Details. Personalised Care.
              </span>
            </div>
          </div>
        </div>

        {/* Editorial lookbook gallery */}
        <div
          ref={galleryRef}
          id="gallery"
          className="grid grid-cols-2 gap-4 pt-4 md:gap-8 lg:col-span-7 lg:pt-0"
          aria-label="Chez Melove editorial lookbook"
        >
          {GALLERY_COLLECTION.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-card group relative w-full overflow-hidden border border-neutral-800/50 bg-neutral-800 shadow-xl ${item.aspect} ${
                index % 2 === 1 ? "translate-y-8 md:translate-y-12" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.alt}
                className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}