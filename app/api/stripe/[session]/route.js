import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

export async function GET(request, {params}){
    // const kelue = {name: "kelue"}
    // const {sessionId} = req.nextUrl
    const sessionId = params.session
  
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId,
    
    )

    return NextResponse.json(checkoutSession)

    //  return NextResponse.json({checkoutSession})
}