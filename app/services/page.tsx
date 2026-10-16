import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import { SERVICES_DATA, CATEGORIES } from "@/data/services";
import ServicesExplorer from "./ServicesExplorer";

const SITE_URL = "https://melove.co.za";
const PAGE_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: "Hair, Braiding & Beauty Services in Cape Town",
  description:
    "Explore hair styling, relaxers, silk press, braids, dreadlocks, nails, lashes and makeup at Chez Melove Unisex Salon in Cape Town. Browse services and prices, then book your appointment.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Chez Melove Unisex Salon",
    title: "Hair & Beauty Services | Chez Melove Cape Town",
    description:
      "Discover your next look with our hair, braiding, locs, nail and beauty services. Explore our service menu and book your visit.",
    images: [
      {
        url: `${SITE_URL}/images/chezmelove/hair-men.jpeg`,
        alt: "Hair styling at Chez Melove Unisex Salon",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const CATEGORY_DETAILS = [
  {
    slug: "hair",
    eyebrow: "01 / Hair",
    title: "Hair, your way.",
    description:
      "From everyday care to a complete transformation, discover styling, treatments, colour and finishing services tailored to your look.",
  },
  {
    slug: "braiding",
    eyebrow: "02 / Braiding & Locs",
    title: "Made to stand out.",
    description:
      "Explore braids, cornrows, twists, dreadlocks and protective styles, with options across sizes, lengths and techniques.",
  },
  {
    slug: "aesthetics",
    eyebrow: "03 / Beauty",
    title: "The finishing touch.",
    description:
      "Complete your look with nail care, manicures, pedicures, lashes and makeup.",
  },
  {
    slug: "wellness",
    eyebrow: "04 / Wellness",
    title: "Time for yourself.",
    description:
      "Explore our available wellness offerings and contact us for assistance choosing a treatment.",
  },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  hair: "Hair",
  braiding: "Braiding & Locs",
  aesthetics: "Nails & Beauty",
  wellness: "Wellness",
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Chez Melove Unisex Salon — Service Menu",
  description:
    "Hair, braiding, locs, nail and beauty services offered by Chez Melove Unisex Salon.",
  url: PAGE_URL,
  numberOfItems: SERVICES_DATA.length,
  itemListElement: SERVICES_DATA.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
  })),
};

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES_DATA)[number];
}) {
  const previewItems = service.benefits
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_60px_-28px_rgba(41,37,36,0.25)]">
      <Link
        href={`/services/${service.slug}`}
        className="relative block overflow-hidden bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-inset"
        aria-label={`Explore ${service.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.imageUrl}
            alt={`${service.title} at Chez Melove Unisex Salon`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />

          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {CATEGORY_LABELS[service.category] ?? service.category}
          </span>

          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-stone-900">
            <ArrowUpRight size={19} strokeWidth={1.6} />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-medium tracking-tight text-stone-900 sm:text-[1.35rem]">
            <Link
              href={`/services/${service.slug}`}
              className="transition-colors hover:text-stone-600 focus-visible:outline-none focus-visible:underline"
            >
              {service.title}
            </Link>
          </h3>
          <Sparkles
            size={17}
            strokeWidth={1.4}
            className="mt-1 shrink-0 text-stone-400"
            aria-hidden="true"
          />
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-500">
          {service.description}
        </p>

        {previewItems.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-stone-100 pt-4">
            {previewItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-5 text-stone-600"
              >
                <Check
                  size={14}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-stone-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3 border-t border-stone-100 pt-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                Starting from
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
                {service.price.replace(/^From\s*/i, "")}
              </p>
            </div>

            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2.5 text-xs font-semibold text-stone-800 transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
            >
              Explore
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AllServicesPage() {
  const activeCategories = CATEGORY_DETAILS.filter((category) =>
    SERVICES_DATA.some((service) => service.category === category.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <main className="min-h-screen overflow-hidden bg-[#faf9f6] text-stone-900">
        {/* Editorial hero */}
        <section className="relative">
          <div className="pointer-events-none absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full bg-stone-200/40 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pb-20 lg:pt-28">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_360px]">
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                    Chez Melove · Cape Town
                  </span>
                </div>

                <h1 className="text-5xl font-normal leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                  Your look.
                  <br />
                  <span className="font-serif italic text-stone-500">
                    Your signature.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
                  Discover hair styling, protective braids, locs, nail
                  care and beauty services at Chez Melove Unisex Salon.
                  Explore the treatments, compare prices and find the
                  service that feels right for you.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
                  >
                    Book an appointment
                    <ArrowUpRight size={17} />
                  </Link>

                  <a
                    href="#service-menu"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/60 px-6 py-3 text-sm font-medium text-stone-800 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    Explore services
                    <ArrowDownRight size={16} />
                  </a>
                </div>
              </div>

              <div className="border-l border-stone-200 pl-6 lg:mb-2">
                <p className="font-serif text-3xl italic text-stone-700">
                  Beauty, considered.
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-500">
                  A service menu built around your style, your preferences
                  and the details that make a difference.
                </p>

                <div className="mt-6 flex items-center gap-3 text-xs text-stone-500">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full  bg-white">
                    <Sparkles size={16} />
                  </span>
                  <span>
                    <strong className="block font-semibold text-stone-800">
                      {SERVICES_DATA.length} services
                    </strong>
                    <span>One place to explore your options</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service directory */}
        {/* Interactive horizontal service explorer */}
        <ServicesExplorer />
      </main>
    </>
  );
}
