import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET!.trim();
}

const JAP_API_URL = "https://justanotherpanel.com/api/v2";
const JAP_SERVICE_ID = 7866; // Instagram Followers [WW] [Max: 1M] [Refill: 365Days]

interface JAPOrderResponse {
  order?: number;
  error?: string;
}

async function fulfillOrder({
  followers,
  handle,
}: {
  followers: number;
  handle: string;
}): Promise<JAPOrderResponse> {
  const apiKey = process.env.JAP_API_KEY!;
  const link = `https://www.instagram.com/${handle}`;

  const response = await fetch(JAP_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: apiKey,
      action: "add",
      service: JAP_SERVICE_ID,
      link,
      quantity: followers,
    }),
  });

  const data: JAPOrderResponse = await response.json();
  return data;
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, getWebhookSecret());
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { followers, instagram_handle } = paymentIntent.metadata;

      console.log(
        `✅ Payment succeeded: ${followers} followers for @${instagram_handle} ($${(paymentIntent.amount / 100).toFixed(2)})`
      );

      try {
        const japResponse = await fulfillOrder({
          followers: parseInt(followers),
          handle: instagram_handle,
        });

        if (japResponse.order) {
          console.log(
            `✅ JAP order placed: #${japResponse.order} — ${followers} followers for @${instagram_handle}`
          );
        } else {
          console.error(
            `❌ JAP order failed for @${instagram_handle}:`,
            JSON.stringify(japResponse)
          );
        }
      } catch (error) {
        console.error(
          `❌ JAP API call failed for @${instagram_handle}:`,
          error
        );
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error(
        `❌ Payment failed for @${paymentIntent.metadata.instagram_handle}:`,
        paymentIntent.last_payment_error?.message
      );
      break;
    }

    default:
      // Unhandled event type
      break;
  }

  return NextResponse.json({ received: true });
}
