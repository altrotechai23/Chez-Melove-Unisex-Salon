import CinematicHero from "@/components/sections/CinematicHero";
import ServiceDiscovery from "@/components/sections/ServiceDiscovery";
import BrandNarrativeGallery from "@/components/sections/BrandNarrativeGallery";
import LocalSchemaOverlay from "@/components/seo/LocalSchemaOverlay";
import BookingMatrix from "@/components/sections/BookingMatrix";
import GoogleReviews from "@/components/sections/GoogleReviews";
import BrandMarquee from "@/components/sections/BrandMarquee";

export default function HomePage() {
  return (
    <>
      {/* Structured Markup Data for Local Search Optimization */}
      <LocalSchemaOverlay />

      {/* Cinematic Fluid Background Presentation Viewport */}
      <CinematicHero />

      {/* Programmatic Service Matrix and Dynamic Content Discovery Grid */}
      <ServiceDiscovery />

      <BrandMarquee />

      {/* Luxury Brand Narrative and Editorial Gallery Portfolio Module */}
      <BrandNarrativeGallery />

      {/* Google Reviews Social Verification Engine */}
      <GoogleReviews />

      {/* High-Conversion Multi-Step Local Reservation Engine */}
      <BookingMatrix />
    </>
  );
}


// +27674568392 Dineo Thandoh