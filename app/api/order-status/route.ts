import { NextResponse } from "next/server";

const JAP_API_URL = "https://justanotherpanel.com/api/v2";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order");

    if (!orderId) {
        return NextResponse.json(
            { error: "Missing 'order' query parameter" },
            { status: 400 }
        );
    }

    try {
        const apiKey = process.env.JAP_API_KEY!;

        const response = await fetch(JAP_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                key: apiKey,
                action: "status",
                order: orderId,
            }),
        });

        const data = await response.json();

        return NextResponse.json({
            order: orderId,
            ...data,
        });
    } catch (error) {
        console.error("Error checking JAP order status:", error);
        return NextResponse.json(
            { error: "Failed to check order status" },
            { status: 500 }
        );
    }
}
