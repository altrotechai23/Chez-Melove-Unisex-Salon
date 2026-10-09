"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({
  children,
}: LenisProviderProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (mediaQuery.matches) {
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,

        duration: 1.1,

        smoothWheel: true,

        syncTouch: false,

        anchors: true,

        stopInertiaOnNavigate: true,

        touchMultiplier: 1,

        wheelMultiplier: 0.9,
      });

      const handleLenisScroll = () => {
        ScrollTrigger.update();
      };

      const handleTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", handleLenisScroll);

      gsap.ticker.add(handleTicker);

      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      return () => {
        lenis.off("scroll", handleLenisScroll);

        gsap.ticker.remove(handleTicker);

        lenis.destroy();
      };
    },
    {
      scope: root,
    },
  );

  return (
    <div ref={root}>
      {children}
    </div>
  );
}