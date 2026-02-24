// ============================================================
// BRAND CONFIGURATION — Anderson's Top Notch Security Company
// ============================================================

export type IntensityMode = "subtle" | "immersive";
export type HeroVariant = "centered" | "split" | "fullscreen" | "parallax";

export interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string; description: string }[];
}

export interface SectionConfig {
  id: string;
  type: "hero" | "features" | "cta" | "testimonials" | "stats" | "gallery" | "contact" | "custom";
  enabled: boolean;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  contactPhone: string;
  address: { street: string; city: string; state: string; zip: string };
  founded: number;
  logo: {
    icon: string;
    full: string;
    ogImage: string;
    favicon: string;
  };
  intensity: IntensityMode;
  heroVariant: HeroVariant;
  darkMode: "dark-only" | "light-only" | "toggle";
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    surface: string;
    muted: string;
    mutedForeground: string;
  };
  nav: NavLink[];
  sections: SectionConfig[];
  seo: {
    title: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
  };
  social: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    tiktok?: string;
  };
  kmp: boolean;
}

export const brand: BrandConfig = {
  name: "Anderson's Top Notch Security",
  tagline: "Protecting What Matters Most",
  description:
    "Elite security services with transparent pricing and fast booking. Armed guards, commercial protection, and fleet security — 24/7 vigilance you can count on.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "info@andersonssecurity.com",
  contactPhone: "(123) 456-7890",
  logo: {
    icon: "/favicon.svg",
    full: "/favicon.svg",
    ogImage: "/website-template-OG.webp",
    favicon: "/favicon.ico",
  },
  address: {
    street: "123 Security Blvd, Suite 100",
    city: "Business City",
    state: "ST",
    zip: "12345",
  },
  founded: 2010,

  intensity: "immersive",
  heroVariant: "split",
  darkMode: "dark-only",

  colors: {
    primary: "#d4a418",
    primaryForeground: "#0a0f1a",
    accent: "#b8860b",
    accentForeground: "#FFFFFF",
    background: "#0a0f1a",
    foreground: "#F1F5F9",
    surface: "#0f172a",
    muted: "#1e2a5e",
    mutedForeground: "#94A3B8",
  },

  nav: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book Now" },
  ],

  sections: [
    { id: "hero", type: "hero", enabled: true },
    { id: "stats", type: "stats", enabled: true },
    { id: "features", type: "features", enabled: true },
    { id: "cta", type: "cta", enabled: true },
  ],

  seo: {
    title: "Anderson's Top Notch Security | Professional Security Services",
    titleTemplate: "%s | Anderson's Security",
    description:
      "Professional security services including commercial protection, armed guards, and fleet security. Trusted by 500+ businesses. Get a free quote today.",
    keywords: [
      "security services",
      "armed guards",
      "commercial security",
      "event security",
      "fleet security",
      "security company",
    ],
  },

  social: {},
  kmp: false,
};

// ============================================================
// SERVICES DATA
// ============================================================

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  icon: "building" | "shield" | "truck";
  tagline: string;
  shortDescription: string;
  baseRate: number;
  features: { icon: string; label: string; description: string }[];
  benefits: string[];
  idealFor: string[];
  featured: boolean;
}

export const services: ServiceData[] = [
  {
    id: "commercial",
    title: "Commercial Security",
    slug: "commercial-security",
    icon: "building",
    tagline: "Comprehensive Protection for Your Business",
    shortDescription:
      "Safeguard commercial property with full-spectrum security solutions. From retail stores to corporate offices, tailored protection 24/7.",
    baseRate: 35,
    features: [
      { icon: "clipboard", label: "Security Assessments", description: "Complete vulnerability analysis" },
      { icon: "key", label: "Access Control", description: "Entry management systems" },
      { icon: "users", label: "On-Site Guards", description: "Trained security personnel" },
      { icon: "map", label: "Patrol Services", description: "Regular property rounds" },
    ],
    benefits: [
      "Reduce theft and vandalism",
      "Improve employee safety",
      "Enhance customer confidence",
      "Insurance premium discounts",
      "Incident documentation",
      "24/7 monitoring available",
    ],
    idealFor: ["Office Buildings", "Retail Stores", "Warehouses", "Manufacturing Plants", "Medical Facilities"],
    featured: false,
  },
  {
    id: "armed",
    title: "Armed Guards & Personnel",
    slug: "armed-guards",
    icon: "shield",
    tagline: "Elite Protection When Stakes Are High",
    shortDescription:
      "Carefully vetted, extensively trained, licensed armed security personnel. Ideal for high-value assets, executive protection, visible deterrence.",
    baseRate: 45,
    features: [
      { icon: "badge", label: "Licensed Officers", description: "State-certified armed guards" },
      { icon: "user", label: "Executive Protection", description: "Personal security details" },
      { icon: "calendar", label: "Event Security", description: "Large gathering protection" },
      { icon: "building", label: "Site Security", description: "High-value asset protection" },
    ],
    benefits: [
      "Maximum deterrence",
      "Rapid threat response",
      "Professional demeanor",
      "Detailed incident reports",
      "Background-verified personnel",
      "Continuous training program",
    ],
    idealFor: [
      "Financial Institutions",
      "Jewelry Stores",
      "High-Profile Events",
      "Executive Protection",
      "Asset Transport",
    ],
    featured: true,
  },
  {
    id: "transport",
    title: "Fleet & Transport Security",
    slug: "fleet-transport",
    icon: "truck",
    tagline: "Protecting Assets in Motion",
    shortDescription:
      "Specialized transport security for valuable cargo. Escort services, driver security training, comprehensive logistics protection.",
    baseRate: 50,
    features: [
      { icon: "truck", label: "Escort Services", description: "Armed convoy protection" },
      { icon: "map-pin", label: "Route Planning", description: "Secure corridor mapping" },
      { icon: "radar", label: "GPS Monitoring", description: "Real-time fleet tracking" },
      { icon: "graduation-cap", label: "Driver Training", description: "Security awareness programs" },
    ],
    benefits: [
      "Cargo theft prevention",
      "Driver safety assurance",
      "Insurance compliance",
      "Real-time monitoring",
      "Route risk assessment",
      "Emergency response protocols",
    ],
    idealFor: [
      "Pharmaceutical Transport",
      "High-Value Cargo",
      "Cash-in-Transit",
      "Fleet Operations",
      "Logistics Companies",
    ],
    featured: false,
  },
];

// ============================================================
// PRICING CONSTANTS (all in cents)
// ============================================================

export const pricing = {
  standard: {
    baseRate: 3500,
    armedUpcharge: 1000,
    overnightUpcharge: 500,
    rushFee: 25000,
    sopFee: 50000,
    minHours: 4,
    maxGuards: 10,
    maxDays: 30,
  },
  transport: {
    baseRate: 5000,
    armedUpcharge: 1500,
    overnightUpcharge: 1000,
    rushFee: 35000,
    sopFee: 75000,
    minHours: 2,
    maxGuards: 10,
    maxDays: 30,
  },
  rushThresholdHours: 72,
};

// ============================================================
// COMPANY STATS
// ============================================================

export const stats = [
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Guards Deployed", value: 250, suffix: "+" },
  { label: "Clients Protected", value: 500, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
];

// ============================================================
// BUSINESS HOURS
// ============================================================

export const businessHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed (Emergency Only)" },
];
