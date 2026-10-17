
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BRANDS = [
  {
    name: "TRESemmé",
    logo: "/images/brands/treseme.jpg",
    color: "#f5f5f5",
  },
  {
    name: "Dark and Lovely",
    logo: "/images/brands/dark-and-lovely.jpg",
    color: "#f0e7ff",
  },
  {
    name: "Mizani",
    logo: "/images/brands/mizani.jpg",
    color: "#fffaf0",
  },
  {
    name: "Organics",
    logo: "/images/brands/organics.jpg",
    color: "#edf6d8",
  },
  {
    name: "Forever Aloe Vera",
    logo: "/images/brands/forever.jpg",
    color: "#fff4c7",
  },
] as const;

const INITIAL_INDEX = 2;

function wrapIndex(index: number) {
  return ((index % BRANDS.length) + BRANDS.length) % BRANDS.length;
}

export default function BrandMarquee() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(INITIAL_INDEX);
  const timerRef = useRef<gsap.core.Tween | null>(null);
  const animationRef = useRef<gsap.core.Tween[]>([]);

  const visibleRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const moveRef = useRef<(index: number) => void>(() => {});
  const scheduleRef = useRef<() => void>(() => {});

  const clearAnimations = useCallback(() => {
    timerRef.current?.kill();
    timerRef.current = null;

    animationRef.current.forEach((animation) => animation.kill());
    animationRef.current = [];
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;

    if (!section || !carousel) return;

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-brand-card]"),
    );

    if (!cards.length) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    let disposed = false;

    const getOffset = (index: number, active: number) => {
      let offset = index - active;

      if (offset > Math.floor(BRANDS.length / 2)) {
        offset -= BRANDS.length;
      }

      if (offset < -Math.floor(BRANDS.length / 2)) {
        offset += BRANDS.length;
      }

      return offset;
    };

    const getCardPosition = (index: number, active: number) => {
      const offset = getOffset(index, active);
      const distance = Math.abs(offset);
      const isMobile = window.innerWidth < 640;
      const spacing = isMobile ? 155 : window.innerWidth < 1024 ? 205 : 245;

      return {
        x: offset * spacing,
        z: -distance * (isMobile ? 65 : 100),
        rotateY: offset * -18,
        scale: Math.max(0.72, 1 - distance * 0.11),
        opacity: distance > 2 ? 0 : Math.max(0.35, 1 - distance * 0.2),
        filter: `blur(${distance * 0.35}px)`,
      };
    };

    const positionCards = (active: number) => {
      cards.forEach((card, index) => {
        gsap.set(card, getCardPosition(index, active));
      });
    };

    const scheduleNext = () => {
      timerRef.current?.kill();
      timerRef.current = null;

      if (
        disposed ||
        reducedMotionRef.current ||
        pausedRef.current ||
        !visibleRef.current
      ) {
        return;
      }

      // One-second pause before moving to the next brand.
      timerRef.current = gsap.delayedCall(1, () => {
        moveTo(activeIndexRef.current + 1);
      });
    };

    const moveTo = (requestedIndex: number) => {
      clearAnimations();

      const next = wrapIndex(requestedIndex);

      activeIndexRef.current = next;
      setActiveIndex(next);

      if (reducedMotionRef.current) {
        positionCards(next);
        return;
      }

      cards.forEach((card, index) => {
        const animation = gsap.to(card, {
          ...getCardPosition(index, next),
          duration: 0.85,
          ease: "power3.inOut",
          overwrite: "auto",
        });

        animationRef.current.push(animation);
      });

      // Wait for the transition and then pause for one second.
      if (!pausedRef.current && visibleRef.current) {
        timerRef.current = gsap.delayedCall(1.85, scheduleNext);
      }
    };

    moveRef.current = moveTo;
    scheduleRef.current = scheduleNext;

    positionCards(activeIndexRef.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          timerRef.current?.pause();
          animationRef.current.forEach((animation) => animation.pause());
          return;
        }

        if (pausedRef.current || reducedMotionRef.current) return;

        animationRef.current.forEach((animation) => animation.resume());

        if (timerRef.current) {
          timerRef.current.resume();
        } else {
          scheduleNext();
        }
      },
      { threshold: 0.1 },
    );

    const handleMotionPreference = () => {
      reducedMotionRef.current = media.matches;

      if (media.matches) {
        clearAnimations();
        positionCards(activeIndexRef.current);
      } else if (visibleRef.current && !pausedRef.current) {
        scheduleNext();
      }
    };

    reducedMotionRef.current = media.matches;

    observer.observe(section);
    media.addEventListener("change", handleMotionPreference);

    const handleResize = () => {
      positionCards(activeIndexRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("resize", handleResize);

      clearAnimations();

      moveRef.current = () => {};
      scheduleRef.current = () => {};

      gsap.set(cards, { clearProps: "transform,opacity,filter" });
    };
  }, [clearAnimations]);

  const goTo = (index: number) => {
    moveRef.current(index);
  };

  const pause = () => {
    pausedRef.current = true;
    timerRef.current?.pause();
    animationRef.current.forEach((animation) => animation.pause());
  };

  const resume = () => {
    pausedRef.current = false;

    if (reducedMotionRef.current || !visibleRef.current) return;

    animationRef.current.forEach((animation) => animation.resume());

    if (timerRef.current) {
      timerRef.current.resume();
    } else {
      scheduleRef.current();
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="brand-marquee-heading"
      className="relative overflow-hidden bg-[#faf9f6] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-400">
          Our professional hair-care brands
        </p>

        <h2
          id="brand-marquee-heading"
          className="mt-4 font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-5xl"
        >
          Care behind every look.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Discover the brands featured in the Chez Melove Unisex Salon
          experience.
        </p>
      </div>

      <div
        className="relative mx-auto mt-12 h-[300px] max-w-[1500px] sm:mt-16 sm:h-[390px]"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            resume();
          }
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#faf9f6] to-transparent sm:w-28" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#faf9f6] to-transparent sm:w-28" />

        <div
          ref={carouselRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {BRANDS.map((brand, index) => (
            <article
              key={brand.name}
              data-brand-card
              aria-label={brand.name}
              aria-current={activeIndex === index ? "true" : undefined}
              className="absolute left-1/2 top-1/2 w-[235px] sm:w-[330px]"
              style={{
                marginLeft: "-117.5px",
                marginTop: "-115px",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
            >
              <div
                className="relative h-[230px] w-full overflow-hidden rounded-2xl border border-white/80 sm:h-[290px] sm:rounded-3xl"
                style={{
                    backgroundColor: brand.color,
                    boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,.9), 0 30px 70px -38px rgba(40,30,20,.35)",
                }}
                >
                {/* Full-card brand image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={brand.logo}
                    alt={brand.name}
                    loading={index === INITIAL_INDEX ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndexRef.current - 1)}
          aria-label="Previous brand"
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/85 text-stone-700 shadow-sm backdrop-blur transition hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 sm:left-8 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => goTo(activeIndexRef.current + 1)}
          aria-label="Next brand"
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/85 text-stone-700 shadow-sm backdrop-blur transition hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 sm:right-8 sm:h-12 sm:w-12"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2" aria-label="Brand position">
        {BRANDS.map((brand, index) => (
          <button
            key={brand.name}
            type="button"
            aria-label={`Show ${brand.name}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => goTo(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-9 bg-stone-900"
                : "w-4 bg-stone-300"
            }`}
          />
        ))}
      </div>

      <p
        className="mt-5 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-stone-400"
        aria-live="polite"
      >
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(BRANDS.length).padStart(2, "0")}
      </p>
    </section>
  );
}
