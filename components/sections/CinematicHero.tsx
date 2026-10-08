"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

interface SlideItem {
  type: "image" | "video";
  url: string;
  fallbackUrl?: string;
  heading: string;
  subheading: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    type: "video",
    url: "https://mixkit.co",
    fallbackUrl: "https://unsplash.com",
    heading: "Chez Melove Salon",
    subheading: "Premium Editorial Craftsmanship — Cape Town"
  },
  {
    type: "image",
    url: "https://unsplash.com",
    heading: "Precision Aesthetics",
    subheading: "High-Performance Hair & Beauty Luxury"
  },
  {
    type: "image",
    url: "https://unsplash.com",
    heading: "Modern Architecture",
    subheading: "A Sanctuary Mapped For Dynamic Conversions"
  }
];

export default function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);

  const transitionToSlide = useCallback((nextIndex: number) => {
    if (isAnimating.current || nextIndex === current) return;
    isAnimating.current = true;

    const outgoingSlide = slidesRef.current[current];
    const incomingSlide = slidesRef.current[nextIndex];

    if (!outgoingSlide || !incomingSlide) {
      setCurrent(nextIndex);
      isAnimating.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      // Hardware-accelerated sliding crossfade transformation mechanics
      gsap.set(incomingSlide, { opacity: 0, scale: 1.08, zIndex: 2 });
      gsap.set(outgoingSlide, { zIndex: 1 });

      const incomingContent = incomingSlide.querySelectorAll(".animate-text");
      const outgoingContent = outgoingSlide.querySelectorAll(".animate-text");

      gsap.to(outgoingContent, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" });

      gsap.timeline({
        onComplete: () => {
          gsap.set(outgoingSlide, { opacity: 0 });
          setCurrent(nextIndex);
          isAnimating.current = false;
        }
      })
      .to(incomingSlide, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" })
      .fromTo(incomingContent, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.15 }, 
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [current]);

  const handleNext = useCallback(() => {
    const next = (current + 1) % HERO_SLIDES.length;
    transitionToSlide(next);
  }, [current, transitionToSlide]);

  const handlePrev = useCallback(() => {
    const prev = (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    transitionToSlide(prev);
  }, [current, transitionToSlide]);

  // Auto-advance baseline timer hook loops safely
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[95vh] w-full bg-neutral-950 overflow-hidden"
      aria-label="Chez Melove Interactive Hero Canvas"
    >
      {/* Carousel Visual Frame Buffer Stack */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          ref={(el) => { if (el) slidesRef.current[index] = el; }}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ 
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 2 : 1 
          }}
        >
          {/* Media Context Renderer Engine */}
          <div className="absolute inset-0 bg-neutral-950/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30 z-10" />
          
          {slide.type === "video" ? (
            <video
              src={slide.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-100"
              poster={slide.fallbackUrl}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.url}
              alt=""
              className="w-full h-full object-cover"
            />
          )}

          {/* Typography Matrix Overlays */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <span className="animate-text inline-block text-[10px] sm:text-xs uppercase tracking-[0.4em] text-neutral-300 font-semibold mb-4">
                {slide.subheading}
              </span>
              <h1 className="animate-text text-4xl sm:text-6xl md:text-8xl font-light text-white tracking-tight leading-[1.1] mb-8">
                {slide.heading.split(" ")[0]}{" "}
                <span className="font-serif italic font-normal text-neutral-300">
                  {slide.heading.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <div className="animate-text flex items-center justify-center gap-4">
                <Link
                  href="#booking"
                  className="bg-white text-neutral-950 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-transform active:scale-95"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Layout Micro-Pagination Controllers */}
      <div className="absolute bottom-24 md:bottom-12 left-6 right-6 z-30 flex items-center justify-between max-w-7xl mx-auto pointer-events-none">
        <div className="flex space-x-3 pointer-events-auto">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 border border-white/20 bg-black/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-neutral-950 transition-all text-xs font-mono"
            aria-label="Previous Slide Matrix"
          >
            &#8592;
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 border border-white/20 bg-black/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-neutral-950 transition-all text-xs font-mono"
            aria-label="Next Slide Matrix"
          >
            &#8594;
          </button>
        </div>

        {/* Cinematic Linear Track Progression Monitor */}
        <div className="flex items-center space-x-4 pointer-events-auto hidden sm:flex">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => transitionToSlide(i)}
              className="group py-2 focus:outline-none"
              aria-label={`Jump to slide ${i + 1}`}
            >
              <div className={`h-[2px] transition-all duration-500 ${i === current ? "w-12 bg-white" : "w-6 bg-white/30 group-hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
