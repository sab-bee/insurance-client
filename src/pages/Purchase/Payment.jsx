import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';


const PUBLIC_KEY =
  "pk_test_51L1Dp8J48oi4JQCJngh2eIDVprg1z8uRziP6OqMWowsDcPLfOfAikPLhWyPqjDuG3lnyh8p3vjf6gRAZHjM8SFzn00FkVLnBj3";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Payment = () => {
  const { state: { premium, _id } } = useLocation() //double destructure
  const [paid, setPaid] = useState(false)
  return (
    <div className='w-3/4 mx-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
      <div className=''>
        <Elements stripe={stripeTestPromise}>
          <h2 className='text-center mb-8 text-2xl font-medium'>Payment Procedure</h2>
          <PaymentForm insurancePackage={{ premium, _id }} setPaid={setPaid} />
        </Elements>
      </div>
      {
        !paid ?
          <div className='rounded-2xl shadow-lg shadow-zinc-200 md:py-10 md:px-12 p-8 lg:w-96 sm:w-2/4 w-[90%] mx-auto'>
            <span className='font-medium bg-red-100 text-red-500 px-4 py-1 rounded-full'>Due</span>
            <h2 className='text-2xl font-bold text-primary mt-4'>${premium.toLocaleString()}</h2>
            <h2 className='font-bold mt-4'>Payment incomplete</h2>
            <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, eius!</p>

          </div>
          : <div className='rounded-2xl shadow-lg shadow-zinc-200 md:py-10 md:px-12 p-8 lg:w-96 sm:w-2/4 w-[90%] mx-auto'>
            <span className='font-medium bg-green-100 text-green-500 px-4 py-1 rounded-full'>Paid</span>
            <h2 className='text-2xl font-bold text-primary mt-4'>${premium.toLocaleString()}</h2>
            <h2 className='font-bold mt-4'>Payment successful !</h2>
            <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, eius!</p>
          </div>
      }

    </div>
  )
}

export default Payment