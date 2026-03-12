/**
 * Template Configuration
 *
 * Customize your landing page by editing the values below.
 * This centralizes common customizations for easier template management.
 */

export const templateConfig = {
  // Brand Information
  brand: {
    name: "Reach974",
    tagline: "Visibility. Awareness. Growth.",
    description: "For creators and businesses looking to grow their social presence audience through controlled visibility.",
    domain: "reach974.com",
  },

  // Contact & Social
  contact: {
    email: "hello@reach974.com",
    phone: "+1 (555) 987-6543",
  },

  social: {
    twitter: "https://twitter.com/reach974",
    instagram: "https://instagram.com/reach974",
    linkedin: "https://linkedin.com/company/reach974",
    facebook: "https://facebook.com/reach974",
    tiktok: "https://tiktok.com/@reach974",
  },

  // Pricing per follower
  pricing: {
    minFollowers: 50,
    maxFollowers: 3000,
    defaultFollowers: 500,
    pricePerFollower: 0.05,
    currency: "QAR",
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
    title: "Reach974 - Affordable, Organic Instagram Growth",
    description: "Visibility. Awareness. Growth. For creators and businesses looking to grow their social presence through controlled visibility.",
    keywords: ["instagram growth", "buy followers", "organic instagram", "real followers", "social media growth", "reach974"],
    ogImage: "/og-image.png",
    twitterHandle: "@reach974",
  },
};

export type TemplateConfig = typeof templateConfig;
