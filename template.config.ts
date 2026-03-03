/**
 * Template Configuration
 *
 * Customize your landing page by editing the values below.
 * This centralizes common customizations for easier template management.
 */

export const templateConfig = {
  // Brand Information
  brand: {
    name: "GrowInsta",
    tagline: "Affordable, Accelerated, Organic Instagram Growth",
    description: "No bots. No fake users. Guaranteed results. Get real Instagram followers delivered to your account organically.",
  },

  // Contact & Social
  contact: {
    email: "hello@growinsta.com",
    phone: "+1 (555) 987-6543",
  },

  social: {
    twitter: "https://twitter.com/growinsta",
    instagram: "https://instagram.com/growinsta",
    linkedin: "https://linkedin.com/company/growinsta",
    facebook: "https://facebook.com/growinsta",
    tiktok: "https://tiktok.com/@growinsta",
  },

  // Pricing per follower
  pricing: {
    minFollowers: 50,
    maxFollowers: 3000,
    defaultFollowers: 500,
    pricePerFollower: 0.05,
    currency: "USD",
  },

  // Theme Colors (Tailwind classes)
  theme: {
    primary: "lime-400",
    primaryDark: "lime-500",
    secondary: "emerald-500",
    accent: "lime-400",
  },

  // Features Section
  features: [
    {
      icon: "users",
      title: "100% Real Followers",
      description: "Every follower is a real person with an active Instagram account",
    },
    {
      icon: "shield-check",
      title: "Safe & Secure",
      description: "We never ask for your password. Just your public Instagram handle",
    },
    {
      icon: "zap",
      title: "Fast Delivery",
      description: "Start seeing new followers within hours of placing your order",
    },
    {
      icon: "trending-up",
      title: "Organic Growth",
      description: "Natural-looking growth that keeps your account safe from bans",
    },
  ],

  // Stats
  stats: {
    followers: "10M+",
    rating: "4.9★",
    customers: "50K+",
  },

  // Navigation Links
  navigation: {
    main: [
      { name: "How It Works", href: "#about" },
      { name: "Features", href: "#features" },
      { name: "FAQ", href: "#faq" },
    ],
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#about" },
      { name: "Results", href: "#testimonials" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#faq" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },

  // SEO & Metadata
  seo: {
    title: "GrowInsta - Affordable, Organic Instagram Growth",
    description: "No bots. No fake users. Guaranteed results. Get real Instagram followers delivered organically.",
    keywords: ["instagram growth", "buy followers", "organic instagram", "real followers", "social media growth"],
    ogImage: "/og-image.png",
    twitterHandle: "@growinsta",
  },
};

export type TemplateConfig = typeof templateConfig;
