"use client";

import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are the followers real people?",
      answer:
        "Yes, 100%. We only deliver real, active Instagram users. We never use bots, fake accounts, or inactive profiles. Every follower is a genuine person with an active account.",
    },
    {
      question: "Do you need my password?",
      answer:
        "Absolutely not. We never ask for your password or login credentials. All we need is your public Instagram username (handle). Your account security is never at risk.",
    },
    {
      question: "How fast will I see results?",
      answer:
        "Most orders begin delivering within a few hours. Depending on the size of your order, full delivery typically completes within 24 to 72 hours. We deliver gradually to keep growth looking natural.",
    },
    {
      question: "Is this safe for my Instagram account?",
      answer:
        "Yes. Our organic delivery method is designed to look completely natural. We never violate Instagram's terms of service, and our gradual delivery approach ensures your account stays safe.",
    },
    {
      question: "What if I don't get the followers?",
      answer:
        "We offer a money-back guarantee. If we fail to deliver the followers you ordered, you'll receive a full refund. We also provide free refills if any followers drop within 30 days of delivery.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-highlight rounded-full">
            <span className="text-sm font-bold text-black uppercase">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to know about our Instagram growth service
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer dark:bg-zinc-950 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`flex-shrink-0 rounded-full flex items-center justify-center duration-500 transition-transform ${
                    openIndex === index ? "rotate-135" : ""
                  }`}
                >
                  <DynamicIcon name="plus" className="w-5 h-5 text-black" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pl-16 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
