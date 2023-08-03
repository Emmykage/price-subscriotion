import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

export async function POST(req) {
    const data = await req.json()
    const parsedEmail = data.email.email
    const parsedLineItem = data.lineItems


    // const { email } = await req.json();
    const session = await stripe.checkout.sessions.create({
        line_items: parsedLineItem,
        customer_email: parsedEmail,
        mode: "subscription",
        success_url: "http://localhost:3000/checkout?sessionId={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/"

    });

    return NextResponse.json({ session })
    // return "data"

}