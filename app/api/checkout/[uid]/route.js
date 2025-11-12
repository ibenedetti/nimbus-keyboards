import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client"; 
import { NextResponse } from "next/server";
const { default: Stripe } = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover"
});

export async function POST(
    request, 
    { params }
) {
    try {
        // Await params in Next.js 15+
        const { uid } = await params;

        if (!uid) {
            return NextResponse.json({ error: "Missing Product UID" }, { status: 400 })
        }

        const prismicClient = createClient();

        const product = await prismicClient.getByUID("product", uid)

        const name = product.data.name;
        const price = product.data.price; 
        const image = product.data.image?.url;
        const description = asText(product.data.description);

        const sessionParams = {
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name,
                            ...(description ? { description } : {}),
                            ...(image ? { images: [image] } : {}),
                        },
                        unit_amount: price
                    },
                    quantity: 1
                }
            ], 
            mode: "payment",
            success_url :`${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get("origin")}/`,
        }

        const session = await stripe.checkout.sessions.create(sessionParams);

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Session Creation Error: ", error);
        return NextResponse.json({ error: "Failed to Create Stripe Session" }, { status: 500 })
    }
}