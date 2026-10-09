"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type TransitionContextType = {
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
});

export const useTransitionState = () => useContext(TransitionContext);

type PageTransitionProviderProps = {
  children: React.ReactNode;
};

export default function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname();

  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Keep content synchronized when the current route has not changed.
    if (pathname === prevPathname.current) {
      setDisplayChildren(children);
      return;
    }

    const overlay = overlayRef.current;
    const content = contentWrapperRef.current;

    if (!overlay || !content) {
      prevPathname.current = pathname;
      setDisplayChildren(children);
      return;
    }

    setIsTransitioning(true);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          // Update the rendered page while the curtain covers the screen.
          setDisplayChildren(children);
          prevPathname.current = pathname;

          // Reveal the incoming page.
          const entranceTimeline = gsap.timeline({
            onComplete: () => {
              setIsTransitioning(false);
            },
          });

          entranceTimeline
            .to(content, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            })
            .to(
              overlay,
              {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 0.6,
                ease: "power4.inOut",
              },
              "-=0.4",
            );
        },
      });

      // Cover the screen, then fade and move out the old page.
      timeline
        .to(overlay, {
          scaleY: 1,
          transformOrigin: "bottom center",
          duration: 0.5,
          ease: "power4.inOut",
        })
        .to(
          content,
          {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.3",
        );
    });

    return () => {
      context.revert();
    };
  }, [pathname, children]);

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] bg-neutral-950"
        style={{
          transform: "scaleY(0)",
          transformOrigin: "bottom center",
        }}
      />

      <div
        ref={contentWrapperRef}
        className="h-full w-full will-change-transform"
        style={{
          opacity: 1,
          transform: "translateY(0)",
        }}
      >
        {displayChildren}
      </div>
    </TransitionContext.Provider>
  );
}