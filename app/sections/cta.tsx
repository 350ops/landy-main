"use client";
import { DynamicIcon } from "lucide-react/dynamic";
import * as motion from "motion/react-client"
import { cubicBezier } from "motion/react";

export function CTA() {
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
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Ready to grow your Instagram?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Join 50,000+ creators and businesses who are already growing their Instagram with real, organic followers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="group px-8 py-4 text-base bg-highlight text-black rounded-xl cursor-pointer font-semibold transition-all flex items-center justify-center gap-2 hover:bg-highlight/90"
          >
            Get Started Now
            <DynamicIcon name="arrow-right" className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.35, delay: 0.05, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">10M+</div>
            <div className="text-sm text-zinc-500">Followers Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">50K+</div>
            <div className="text-sm text-zinc-500">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">4.9★</div>
            <div className="text-sm text-zinc-500">Customer Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
