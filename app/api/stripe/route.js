import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);


export async function POST(req){
    const data = await req.json()
    const parsedData = data.email.email
    
    // const { email } = await req.json();
       const customer = await stripe.customers.create({
        email: parsedData,
       
    });

     return NextResponse.json({ customer })
    // return "data"
    
}

