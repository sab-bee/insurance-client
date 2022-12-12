import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { axiosPublic } from '../../api/axiosPublic';
import { auth } from '../../auth/firebase.init';
import Spinner from '../../components/Spinner';
import Policy from './Policy';
import _ from 'lodash'

const Checkout = ({ service }) => {
  const [policy, setpolicy] = useState({})
  const { title, premium, returns, desc, coverage, _id } = service
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const [user] = useAuthState(auth)
  const onSubmit = (data) => {
    const email = user?.email
    reset()
    axiosPublic.post(`/insurances/${email}`, data).then((res) => setpolicy(res.data))
  }

  return (
    <div className='w-3/4 mx-auto py-8'>
      <h2 className='text-center text-2xl font-semibold'>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/5 md:w-2/5 sm:w-1/2 mx-auto space-y-4 my-12'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="name" className='font-medium'>Name</label>
          <input value={user.displayName} readOnly className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="text" {
            ...register('userName')
          } />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="age" className='font-medium'>
            <span className='flex'>
              <span className=''>age</span>
              {errors.age && <p className='text-red-500'>*</p>}
              {
                (errors.age?.type === 'min' || errors.age?.type === 'max') && <p className='text-red-500 text-xs'>between 25-60 y/o</p>
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
          <input value={title} readOnly className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="text" {
            ...register('service')
          } />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="service" className='font-medium'>Coverage</label>
          <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

            {
            ...register('coverage')
            }>
            {
              coverage.map((cov, i) => <option value={cov} key={i}>{cov.toLocaleString()}</option>)
            }
          </select>
        </div>


        <button className='btn-primary w-full rounded h-10 md:h-9'>
          <span className='flex justify-center'>
            <Spinner /> get policy
          </span>
        </button>
      </form>
      {
        _.isEmpty(policy) || <Policy policy={policy} />
      }
    </div>
  )
}

export default Checkout