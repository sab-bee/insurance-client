import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { axiosPublic } from '../../api/axiosPublic';
import { auth } from '../../auth/firebase.init';
import Spinner from '../../components/Spinner';
import _ from 'lodash'
import { AnimatePresence } from "framer-motion"
import EstimatePolicy from './EstimatePolicy';

const EstimateForm = ({ service }) => {
  const [policyPlan, setPolicyPlan] = useState({})
  const [loading, setLoading] = useState(false)
  const { title, policy, _id } = service
  const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' });
  const [user] = useAuthState(auth)

  const onSubmit = (data) => {
    setLoading(true)
    const email = user?.email
    const name = user?.displayName
    // localStorage.setItem('user', JSON.stringify({ age: data.userAge, name }))
    data = { ...data, userName: name, _id }
    axiosPublic.post(`/service/insurance/${email}`, data).then((res) => {
      setLoading(false)
      setPolicyPlan(res.data)
    })
  }

  return (
    <>
      <div className='container bg-white p-5 rounded-2xl shadow-lg shadow-zinc-200 my-12 lg:w-96 md:w-2/5 sm:w-1/2 mx-auto'>
        <h2 className='text-center text-xl mb-6 font-bold capitalize'>Get a quick estimate</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" >Name</label>
            <input value={user.displayName} disabled type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="userAge" >
              <span className='flex'>
                <span>Age</span>
                {errors.userAge && <p className='text-red-500'>*</p>}
                {
                  (errors.userAge?.type === 'min' || errors.userAge?.type === 'max') && <p className='text-red-500 text-sm'>between 25-60 y/o</p>
                }
              </span>
            </label>

            <input type="number" placeholder='enter your age'
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
            <label htmlFor="service">Service</label>
            <input value={title} disabled type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="service">Coverage</label>
            <select
              {
              ...register('coverage')
              }>
              {
                policy.coverage.map((cov, i) => <option value={cov} key={i}>{cov.toLocaleString()}</option>)
              }
            </select>
          </div>
          <button className='btn-primary-md w-full'>
            <span className='flex justify-center'>
              <Spinner loading={loading} /> proceed
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

export default EstimateForm