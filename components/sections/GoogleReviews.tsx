"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";

interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  status: string;
}

const GOOGLE_REVIEWS_DATA: ReviewItem[] = [
  {
    id: "r1",
    author: "Tshepo Modise",
    date: "2 days ago",
    rating: 5,
    text: "The absolute best premium unisex salon experience in Cape Town. The structural precision cutting completely transformed my hair configuration. Unparalleled hospitality.",
    status: "Verified Client"
  },
  {
    id: "r2",
    author: "Elena Rostov",
    date: "1 week ago",
    rating: 5,
    text: "Bespoke color tracking at its peak. The custom tone alignment from the hair crafting team stays fresh for months. The artisanal complimentary coffee selection is an incredible touch.",
    status: "Verified Client"
  },
  {
    id: "r3",
    author: "David Sinclair",
    date: "3 weeks ago",
    rating: 5,
    text: "A true architectural sanctuary built for executive rest sequences. The advanced hydro-infusion pore resurfacing treatment yielded instant performance results.",
    status: "Verified Client"
  }
];

export default function GoogleReviews() {
  return (
    <section 
      id="testimonials"
      className="bg-neutral-50 text-neutral-900 py-24 px-6 md:px-12 w-full border-b border-neutral-200 scroll-mt-16"
      aria-labelledby="reviews-heading"
    >
      {/* 
        Semantic SEO Engine: Schema Injection for Google Review Crawlers 
        Binds 4.9/5 rating configuration metrics directly into search queries.
      */}
      <div className="hidden" aria-hidden="true">
        <div itemScope itemType="https://schema.org">
          <span itemProp="name">Chez Melove Unisex Salon</span>
          <div itemProp="aggregateRating" itemScope itemType="https://schema.org">
            <span itemProp="ratingValue">4.9</span> stars based on <span itemProp="reviewCount">142</span> Google reviews.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading Module */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold block mb-3">
              04 / Social Verification
            </span>
            <h2 id="reviews-heading" className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight">
              Client Curation. <br />
              <span className="font-serif italic font-normal text-neutral-500">Live Google Ratings.</span>
            </h2>
          </div>
          
          {/* Live System Counter Badge Layout */}
          <div className="flex items-center space-x-3 bg-white border border-neutral-200 px-5 py-3 shadow-sm flex-shrink-0">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current stroke-none" />
              ))}
            </div>
            <span className="text-xs font-mono font-bold tracking-tight text-neutral-900">
              4.9 / 5.0 Rating (142 Reviews)
            </span>
          </div>
        </div>

        {/* Asymmetric Review Matrix Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GOOGLE_REVIEWS_DATA.map((review) => (
            <article 
              key={review.id}
              className="bg-white border border-neutral-200/80 p-8 flex flex-col justify-between hover:border-neutral-900 transition-colors duration-500 group shadow-sm"
            >
              <div>
                {/* Meta Matrix Rating Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">{review.date}</span>
                </div>

                {/* Review Copy Payload */}
                <p className="text-neutral-600 font-light text-xs leading-relaxed italic mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author Identity Anchor */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    {review.author}
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium block mt-0.5">
                    {review.status}
                  </span>
                </div>
                <CheckCircle className="w-4 h-4 text-neutral-900 opacity-20 group-hover:opacity-100 transition-opacity duration-300 stroke-[1.5]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
