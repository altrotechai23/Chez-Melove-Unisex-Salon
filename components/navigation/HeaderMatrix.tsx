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
  CalendarDays,
  Check,
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
    label: "About Us",
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

  // Premium mobile navigation rendered outside transformed page wrappers.
  const mobileNavigation = (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-[90]
        md:hidden
        pb-[env(safe-area-inset-bottom)]
        pointer-events-none
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
      <div
        className="
          pointer-events-auto
          mx-2 mb-2
          flex h-[68px] items-center
          rounded-[22px]
          border border-white/80
          bg-white/90
          px-2
          shadow-[0_8px_35px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)]
          backdrop-blur-2xl
          supports-[backdrop-filter]:bg-white/80
          sm:mx-4 sm:px-3
        "
      >
        {/* Chezmelove wordmark */}
        <Link
          href="/"
          aria-label="Chezmelove Unisex Salon home"
          className="
            group flex h-full w-[66px] shrink-0
            items-center justify-center
            rounded-l-[18px]
            outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-[#c9a227]
            sm:w-[78px]
          "
        >
          <span className="flex flex-col items-center justify-center leading-none">
            <span
              className="
                font-serif text-[13px] font-medium
                tracking-[0.12em] text-neutral-900
                transition-colors duration-300
                group-hover:text-[#a78218]
                sm:text-[15px]
              "
            >
              CHEZ
            </span>

            <span
              className="
                mt-[3px] font-sans text-[10px]
                font-light tracking-[0.19em]
                text-neutral-500
                sm:text-[11px]
              "
            >
              MELOVE
            </span>

            <span
              className="
                mt-[5px] h-[2px] w-5
                rounded-full bg-[#c9a227]
                transition-all duration-300
                group-hover:w-8
              "
              aria-hidden="true"
            />
          </span>
        </Link>

        {/* Elegant vertical divider */}
        <span
          className="mx-1 h-9 w-px shrink-0 bg-neutral-200 sm:mx-2"
          aria-hidden="true"
        />

        {/* Main navigation links */}
        <div className="flex h-full min-w-0 flex-1 items-center justify-around">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.seoContext}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`
                  group relative flex h-full min-w-0 flex-1
                  flex-col items-center justify-center
                  gap-[5px] rounded-xl
                  outline-none
                  transition-all duration-300 ease-out
                  active:scale-95
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-[#c9a227]
                  ${
                    active
                      ? "text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-800"
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <span
                    className="
                      absolute top-[7px]
                      h-[3px] w-5 rounded-full
                      bg-[#c9a227]
                    "
                    aria-hidden="true"
                  />
                )}

                <span
                  className={`
                    flex h-7 w-7 items-center justify-center
                    rounded-xl
                    transition-all duration-300 ease-out
                    ${
                      active
                        ? "bg-[#c9a227]/10 text-neutral-950"
                        : "bg-transparent group-hover:bg-neutral-100"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-[17px] w-[17px]
                      stroke-[1.5]
                      transition-transform duration-300
                      ${
                        active
                          ? "scale-105"
                          : "group-hover:-translate-y-0.5"
                      }
                    `}
                    aria-hidden="true"
                  />
                </span>

                <span
                  className={`
                    max-w-full truncate
                    px-0.5 font-sans
                    text-[7px] font-semibold
                    uppercase tracking-[0.09em]
                    sm:text-[8px] sm:tracking-[0.12em]
                    ${
                      active
                        ? "text-neutral-900"
                        : "text-neutral-400"
                    }
                  `}
                >
                  {item.label === "About Us" ? "About" : item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Booking action — existing booking logic preserved */}
        <div className="ml-1 flex h-full shrink-0 items-center sm:ml-2">
          <button
            type="button"
            onClick={() => openBooking()}
            aria-label="Book a salon session"
            className="
              group relative flex h-[46px] w-[46px]
              cursor-pointer items-center justify-center
              rounded-[15px]
              border border-neutral-800
              bg-neutral-950 text-white
              shadow-[0_3px_10px_rgba(0,0,0,0.16)]
              outline-none
              transition-all duration-300 ease-out
              hover:border-[#c9a227]
              hover:bg-neutral-900
              active:scale-90
              focus-visible:ring-2
              focus-visible:ring-[#c9a227]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
              sm:h-[48px] sm:w-[48px]
            "
          >
            <CalendarDays
              className="
                h-[22px] w-[22px]
                stroke-[1.6]
                transition-transform duration-300
                group-hover:scale-105
              "
              aria-hidden="true"
            />

            {/* Gold accent */}
            <span
              className="
                absolute -right-1 -top-1
                flex h-[17px] w-[17px]
                items-center justify-center
                rounded-full
                border-2 border-white
                bg-[#c9a227] text-neutral-950
                shadow-sm
              "
              aria-hidden="true"
            >
              <Check className="h-[10px] w-[10px] stroke-[3]" />
            </span>
          </button>
        </div>
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

        {/* Responsive desktop container */}
        <div
          className="
            mx-auto flex w-full max-w-7xl
            items-center justify-between gap-3
            px-4 md:gap-3 md:px-5
            lg:gap-6 lg:px-8
            xl:gap-8 xl:px-12
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center outline-none"
            aria-label="Chez Melove Unisex Salon home"
          >
            <div
              className="
                flex shrink-0 items-center whitespace-nowrap
                text-sm font-light tracking-[0.12em]
                text-neutral-900
                lg:text-base lg:tracking-[0.18em]
                xl:text-xl xl:tracking-[0.25em]
              "
            >
              <span className="mr-1.5 font-medium lg:mr-2">
                CHEZ
              </span>

              <span
                className="
                  font-extralight text-neutral-400
                  transition-colors duration-300
                  group-hover:text-neutral-900
                "
              >
                ME LOVE
              </span>

              <span
                className="
                  ml-2 border-l border-neutral-300
                  pl-2 text-[8px] font-medium
                  uppercase tracking-[0.15em]
                  text-neutral-400
                  lg:ml-3 lg:pl-3 lg:text-[9px]
                  lg:tracking-[0.2em]
                  xl:ml-4 xl:pl-4 xl:text-[10px]
                  xl:tracking-[0.3em]
                "
              >
                Unisex Salon
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav
            className="
              flex min-w-0 flex-1
              items-center justify-center
              gap-3 lg:gap-5 xl:gap-10
            "
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
                    group relative shrink-0 py-2
                    text-[9px] font-medium
                    uppercase tracking-[0.12em]
                    transition-colors duration-300
                    lg:text-[10px] lg:tracking-[0.16em]
                    xl:text-xs xl:tracking-[0.2em]
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

          {/* Booking button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openBooking()}
              className="
                inline-flex shrink-0 cursor-pointer
                items-center justify-center whitespace-nowrap
                bg-neutral-900 px-3 py-2.5
                text-[9px] font-medium
                uppercase tracking-[0.12em]
                text-white shadow-lg transition-all duration-300
                hover:bg-neutral-800
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-neutral-500
                focus-visible:ring-offset-2
                lg:px-4 lg:text-[10px]
                lg:tracking-[0.16em]
                xl:px-6 xl:text-xs
                xl:tracking-[0.2em]
              "
            >
              Book Session
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation portal */}
      {isMounted
        ? createPortal(mobileNavigation, document.body)
        : null}
    </>
  );
}