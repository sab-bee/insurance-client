import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';
import { FiArrowRight } from "react-icons/fi";

const PUBLIC_KEY =
  "pk_test_51L1Dp8J48oi4JQCJngh2eIDVprg1z8uRziP6OqMWowsDcPLfOfAikPLhWyPqjDuG3lnyh8p3vjf6gRAZHjM8SFzn00FkVLnBj3";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Payment = () => {
  const { state: { premium, _id } } = useLocation() //double destructure
  const [paid, setPaid] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const copyTransaction = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 700);
  }

  return (
    <div className='bg-background py-12 md:py-20 min-h-screen'>
      <h2 className='text-center mb-8 text-2xl font-bold'>Payment</h2>
      <div className={`w-3/4 mx-auto ${!paid && 'grid'} grid-cols-1 lg:grid-cols-3 gap-12 items-center`}>
        {
          !paid && <div className='lg:col-span-2'>
            <Elements stripe={stripeTestPromise}>
              <PaymentForm insurancePackage={{ premium, _id }} setPaid={setPaid} paid={paid} setTransactionId={setTransactionId} />
            </Elements>
          </div>
        }

        {
          !paid ?
            <div className='rounded-2xl bg-white shadow-lg shadow-zinc-200 md:py-10 md:px-12 p-8 lg:w-96 sm:w-2/4 w-[90%] mx-auto'>
              <span className='font-medium bg-red-100 text-red-500 px-4 py-1 rounded-full'>Due</span>
              <h2 className='text-2xl font-bold text-primary mt-4'>${premium.toLocaleString()}</h2>
              <h2 className='font-bold mt-4'>Payment incomplete</h2>
              <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, eius!</p>


            </div>
            : <div className='rounded-2xl shadow-lg shadow-zinc-200 md:pt-10 md:pb-5 md:px-12 p-8 lg:w-96 sm:w-2/4 w-[90%] mx-auto'>
              <span className='font-medium bg-green-100 text-green-500 px-4 py-1 rounded-full'>Paid</span>
              <h2 className='text-2xl font-bold text-primary mt-4'>${premium.toLocaleString()}</h2>
              <h2 className='font-bold mt-4'>Payment successful !</h2>
              <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, eius!</p>
              {
                paid && <div className='relative'>
                  <p className='mt-4 text-zinc-400'>Transaction id</p>
                  <div className=' bg-zinc-100 p-2 rounded-md text-zinc-300 cursor-pointer hover:text-zinc-500 transition-all duration-200'>
                    <div className='overflow-hidden' onClick={() => copyTransaction()}>
                      {transactionId}
                    </div>
                  </div>
                  {
                    copied && <div className='absolute right-0 -top-4 bg-zinc-100 px-2 py-1 rounded-md'>
                      copied
                    </div>
                  }

                </div>
              }
              <button className='btn-primary-md mt-4 w-full flex justify-center items-center gap-x-2' onClick={() => navigate('/dashboard')}>
                <span>dashboard</span>
                <FiArrowRight className='text-xl' />
              </button>
            </div>
        }
      </div>
    </div>
  )
}

export default Payment