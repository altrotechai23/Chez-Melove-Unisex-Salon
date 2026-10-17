// data/services.ts

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "hair" | "braiding" | "aesthetics" | "wellness";
  duration: string;
  price: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}

// Keep your supplied SERVICES_DATA array here.
// Add the export keyword to the existing declaration:
export const SERVICES_DATA: ServiceItem[] = [
   {
    id: "b5",
    slug: "singles-braids-twists",
    title: "Singles Braids & Twists",
    category: "braiding",
    duration: "Price list",
    price: "From R450",
    description:
      "Jumbo, bob, box, micro and knotless braids, plus passion twists and faux locs.",
    benefits: [
      "Jumbo braids — Medium R450, Large R500, XL R550, XXL R600",
      "Jumbo braids boho — Medium R500, Large R550, XL R650, XXL R700",
      "Jumbo braids knotless — Medium R550, Large R600, XL R650, XXL R700",
      "Jumbo braids knotless boho — Medium R600, Large R650, XL R700, XXL R800",
      "Bob braids, big — Short R500, Long R600",
      "Bob braids, medium — Short R550, Long R650",
      "Box braids, big — Medium R600, Large R700, XL R800, XXL R900",
      "Box braids, big boho — Medium R700, Large R800, XL R900, XXL R1,000",
      "Box braids, medium — Medium R750, Large R850, XL R950, XXL R1,050",
      "Box braids, medium boho — Medium R850, Large R950, XL R1,050, XXL R1,200",
      "Box braids, small — Medium R900, Large R1,100, XL R1,300, XXL R1,500",
      "Box braids, small boho — Medium R1,100, Large R1,300, XL R1,500, XXL R1,700",
      "Micro braids — Medium R1,100, Large R1,300, XL R1,500, XXL R1,700",
      "Knotless braids, big — Medium R750, Large R900, XL R1,050, XXL R1,200",
      "Knotless braids, big boho — Medium R850, Large R950, XL R1,100, XXL R1,300",
      "Knotless braids, medium — Medium R900, Large R1,100, XL R1,300, XXL R1,500",
      "Knotless braids, medium boho — Medium R1,100, Large R1,300, XL R1,500, XXL R1,700",
      "Knotless braids, small — Medium R1,100, Large R1,300, XL R1,500, XXL R1,700",
      "Knotless braids, small boho — Medium R1,300, Large R1,500, XL R1,700, XXL R1,900",
      "Passion twist, big — Medium R750, Large R900, XL R1,100, XXL R1,300",
      "Passion twist, medium — Medium R900, Large R1,100, XL R1,300, XXL R1,500",
      "Passion twist, small — Medium R1,100, Large R1,300, XL R1,500, XXL R1,800",
      "Passion twist, micro — Medium R1,300, Large R1,500, XL R1,700, XXL R2,000",
      "Faux locs, big — Small R800, Medium R1,000, Large R1,200",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h1",
    slug: "relaxers",
    title: "Relaxers",
    category: "hair",
    duration: "Price list",
    price: "From R300",
    description:
      "Professional relaxer services with options for different formulas and retouch appointments.",
    benefits: [
      "Mizani Sensitive — First time R700",
      "Mizani Sensitive — Retouch R600",
      "Mizani Normal — First time R650",
      "Mizani Normal — Retouch R550",
      "Organic — First time R450",
      "Organic — Retouch R400",
      "Dark & Lovely — First time R350",
      "Dark & Lovely — Retouch R300",
    ],
    imageUrl:
      "images/chezmelove/hair-dressing.jpg",
  },
  {
    id: "h2",
    slug: "blowouts-and-perms",
    title: "Blowouts & Perms",
    category: "hair",
    duration: "Price list",
    price: "From R250",
    description:
      "Styling and texture services with pricing based on hair length and selected treatment.",
    benefits: [
      "Blowout — Short hair R250",
      "Blowout — Medium to long hair R300",
      "Wet perm — Short hair R350",
      "Wet perm — Medium to long hair R450",
      "Keratin / Brazilian blowout — Medium R900",
      "Keratin / Brazilian blowout — Long R1,200",
      "Keratin / Brazilian blowout — Extra long R1,500",
      "Dry perm — Short R300",
      "Dry perm — Medium R350",
      "Dry perm — Long R450",
    ],
    imageUrl:
      "images/chezmelove/blow-and-perms.jpeg",
  },
  {
    id: "h3",
    slug: "hair-treatments",
    title: "Hair Treatments",
    category: "hair",
    duration: "Price list",
    price: "From R300",
    description:
      "Hair and scalp care options designed to complement your styling service.",
    benefits: [
      "D&L relax hair treatment R300",
      "D&L long hair treatment R350",
      "Organic oil treatment — Relaxed hair R300",
      "Organic oil treatment — Natural hair R350",
      "Aloe vera treatment R400",
      "Aloe vera scalp treatment R500",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h4",
    slug: "silk-press",
    title: "Silk Press",
    category: "hair",
    duration: "Price list",
    price: "From R350",
    description: "A smooth, polished styling finish with pricing by hair length.",
    benefits: [
      "Short hair R350",
      "Medium hair R450",
      "Long hair R450",
      "Extra long hair R550",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h5",
    slug: "hair-wash",
    title: "Hair Wash",
    category: "hair",
    duration: "Price list",
    price: "From R100",
    description:
      "Hair washing, blow-drying, ironing and sew-in wash services.",
    benefits: [
      "Before plaiting R100",
      "Wash & blow only R200",
      "Wash, blow & iron R250",
      "Mizani wash & blow only R300",
      "Mizani wash, blow & iron R350",
      "Aloe vera wash & blow only R250",
      "Aloe vera wash, blow & iron R300",
      "Wash sew-in — Medium R400",
      "Wash sew-in — Long R500",
      "Rinse & blow R100",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h6",
    slug: "wig-services",
    title: "Wig Wash & Treatment",
    category: "hair",
    duration: "Price list",
    price: "From R250",
    description: "Wig cleaning and treatment options priced by wig length.",
    benefits: [
      "Wig wash — Short R250",
      "Wig wash — Medium R300",
      "Wig wash — Long R350",
      "Wig wash — XL R450",
      "Wig treatment — Short R300",
      "Wig treatment — Medium R350",
      "Wig treatment — Long R400",
      "Wig treatment — XL R500",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h7",
    slug: "haircuts",
    title: "Haircuts",
    category: "hair",
    duration: "Price list",
    price: "From R100",
    description: "Gents' and ladies' cuts, trims and finishing services.",
    benefits: [
      "Gents — Cut all R150",
      "Gents — Normal cut R150",
      "Gents — Cream shave R150",
      "Gents — Cut & color R300",
      "Gents — Cut & S-curl R350",
      "Gents — Trim R100",
      "Gents — Trim And Dye R200",
      "Ladies — Normal cut R150",
      "Ladies — Scissors cut R300",
      "Ladies — Trim R100",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h8",
    slug: "styles-and-extensions",
    title: "Styles & Extensions",
    category: "hair",
    duration: "Price list",
    price: "From R180",
    description: "Everyday styling, special-occasion styling and extension services.",
    benefits: [
      "Ponytail with natural hair from R350",
      "Ponytail with closure R650",
      "Wedding styles R600",
      "Spirals R250",
      "Spirals on weave R300",
      "Tong R180",
      "Posing wig — Short R300",
      "Posing wig — Long R400",
      "Weaving — Synthetic hair R350",
      "Weaving — Boys cuts R500",
      "Weaving — Human hair R500",
      "Fix closure R250",
      "Make a wig R500",
      "Crochet hair R600",
      
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h9",
    slug: "kiddies-styles",
    title: "Kiddies Styles",
    category: "hair",
    duration: "Ages 2–5",
    price: "From R150",
    description: "Children's hair care and styling for ages two to five.",
    benefits: [
      "Wash R150",
      "Treatment R250",
      "Freehand straight back R150",
      "Freehand up styles R250",
      "Cornrows straight back R250",
      "Cornrows up styles R300",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h10",
    slug: "singles-braids",
    title: "Singles Braids With Natural Hair",
    category: "braiding",
    duration: "Price list",
    price: "From R400",
    description: "Singles braids and twists with prices based on length.",
    benefits: [
      "Singles braids — Medium R400",
      "Singles braids — Long R500",
    ],
    imageUrl:
      "/images/chezmelove/braids-twist.jpg",
  },
  {
    id: "h11",

    slug: "dreadlocks-and-twisting",
    title: "Dreadlocks & Twisting",
    category: "braiding",
    duration: "Price list",
    price: "From R800",
    description:
      "Twisting, styling and crocheting services for natural hair and dreadlocks.",
    benefits: [
      "Twisting — Starting at R800",
      "Twist & style R800",
      "Undo Dreadlocks Short — R3000",
      "Undo Dreadlocks Short — R5000 ",
      "Crocheting Afro hair — Start, short R1,000",
      "Crocheting Afro hair — Start, medium R1,000",
      "Crocheting Afro hair — Start, long R1,200",
      "Crocheting Afro hair — Start, extra long R2,500",
      "Crocheting Afro hair — Retouch, short R600",
      "Crocheting Afro hair — Retouch, medium R800",
      "Crocheting Afro hair — Retouch, long R1,000",
      "Crocheting Afro hair — Retouch, extra long R1,500",
      "Dreadlock extensions — Medium R1,500",
      "Dreadlock extensions — Long R2,500",
    ],
    imageUrl:
      "images/chezmelove/dreadlocks-men.jpeg",
  },
  {
    id: "h12",
    slug: "sisterlocks",
    title: "Sisterlocks",
    category: "braiding",
    duration: "Price list",
    price: "From R1,000",
    description: "Sisterlocks start and retouch options.",
    benefits: [
      "Start — Short (small) R1,500",
      "Start — Medium (small) R2,000",
      "Start — Micro R2,500",
      "Retouch — Short (small) R1,000",
      "Retouch — Medium (small) R1,300",
      "Retouch — Micro R1,500",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h13",
    slug: "hair-colouring",
    title: "Hair Colour",
    category: "hair",
    duration: "Price list",
    price: "From R250",
    description:
      "Colour services for natural hair, weaves, wigs and dreadlocks.",
    benefits: [
      "Natural hair — Short R250",
      "Natural hair — Medium R350",
      "Natural hair — Long R450",
      "Natural hair — Extra long R550",
      "Weaves & wigs — Short R500",
      "Weaves & wigs — Long R750",
      "Weaves & wigs — Extra long R800",
      "Highlights — Short R400",
      "Highlights — Long R600",
      "Highlights — Extra long R800",
      "Dreadlocks — Short R400",
      "Dreadlocks — Long R500",
      "Dreadlocks — Extra long R700",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h14",
    slug: "undo-only",
    title: "Undo Only",
    category: "braiding",
    duration: "Price list",
    price: "From R100",
    description: "Undoing services for freehand styles, braids and weaves.",
    benefits: [
     
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "h15",
    slug: "wool-and-needle-plaits",
    title: "Wool & Needle Plaits",
    category: "braiding",
    duration: "Price list",
    price: "From R500",
    description: "Straight-back and up-style plaiting options.",
    benefits: [
      
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
 
  {
    id: "b1",
    slug: "freehand-braiding",
    title: "Freehand Braiding",
    category: "braiding",
    duration: "Price list",
    price: "From R150",
    description: "Freehand straight-back and up-style braiding.",
    benefits: [
      "Straight back — Large R150",
      "Straight back — Medium R200",
      "Straight back — Small R250",
      "Straight back — Design R300",
      "Up style — Big R200",
      "Up style — Medium R250",
      "Up style — Small R300",
      "Up style — Design R350",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "b2",
    slug: "cornrows-straight-back",
    title: "Cornrows — Straight Back",
    category: "braiding",
    duration: "Price list",
    price: "From R300",
    description: "Straight-back cornrow styles in multiple sizes and designs.",
    benefits: [
      // "Big size — Medium R250, Large R300, XL R350, XXL R400",
      // "Big size, designed — Medium R300, Large R350, XL R400, XXL R450",
      // "Medium size — Medium R300, Large R350, XL R400, XXL R450",
      // "Medium size, designed — Medium R350, Large R400, XL R450, XXL R500",
      // "Small — Medium R350, Large R400, XL R450, XXL R500",
      // "Small, designed — Medium R400, Large R450, XL R550, XXL R600",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "b3",
    slug: "cornrows-up-styles",
    title: "Cornrows — Up Styles",
    category: "braiding",
    duration: "Price list",
    price: "From R400",
    description: "Up-style cornrows available in big, medium and small sizes.",
    benefits: [
      // "Big — Medium R350, Large R400, XL R450, XXL R500",
      // "Big, designed — Medium R400, Large R450, XL R500, XXL R550",
      // "Medium — Medium R400, Large R450, XL R500, XXL R550",
      // "Medium, designed — Medium R450, Large R500, XL R550, XXL R600",
      // "Small — Medium R450, Large R500, XL R550, XXL R600",
      // "Small, designed — Medium R500, Large R550, XL R600, XXL R650",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "b4",
    slug: "half-cornrows-singles",
    title: "Half Cornrows / Singles",
    category: "braiding",
    duration: "Price list",
    price: "From R600",
    description: "Half cornrows and singles in big, medium and small sizes.",
    benefits: [
      // "Big — Medium R550, Large R600, XL R650, XXL R700",
      // "Big, designed — Medium R600, Large R650, XL R700, XXL R750",
      // "Big, knotless — Medium R700, Large R800, XL R900, XXL R1,000",
      // "Medium — Medium R600, Large R650, XL R700, XXL R750",
      // "Medium, designed — Medium R650, Large R700, XL R750, XXL R800",
      // "Medium, knotless — Medium R900, Large R1,000, XL R1,100, XXL R1,200",
      // "Small — Medium R650, Large R700, XL R750, XXL R800",
      // "Small, designed — Medium R700, Large R750, XL R800, XXL R850",
      // "Small, knotless — Medium R1,000, Large R1,100, XL R1,200, XXL R1,300",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
 
  {
    id: "a1",
    slug: "nails",
    title: "Nail Services",
    category: "aesthetics",
    duration: "Price list",
    price: "From R100",
    description: "Manicure, pedicure, gel and acrylic nail services.",
    benefits: [
      "Soak off R100",
      "Manicure Simple R200",
      "Full Manicure  R400",
      "Full Manicure & gel R500",
      "Pedicure R450",
      "Pedicure & gel R600",
      "Gel R220",
      "Acrylic — Plain R300",
      "Acrylic — Design R400",
      "Acrylic — Medium R350",
      "Acrylic — Long R400",
      "Poly Gel — Medium R350 L R400 Short R300",
      "Soft Gel Tips — Medium R350 Long R380 Short R300",
      "Nail Art — R50 extra change"
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "a2",
    slug: "eyelashes-and-makeup",
    title: "Eyelashes & Makeup",
    category: "aesthetics",
    duration: "Price list",
    price: "From R350",
    description: "Beauty finishing services for your preferred look.",
    benefits: [
      "Eyelashes — Full R500",
      "Eyelashes — Less R400",
      "Makeup R350",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
   {
    id: "h16",
    slug: "pick-n-drop",
    title: "Pick N Drop",
    category: "braiding",
    duration: "Price list",
    price: "From R600",
    description: "Pick N Drop styling with pricing based on braid size.",
    benefits: [
      "Medium R600",
      "Small R750",
      "Micro R900",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=85",
  },
];

export const CATEGORIES = [
  { slug: "all", label: "All Services" },
  { slug: "hair", label: "Hair Services" },
  { slug: "braiding", label: "Braiding & Locs" },
  { slug: "aesthetics", label: "Nails & Beauty" },
  { slug: "wellness", label: "Wellness" },
] as const;