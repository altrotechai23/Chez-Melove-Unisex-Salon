"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { heroScenes } from "./hero-data";
import { businessConfig, getWhatsAppHref } from "../../lib/config/business";

import styles from "./MeloveHero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MeloveHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const booking = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  const whatsappHref = getWhatsAppHref(
    "Hi MELOVE, I'd like to book an appointment."
  );

  useGSAP(
    () => {
      if (!root.current || !stage.current || !background.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const slides = gsap.utils.toArray<HTMLElement>(
          "[data-hero-slide]",
          background.current!
        );

        if (!slides.length) return;

        const media = slides.map(
          (slide) =>
            slide.querySelector<HTMLElement>("[data-hero-media]")!
        );

        /*
         * Initial state.
         *
         * Only the background moves.
         * The content remains visually stable.
         */
        gsap.set(slides, {
          autoAlpha: 0,
          xPercent: 0,
          scale: 1.08,
        });

        gsap.set(slides[0], {
          autoAlpha: 1,
          scale: 1,
        });

        gsap.set(media, {
          scale: 1.08,
          xPercent: 0,
          yPercent: 0,
        });

        /*
         * Main cinematic slideshow.
         *
         * The hero itself becomes the scroll journey.
         */
        const slideshow = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            pin: stage.current,
            pinSpacing: false,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /*
         * Six scenes.
         *
         * Each scene gets roughly one chapter of the scroll.
         */
        slides.forEach((slide, index) => {
          if (index === 0) {
            slideshow.to(
              media[index],
              {
                scale: 1.02,
                xPercent: -2,
                duration: 0.8,
                ease: "none",
              },
              0
            );

            return;
          }

          const previous = slides[index - 1];
          const currentMedia = media[index];

          /*
           * FAST CINEMATIC TRANSITION
           *
           * Previous image:
           * - slightly pushes left
           * - scales forward
           *
           * New image:
           * - enters from the right
           * - immediately settles
           *
           * Text doesn't move.
           */
          slideshow
            .to(
              previous,
              {
                autoAlpha: 0,
                scale: 1.035,
                duration: 0.28,
                ease: "power2.in",
              },
              index - 0.22
            )
            .fromTo(
              slide,
              {
                autoAlpha: 0,
                scale: 1.09,
                xPercent: 4,
              },
              {
                autoAlpha: 1,
                scale: 1,
                xPercent: 0,
                duration: 0.42,
                ease: "power3.out",
              },
              index - 0.22
            )
            .fromTo(
              currentMedia,
              {
                scale: 1.12,
                xPercent: 2,
              },
              {
                scale: 1.035,
                xPercent: -1.5,
                duration: 0.9,
                ease: "none",
              },
              index - 0.12
            );
        });

        /*
         * Very subtle background depth.
         *
         * No parallax on the text.
         */
        slideshow.to(
          background.current,
          {
            scale: 1.015,
            duration: slides.length,
            ease: "none",
          },
          0
        );

        /*
         * Booking CTA becomes slightly more prominent
         * after the first visual transition.
         *
         * It never leaves the screen.
         */
        if (booking.current) {
          slideshow.fromTo(
            booking.current,
            {
              scale: 0.96,
            },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          );
        }

        /*
         * Progress indicator.
         *
         * DOM manipulation only — no React state on scroll.
         */
        const indicators = gsap.utils.toArray<HTMLElement>(
          "[data-hero-progress]",
          progress.current!
        );

        gsap.set(indicators, {
          opacity: 0.28,
          scaleX: 0.65,
          transformOrigin: "left center",
        });

        gsap.set(indicators[0], {
          opacity: 1,
          scaleX: 1,
        });

        slides.forEach((_, index) => {
          if (index === 0) return;

          slideshow.to(
            indicators[index - 1],
            {
              opacity: 0.28,
              scaleX: 0.65,
              duration: 0.15,
              ease: "power1.out",
            },
            index - 0.28
          );

          slideshow.to(
            indicators[index],
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.18,
              ease: "power2.out",
            },
            index - 0.2
          );
        });

        /*
         * Video management.
         *
         * Only the currently visible video plays.
         * This prevents six videos from decoding simultaneously.
         */
        let activeIndex = 0;

        const syncVideo = () => {
          const index = Math.min(
            slides.length - 1,
            Math.floor(slideshow.progress() * slides.length)
          );

          if (index === activeIndex) return;

          activeIndex = index;

          slides.forEach((slide, slideIndex) => {
            const video = slide.querySelector<HTMLVideoElement>("video");

            if (!video) return;

            if (slideIndex === index) {
              video.currentTime = 0;
              video.play().catch(() => {});
            } else {
              video.pause();
              video.currentTime = 0;
            }
          });
        };

        slideshow.eventCallback("onUpdate", syncVideo);

        return () => {
          slideshow.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className={styles.hero}
      aria-labelledby="melove-hero-title"
    >
      <div ref={stage} className={styles.stage}>
        <div className={styles.shell}>
          {/* BACKGROUND SLIDES */}
          <div
            ref={background}
            className={styles.background}
            aria-hidden="true"
          >
            {heroScenes.map((scene, index) => (
              <div
                key={scene.id}
                className={styles.slide}
                data-hero-slide
              >
                <div
                  className={styles.media}
                  data-hero-media
                >
                  {scene.media.type === "image" ? (
                    <Image
                      src={scene.media.src}
                      alt=""
                      fill
    sizes="(max-width: 768px) 100vw, 50vw"
    style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <video
                      className={styles.mediaElement}
                      src={scene.media.src}
                      poster={scene.media.poster}
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? "metadata" : "none"}
                    />
                  )}
                </div>

                <div className={styles.imageTint} />
                <div className={styles.imageGradient} />
              </div>
            ))}
          </div>

          {/* NAV */}
          <header className={styles.nav}>
            <Link
              href="/"
              className={styles.logo}
              aria-label="MELOVE home"
            >
              MELOVE
            </Link>

            <div className={styles.navRight}>
              <span className={styles.location}>
                LONG STREET
              </span>

              <Link
                href="/book"
                className={styles.navBook}
              >
                BOOK NOW
              </Link>
            </div>
          </header>

          {/* MAIN CONTENT — STAYS STABLE */}
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span />
              <span>BEAUTY & HAIR</span>
              <span>•</span>
              <span>CAPE TOWN</span>
            </div>

            <h1 id="melove-hero-title">
              Your Beauty.
              <br />
              Your Style.
              <br />
              <em>Your MELOVE.</em>
            </h1>

            <p className={styles.description}>
              A beauty destination on Long Street,
              <br />
              Cape Town.
            </p>
          </div>

          {/* BOOKING CTA */}
          <div
            ref={booking}
            className={styles.booking}
          >
            <Link
              href="/book"
              className={styles.primaryButton}
            >
              <span>BOOK YOUR APPOINTMENT</span>
              <span className={styles.arrow}>↗</span>
            </Link>

            {whatsappHref ? (
              <a
                href={whatsappHref}
                className={styles.secondaryButton}
              >
                WHATSAPP
              </a>
            ) : (
              <span
                className={styles.secondaryButtonDisabled}
                title="Add the MELOVE WhatsApp number in business.ts"
              >
                WHATSAPP
              </span>
            )}
          </div>

          {/* LOCATION */}
          <div className={styles.address}>
            <span>128 LONG STREET</span>
            <span>CAPE TOWN CITY CENTRE</span>
          </div>

          {/* SLIDESHOW PROGRESS */}
          <div
            ref={progress}
            className={styles.progress}
            aria-hidden="true"
          >
            {heroScenes.map((scene, index) => (
              <span
                key={scene.id}
                data-hero-progress
              >
                <i>0{index + 1}</i>
              </span>
            ))}
          </div>

          <div className={styles.scrollHint}>
            <span>SCROLL</span>
            <span className={styles.scrollLine} />
          </div>
        </div>
      </div>
    </section>
  );
}