import { MetadataRoute } from "next";

// Define the central routing registry matching our dynamic service database keys
const SERVICE_SLUGS = [
  "editorial-cut-style"
];

const BASE_URL = "https://melove.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Map core static framework navigation nodes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    }
  ];

  // 2. Programmatically generate entry mappings for dynamic long-tail target pages
  const dynamicServiceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Construct the comprehensive automated listing tree for Google indexing spiders
  return [...staticRoutes, ...dynamicServiceRoutes];
}
