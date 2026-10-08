"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create subtle entrance sequences matching heavy inertia scroll behavior
      gsap.fromTo(
        accentRef.current,
        { opacity: 0, y: 30, letterSpacing: "0.1em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 1.6, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.8, ease: "power4.out", delay: 0.4 }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] w-full flex items-center justify-center bg-neutral-950 px-6 md:px-12 overflow-hidden"
      aria-label="Chez Melove Cinematic Presentation"
    >
      {/* Background Graphic Grid Textures */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Decorative Atmospheric Light Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span 
          ref={accentRef}
          className="inline-block text-xs uppercase text-neutral-400 font-semibold tracking-[0.3em] mb-6"
        >
          Cape Town &bull; Luxury Unisex Space
        </span>

        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-neutral-50 mb-8 max-w-4xl mx-auto leading-[1.05]"
        >
          Editorial Identity. <br />
          <span className="font-serif italic text-neutral-400 font-normal">Chez Melove</span> Salon.
        </h1>

        <p className="text-sm md:text-base text-neutral-400 font-light tracking-wide max-w-xl mx-auto mb-12 leading-relaxed">
          Crafting premium hair configurations and high-performance beauty styling within an architectural sanctuary built for conversion efficiency.
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-neutral-100 text-neutral-900 px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors duration-300"
          >
            Instant Online Reservation
          </Link>
          <Link
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-neutral-700 text-neutral-300 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-900 hover:text-white transition-colors duration-300"
          >
            Explore Treatments
          </Link>
        </div>
      </div>

      {/* Bottom Positioning Anchor Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 opacity-40">
        <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-light">Scroll Discovery</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
