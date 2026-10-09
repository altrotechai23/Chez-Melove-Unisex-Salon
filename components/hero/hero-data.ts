export type HeroMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      poster?: never;
      focalPoint?: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      poster: string;
      focalPoint?: string;
    };

export type HeroScene = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  media: HeroMedia;
};

export const heroScenes: HeroScene[] = [
  {
    id: "hero-01",
    index: "01",
    eyebrow: "Long Street • Cape Town",
    title: "Your beauty.",
    description:
      "A premium beauty and hair experience in the heart of Cape Town.",
    media: {
      type: "image",
      src: "/images/chezmelove/hairstyle-women.avif",
      alt: "CHEZ MELOVE beauty salon in Cape Town",
    },
  },

  {
    id: "hero-02",
    index: "02",
    eyebrow: "Hair • Beauty • Style",
    title: "Your style.",
    description:
      "A space to explore your look, your style and your expression.",
    media: {
      type: "image",
      src: "/images/chezmelove/men-haircut.jpeg",
      alt: "CHEZ MELOVE hair and beauty experience",
    },
  },

  {
    id: "hero-03",
    index: "03",
    eyebrow: "Cape Town",
    title: "Make it yours.",
    description:
      "Discover the CHEZ MELOVE experience on Long Street.",
    media: {
      type: "video",
      src: "/videos/chezmelove/facial-massage-mobile.webm",
      poster: "/images/chezmelove/shop.jpeg",
       alt: "",
    },
  },

  {
    id: "hero-04",
    index: "04",
    eyebrow: "Beauty • Self-expression",
    title: "Own your look.",
    description:
      "Beauty is personal. Your next look starts with you.",
    media: {
      type: "image",
      src: "/images/chezmelove/dreadlocks-men.jpeg",
      alt: "CHEZ MELOVE beauty detail",
    },
  },

  {
    id: "hero-05",
    index: "05",
    eyebrow: "128 Long Street",
    title: "Come through.",
    description:
      "Find CHEZ MELOVE in Cape Town City Centre.",
    media: {
      type: "video",
      src: "/videos/chezmelove/manicure.mp4",
      poster: "/images/chezmelove/manicures.jpeg",
       alt: "",
    },
  },

  {
    id: "hero-06",
    index: "06",
    eyebrow: "CHEZ MELOVE",
    title: "Your CHEZ Melove.",
    description:
      "Ready for your next look?",
    media: {
      type: "image",
      src: "/images/chezmelove/hair-plant.jpeg",
      alt: "CHEZ MELOVE premium beauty experience",
    },
  },
];