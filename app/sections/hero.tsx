"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import * as motion from "motion/react-client";
import { cubicBezier } from "motion/react";

export function Hero() {
  const features = [
    {
      icon: "sparkles",
      title: "Organic-grade feel",
      description:
        "Profile UI and premium-quality presentation built to keep the result looking clean and credible.",
    },
    {
      icon: "mail",
      title: "No password needed",
      description:
        "Just your public handle. We never request login credentials or access to your account.",
    },
  ];

  return (
    <section
      id="hero"
      className="pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-tight"
        >
          Organic-grade growth that looks native to your profile.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
          className="mt-12 grid md:grid-cols-2 gap-4"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <DynamicIcon
                  name={feature.icon as any}
                  className="w-5 h-5 text-purple-400"
                />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-bold mb-1">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
