import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

const PRICE_PER_FOLLOWER = 0.05;

export async function POST(request: Request) {
    try {
        const { followers, handle } = await request.json();

        if (!followers || followers < 50 || followers > 3000) {
            return NextResponse.json({ error: 'Invalid follower count' }, { status: 400 });
        }

        if (!handle) {
            return NextResponse.json({ error: 'Instagram handle is required' }, { status: 400 });
        }

        // Amount in cents
        const amount = Math.round(followers * PRICE_PER_FOLLOWER * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: {
                followers: followers.toString(),
                handle: handle,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
