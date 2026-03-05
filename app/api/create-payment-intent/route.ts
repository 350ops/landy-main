import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PRICE_PER_FOLLOWER = 0.05;
const MIN_FOLLOWERS = 50;
const MAX_FOLLOWERS = 3000;

export async function POST(request: Request) {
  try {
    const { followers, handle } = await request.json();

    // Validate inputs
    if (
      !followers ||
      !handle ||
      typeof followers !== "number" ||
      typeof handle !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid request. followers (number) and handle (string) are required." },
        { status: 400 }
      );
    }

    if (followers < MIN_FOLLOWERS || followers > MAX_FOLLOWERS) {
      return NextResponse.json(
        { error: `Followers must be between ${MIN_FOLLOWERS} and ${MAX_FOLLOWERS}.` },
        { status: 400 }
      );
    }

    const sanitizedHandle = handle.replace(/[^a-zA-Z0-9._]/g, "").trim();
    if (sanitizedHandle.length === 0) {
      return NextResponse.json(
        { error: "Invalid Instagram handle." },
        { status: 400 }
      );
    }

    // Calculate amount in cents
    const amountInCents = Math.round(followers * PRICE_PER_FOLLOWER * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        followers: followers.toString(),
        instagram_handle: sanitizedHandle,
        product: "instagram_followers",
      },
      description: `${followers} Instagram followers for @${sanitizedHandle}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment. Please try again." },
      { status: 500 }
    );
  }
}
