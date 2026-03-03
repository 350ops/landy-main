"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import * as motion from "motion/react-client"
import { cubicBezier } from "motion/react";
export function Mission() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 md:min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="relative h-[500px] flex items-center justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Decorative Background */}
              <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 18 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.7, ease: cubicBezier(0.4, 0, 0.2, 1) }}
              className="absolute inset-0 bg-highlight rounded-[4rem] transform scale-95"></motion.div>

              {/* Steps Card */}
              <div className="relative z-10 w-72 bg-white dark:bg-zinc-900 rounded-[50px] border-8 border-zinc-200 dark:border-zinc-700 shadow-2xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-highlight rounded-full flex items-center justify-center text-black font-bold">1</div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">Choose Followers</div>
                    <div className="text-xs text-zinc-500">Use the slider to pick</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-highlight rounded-full flex items-center justify-center text-black font-bold">2</div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">Enter Your Handle</div>
                    <div className="text-xs text-zinc-500">Type your @username</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-highlight rounded-full flex items-center justify-center text-black font-bold">3</div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">Complete Purchase</div>
                    <div className="text-xs text-zinc-500">Pay & watch it grow</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-highlight rounded-full w-full"></div>
                </div>
                <div className="text-center text-xs text-zinc-500">That&apos;s it — 3 clicks and done!</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div

          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          className=" order-1 lg:order-2">
            <div className="inline-block px-4 py-1.5 bg-highlight rounded-full">
              <span className="text-xs uppercase font-bold text-black">How It Works</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight my-4">
              3 clicks to real Instagram growth
            </h2>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              We made it dead simple. No complicated setup, no password sharing, no waiting around.
              Just choose how many followers you want, enter your handle, and checkout.
            </p>

            <div className="space-y-4">
              {[
                "No password or login credentials needed — ever",
                "Real followers start arriving within hours",
                "Gradual, organic delivery that looks natural",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <DynamicIcon name="check-circle" className="size-5" />
                  <p className="text-zinc-700 dark:text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
