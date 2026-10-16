// app/services/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  HelpCircle,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";

import { SERVICES_DATA } from "@/data/services";
import ServiceBookingButton from "@/components/Servicebookingbutton";

const SITE_URL = "https://melove.co.za";
const SITE_NAME = "Chez Melove Unisex Salon";

type Service = (typeof SERVICES_DATA)[number];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  hair: "Hair Services",
  braiding: "Braiding & Locs",
  aesthetics: "Nails & Beauty",
  wellness: "Wellness",
};

function getCategoryLabel(category: string) {
  return CATEGORY_LABELS[category] ?? "Salon Services";
}

function getCanonicalUrl(slug: string) {
  return `${SITE_URL}/services/${slug}`;
}

function getServiceDescription(service: Service) {
  const description = service.description?.trim();

  if (description) {
    return description;
  }

  return `${service.title} at ${SITE_NAME} in Cape Town. Contact our team to discuss your preferred style, available options and pricing.`;
}

function getSeoDescription(service: Service) {
  const description = getServiceDescription(service);

  if (description.length <= 155) {
    return description;
  }

  return `${description.slice(0, 152).trimEnd()}...`;
}

function getWhatsAppUrl(service: Service) {
  const message = [
    `Hi ${SITE_NAME},`,
    `I would like to enquire about ${service.title}.`,
    `Could you please confirm availability, the listed price (${service.price}) and any applicable options?`,
  ].join(" ");

  // No salon phone number was supplied.
  // This opens WhatsApp's share/contact flow with the enquiry prefilled.
  return `https://wa.me/27680678559?text=${encodeURIComponent(message)}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = SERVICES_DATA.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: `Service Not Found | ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = getCanonicalUrl(service.slug);
  const description = getSeoDescription(service);
  const title = `${service.title} in Cape Town | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: service.imageUrl,
          alt: `${service.title} at ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = SERVICES_DATA.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const canonicalUrl = getCanonicalUrl(service.slug);
  const categoryLabel = getCategoryLabel(service.category);
  const description = getServiceDescription(service);
  const whatsappUrl = getWhatsAppUrl(service);

  // The benefits array is the service's existing list of options/details.
  // Render it as supplied; do not invent prices or treatment options.
  const serviceOptions = service.benefits.filter(
    (item) => typeof item === "string" && item.trim().length > 0,
  );

  const relatedServices = SERVICES_DATA.filter(
    (item) =>
      item.category === service.category &&
      item.slug !== service.slug,
  ).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: categoryLabel,
    description,
    url: canonicalUrl,
    image: service.imageUrl,
    ...(service.price
      ? {
          offers: {
            "@type": "Offer",
            price: service.price.replace(/[^0-9.]/g, "") || undefined,
            priceCurrency: "ZAR",
            url: canonicalUrl,
            description: `Listed service price: ${service.price}. Confirm the applicable price and options with the salon.`,
          },
        }
      : {}),
    provider: {
      "@type": "BeautySalon",
      name: SITE_NAME,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cape Town",
        addressRegion: "Western Cape",
        addressCountry: "ZA",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Cape Town",
    },
  };

  return (
    <>
      {/* Search-engine structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <main className="min-h-screen overflow-hidden bg-[#faf9f6] text-stone-900">
        {/* Hero */}
        <section className="relative isolate min-h-[430px] overflow-hidden bg-stone-950 sm:min-h-[500px] lg:min-h-[570px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.imageUrl}
            alt={`${service.title} at ${SITE_NAME} in Cape Town`}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/50 to-transparent" />

          <div className="relative mx-auto flex min-h-[430px] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[500px] sm:px-8 sm:pb-16 lg:min-h-[570px] lg:px-12 lg:pb-20">
            <Link
              href="/services"
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft size={15} />
              All services
            </Link>

            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                <Sparkles
                  size={14}
                  className="text-white/80"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  {categoryLabel} · Cape Town
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-normal leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                {service.title}
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                
                <ServiceBookingButton className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  Booking Now
                  <ArrowUpRight size={17} />
                </ServiceBookingButton>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageSquare size={16} />
                  Ask about this service
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main service content */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16 lg:px-12 lg:py-20">
          <div className="min-w-0 space-y-12 sm:space-y-16">
            {/* About the service */}
            <section aria-labelledby="service-about-heading">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                01 / The service
              </p>

              <h2
                id="service-about-heading"
                className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
              >
                A look that feels like you.
              </h2>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
                {description}
              </p>
            </section>

            {/* Existing service options / price breakdown */}
            {serviceOptions.length > 0 && (
              <section
                aria-labelledby="service-options-heading"
                className="border-t border-stone-200 pt-10 sm:pt-12"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                  02 / Available options
                </p>

                <h2
                  id="service-options-heading"
                  className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
                >
                  Options & details
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
                  Explore the options listed for this service. If your
                  preferred length, style or treatment is not listed, contact
                  the salon to confirm availability and the applicable price.
                </p>

                <ul className="mt-7 divide-y divide-stone-200 border-y border-stone-200">
                  {serviceOptions.map((option, index) => (
                    <li
                      key={`${option}-${index}`}
                      className="flex items-start gap-4 py-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-stone-600 ring-1 ring-stone-200">
                        <Check size={13} aria-hidden="true" />
                      </span>

                      <span className="text-sm leading-6 text-stone-700">
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Booking guidance */}
            <section
              aria-labelledby="before-booking-heading"
              className="border-t border-stone-200 pt-10 sm:pt-12"
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                {serviceOptions.length > 0
                  ? "03 / Before you book"
                  : "02 / Before you book"}
              </p>

              <h2
                id="before-booking-heading"
                className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
              >
                Let’s get the details right.
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                    <Tag size={18} className="text-stone-700" />
                  </div>

                  <h3 className="text-sm font-semibold text-stone-900">
                    Confirm your price
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Use the listed price as a guide and contact the salon to
                    confirm the price for your selected option before your
                    appointment.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                    <HelpCircle size={18} className="text-stone-700" />
                  </div>

                  <h3 className="text-sm font-semibold text-stone-900">
                    Ask about your style
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Share your preferred look and any questions with the team
                    so they can help you understand the available options.
                  </p>
                </div>
              </div>
            </section>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <section
                aria-labelledby="related-services-heading"
                className="border-t border-stone-200 pt-10 sm:pt-12"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                  {serviceOptions.length > 0
                    ? "04 / Explore more"
                    : "03 / Explore more"}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2
                    id="related-services-heading"
                    className="font-serif text-3xl font-normal tracking-tight sm:text-4xl"
                  >
                    More in {categoryLabel}.
                  </h2>

                  <Link
                    href="/services"
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium text-stone-700 transition-colors hover:text-stone-950"
                  >
                    View all services
                    <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedServices.map((related) => (
                    <Link
                      key={related.id}
                      href={`/services/${related.slug}`}
                      className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={related.imageUrl}
                          alt={`${related.title} at ${SITE_NAME}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium leading-6 text-stone-900">
                          {related.title}
                        </h3>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-stone-700">
                            {related.price}
                          </span>

                          <ArrowUpRight
                            size={16}
                            className="shrink-0 text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky booking panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(28,25,23,0.35)] sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                Your service
              </p>

              <h2 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-stone-900">
                {service.title}
              </h2>

              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                {categoryLabel}
              </p>

              <div className="my-6 border-t border-stone-100" />

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100">
                  <Tag size={16} className="text-stone-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Listed price
                  </p>
                  <p className="mt-1 break-words text-xl font-semibold tracking-tight text-stone-900">
                    {service.price}
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-stone-100" />

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100">
                  <MapPin size={16} className="text-stone-700" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-800">
                    Cape Town, Western Cape
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-stone-100" />

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100">
                  <ShieldCheck size={16} className="text-stone-700" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Appointment
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    Contact the salon to confirm availability and the final
                    price for your chosen option.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                
                <ServiceBookingButton className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full
                   bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors
                    hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900
                     focus-visible:ring-offset-2">
                  Booking Now
                  <ArrowUpRight size={17}  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ServiceBookingButton>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-stone-200 px-5 py-3 text-center text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  <MessageSquare size={16} />
                  Enquire on WhatsApp
                </a>
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-stone-400">
                Appointment requests are subject to confirmation by the salon.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-stone-200/80 bg-stone-100/70 p-5">
              <div className="flex items-center gap-2 text-stone-700">
                <Clock size={15} />
                <p className="text-xs font-semibold">
                  Need help choosing?
                </p>
              </div>

              <p className="mt-2 text-xs leading-6 text-stone-500">
                Ask the team which option best suits your preferred style and
                budget before booking.
              </p>
            </div>
          </aside>
        </div>

        {/* Final conversion section */}
        <section className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-stone-900 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                  Chez Melove · Cape Town
                </p>

                <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                  Ready for your next look?
                </h2>

                <p className="mt-3 text-sm leading-7 text-stone-300">
                  Explore our full service menu or request an appointment for
                  {` ${service.title.toLowerCase()}`}.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ServiceBookingButton className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  Booking Now
                  <ArrowUpRight size={17} />
                </ServiceBookingButton>

                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  All services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-12"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <li>
              <Link href="/" className="transition-colors hover:text-stone-800">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/services"
                className="transition-colors hover:text-stone-800"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-600" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>
      </main>
    </>
  );
}
