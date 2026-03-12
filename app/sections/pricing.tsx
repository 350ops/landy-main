"use client";

import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { cubicBezier } from "motion/react";
import * as motion from "motion/react-client";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { formatQar, formatQarFromFollowers } from "@/lib/currency";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRICE_PER_FOLLOWER = 0.05;
const MIN_FOLLOWERS = 50;
const MAX_FOLLOWERS = 3000;
const STEP = 50;

export function Pricing() {
  const [followers, setFollowers] = useState(500);
  const [handle, setHandle] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && handle.trim().length > 0) {
      try {
        setIsLoading(true);
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ followers, handle }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setStep(3);
      } catch (error) {
        console.error('Failed to create payment intent', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block px-4 py-1.5 bg-highlight rounded-full">
            <span className="text-xs uppercase font-bold text-black">Get Followers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Choose your growth
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Pick how many followers you want, enter your handle, and checkout. It&apos;s that simple.
          </p>
        </motion.div>

        {/* Order Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: cubicBezier(0.4, 0, 0.2, 1),
          }}
          className="max-w-lg mx-auto"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-highlight text-black" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                  }`}>
                  {step > s ? <DynamicIcon name="check" className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-0.5 transition-all ${step > s ? "bg-highlight" : "bg-zinc-200 dark:bg-zinc-800"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div className="relative bg-white dark:bg-zinc-950 rounded-3xl p-8 border-2 border-highlight shadow-2xl shadow-highlight/20">

            {/* Step 1: Choose Followers */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-6xl font-black text-zinc-900 dark:text-white">{followers.toLocaleString()}</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1">followers</div>
                </div>

                {/* Slider */}
                <div className="space-y-3">
                  <input
                    type="range"
                    min={MIN_FOLLOWERS}
                    max={MAX_FOLLOWERS}
                    step={STEP}
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-lime-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-highlight [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-highlight [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{MIN_FOLLOWERS}</span>
                    <span>{MAX_FOLLOWERS.toLocaleString()}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">{formatQarFromFollowers(followers, PRICE_PER_FOLLOWER)}</span>
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">
                    {formatQar(PRICE_PER_FOLLOWER)} per follower
                  </div>
                  <div className="text-xs text-zinc-400 mt-2">Checkout is still processed in USD.</div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-highlight text-black hover:bg-highlight/90 flex items-center justify-center gap-2"
                >
                  Continue
                  <DynamicIcon name="arrow-right" className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Enter Handle */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Enter your Instagram handle</h3>
                  <p className="text-sm text-zinc-500 mt-1">We&apos;ll deliver {followers.toLocaleString()} followers to this account</p>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold">@</div>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9._]/g, ""))}
                    placeholder="yourusername"
                    className="w-full pl-10 pr-4 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-lg font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={handle.trim().length === 0 || isLoading}
                    className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-highlight text-black hover:bg-highlight/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? "Loading..." : "Continue"}
                    {!isLoading && <DynamicIcon name="arrow-right" className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm & Pay */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Confirm your order</h3>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Account</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">@{handle.replace("@", "")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Followers</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Delivery</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">24-72 hours</span>
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between items-center">
                    <span className="font-bold text-zinc-900 dark:text-white">Total</span>
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">{formatQarFromFollowers(followers, PRICE_PER_FOLLOWER)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <DynamicIcon name="shield-check" className="w-4 h-4 text-highlight" />
                  <span>Money-back guarantee if we don&apos;t deliver</span>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={handleBack}
                    className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 h-[48px]"
                  >
                    Back
                  </button>
                  <div className="flex-1">
                    {clientSecret ? (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <ExpressCheckoutElement
                          onConfirm={() => {
                            alert("Payment confirmed!");
                            setStep(1);
                          }}
                        />
                      </Elements>
                    ) : (
                      <div className="h-[48px] flex items-center justify-center text-sm text-zinc-500">
                        Loading payment...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features below card */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <DynamicIcon name="check-circle" className="w-4 h-4 text-highlight" />
              <span>Real followers</span>
            </div>
            <div className="flex items-center gap-1">
              <DynamicIcon name="check-circle" className="w-4 h-4 text-highlight" />
              <span>No password needed</span>
            </div>
            <div className="flex items-center gap-1">
              <DynamicIcon name="check-circle" className="w-4 h-4 text-highlight" />
              <span>30-day refill guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
