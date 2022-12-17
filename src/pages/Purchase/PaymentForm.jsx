import React, { useEffect, useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { toast } from 'react-hot-toast';
import { axiosPrivate } from '../../api/axiosPrivate';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../auth/firebase.init';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../assets/Card';
import { useNavigate } from 'react-router';

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

const PaymentForm = ({ insurancePackage, setPaid, setTransactionId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const { premium, _id } = insurancePackage
  const [user] = useAuthState(auth)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  });

  const handleDuePayment = (e) => {
    e.preventDefault()
    axiosPrivate(`/subscription/payment/${premium}`).then((res) => setClientSecret(res.data.clientSecret))
    setModal(true)
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
      axiosPrivate.post('/subscription/payment/save', {
        paid: true,
        transactionId: paymentIntent.client_secret,
        email: user.email,
        pacakgeId: _id
      }).then((res) => {
        setTransactionId(paymentIntent.client_secret)
        setPaid(true)
        toast.success('payment complete', {
          id: toastId
        })
        setModal(false)
      })

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
            <button type='button' className='btn-deny-md w-full' onClick={() => navigate('/service')}>Cancel</button>
            <button className='btn-primary-md w-full'>Pay</button>
          </div>
        </form>
      </div>

      {/* modal */}
      <AnimatePresence>
        {
          modal &&

          <motion.div className='w-full -left-0 flex items-center justify-center h-screen fixed top-0 backdrop-blur-[5px]'
            key={modal}
            onClick={() => setModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            exit={{ opacity: 0 }}>
            <motion.div className='w-4/5 sm:w-[300px] min-h-[320px] bg-white p-4 rounded-xl  shadow-lg flex flex-col justify-between'
              key={modal}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: .5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              exit={{ opacity: 0, scale: .5 }}>
              <div className='p-6 space-y-4'>
                <h2 className='text-primary font-bold text-center'>Confirm to pay</h2>
                <p className='text-sm'>Your email and transaction id will be saved to our database for security reason.</p>
                <div className='grid justify-items-center'>
                  <Card />
                </div>
              </div>
              <button className='btn-primary-md w-full bottom-0' onClick={handleConfirmPayment}>confirm</button>
            </motion.div>
          </motion.div>

        }
      </AnimatePresence>
    </>
  )
}

const SuccessModal = () => {

}
export default PaymentForm