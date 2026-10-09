import CinematicHero from "@/components/sections/CinematicHero";
import ServiceDiscovery from "@/components/sections/ServiceDiscovery";
import BrandNarrativeGallery from "@/components/sections/BrandNarrativeGallery";
import LocalSchemaOverlay from "@/components/seo/LocalSchemaOverlay";

export default function HomePage() {
  return (
    <>
      {/* Structured Markup Data for Local Search Optimization */}
      <LocalSchemaOverlay />

      {/* Cinematic Fluid Background Presentation Viewport */}
      <CinematicHero />

      {/* Programmatic Service Matrix and Dynamic Content Discovery Grid */}
      <ServiceDiscovery />

      {/* Luxury Brand Narrative and Editorial Gallery Portfolio Module */}
      <BrandNarrativeGallery />

      {/* Temporary Placeholder Layout Node for Booking Matrix Scroll Targets */}
      <div id="booking" className="min-h-screen bg-neutral-50 py-32 px-6 flex items-center justify-center border-t border-neutral-200">
        <div className="max-w-xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-4">03 / Conversions</span>
          <h2 className="text-3xl md:text-5xl font-light text-neutral-900 tracking-tight">The Online Reservation Matrix</h2>
        </div>
      </div>
    </>
  );
}
