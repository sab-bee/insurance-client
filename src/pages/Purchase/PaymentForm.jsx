import React, { useEffect, useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { toast } from 'react-hot-toast';
import { axiosPrivate } from '../../api/axiosPrivate';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../auth/firebase.init';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      fontWeight: 400,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        // color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const PaymentForm = ({ insurancePackage, setPaid }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  const [due, setDue] = useState(false)
  const { pre, _id } = insurancePackage
  const [user] = useAuthState(auth)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  });

  const handleDuePayment = () => {
    console.log('hello')
    // axiosPrivate(`/subscription/payment/${pre}`).then((res) => setClientSecret(res.data.clientSecret))
    // setDue(true)
  }
  const handleConfirmPayment = async (event) => {
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
      setDue(false)
    }
  }

  return (
    <>
      <div className='bg-white p-10 rounded-2xl shadow-lg shadow-zinc-200 lg:w-96 md:w-4/5 w-full mx-auto'>
        <h2 className='text-center font-bold text-xl'>Transaction form</h2>
        <form onSubmit={handleDuePayment} className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-medium'>Name
            </label>
            <input type="text" placeholder='card holder name'
              onBlur={(event) => setBillingDetails({ ...billingDetails, name: event.target.value })}
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-medium'>Email
            </label>
            <input type="email" placeholder='card holder emails'
              onBlur={(event) => setBillingDetails({ ...billingDetails, email: event.target.value })}
              required
            />
          </div>
          <div className='font-medium space-y-2'>
            <label htmlFor="card">Card Number</label>
            <div className='input'>
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-2 font-medium'>
            <div className='space-y-2'>
              <label htmlFor="exp" >Exp. Date</label>
              <div className='input'>
                <CardExpiryElement options={CARD_OPTIONS} />
              </div>
            </div>
            <div className='space-y-2'>
              <label htmlFor="exp">Verification</label>
              <div className='input'>
                <CardCvcElement options={CARD_OPTIONS} />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <button type='button' className='btn-deny-md w-full'>Cancel</button>
            <button className='btn-primary-md w-full'>Pay</button>
          </div>
        </form>
      </div>
      {/* due */}
      {
        due && <div>
          <button className='btn-primary-md'>confirm</button>
        </div>
      }

    </>
  )
}

const SuccessModal = () => {

}
export default PaymentForm