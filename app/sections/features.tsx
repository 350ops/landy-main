"use client";
import { DynamicIcon } from "lucide-react/dynamic";
import { cubicBezier } from "motion/react";
import * as motion from "motion/react-client"

export function Features() {
  const features = [
    {
      icon: "users",
      title: "100% Real Followers",
      description: "Every follower is a real, active Instagram user. No bots, no ghost accounts — ever.",
      accentColor: "lime",
    },
    {
      icon: "shield-check",
      title: "Safe & Secure",
      description: "We never ask for your password. Just provide your public Instagram handle and we do the rest.",
      accentColor: "lime",
      isHighlight: true,
    },
    {
      icon: "zap",
      title: "Fast Delivery",
      description: "Start seeing new followers within hours of your order. Most orders complete within 24-72 hours.",
      accentColor: "lime",
    },
    {
      icon: "trending-up",
      title: "Organic Growth",
      description: "Natural-looking, gradual delivery that keeps your account safe and your engagement high.",
      accentColor: "lime",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.35, delay: 0, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block px-4 py-1.5 bg-highlight rounded-full">
            <span className="text-xs uppercase font-bold text-black">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Real growth,<br />
            real results
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We deliver authentic Instagram followers that engage with your content, helping you build a genuine audience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.35,
          delay: 0.1,
          ease: cubicBezier(0.4, 0, 0.2, 1)
        }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`group flex flex-col min-h-80 relative bg-white dark:bg-zinc-950 rounded-3xl p-8 hover:border-lime-400 dark:hover:border-lime-400 transition-all duration-300 ${feature.isHighlight ? "!bg-highlight" : ""}`}
            >
              {/* Icon */}
              <div className={`mb-6 w-14 h-14 bg-neutral-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform ${feature.isHighlight ? "!bg-black/10" : ""}`}>
                <DynamicIcon name={feature.icon as any} className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold text-zinc-900 dark:text-white mb-1 mt-auto ${feature.isHighlight ? "!text-black" : ""}`}>
                {feature.title}
              </h3>
              <p className={`text-zinc-600 text-sm dark:text-zinc-400 ${feature.isHighlight ? "!text-black" : ""}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
