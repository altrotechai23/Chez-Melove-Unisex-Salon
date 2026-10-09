import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Tag,
  ShieldCheck,
  HelpCircle,
  ArrowLeft,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import type { Metadata } from "next";

interface ServiceDetails {
  slug: string;
  title: string;
  category: "hair" | "aesthetics" | "wellness";
  metaTitle: string;
  metaDescription: string;
  duration: string;
  price: string;
  longDescription: string;
  processSteps: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  imageUrl: string;
}

const SITE_URL = "https://melove.co.za";

const SERVICE_DATABASE: Record<string, ServiceDetails> = {
  "editorial-cut-style": {
    slug: "editorial-cut-style",
    title: "Editorial Precision Cut & Style",
    category: "hair",
    metaTitle:
      "Editorial Precision Cut & Style | Chez Melove Unisex Salon Cape Town",
    metaDescription:
      "Experience bespoke, structural hair design tailored to your identity at Cape Town's premier luxury salon. Book your editorial precision cut today.",
    duration: "60 Minutes",
    price: "R 650 - R 950",
    imageUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=2000&q=85",
    longDescription:
      "Our signature cutting methodology rejects standard template forms to honor natural texture, growth patterns, and individual structural contours. Each session begins with an in-depth consultation to understand your stylistic goals, followed by a clarifying hair wash, a precision texturizing cut, and a professional high-gloss blowout.",
    processSteps: [
      {
        title: "Texture Analysis Mapping",
        description:
          "A comprehensive assessment of facial architecture, hair growth patterns, and natural volume before styling begins.",
      },
      {
        title: "Scalp Clarification",
        description:
          "A cleansing treatment designed to remove product buildup and leave your hair refreshed and ready for styling.",
      },
      {
        title: "Bespoke Sculpting",
        description:
          "Precision cutting techniques designed to create flattering layers and a shape that grows out beautifully.",
      },
      {
        title: "High-Gloss Blowout",
        description:
          "A heat-conscious styling sequence that leaves hair polished, manageable, and full of movement.",
      },
    ],
    faqs: [
      {
        question: "How often should I maintain an editorial cut?",
        answer:
          "To maintain the shape and structure of your style, we generally recommend a follow-up appointment every 6 to 8 weeks. Your stylist can suggest a schedule suited to your hair and preferred look.",
      },
      {
        question: "Does the price vary depending on hair texture?",
        answer:
          "The final price may depend on hair length, styling requirements, and the time needed. Your stylist will confirm the applicable price before the service begins.",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_DATABASE[slug];

  if (!service) {
    return {
      title: "Service Not Found | Chez Melove Unisex Salon",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "Chez Melove Unisex Salon",
      type: "website",
      images: [
        {
          url: service.imageUrl,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const service = SERVICE_DATABASE[slug];

  if (!service) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/services/${service.slug}`;

  const whatsappMessage = `Hi Chez Melove, I would like to enquire about ${service.title}. Could you please confirm availability and pricing?`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    whatsappMessage
  )}`;

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
        item: `${SITE_URL}/#services`,
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
    serviceType: service.title,
    description: service.longDescription,
    url: canonicalUrl,
    image: service.imageUrl,
    provider: {
      "@type": "BeautySalon",
      name: "Chez Melove Unisex Salon",
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
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <article className="min-h-screen bg-neutral-50 pb-24 font-sans text-neutral-900 antialiased">
        {/* Editorial hero */}
        <div className="relative h-[45vh] min-h-[380px] w-full overflow-hidden bg-neutral-950 md:h-[55vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.imageUrl}
            alt={`${service.title} at Chez Melove Unisex Salon`}
            className="h-full w-full object-cover opacity-60 grayscale"
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/40" />

          <div className="absolute bottom-10 left-0 z-20 w-full px-6 md:bottom-14 md:px-12">
            <div className="mx-auto max-w-7xl">
              <Link
                href="/#services"
                className="mb-6 inline-flex items-center border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-colors hover:text-white"
              >
                <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                Back to Services
              </Link>

              <span className="mb-4 block w-max bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-950 shadow-sm">
                {service.category} Collection
              </span>

              <h1 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-tight text-white md:text-6xl">
                {service.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:mt-16 md:px-12 lg:grid-cols-12 lg:gap-16">
          {/* Left content column */}
          <div className="space-y-14 lg:col-span-8">
            {/* Service narrative */}
            <section
              aria-labelledby="narrative-subheading"
              className="space-y-6"
            >
              <h2
                id="narrative-subheading"
                className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400"
              >
                01 / The Experience
              </h2>

              <p className="max-w-3xl text-base font-light leading-relaxed text-neutral-700 md:text-lg">
                {service.longDescription}
              </p>
            </section>

            {/* Service process */}
            <section
              aria-labelledby="process-subheading"
              className="space-y-8 border-t border-neutral-200 pt-10 md:pt-12"
            >
              <h2
                id="process-subheading"
                className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400"
              >
                02 / Your Treatment Journey
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                {service.processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="border border-neutral-200 bg-white p-6 shadow-sm transition-colors hover:border-neutral-400"
                  >
                    <span className="mb-3 block font-mono text-xs text-neutral-400">
                      Phase {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mb-2 text-sm font-semibold tracking-wide text-neutral-900">
                      {step.title}
                    </h3>

                    <p className="text-xs font-light leading-relaxed text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Frequently asked questions */}
            <section
              aria-labelledby="faq-subheading"
              className="space-y-8 border-t border-neutral-200 pt-10 md:pt-12"
            >
              <h2
                id="faq-subheading"
                className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400"
              >
                03 / Frequently Asked Questions
              </h2>

              <div className="space-y-5">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
                  >
                    <h3 className="flex items-start gap-3 text-sm font-semibold text-neutral-900">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                      <span>{faq.question}</span>
                    </h3>

                    <p className="mt-3 border-l border-neutral-200 pl-7 text-xs font-light leading-relaxed text-neutral-500">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right booking panel */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-4">
            <div className="border border-neutral-200 bg-white p-6 shadow-md md:p-8">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
                Session Details
              </h2>

              {/* Service details */}
              <div className="mb-8 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>

                  <span className="text-right text-xs font-medium text-neutral-900">
                    {service.duration}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    <Tag className="h-4 w-4" />
                    Investment
                  </span>

                  <span className="text-right text-xs font-medium text-neutral-900">
                    {service.price}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    <ShieldCheck className="h-4 w-4" />
                    Consultation
                  </span>

                  <span className="text-right text-xs font-medium text-neutral-900">
                    Stylist Guided
                  </span>
                </div>
              </div>

              {/* Primary booking CTA */}
              <Link
                href="/#booking"
                className="group mb-3 inline-flex w-full items-center justify-center gap-2 bg-neutral-900 px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-neutral-700"
              >
                Reserve Your Session
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {/* WhatsApp consultation CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366] py-3.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800 transition-colors hover:bg-[#25D366]/5"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Consultation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <p className="mt-5 text-center text-[10px] font-light leading-relaxed text-neutral-400">
                Appointment requests are subject to salon confirmation.
                Please contact us if you need to change your appointment.
              </p>
            </div>

            {/* Local information */}
            <div className="border border-neutral-200 bg-neutral-100/70 p-6">
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Cape Town / Western Cape
              </span>

              <h3 className="mb-2 text-sm font-medium text-neutral-900">
                Designed Around You
              </h3>

              <p className="text-xs font-light leading-relaxed text-neutral-500">
                Every service is tailored to your individual needs, hair
                characteristics, and styling goals. Ask our team about
                recommendations for your next salon visit.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom navigation */}
        <div className="mx-auto mt-16 max-w-7xl border-t border-neutral-200 px-6 pt-8 md:px-12">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Explore All Services
          </Link>
        </div>
      </article>
    </>
  );
}