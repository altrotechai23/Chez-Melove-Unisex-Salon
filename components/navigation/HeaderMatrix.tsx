"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  seoContext: string;
}

const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Services", href: "#services", seoContext: "Premium Hair & Aesthetic Treatments" },
  { label: "Our Story", href: "#story", seoContext: "About Chez Melove Salon" },
  { label: "Gallery", href: "#gallery", seoContext: "Editorial Lookbook" },
  { label: "Contact", href: "#contact", seoContext: "Find Us in Cape Town" },
];

export default function HeaderMatrix() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out border-b ${
        isScrolled 
          ? "bg-neutral-50/90 backdrop-blur-xl border-neutral-200/50 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      {/* Hidden H2 for Semantics & Top-Ranked Local SEO Indexing Engine */}
      <h2 className="sr-only">Chez Melove Unisex Salon Cape Town — Editorial Navigation Matrix</h2>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Horizontal Logo Variant Structure */}
        <Link 
          href="/" 
          className="flex items-center space-x-3 group outline-none"
          aria-label="Chez Melove Unisex Salon Home"
        >
          <div className="flex items-center tracking-[0.25em] font-light text-xl transition-colors duration-300 text-neutral-900">
            <span className="font-medium mr-2">ME</span>
            <span className="text-neutral-400 font-extralight group-hover:text-neutral-900 transition-colors duration-300">LOVE</span>
            <span className="hidden sm:inline-block ml-4 pl-4 border-l border-neutral-300 text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-medium">
              Unisex Salon
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation Structure */}
        <nav className="hidden md:flex items-center space-x-10" aria-label="Main Editorial Navigation">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-300 group py-2"
              title={item.seoContext}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Dynamic High-Conversion Local Lead Capture Engine */}
        <div className="flex items-center space-x-6">
          <Link
            href="#booking"
            className="relative overflow-hidden inline-flex items-center justify-center bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium rounded-none hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-neutral-900/10 hover:shadow-neutral-900/20 transform hover:-translate-y-0.5 active:translate-y-0"
            role="button"
            aria-label="Book a premium salon appointment"
          >
            Book Session
          </Link>

          {/* Minimalist Mobile Menu Toggle Switch */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1.5 focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation matrix layout"
          >
            <span className={`w-6 h-[1.5px] bg-neutral-900 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-[1.5px] bg-neutral-900 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1.5px] bg-neutral-900 transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Panel Layout Wrapper */}
      <div 
        className={`fixed inset-0 top-[65px] bg-neutral-50 z-40 w-full transform transition-transform duration-500 ease-in-out md:hidden border-t border-neutral-100 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-8 space-y-6" aria-label="Mobile Navigation Drawer">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg uppercase tracking-[0.15em] font-light text-neutral-800 border-b border-neutral-100 pb-3 block"
              title={item.seoContext}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
