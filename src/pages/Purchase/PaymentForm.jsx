import React, { useEffect, useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { toast } from 'react-hot-toast';
import { axiosPrivate } from '../../api/axiosPrivate';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../auth/firebase.init';

const PaymentForm = ({ insurancePackage, setPaid }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  const { premium, _id } = insurancePackage
  const [user] = useAuthState(auth)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  });

  useEffect(() => {
    axiosPrivate(`/subscription/payment/${premium}`).then((res) => setClientSecret(res.data.clientSecret))

  }, [premium])

  const handleSubmit = async (event) => {
    const toastId = toast.loading('payment processing...')
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement)
    const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    methodError && toast.error(methodError.message, {
      id: toastId,
    })

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    })

    if (intentError) {
      !methodError && toast.error(intentError?.message, {
        id: toastId,
      })
    } else {
      const transactionId = paymentIntent.client_secret
      setPaid(true)
      toast.success('payment complete', {
        id: toastId
      })
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='lg:w-96 md:w-4/5 w-full mx-auto space-y-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-medium'>Name
            </label>
            <input className='p-2 h-10  border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="text" placeholder='card holder name'
              onBlur={(event) => setBillingDetails({ ...billingDetails, name: event.target.value })}
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-medium'>Email
            </label>
            <input className='p-2 h-10  border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="email" placeholder='card holder emails'
              onBlur={(event) => setBillingDetails({ ...billingDetails, email: event.target.value })}
              required
            />
          </div>
          <div className='font-medium space-y-2'>
            <label htmlFor="card">Card Number</label>
            <CardNumberElement className='p-2 h-10  border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' />
          </div>
          <div className='grid grid-cols-2 gap-x-2 font-medium'>
            <div className='space-y-2'>
              <label htmlFor="exp" >Exp. Date</label>
              <CardExpiryElement className='p-2 h-10 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' />
            </div>
            <div className='space-y-2'>
              <label htmlFor="exp">Verification</label>
              <CardCvcElement className='p-2 h-10  border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' />
            </div>
          </div>
          <button className='btn-primary-md w-full rounded'>Pay</button>
        </form>
      </div>
    </div>
  )
}

const SuccessModal = () => {

}
export default PaymentForm