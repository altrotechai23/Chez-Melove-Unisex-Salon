"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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
    href: "/#story",
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

/**
 * Subscribe to browser hash changes without maintaining duplicate state.
 */
function subscribeToHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);

  return () => {
    window.removeEventListener("hashchange", callback);
  };
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

/**
 * Tracks whether the component is being rendered on the client.
 * No effect or synchronous setState is needed.
 */
function subscribeToNothing() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function HeaderMatrix() {
  const pathname = usePathname();
  const { openBooking } = useGlobalBooking();

  const [isScrolled, setIsScrolled] = useState(false);

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot
  );

  const currentHash = useSyncExternalStore(
    subscribeToHashChange,
    getHashSnapshot,
    getServerHashSnapshot
  );

  // Track scrolling for the desktop header.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/#story") {
      return pathname === "/" && currentHash === "#story";
    }

    if (href === "/services") {
      return (
        pathname === "/services" ||
        pathname.startsWith("/services/")
      );
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  // Mobile navigation is rendered outside transformed page wrappers.
  const mobileNavigation = (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-[90]
        border-t border-neutral-200/80
        bg-white/95
        pb-[env(safe-area-inset-bottom)]
        shadow-[0_-4px_24px_rgba(0,0,0,0.04)]
        backdrop-blur-2xl
        md:hidden
      "
      aria-label="Mobile navigation"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        isolation: "isolate",
      }}
    >
      <div className="flex h-16 items-center justify-around px-2 sm:px-4">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActiveLink(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.seoContext}
              aria-current={active ? "page" : undefined}
              className={`
                relative flex h-full min-w-0 flex-1
                flex-col items-center justify-center
                transition-colors duration-300
                ${
                  active
                    ? "text-neutral-950"
                    : "text-neutral-400"
                }
              `}
            >
              <Icon
                className="h-5 w-5 shrink-0 stroke-[1.5]"
                aria-hidden="true"
              />

              <span className="mt-1 whitespace-nowrap font-sans text-[9px] font-semibold uppercase tracking-widest">
                {item.label.split(" ")[0]}
              </span>

              {active && (
                <span
                  className="absolute top-1 h-1 w-1 rounded-full bg-neutral-950"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => openBooking()}
          className="
            flex h-full min-w-0 flex-1
            cursor-pointer flex-col items-center justify-center
            text-neutral-400 transition-colors duration-300
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-neutral-500
          "
          aria-label="Book a salon session"
        >
          <div
            className="
              -translate-y-2 rounded-full
              border border-white/10
              bg-neutral-900 p-2.5 text-white
              shadow-lg shadow-neutral-900/20
              transition-transform duration-200
              active:scale-95
            "
          >
            <Calendar
              className="h-4 w-4 stroke-[2]"
              aria-hidden="true"
            />
          </div>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`
          fixed left-0 top-0 z-40 hidden w-full
          border-b transition-all duration-500 ease-out
          md:block
          ${
            isScrolled
              ? "border-neutral-200/50 bg-neutral-50/90 py-4 shadow-sm backdrop-blur-xl"
              : "border-transparent bg-transparent py-6"
          }
        `}
      >
        <h2 className="sr-only">
          Chez Melove Unisex Salon — Desktop Navigation
        </h2>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="group flex items-center space-x-3 outline-none"
            aria-label="Chez Melove Unisex Salon home"
          >
            <div className="flex items-center tracking-[0.25em] text-xl font-light text-neutral-900">
              <span className="mr-2 font-medium">ME</span>

              <span className="font-extralight text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900">
                LOVE
              </span>

              <span className="ml-4 border-l border-neutral-300 pl-4 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
                Unisex Salon
              </span>
            </div>
          </Link>

          <nav
            className="flex items-center space-x-10"
            aria-label="Desktop navigation"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const active = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  title={item.seoContext}
                  className={`
                    group relative py-2 text-xs font-medium
                    uppercase tracking-[0.2em]
                    transition-colors duration-300
                    ${
                      active
                        ? "text-neutral-950"
                        : "text-neutral-500 hover:text-neutral-900"
                    }
                  `}
                >
                  {item.label}

                  <span
                    className={`
                      absolute bottom-0 left-0 h-px
                      bg-neutral-900
                      transition-all duration-300 ease-out
                      ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          <div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="
                inline-flex cursor-pointer items-center justify-center
                bg-neutral-900 px-6 py-2.5
                text-xs font-medium uppercase tracking-[0.2em]
                text-white shadow-lg transition-all duration-300
                hover:bg-neutral-800
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-neutral-500
                focus-visible:ring-offset-2
              "
            >
              Book Session
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation: portal outside page transition wrappers */}
      {isMounted
        ? createPortal(mobileNavigation, document.body)
        : null}
    </>
  );
}