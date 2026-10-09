"use client";

import {
  useState,
  useEffect,
  useRef,
  useTransition,
  useMemo,
} from "react";
import Link from "next/link";
import {
  Lightbulb,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUpRight,
  Play,
  Eye,
} from "lucide-react";
import gsap from "gsap";

type LookbookCategory = "hair" | "aesthetics" | "wellness";
type FilterCategory = "all" | LookbookCategory;

interface LookbookItem {
  id: string;
  title: string;
  type: "image" | "video";
  category: LookbookCategory;
  mediaUrl: string;
  posterUrl?: string;
  alt: string;
  stylist: string;
}

const REEL_DATABASE: LookbookItem[] = [
  {
    id: "g1",
    title: "Editorial Precision Cut Mapping",
    type: "image",
    category: "hair",
    mediaUrl: "/images/chezmelove/hair-men.jpeg",
    alt: "Precision haircut and modern styling at Chez Melove Unisex Salon",
    stylist: "Senior Director",
  },
  {
    id: "g2",
    title: "Dimensional Copper Tone Flow",
    type: "image",
    category: "hair",
    mediaUrl:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85",
    alt: "Dimensional hair color and balayage inspiration",
    stylist: "Color Architect",
  },
  {
    id: "g3",
    title: "Clinical Skin Radiance",
    type: "video",
    category: "aesthetics",
    mediaUrl:
      "https://videos.pexels.com/video-files/3997341/3997341-hd_1920_1080_25fps.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
    alt: "Skincare treatment and facial care inspiration",
    stylist: "Aesthetic Specialist",
  },
  {
    id: "g4",
    title: "Textured Crop Sculpture",
    type: "image",
    category: "hair",
    mediaUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
    alt: "Contemporary barbering and precision haircut inspiration",
    stylist: "Creative Director",
  },
  {
    id: "g5",
    title: "The Art of Deep Relaxation",
    type: "image",
    category: "wellness",
    mediaUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    alt: "Peaceful wellness and spa treatment environment",
    stylist: "Wellness Specialist",
  },
  {
    id: "g6",
    title: "Restorative Skincare Ritual",
    type: "video",
    category: "aesthetics",
    mediaUrl:
      "https://videos.pexels.com/video-files/3997755/3997755-hd_1920_1080_25fps.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85",
    alt: "Skincare and spa treatment inspiration",
    stylist: "Aesthetic Specialist",
  },
];

const FILTER_TAGS: {
  slug: FilterCategory;
  label: string;
}[] = [
  { slug: "all", label: "All Reels" },
  { slug: "hair", label: "Hair Artistry" },
  { slug: "aesthetics", label: "Aesthetics" },
  { slug: "wellness", label: "Wellness" },
];

const CATEGORY_LABELS: Record<LookbookCategory, string> = {
  hair: "Hair Artistry",
  aesthetics: "Aesthetics",
  wellness: "Luxury Wellness",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] =
    useState<FilterCategory>("all");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState<Record<string, boolean>>(
    {}
  );
  const [mediaFailed, setMediaFailed] = useState<Record<string, boolean>>(
    {}
  );
  const [isMuted, setIsMuted] = useState(true);
  const [isPending, startTransition] = useTransition();

  const feedContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const filteredCollection = useMemo(() => {
    if (activeFilter === "all") {
      return REEL_DATABASE;
    }

    return REEL_DATABASE.filter(
      (item) => item.category === activeFilter
    );
  }, [activeFilter]);

  const handleFilterSwitch = (slug: FilterCategory) => {
    if (slug === activeFilter) return;

    animationRef.current?.kill();

    const cards =
      feedContainerRef.current?.querySelectorAll<HTMLElement>(
        ".reel-card-node"
      );

    if (!cards?.length) {
      startTransition(() => setActiveFilter(slug));
      return;
    }

    animationRef.current = gsap.to(cards, {
      opacity: 0,
      y: 18,
      scale: 0.97,
      duration: 0.25,
      stagger: 0.025,
      ease: "power2.in",
      onComplete: () => {
        startTransition(() => setActiveFilter(slug));
      },
    });
  };

  useEffect(() => {
    const container = feedContainerRef.current;

    if (!container || isPending) return;

    const cards =
      container.querySelectorAll<HTMLElement>(".reel-card-node");

    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all",
      });

      return;
    }

    animationRef.current?.kill();

    animationRef.current = gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    return () => {
      animationRef.current?.kill();
    };
  }, [activeFilter, isPending]);

  useEffect(() => {
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMediaLoad = (id: string) => {
    setMediaLoaded((previous) => ({
      ...previous,
      [id]: true,
    }));
  };

  const handleMediaError = (id: string) => {
    setMediaFailed((previous) => ({
      ...previous,
      [id]: true,
    }));

    setMediaLoaded((previous) => ({
      ...previous,
      [id]: true,
    }));
  };

  const handleVideoHoverStart = (
    videoElement: HTMLVideoElement | null
  ) => {
    if (!videoElement) return;

    videoElement.muted = isMuted;

    videoElement.play().catch(() => {
      // Autoplay may be blocked by browser settings.
    });
  };

  const handleVideoHoverEnd = (
    videoElement: HTMLVideoElement | null
  ) => {
    if (!videoElement) return;

    videoElement.pause();

    try {
      videoElement.currentTime = 0;
    } catch {
      // Some browsers may not have initialized media metadata yet.
    }
  };

  const handleMuteToggle = () => {
    setIsMuted((current) => {
      const nextMuted = !current;

      feedContainerRef.current
        ?.querySelectorAll<HTMLVideoElement>("video")
        .forEach((video) => {
          video.muted = nextMuted;
        });

      return nextMuted;
    });
  };

  const pageTheme = isDarkMode
    ? "bg-neutral-950 text-neutral-100"
    : "bg-neutral-50 text-neutral-900";

  const borderTheme = isDarkMode
    ? "border-neutral-800"
    : "border-neutral-200";

  const mutedTextTheme = isDarkMode
    ? "text-neutral-500"
    : "text-neutral-400";

  const inactiveFilterTheme = isDarkMode
    ? "text-neutral-500 hover:text-neutral-200"
    : "text-neutral-400 hover:text-neutral-700";

  const cardTheme = isDarkMode
    ? "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
    : "border-neutral-200 bg-white hover:border-neutral-400";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Chez Melove Studio Feed",
    description:
      "Explore hair artistry, aesthetics, and wellness inspiration from Chez Melove Unisex Salon in Cape Town.",
    url: "https://melove.co.za/gallery",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main
        className={`min-h-screen pb-24 font-sans antialiased transition-colors duration-500 sm:pb-32 ${pageTheme}`}
      >
        <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 sm:pt-14 md:px-12 md:pt-16">
          {/* Top Bar */}
          <header
            className={`mb-9 flex items-center justify-between gap-4 border-b pb-6 sm:mb-12 sm:pb-8 ${borderTheme}`}
          >
            <div className="min-w-0">
              <span
                className={`mb-3 block text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px] sm:tracking-[0.4em] ${mutedTextTheme}`}
              >
                06 / Interactive Stream
              </span>

              <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                The Studio{" "}
                <span
                  className={`font-serif italic ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  Feed.
                </span>
              </h1>

              <p
                className={`mt-3 max-w-lg text-xs font-light leading-6 sm:text-sm ${mutedTextTheme}`}
              >
                A moving portrait of style, self-expression, and
                contemporary beauty.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleMuteToggle}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:h-11 sm:w-11 ${borderTheme} ${
                  isDarkMode
                    ? "text-white hover:bg-neutral-900"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
                aria-label={isMuted ? "Unmute videos" : "Mute videos"}
                title={isMuted ? "Unmute videos" : "Mute videos"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsDarkMode((current) => !current)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:h-11 sm:w-11 ${
                  isDarkMode
                    ? "border-amber-400 bg-amber-400 text-neutral-950"
                    : "border-neutral-300 text-neutral-600 hover:border-neutral-900"
                }`}
                aria-label={
                  isDarkMode ? "Switch to light theme" : "Switch to dark theme"
                }
                title="Toggle theme"
              >
                <Lightbulb
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isDarkMode ? "rotate-12" : ""
                  }`}
                />
              </button>
            </div>
          </header>

          {/* Category Rail */}
          <nav
            className={`relative mb-9 border-b sm:mb-12 ${borderTheme}`}
            aria-label="Lookbook categories"
          >
            <div
              className="flex snap-x snap-mandatory items-center gap-7 overflow-x-auto pb-3 sm:gap-10"
              role="tablist"
              aria-label="Filter studio feed"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {FILTER_TAGS.map((tag) => {
                const isActive = activeFilter === tag.slug;

                return (
                  <button
                    key={tag.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="studio-feed-grid"
                    onClick={() => handleFilterSwitch(tag.slug)}
                    className={`relative flex-shrink-0 snap-start whitespace-nowrap py-3 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:text-xs sm:tracking-[0.25em] ${
                      isActive
                        ? isDarkMode
                          ? "font-bold text-white"
                          : "font-bold text-neutral-950"
                        : inactiveFilterTheme
                    }`}
                  >
                    {tag.label}

                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full ${
                          isDarkMode ? "bg-white" : "bg-neutral-950"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Feed Header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div
              className={`flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px] ${mutedTextTheme}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {activeFilter === "all"
                  ? "The Complete Collection"
                  : CATEGORY_LABELS[activeFilter]}
              </span>
            </div>

            <span
              className={`text-[9px] uppercase tracking-widest sm:text-[10px] ${mutedTextTheme}`}
              aria-live="polite"
            >
              {filteredCollection.length.toString().padStart(2, "0")} Works
            </span>
          </div>

          {/* Responsive Media Grid */}
          <div
            ref={feedContainerRef}
            id="studio-feed-grid"
            role="tabpanel"
            aria-busy={isPending}
            className="grid min-h-[400px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {filteredCollection.map((item, index) => {
              const isLoaded = mediaLoaded[item.id];
              const hasFailed = mediaFailed[item.id];

              return (
                <article
                  key={item.id}
                  className={`reel-card-node group relative block min-w-0 overflow-hidden border shadow-lg transition-colors duration-300 ${cardTheme}`}
                  onMouseEnter={(event) => {
                    if (item.type === "video") {
                      handleVideoHoverStart(
                        event.currentTarget.querySelector("video")
                      );
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (item.type === "video") {
                      handleVideoHoverEnd(
                        event.currentTarget.querySelector("video")
                      );
                    }
                  }}
                  onFocus={(event) => {
                    if (item.type === "video") {
                      handleVideoHoverStart(
                        event.currentTarget.querySelector("video")
                      );
                    }
                  }}
                  onBlur={(event) => {
                    if (
                      item.type === "video" &&
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                      )
                    ) {
                      handleVideoHoverEnd(
                        event.currentTarget.querySelector("video")
                      );
                    }
                  }}
                >
                  {/* Media Frame */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-800">
                    {!isLoaded && !hasFailed && (
                      <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
                    )}

                    {hasFailed ? (
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center ${
                          isDarkMode ? "bg-neutral-900" : "bg-neutral-100"
                        }`}
                      >
                        <Eye
                          className={`h-7 w-7 ${
                            isDarkMode ? "text-neutral-600" : "text-neutral-400"
                          }`}
                          strokeWidth={1}
                        />

                        <p className={`text-xs ${mutedTextTheme}`}>
                          Media preview unavailable
                        </p>
                      </div>
                    ) : item.type === "video" ? (
                      <video
                        src={item.mediaUrl}
                        poster={item.posterUrl}
                        muted={isMuted}
                        playsInline
                        loop
                        preload={index < 2 ? "metadata" : "none"}
                        onLoadedData={() => handleMediaLoad(item.id)}
                        onError={() => handleMediaError(item.id)}
                        className={`h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out group-hover:scale-[1.04] ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        aria-label={item.alt}
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.mediaUrl}
                        alt={item.alt}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        onLoad={() => handleMediaLoad(item.id)}
                        onError={() => handleMediaError(item.id)}
                        className={`h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out group-hover:scale-[1.04] ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4 z-20">
                      <span className="border border-white/25 bg-black/30 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                    </div>

                    {/* Video Indicator */}
                    {item.type === "video" && (
                      <div className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md">
                        <Play
                          className="ml-0.5 h-3.5 w-3.5"
                          fill="currentColor"
                        />
                      </div>
                    )}

                    {/* Media Caption */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
                      <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">
                        <span>{item.stylist}</span>
                        {item.type === "video" && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-white/50" />
                            <span>Motion</span>
                          </>
                        )}
                      </div>

                      <h2 className="max-w-sm text-xl font-light leading-snug tracking-tight text-white sm:text-2xl">
                        {item.title}
                      </h2>

                      <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">
                          Chez Melove
                        </span>

                        <Link
                          href="/contact"
                          aria-label={`Enquire about ${item.title}`}
                          className="pointer-events-auto inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          Enquire
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Booking CTA */}
          <section
            className={`relative mt-16 overflow-hidden border p-7 sm:mt-24 sm:p-10 md:p-14 ${
              isDarkMode
                ? "border-neutral-800 bg-neutral-900"
                : "border-neutral-200 bg-white"
            }`}
          >
            <div className="relative z-10 max-w-2xl">
              <span
                className={`mb-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px] ${
                  isDarkMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Your Next Chapter
              </span>

              <h2 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Your style.
                <span
                  className={`block font-serif italic ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  Your signature.
                </span>
              </h2>

              <p
                className={`mt-5 max-w-xl text-sm font-light leading-7 ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Inspired by the collection? Connect with the Chez Melove team
                to explore our services and plan your next salon experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${
                    isDarkMode
                      ? "bg-white text-neutral-950 hover:bg-neutral-200"
                      : "bg-neutral-950 text-white hover:bg-neutral-800"
                  }`}
                >
                  Book Your Session
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/services"
                  className={`inline-flex min-h-12 items-center justify-center gap-3 border px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                    isDarkMode
                      ? "border-neutral-700 text-white hover:border-neutral-500"
                      : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
                  }`}
                >
                  Explore Services
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border sm:-right-20 sm:-top-20 sm:h-72 sm:w-72 ${
                isDarkMode ? "border-white/5" : "border-neutral-100"
              }`}
            />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border sm:h-48 sm:w-48 ${
                isDarkMode ? "border-white/5" : "border-neutral-100"
              }`}
            />
          </section>

          {/* Footer */}
          <footer
            className={`mt-8 flex flex-col gap-3 border-t pt-6 text-[9px] font-medium uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between ${borderTheme} ${mutedTextTheme}`}
          >
            <span>Chez Melove / Studio Feed</span>
            <span>Cape Town · South Africa</span>
          </footer>
        </div>
      </main>
    </>
  );
}