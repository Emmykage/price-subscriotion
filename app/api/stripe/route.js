import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);


// export async function POST(req){
//     const data = await req.json()
//     const parsedData = data.email.email
    
//     // const { email } = await req.json();
//        const customer = await stripe.customers.create({
//         email: parsedData,
       
//     });

//      return NextResponse.json({ customer })
//     // return "data"
    
// }

// export async function POST(req){
//         const data = await req.json()
//         const parsedEmail = data.email.email
//         const parsedLineItem = data.email.line_items

        
//         // const { email } = await req.json();
//            const customer = await stripe.checkout.sessions.create({
//             line_items: parsedLineItem,
//             customer_email: parsedEmail,
//             mode: "payment",
//             success_url: "https://twitter.com"
           
//         });
    
//          return NextResponse.json({ customer })
//         // return "data"
        
//     }

export async function POST(req){
    const data = await req.json()
    const parsedEmail = data.email.email
    const parsedLineItem = data.lineItems

    
    // const { email } = await req.json();
       const session = await stripe.checkout.sessions.create({
        line_items: parsedLineItem,
        customer_email: parsedEmail,
        mode: "subscription",
        success_url: "https://twitter.com"
       
    });

     return NextResponse.json({ session })
    // return "data"
    
}