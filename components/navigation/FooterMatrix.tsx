"use client";

import React from "react";
import Link from "next/link";
import { Scissors, MapPin, Clock, Phone, Mail } from "lucide-react";
import CurrentYear from "../CurrentYear";

export default function FooterMatrix() {


  return (
    <footer 
      id="contact" 
      className="bg-neutral-950 text-neutral-400 py-20 px-6 md:px-12 w-full border-t border-neutral-800 scroll-mt-16 pb-24 md:pb-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Chez Melove Unisex Salon — Footer Indexing Matrix</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* COLUMN 1: Brand Positioning Architecture */}
        <div className="space-y-4">
          <div className="flex items-center tracking-[0.25em] font-light text-xl text-white">
            <span className="font-medium mr-2">ME</span>
            <span className="text-neutral-500 font-extralight">LOVE</span>
          </div>
          <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs">
            Cape Town&apos;s premier luxury unisex salon signature hub. Synthesizing high-fashion precision structural hair design with clinical editorial aesthetic care.
          </p>
        </div>

        {/* COLUMN 2: Hyper-Local Geo-SEO Target Matrix */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-2 stroke-[1.5]" /> Location District
          </h3>
          <address className="not-italic text-xs font-light text-neutral-400 space-y-1.5 leading-relaxed">
            <p>Chez Melove Salon Building</p>
            <p>Premium Waterfront District / Long Street Quarter</p>
            <p>Cape Town, Western Cape, 8001</p>
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2 block">South Africa</p>
          </address>
        </div>

        {/* COLUMN 3: Operational Availability Windows */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center">
            <Clock className="w-3.5 h-3.5 mr-2 stroke-[1.5]" /> Timelines
          </h3>
          <ul className="text-xs font-light space-y-2" aria-label="Opening hours grid">
            <li className="flex justify-between border-b border-neutral-900 pb-1.5">
              <span>Monday &ndash; Friday</span>
              <span className="text-white">09:00 &ndash; 19:00</span>
            </li>
            <li className="flex justify-between border-b border-neutral-900 pb-1.5">
              <span>Saturday</span>
              <span className="text-white">09:00 &ndash; 17:00</span>
            </li>
            <li className="flex justify-between text-neutral-600">
              <span>Sunday</span>
              <span className="tracking-wider uppercase text-[10px]">Sanctuary Closed</span>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: Communication Channels & Conversion Gateways */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center">
            <Scissors className="w-3.5 h-3.5 mr-2 stroke-[1.5]" /> Connections
          </h3>
          <ul className="text-xs font-light space-y-3">
            <li className="flex items-center">
              <Phone className="w-3.5 h-3.5 mr-2.5 text-neutral-600" />
              <a href="tel:+27680678559" className="hover:text-white transition-colors duration-300">+27 68 067 8559</a>
            </li>
            <li className="flex items-center">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB4PSIyIiB5PSI0IiByeD0iMiIvPjxwYXRoIGQ9Im0yMiA3LTgtNSA4IDVabTAgMTBsLTgtNSA4IDVaTTIgN2w4IDUtOCA1Wm0wIDEwbDggLTUtOCA1WiIvPjwvc3ZnPg==" className="w-3.5 h-3.5 mr-2.5 text-neutral-600 filter invert-40" alt="" aria-hidden="true" style={{ width: '14px', height: '14px' }} />
              <a href="mailto:chezmelove2020@gmail.com" className="hover:text-white transition-colors duration-300">chezmelove2020@gmail.com</a>
            </li>
            <li className="pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] uppercase tracking-[0.25em] bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 hover:bg-white hover:text-neutral-950 transition-all inline-block"
              >
                @chez_melove
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BASELINE: Legal Matrices & Index Validation Links */}
      <div className="max-w-7xl mx-auto border-t border-neutral-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-neutral-600">
        <div>
          &copy; <CurrentYear/> Chez Melove Unisex Salon. Realized for Top Local Rankings.
        </div>
        <nav className="flex space-x-6" aria-label="Legal & compliance links">
          <Link href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Charter</Link>
          <Link href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Curation</Link>
          <Link href="#sitemap" className="hover:text-neutral-400 transition-colors">Sitemap</Link>
        </nav>
      </div>
    </footer>
  );
}
