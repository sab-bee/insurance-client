import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { axiosPublic } from '../../api/axiosPublic';
import { auth } from '../../auth/firebase.init';
import Spinner from '../../components/Spinner';
import _ from 'lodash'
import { AnimatePresence } from "framer-motion"
import EstimatePolicy from './EstimatePolicy';

const EstimateProceed = ({ service }) => {
  const [policyPlan, setPolicyPlan] = useState({})
  const [loading, setLoading] = useState(false)
  const { title, policy, _id } = service
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' });
  const [user] = useAuthState(auth)

  const onSubmit = (data) => {
    setLoading(true)
    const email = user?.email
    const name = user?.displayName
    axiosPublic.post(`/service/insurance/${email}`, { ...data, userName: name, _id }).then((res) => {
      setLoading(false)
      setPolicyPlan(res.data)
    })
  }

  return (
    <>
      <div className='container py-8'>
        <h2 className='text-center text-2xl font-semibold capitalize'>{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/5 md:w-2/5 sm:w-1/2 mx-auto space-y-4 my-12'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-medium'>Name</label>
            <input value={user.displayName} disabled className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="userAge" className='font-medium'>
              <span className='flex'>
                <span>age</span>
                {errors.userAge && <p className='text-red-500'>*</p>}
                {
                  (errors.userAge?.type === 'min' || errors.userAge?.type === 'max') && <p className='text-red-500 text-sm'>between 25-60 y/o</p>
                }
              </span>
            </label>

            <input className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="number" placeholder='enter your age'
              {
              ...register('userAge', {
                required: true,
                min: 20,
                max: 60,
              })
              }
            />

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="service" className='font-medium'>Service</label>
            <input value={title} disabled className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="service" className='font-medium'>Coverage</label>
            <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

              {
              ...register('coverage')
              }>
              {
                policy.coverage.map((cov, i) => <option value={cov} key={i}>{cov.toLocaleString()}</option>)
              }
            </select>
          </div>


          <button className='btn-primary-md w-full rounded h-10 md:h-9'>
            <span className='flex justify-center'>
              <Spinner loading={loading} /> get estimation
            </span>
          </button>
        </form>
      </div>
      <AnimatePresence>
        {
          _.isEmpty(policyPlan) || <EstimatePolicy policyPlan={policyPlan} setPolicyPlan={setPolicyPlan} />
        }
      </AnimatePresence>
    </>
  )
}

export default EstimateProceed