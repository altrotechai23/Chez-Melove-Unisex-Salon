import CinematicHero from "@/components/sections/CinematicHero";
import LocalSchemaOverlay from "@/components/seo/LocalSchemaOverlay";

export default function HomePage() {
  return (
    <>
      {/* Structural Structured Markup for Google Top 1 Search Crawlers */}
      <LocalSchemaOverlay />

      {/* Primary Layout Stream */}
      <CinematicHero />

      {/* Temporary structural scroll target mapping validation layout box */}
      <div id="services" className="min-h-screen bg-neutral-50 py-32 px-6">
        <div className="max-w-7xl mx-auto border-t border-neutral-200 pt-16">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">01 / Collection</span>
          <h2 className="text-3xl md:text-5xl font-light text-neutral-900 mt-4 tracking-tight">Premium Architecture Framework</h2>
        </div>
      </div>
    </>
  );
}
