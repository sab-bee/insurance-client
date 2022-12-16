import React from 'react'
import { useLocation } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';


const PUBLIC_KEY =
  "pk_test_51L1Dp8J48oi4JQCJngh2eIDVprg1z8uRziP6OqMWowsDcPLfOfAikPLhWyPqjDuG3lnyh8p3vjf6gRAZHjM8SFzn00FkVLnBj3";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Payment = () => {
  const { state: { premium, _id } } = useLocation() //double destructure

  return (
    <div className='w-3/4 mx-auto pt-12 md:pt-20'>
      <Elements stripe={stripeTestPromise}>
        <h2 className='text-center mb-8 text-2xl font-medium'>Payment Procedure</h2>
        <PaymentForm insurancePackage={{ premium, _id }} />
      </Elements>
    </div>
  )
}

export default Payment