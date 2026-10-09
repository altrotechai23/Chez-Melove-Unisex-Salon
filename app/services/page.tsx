import React from "react";
import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "hair" | "aesthetics" | "wellness";
  duration: string;
  price: string;
  description: string;
  imageUrl: string;
}

// Complete central repository data layer matching our dynamic route system
const ALL_SERVICES_DATA: ServiceItem[] = [
  {
    id: "h1",
    slug: "editorial-cut-style",
    title: "Editorial Precision Cut & Style",
    category: "hair",
    duration: "60 min",
    price: "R 650 - R 950",
    description: "High-end bespoke structural cutting tailored to individual texture and identity, including a luxury scalp massage and premium blowout finish.",
    imageUrl: "/images/chezmelove/hair-men.jpeg"
  },
  {
    id: "h2",
    slug: "signature-balayage-dimensional-tone",
    title: "Signature Balayage & Dimensional Tone",
    category: "hair",
    duration: "180 min",
    price: "R 1,800 - R 2,600",
    description: "Hand-painted, fluid color gradients that grow out gracefully. Customized processing to preserve hair strand health and structure.",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "a1",
    slug: "advanced-microneedling-collagen-therapy",
    title: "Advanced Micro-Needling Collagen Therapy",
    category: "aesthetics",
    duration: "75 min",
    price: "R 1,400",
    description: "Medical-grade precision dermal remodeling to smooth out fine lines, correct hyperpigmentation, and naturally trigger cell renewal.",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "a2",
    slug: "hydro-infusion-deep-pore-resurfacing",
    title: "Hydro-Infusion Deep Pore Resurfacing",
    category: "aesthetics",
    duration: "45 min",
    price: "R 850",
    description: "Multistep vortex extraction and custom serum infusion targeting urban environmental stressors specific to Cape Town coastal humidity.",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "w1",
    slug: "aromatherapy-stress-release",
    title: "Aromatherapy Stress Release",
    category: "wellness",
    duration: "90 min",
    price: "R 1,100",
    description: "Deep tissue physical tension resetting using targeted essential oil infusions designed to mitigate executive burnout stressors.",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "w2",
    slug: "detoxifying-scalp-spa-blowout",
    title: "Detoxifying Scalp Spa & Blowout Combination",
    category: "hair",
    duration: "75 min",
    price: "R 750",
    description: "Micro-circulation hair root exfoliation treatment paired with deep structural conditioning to counter mineral hard-water exposure.",
    imageUrl: "https://unsplash.com"
  }
];

export const metadata = {
  title: "All Treatment Menus | Chez Melove Unisex Salon Cape Town",
  description: "Browse the complete editorial catalog of hair crafting services, clinical aesthetics, and luxury wellness treatments at Chez Melove Cape Town.",
  alternates: {
    canonical: "https://melove.co.za",
  },
};

export default function AllServicesPage() {
  
  // Localized JSON-LD structural schema matrix mapping for the complete index list
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": ALL_SERVICES_DATA.length,
    "itemListElement": ALL_SERVICES_DATA.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://melove.co.za/${service.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="bg-neutral-50 text-neutral-900 min-h-screen py-20 px-6 md:px-12 font-sans antialiased">
        <div className="max-w-7xl mx-auto">
          
          {/* Editorial Top Matrix Header */}
          <div className="max-w-2xl border-b border-neutral-200 pb-12 mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold block mb-3">
              Catalog Directory
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 mb-6">
              All Services.
            </h1>
            <p className="text-sm font-light text-neutral-500 leading-relaxed">
              Explore our unified catalog of precision treatments. Each selection routes directly to its individual configuration summary, breakdown matrix, and specialized care guides.
            </p>
          </div>

          {/* Directory Layout Grid Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES_DATA.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group block bg-white border border-neutral-200 flex flex-col justify-between hover:border-neutral-900 transition-all duration-500 shadow-sm will-change-transform overflow-hidden focus:outline-none"
              >
                <article className="flex flex-col h-full w-full">
                  
                  {/* Aspect Ratio Balanced Image Container */}
                  <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] uppercase tracking-[0.25em] bg-neutral-950/90 text-white font-bold px-2.5 py-1">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Core Text Info Padding Wrapper */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-light tracking-tight text-neutral-900 mb-3 group-hover:text-neutral-950 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-neutral-500 font-light text-xs leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <div>
                      {/* Technical Meta Metrics */}
                      <div className="flex items-center space-x-6 text-xs text-neutral-400 font-mono mb-6 pt-4 border-t border-neutral-100">
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 stroke-[1.5]" /> {service.duration}</span>
                        <span className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1.5 stroke-[1.5]" /> {service.price}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center">
                          View Treatment Matrix <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>

                </article>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
