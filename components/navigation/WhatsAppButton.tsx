"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Pre-configured conversion click text mapping to target local unisex appointments
  const phoneNumber = "27210000000"; // Replace with salon's primary registered WhatsApp business node
  const textMessage = encodeURIComponent(
    "Hello Chez Melove. I would like to inquire about booking an premium session at your Cape Town unisex salon."
  );
  const whatsappUrl = `https://wa.me{phoneNumber}?text=${textMessage}`;

  useEffect(() => {
    // Elegant entrance delay to avoid triggering content shifts or early layout clutter
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 2, 
        ease: "back.out(1.7)",
        clearProps: "transform" 
      }
    );
  }, []);

  return (
    <a
      ref={buttonRef}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-8 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10 group focus:outline-none"
      aria-label="Connect with Chez Melove instant concierge on WhatsApp"
      title="Instant WhatsApp Consultation"
    >
      {/* Optimized Native SVG Drawing Matrix Asset */}
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://w3.org"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.91 1.505 5.526 0 10.016-4.486 10.019-10.008.002-2.674-1.042-5.187-2.94-7.087-1.9-1.9-4.414-2.943-7.089-2.945-5.53 0-10.022 4.49-10.025 10.013-.001 1.745.452 3.426 1.312 4.904l-.994 3.634 3.732-.977zm11.368-6.116c-.302-.151-1.791-.882-2.069-.982-.278-.1-.48-.151-.681.151-.202.302-.782.982-.958 1.183-.176.202-.353.226-.655.076-.301-.151-1.274-.469-2.426-1.496-.897-.801-1.502-1.791-1.678-2.093-.176-.302-.019-.465.131-.615.136-.135.302-.353.454-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.075-.151-.681-1.641-.933-2.246-.247-.594-.5-.514-.681-.523-.176-.009-.378-.011-.58-.011-.202 0-.53.076-.807.378-.278.302-1.06 1.037-1.06 2.529 0 1.492 1.085 2.934 1.236 3.135.151.202 2.133 3.256 5.167 4.565.72.311 1.282.497 1.72.637.723.23 1.381.197 1.901.12.58-.087 1.791-.731 2.044-1.437.252-.706.252-1.312.176-1.437-.076-.126-.278-.202-.58-.353z" />
      </svg>
      {/* Visual text display hint when layout hover actions execute */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 font-sans font-semibold tracking-wide text-xs text-white transition-all duration-500 ease-out whitespace-nowrap block">
        Chat Concierge
      </span>
    </a>
  );
}
