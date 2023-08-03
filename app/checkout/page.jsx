"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, {useState, useEffect} from 'react'
import useSWR from "swr"

const success = () => {
  const searchParams = useSearchParams()
   const [checkoutSession, setCheckoutSession] = useState(null)
  const sessionId = searchParams.get("sessionId")
  // console.log(sessionId)

  const URL = sessionId ? `/api/stripe/${sessionId}` : null

  const fetchSession = async() =>{
    const response =  await fetch(`${URL}`)
    .then(res => res.json())
    // .then(res => setCheckoutSession(res))


    console.log(response)
    setCheckoutSession(response)
  }
  console.log(checkoutSession)
  // fetchSession()

  useEffect(() => {
    fetchSession()
  
  }, [])
  
  // const { data: checkoutSession, error } = useSWR(URL, fetcher)
  // if (error) return <div>Failed to load the session</div>
  // const customer = checkoutSession?.customer_details
  // const products = checkoutSession?.line_items?.data?.map(item => ({
  //   ...item.price.product,
  //   price: item.price.unit_amount,
  //   quantity: item.quantity
  // }))
  // console.log(checkoutSession)

  const payment = checkoutSession?.payment_intent?.charges?.data[0]?.payment_intent;
  const subtotal = checkoutSession?.amount_subtotal
  const total = checkoutSession?.amount_total
    if(checkoutSession){

 
  return (
    <div>
      <div className="div">Thanks for subscribing to </div>
      <div>
        we appreciate your order. thank you for ordering
      </div>
      <p>Email: {checkoutSession.customer_email}</p>
      <p>Name: {checkoutSession.customer_details.name}</p>
      <p>Total: {checkoutSession.amount_total}</p>
      <h2>your monthly plan for Flairr.AI has be puchase </h2>
     
      <a href='/'> Go back </a>
    </div>
  )
}else{
  return(
    <div>
      Loading
    </div>
  )
}
}

export default success