import Link from "next/link";
import { businessConfig } from "@/lib/config/business";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      {/* ================================================
          HERO
      ================================================= */}

      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-dark)] text-[var(--color-ivory)]"
      >
        {/* Temporary visual atmosphere.
            Real MELOVE photography will replace this in the
            hero implementation step. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(183,173,85,0.22),transparent_30%),linear-gradient(135deg,#11100e_0%,#242019_48%,#11100e_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 w-full">
          <div className="site-container flex min-h-[100svh] flex-col justify-between py-6">
            {/* Hero top information */}

            <div className="flex items-start justify-between gap-4">
              <p className="melove-eyebrow text-white/75">
                Long Street • Cape Town
              </p>

              <span className="text-[0.625rem] font-semibold tracking-[0.18em] text-white/50 uppercase">
                01 / 01
              </span>
            </div>

            {/* Hero content */}

            <div className="max-w-2xl pb-20 pt-16">
              <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase">
                MELOVE
              </p>

              <h1
                id="hero-heading"
                className="font-display text-balance text-[clamp(3.5rem,15vw,8rem)] leading-[0.88] tracking-[-0.045em]"
              >
                Your beauty.
                <br />
                Your style.
                <br />
                Your Melove.
              </h1>

              <p className="mt-7 max-w-md text-pretty text-sm leading-6 text-white/70 sm:text-base">
                A premium beauty and hair destination in the heart of Long
                Street, Cape Town.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="melove-button">
                  Book your appointment
                </Link>

                <a
                  href="#services"
                  className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-6 text-xs font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-white hover:text-[var(--color-dark)]"
                >
                  Explore services
                </a>
              </div>
            </div>

            {/* Scroll cue */}

            <div className="flex items-end justify-between pb-24 md:pb-8">
              <p className="max-w-[12rem] text-[0.625rem] leading-4 tracking-[0.08em] text-white/45 uppercase">
                Beauty, hair and self-expression in Cape Town.
              </p>

              <div
                aria-hidden="true"
                className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1"
              >
                <span className="h-2 w-1 rounded-full bg-white/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          CONVERSION STRIP
      ================================================= */}

      <section
        aria-label="MELOVE information"
        className="border-b border-[var(--color-border)] bg-[var(--color-background)]"
      >
        <div className="site-container grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] md:grid-cols-4 md:divide-y-0">
          <div className="px-3 py-5 first:pl-0 md:px-6 md:py-7">
            <p className="text-[0.6rem] font-bold tracking-[0.14em] text-black/45 uppercase">
              Location
            </p>

            <p className="mt-2 text-sm font-medium">
              Long Street
            </p>
          </div>

          <div className="px-3 py-5 md:px-6 md:py-7">
            <p className="text-[0.6rem] font-bold tracking-[0.14em] text-black/45 uppercase">
              City
            </p>

            <p className="mt-2 text-sm font-medium">
              Cape Town
            </p>
          </div>

          <div className="px-3 py-5 md:px-6 md:py-7">
            <p className="text-[0.6rem] font-bold tracking-[0.14em] text-black/45 uppercase">
              Address
            </p>

            <p className="mt-2 text-sm font-medium">
              {businessConfig.address.street}
            </p>
          </div>

          <div className="px-3 py-5 last:pr-0 md:px-6 md:py-7">
            <p className="text-[0.6rem] font-bold tracking-[0.14em] text-black/45 uppercase">
              Booking
            </p>

            <Link
              href="/book"
              className="mt-2 inline-block text-sm font-bold underline decoration-[var(--color-accent)] underline-offset-4"
            >
              Book now
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          SERVICES FOUNDATION
      ================================================= */}

      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-[var(--color-background)] py-24 md:py-36"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="melove-eyebrow text-black/50">
              Discover MELOVE
            </p>

            <h2
              id="services-heading"
              className="font-display mt-6 text-balance text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.04em]"
            >
              Find your
              <br />
              next look.
            </h2>

            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-black/60 md:text-lg">
              Explore the MELOVE experience and discover the beauty services
              available in the heart of Long Street.
            </p>
          </div>

          <div className="mt-16 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] py-6">
              <span className="font-display text-3xl">
                Services
              </span>

              <span className="text-xs tracking-[0.12em] text-black/40 uppercase">
                Coming next
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          ABOUT FOUNDATION
      ================================================= */}

      <section
        aria-labelledby="about-heading"
        className="bg-[var(--color-dark)] py-24 text-[var(--color-ivory)] md:py-36"
      >
        <div className="site-container">
          <p className="melove-eyebrow text-white/50">
            The MELOVE experience
          </p>

          <h2
            id="about-heading"
            className="font-display mt-6 max-w-4xl text-balance text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.04em]"
          >
            Beauty is
            <br />
            personal.
          </h2>

          <p className="mt-8 max-w-xl text-pretty text-base leading-7 text-white/60 md:text-lg">
            MELOVE is located at 128 Long Street in Cape Town City Centre.
            More information about the salon, its story and its services will
            be added as verified business information becomes available.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-6 text-xs font-bold tracking-[0.08em] uppercase transition-colors hover:bg-white hover:text-[var(--color-dark)]"
          >
            About MELOVE
          </Link>
        </div>
      </section>

      {/* ================================================
          LOCATION FOUNDATION
      ================================================= */}

      <section
        aria-labelledby="location-heading"
        className="bg-[var(--color-background)] py-24 md:py-36"
      >
        <div className="site-container">
          <div className="grid gap-12 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="melove-eyebrow text-black/50">
                Find us
              </p>

              <h2
                id="location-heading"
                className="font-display mt-6 text-balance text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.04em]"
              >
                Long Street,
                <br />
                Cape Town.
              </h2>
            </div>

            <address className="not-italic">
              <p className="text-sm font-semibold tracking-[0.08em] uppercase">
                MELOVE
              </p>

              <p className="mt-4 text-base leading-7 text-black/60">
                {businessConfig.address.street}
                <br />
                {businessConfig.address.area}
                <br />
                {businessConfig.address.city}
                <br />
                {businessConfig.address.province}
                <br />
                {businessConfig.address.country}
              </p>

              <Link
                href="/find-us"
                className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--color-dark)] px-6 text-xs font-bold tracking-[0.08em] text-white uppercase transition-transform hover:-translate-y-0.5"
              >
                Find MELOVE
              </Link>
            </address>
          </div>
        </div>
      </section>

      {/* ================================================
          FINAL CTA
      ================================================= */}

      <section
        aria-labelledby="booking-heading"
        className="bg-[var(--color-accent)] py-24 md:py-36"
      >
        <div className="site-container">
          <p className="melove-eyebrow text-black/60">
            Your next look starts here
          </p>

          <h2
            id="booking-heading"
            className="font-display mt-6 max-w-5xl text-balance text-[clamp(3rem,10vw,8rem)] leading-[0.86] tracking-[-0.05em]"
          >
            Ready for
            <br />
            your MELOVE?
          </h2>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="melove-button-dark">
              Book your appointment
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-black/20 px-6 text-xs font-bold tracking-[0.08em] uppercase transition-colors hover:bg-black hover:text-white"
            >
              Contact MELOVE
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          FOOTER FOUNDATION
      ================================================= */}

      <footer className="bg-[var(--color-dark)] px-4 py-12 text-[var(--color-ivory)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-4xl tracking-[-0.04em]">
                MELOVE
              </p>

              <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">
                Premium beauty and hair in the heart of Long Street, Cape Town.
              </p>
            </div>

            <div className="text-sm text-white/50">
              <p>{businessConfig.address.street}</p>
              <p>{businessConfig.address.area}</p>
              <p>{businessConfig.address.city}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {businessConfig.copyrightYear} {businessConfig.name}. All
              rights reserved.
            </p>

            <a
              href={businessConfig.social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="w-fit transition-colors hover:text-white"
            >
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}