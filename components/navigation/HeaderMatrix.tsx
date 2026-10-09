"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Sparkles, Image, PhoneCall, Calendar } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  seoContext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Services", href: "/services", seoContext: "Premium Hair & Aesthetic Treatments", icon: Scissors },
  { label: "Our Story", href: "#story", seoContext: "About Chez Melove Salon", icon: Sparkles },
  { label: "Gallery", href: "/gallery", seoContext: "Editorial Lookbook", icon: Image },
  { label: "Contact", href: "/contact", seoContext: "Find Us in Cape Town", icon: PhoneCall },
];

export default function HeaderMatrix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link spy algorithm for responsive anchors
      const scrollPosition = window.scrollY + 300;
      for (const item of NAVIGATION_ITEMS) {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP MATRIX: Top Persistent Editorial Layout                           */}
      {/* ========================================================================= */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out border-b hidden md:block ${
          isScrolled 
            ? "bg-neutral-50/90 backdrop-blur-xl border-neutral-200/50 py-4 shadow-sm" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <h2 className="sr-only">Chez Melove Unisex Salon — Desktop Navigation Matrix</h2>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group outline-none" aria-label="Chez Melove Unisex Salon">
            <div className="flex items-center tracking-[0.25em] font-light text-xl text-neutral-900">
              <span className="font-medium mr-2">ME</span>
              <span className="text-neutral-400 font-extralight group-hover:text-neutral-900 transition-colors duration-300">LOVE</span>
              <span className="ml-4 pl-4 border-l border-neutral-300 text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-medium">
                Unisex Salon
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-10" aria-label="Desktop Editorial Navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 group py-2 ${
                  activeSection === item.href ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-900"
                }`}
                title={item.seoContext}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300 ease-out ${
                  activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          <div>
            <Link
              href="#booking"
              className="relative overflow-hidden inline-flex items-center justify-center bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all duration-300 shadow-lg"
            >
              Book Session
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE MATRIX: Fixed Native Bottom Tab Bar Framework                      */}
      {/* ========================================================================= */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-xl border-t border-neutral-200/60 z-50 md:hidden pb-safe-bottom"
        aria-label="Mobile Navigation App Rail"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                  isActive ? "text-neutral-950 scale-105" : "text-neutral-400"
                }`}
                title={item.seoContext}
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[9px] uppercase tracking-widest font-medium mt-1 font-sans">
                  {item.label.split(" ")[0]}
                </span>
                {isActive && (
                  <span className="absolute top-1 w-1 h-1 bg-neutral-950 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
          
          <Link
            href="#booking"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
              activeSection === "#booking" ? "text-neutral-950" : "text-neutral-400"
            }`}
            aria-label="Book Session Mobile Route"
          >
            <div className="p-2 bg-neutral-900 text-white rounded-xl shadow-md -translate-y-1">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
