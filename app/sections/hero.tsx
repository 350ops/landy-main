"use client";

import { useState, useEffect, useCallback } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import * as motion from "motion/react-client"
import { cubicBezier } from "motion/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { formatQar, formatQarFromFollowers } from "@/lib/currency";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRICE_PER_FOLLOWER = 0.05;
const MIN_FOLLOWERS = 50;
const MAX_FOLLOWERS = 3000;
const STEP = 50;

function CheckoutForm({ followers, handle, onBack, onSuccess }: {
  followers: number;
  handle: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [walletsAvailable, setWalletsAvailable] = useState<boolean | null>(null);
  const [showCardFallback, setShowCardFallback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}?success=true`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  const handleExpressCheckoutConfirm = async () => {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}?success=true`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
    } else {
      onSuccess();
    }
  };

  const orderSummary = (
    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">Account</span>
        <span className="font-semibold text-zinc-900 dark:text-white">@{handle}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">Followers</span>
        <span className="font-semibold text-zinc-900 dark:text-white">{followers.toLocaleString()}</span>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between items-center">
        <span className="font-bold text-zinc-900 dark:text-white">Total</span>
        <span className="text-xl font-black text-zinc-900 dark:text-white">{formatQarFromFollowers(followers, PRICE_PER_FOLLOWER)}</span>
      </div>
    </div>
  );

  // If wallets are available, show them as the primary payment method
  if (walletsAvailable && !showCardFallback) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Complete payment</h3>
        </div>

        {orderSummary}

        <ExpressCheckoutElement
          onConfirm={handleExpressCheckoutConfirm}
          options={{
            buttonType: { applePay: "buy", googlePay: "buy" },
            buttonHeight: 48,
          }}
        />

        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => setShowCardFallback(true)}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer transition-colors"
          >
            Or pay with card
          </button>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          Back
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
          <DynamicIcon name="shield-check" className="w-3 h-3" />
          <span>Secured by Stripe. Checkout is processed in USD.</span>
        </div>
      </div>
    );
  }

  // Wallets not available OR user chose "pay with card" — show card form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Complete payment</h3>
      </div>

      {orderSummary}

      {/* Hidden express checkout to detect wallet availability */}
      {walletsAvailable === null && (
        <div className="hidden">
          <ExpressCheckoutElement
            onReady={(e) => {
              setWalletsAvailable(e.availablePaymentMethods ? Object.values(e.availablePaymentMethods).some(Boolean) : false);
            }}
            onConfirm={handleExpressCheckoutConfirm}
          />
        </div>
      )}

      <div className="rounded-xl overflow-hidden">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            if (showCardFallback) {
              setShowCardFallback(false);
            } else {
              onBack();
            }
          }}
          disabled={isProcessing}
          className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-highlight text-black hover:bg-highlight/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <DynamicIcon name="lock" className="w-4 h-4" />
              Pay {formatQarFromFollowers(followers, PRICE_PER_FOLLOWER)}
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
        <DynamicIcon name="shield-check" className="w-3 h-3" />
        <span>Secured by Stripe. Checkout is processed in USD.</span>
      </div>
    </form>
  );
}

export function Hero() {
  const [followers, setFollowers] = useState(500);
  const [handle, setHandle] = useState("");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 = success
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const sanitizedHandle = handle.replace(/[^a-zA-Z0-9._]/g, "").trim();

  const createPaymentIntent = useCallback(async () => {
    setIsLoadingPayment(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followers, handle: sanitizedHandle }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      console.error("Failed to create payment intent:", err);
    } finally {
      setIsLoadingPayment(false);
    }
  }, [followers, sanitizedHandle]);

  useEffect(() => {
    if (step === 3 && !clientSecret) {
      createPaymentIntent();
    }
  }, [step, clientSecret, createPaymentIntent]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && sanitizedHandle.length > 0) {
      setClientSecret(null); // reset in case they changed values
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) {
      setClientSecret(null);
      setStep(2);
    }
  };

  return (
    <section id="hero" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex md:flex-row flex-col gap-6 items-center">
          {/* Left Column - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="w-full md:w-1/2 flex flex-col justify-center">

            <p className="text-sm md:text-base font-medium text-zinc-500 dark:text-zinc-400 tracking-wide mb-4">
              Visibility. Awareness. Growth.
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-neutral-900 dark:text-white leading-[0.95] mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">REACH</span>974
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-lg mb-8 leading-relaxed">
              For creators and businesses looking to grow their social presence audience through controlled visibility.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="shield-check" className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white">No Password Required</span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="users" className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white">100% Real Followers</span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2">
                <DynamicIcon name="zap" className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white">Fast Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Purchase Flow */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: cubicBezier(0.4, 0, 0.2, 1), delay: 0.1 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md">
              {/* Progress Steps */}
              {step !== 4 && (
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step >= s ? "bg-highlight text-black" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                      }`}>
                        {step > s ? <DynamicIcon name="check" className="w-4 h-4" /> : s}
                      </div>
                      {s < 3 && (
                        <div className={`w-12 h-0.5 transition-all ${step > s ? "bg-highlight" : "bg-zinc-200 dark:bg-zinc-800"}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}

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
                        disabled={handle.trim().length === 0}
                        className="flex-1 cursor-pointer py-3 px-6 rounded-xl font-semibold transition-all bg-highlight text-black hover:bg-highlight/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Continue
                        <DynamicIcon name="arrow-right" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Stripe Payment */}
                {step === 3 && (
                  <>
                    {isLoadingPayment || !clientSecret ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-8 h-8 border-2 border-zinc-300 border-t-highlight rounded-full animate-spin" />
                        <p className="text-sm text-zinc-500">Preparing secure checkout...</p>
                      </div>
                    ) : (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: "stripe",
                            variables: {
                              colorPrimary: "#a3e635",
                              borderRadius: "12px",
                            },
                          },
                        }}
                      >
                        <CheckoutForm
                          followers={followers}
                          handle={sanitizedHandle}
                          onBack={handleBack}
                          onSuccess={() => setStep(4)}
                        />
                      </Elements>
                    )}
                  </>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center mx-auto">
                      <DynamicIcon name="check" className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Payment successful!</h3>
                    <p className="text-zinc-500">
                      Your order for {followers.toLocaleString()} followers to <span className="font-semibold text-zinc-900 dark:text-white">@{sanitizedHandle}</span> is being processed.
                    </p>
                    <p className="text-sm text-zinc-400">Delivery begins within a few hours.</p>
                    <button
                      onClick={() => { setStep(1); setHandle(""); setFollowers(500); setClientSecret(null); }}
                      className="mt-4 px-6 py-2 cursor-pointer rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
                    >
                      Place another order
                    </button>
                  </div>
                )}
              </div>

              {/* Features below card */}
              {step !== 4 && (
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-zinc-500">
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
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
