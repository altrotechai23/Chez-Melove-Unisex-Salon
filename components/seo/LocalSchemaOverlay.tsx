import React from "react";

export default function LocalSchemaOverlay() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Chez Melove Unisex Salon",
    "image": [
      "https://melove.co.za"
    ],
    "@id": "https://melove.co.za",
    "url": "https://melove.co.za",
    "telephone": "+27210000000",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Premium Waterfront or Bree Street Layout district",
      "addressLocality": "Cape Town",
      "postalCode": "8001",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.9249,
      "longitude": 18.4241
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://instagram.com"
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Cape Town"
    },
    "description": "Chez Melove Unisex Salon is Cape Town's premier luxury space for premium editorial hair design, modern aesthetics, and luxury styling."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
