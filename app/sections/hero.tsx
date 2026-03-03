"use client";
import { DynamicIcon } from "lucide-react/dynamic";
import * as motion from "motion/react-client"
import { cubicBezier } from "motion/react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex md:flex-row flex-col gap-4">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="bg-white dark:bg-neutral-950 p-6 md:p-12 rounded-4xl w-full md:w-1/2 flex flex-col">

            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white">
              Organic Instagram Growth
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg my-6">
              No bots. No fake users. Guaranteed results. Get real followers delivered to your Instagram account — affordably and fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection("pricing")} className="group px-6 py-3 text-sm bg-highlight text-black rounded-xl cursor-pointer font-semibold transition-all flex items-center justify-center gap-2">
                Get Started Now
                <DynamicIcon name="arrow-right" className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex md:flex-row flex-col flex-wrap gap-4 pt-4 mt-auto">
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="shield-check" className="w-5 h-5 text-highlight" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">No Password Required</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="users" className="w-5 h-5 text-highlight" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">100% Real Followers</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="zap" className="w-5 h-5 text-highlight" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">Fast Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Social Proof */}
          <motion.div

          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: cubicBezier(0.4, 0, 0.2, 1), delay: 0 }}
          className="w-full md:w-1/2 bg-highlight rounded-4xl flex-shrink overflow-hidden relative">
            <div className="relative lg:h-[600px] flex items-center justify-center p-8 md:p-12">
              <div className="w-full max-w-sm space-y-8">
                {/* Big Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                  className="text-center"
                >
                  <div className="text-7xl md:text-8xl font-black text-black">10M+</div>
                  <div className="text-lg font-semibold text-black/70">Followers Delivered</div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-black/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-black">50K+</div>
                    <div className="text-sm font-medium text-black/70">Happy Customers</div>
                  </div>
                  <div className="bg-black/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-black">4.9★</div>
                    <div className="text-sm font-medium text-black/70">Average Rating</div>
                  </div>
                </motion.div>

                {/* Trust Line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center justify-center gap-2 text-black/80"
                >
                  <DynamicIcon name="check-circle" className="w-5 h-5" />
                  <span className="text-sm font-semibold">Guaranteed results or your money back</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="w-full flex flex-row items-center justify-center mt-10">
          <DynamicIcon name="chevron-down" className="size-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
