"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGlobalBooking } from "@/components/providers/BookingDialogProvider";
import {
  Scissors,
  Sparkles,
  Image as ImageIcon,
  PhoneCall,
  Calendar,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  seoContext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    seoContext: "Premium Hair & Aesthetic Treatments",
    icon: Scissors,
  },
  {
    label: "Our Story",
    href: "/about",
    seoContext: "About Chez Melove Salon",
    icon: Sparkles,
  },
  {
    label: "Gallery",
    href: "/gallery",
    seoContext: "Editorial Lookbook",
    icon: ImageIcon,
  },
  {
    label: "Contact",
    href: "/contact",
    seoContext: "Find Us in Cape Town",
    icon: PhoneCall,
  },
];

export default function HeaderMatrix() {
  const pathname = usePathname();
  const { openBooking } = useGlobalBooking();

  const [isScrolled, setIsScrolled] = useState(false);

  // Derive the active navigation state from the current route.
  const isActiveLink = (href: string): boolean => {
    if (!pathname) return false;

    if (href === "/services") {
      return (
        pathname === "/services" ||
        pathname.startsWith("/services/")
      );
    }

    if (href === "/about") {
      return (
        pathname === "/about" ||
        pathname.startsWith("/about/")
      );
    }

    if (href === "/gallery") {
      return (
        pathname === "/gallery" ||
        pathname.startsWith("/gallery/")
      );
    }

    if (href === "/contact") {
      return (
        pathname === "/contact" ||
        pathname.startsWith("/contact/")
      );
    }

    return pathname === href;
  };

  // Track scrolling for the desktop header.
  // State changes happen in the scroll event callback, not directly
  // in the effect body.
  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 50;

      setIsScrolled((previous) =>
        previous === nextIsScrolled ? previous : nextIsScrolled
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP MATRIX: Top Persistent Editorial Layout                           */}
      {/* ========================================================================= */}

      <header
        className={`fixed top-0 left-0 z-40 hidden w-full border-b transition-all duration-500 ease-out md:block ${
          isScrolled
            ? "border-neutral-200/50 bg-neutral-50/90 py-3 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        <h2 className="sr-only">
          Chez Melove Unisex Salon — Desktop Navigation Matrix
        </h2>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center outline-none"
            aria-label="Chez Melove Unisex Salon Home"
          >
            <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/Chez-Melove-Unisex-Salon-Logo.png"
                alt="Chez Melove Unisex Salon Logo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="flex items-center space-x-10"
            aria-label="Desktop Editorial Navigation"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const active = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? "text-neutral-950"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                  title={item.seoContext}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-neutral-900 transition-all duration-300 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Booking Button */}
          <div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden bg-neutral-900 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
            >
              Book Session
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE MATRIX: Fixed Native Bottom Tab Bar Framework                      */}
      {/* ========================================================================= */}

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200/80 bg-white/90 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.04)] backdrop-blur-2xl md:hidden"
        aria-label="Mobile Navigation App Rail"
      >
        <div className="flex h-16 items-center justify-around px-4">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-full flex-1 flex-col items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "scale-105 text-neutral-950"
                    : "text-neutral-400"
                }`}
                title={item.seoContext}
              >
                <Icon
                  className="h-5 w-5 stroke-[1.5]"
                  aria-hidden="true"
                />

                <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-widest">
                  {item.label}
                </span>

                {isActive && (
                  <span
                    className="absolute -top-1 h-1 w-1 rounded-full bg-neutral-950"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}

          {/* Mobile Booking Button */}
          <button
            type="button"
            onClick={() => openBooking()}
            className="flex h-full flex-1 cursor-pointer flex-col items-center justify-center text-neutral-400 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            aria-label="Launch Global Book Session Panel Modal"
          >
            <div className="-translate-y-2 rounded-full border border-white/10 bg-neutral-900 p-2.5 text-white shadow-lg shadow-neutral-900/20 transition-transform duration-200 active:scale-95">
              <Calendar
                className="h-4 w-4 stroke-[2]"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}