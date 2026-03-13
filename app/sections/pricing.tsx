"use client";

import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { cubicBezier } from "motion/react";
import * as motion from "motion/react-client";

const bundles = [
  {
    name: "Easy start",
    subtitle: "Immediate by default",
    followers: "~100 Followers",
    description:
      "The most accessible entry bundle for users who want a low-friction first boost.",
    price: "QAR 10",
  },
  {
    name: "Business lift",
    subtitle: "Fast-start delivery",
    followers: "+500",
    description:
      "A balanced package for creators, cafes, salons, and local businesses.",
    price: "QAR 50",
  },
  {
    name: "Premium",
    subtitle: "Immediate by default",
    followers: "+1,000",
    description:
      "A stronger package when you want the profile to feel active, trusted, and established.",
    price: "QAR 100",
  },
];

const growthActivity = [
  { time: "Starting now", count: "+12" },
  { time: "3h after checkout", count: "+16" },
  { time: "6h after checkout", count: "+18" },
  { time: "9h after checkout", count: "+21" },
];

function InstagramMockup() {
  return (
    <div className="bg-white dark:bg-white rounded-[2.5rem] border-[6px] border-zinc-200 dark:border-zinc-300 shadow-2xl overflow-hidden max-w-sm mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <DynamicIcon name="signal" className="w-3.5 h-3.5" />
          <DynamicIcon name="wifi" className="w-3.5 h-3.5" />
          <DynamicIcon name="battery-full" className="w-4 h-4" />
        </div>
      </div>

      {/* Instagram Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-1">
          <DynamicIcon name="lock" className="w-3.5 h-3.5 text-black" />
          <span className="text-black font-bold text-sm">ari.studio</span>
          <DynamicIcon name="chevron-down" className="w-3.5 h-3.5 text-black" />
        </div>
        <div className="flex items-center gap-4">
          <DynamicIcon name="plus-square" className="w-5 h-5 text-black" />
          <DynamicIcon name="menu" className="w-5 h-5 text-black" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-4 mb-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-lg">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around">
            <div className="text-center">
              <div className="text-black font-bold text-base">128</div>
              <div className="text-gray-500 text-xs">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-black font-bold text-base">18.5K</div>
              <div className="text-gray-500 text-xs">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-black font-bold text-base">612</div>
              <div className="text-gray-500 text-xs">Following</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-3">
          <div className="text-black font-bold text-sm">Ari Studio</div>
          <div className="text-gray-600 text-xs leading-relaxed">
            Lifestyle creator, product reels, small-batch launches.
          </div>
          <div className="text-blue-500 text-xs font-medium">shop.ari-studio.co</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-100 text-black text-xs font-semibold py-1.5 rounded-lg">
            Following
          </button>
          <button className="flex-1 bg-gray-100 text-black text-xs font-semibold py-1.5 rounded-lg">
            Message
          </button>
        </div>
      </div>

      {/* Growth Activity Section */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="text-black font-bold text-sm">Growth activity</div>
            <div className="text-gray-400 text-xs">Immediate by default</div>
          </div>
          <span className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
            +100 queued
          </span>
        </div>

        <div className="space-y-2 mt-3">
          {growthActivity.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                <DynamicIcon name="user-plus" className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-black text-xs font-semibold">
                  New followers added
                </div>
                <div className="text-gray-400 text-[10px]">{item.time}</div>
              </div>
              <span className="text-black font-bold text-sm">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-around items-center py-3 border-t border-gray-100">
        <DynamicIcon name="home" className="w-5 h-5 text-black" />
        <DynamicIcon name="search" className="w-5 h-5 text-gray-400" />
        <DynamicIcon name="plus-square" className="w-5 h-5 text-gray-400" />
        <DynamicIcon name="shopping-bag" className="w-5 h-5 text-gray-400" />
        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-[8px] text-gray-600 font-bold">A</span>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [selectedBundle, setSelectedBundle] = useState(0);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 bg-purple-500/20 rounded-full mb-4">
            <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
              Step 1
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Choose a growth bundle
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bundle Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: cubicBezier(0.4, 0, 0.2, 1),
            }}
            className="space-y-4"
          >
            {bundles.map((bundle, index) => (
              <div
                key={index}
                onClick={() => setSelectedBundle(index)}
                className={`relative bg-white dark:bg-zinc-900 rounded-2xl p-6 cursor-pointer transition-all border-2 ${
                  selectedBundle === index
                    ? "border-purple-500 shadow-lg shadow-purple-500/10"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-lg">
                      {bundle.name}
                    </h3>
                    <p className="text-zinc-400 text-sm">{bundle.subtitle}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedBundle === index
                        ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white"
                        : "border-zinc-300 dark:border-zinc-600"
                    }`}
                  >
                    {selectedBundle === index && (
                      <DynamicIcon
                        name="check"
                        className="w-3.5 h-3.5 text-white dark:text-black"
                      />
                    )}
                  </div>
                </div>

                {/* Follower Count */}
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-2">
                  {bundle.followers}
                </div>

                {/* Description */}
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                  {bundle.description}
                </p>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium px-3 py-1.5 rounded-lg">
                    {bundle.price}
                  </span>
                  <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <DynamicIcon name="arrow-right" className="w-5 h-5" />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Column - Instagram Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: cubicBezier(0.4, 0, 0.2, 1),
            }}
          >
            <InstagramMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
