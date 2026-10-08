export const businessConfig = {
  name: "CHEZ MELOVE",
  legalName: "CHEZ MELOVE",

  copyrightYear: 2026,

  description:
    "Premium beauty and hair services in the heart of Long Street, Cape Town.",

  address: {
    street: "128 Long Street",
    area: "Cape Town City Centre",
    city: "Cape Town",
    province: "Western Cape",
    country: "South Africa",
    postalCode: "",
  },

  contact: {
    phone: "",
    whatsapp: "",
    email: "",
  },

  social: {
    tiktok: "https://www.tiktok.com/@chezmelove12",
    instagram: "",
    facebook: "",
  },

  googleBusinessProfile:
    "https://share.google/hOY2Y5kNhJ9hRIkOY",

  booking: {
    url: "",
  },

  hours: [],

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Find Us",
      href: "/find-us",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
} as const;

export type BusinessConfig = typeof businessConfig;