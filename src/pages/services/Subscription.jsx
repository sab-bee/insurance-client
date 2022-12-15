import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate';
import Loader from '../../components/Loader';
import Spinner from '../../components/Spinner';

const Subscription = () => {
  const { _id } = useParams()
  const [insurancePackage, setInsurancePackage] = useState({})

  const { data: service, isLoading, refetch, isError } = useQuery(['service'], () => axiosPrivate(`/service/service/${_id}`).then((res) => res.data))

  if (isLoading) return <Loader />
  return (
    <div className='container'>
      <SubmitForm service={service} setInsurancePackage={setInsurancePackage} />
      <Package insurancePackage={insurancePackage} />
    </div>
  )
}

const SubmitForm = ({ service }) => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    axiosPrivate.post('/service/package', { ...data, _id: service._id }).then((res) => console.log(res.data))
  }

  return <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/5 md:w-2/5 sm:w-1/2 mx-auto space-y-4'>
    {/* ------------gender */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="Gender" className='font-medium'>Gender</label>
      <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

        {
        ...register('gender')
        }>
        <option value='male'>Male</option>
        <option value='female'>Female</option>

      </select>
    </div>

    {/* ----------coverage */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="Gender" className='font-medium'>Coverage</label>
      <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

        {
        ...register('coverage')
        }>
        {
          service.policy.coverage.map((cov, i) => <option value={cov} key={i}>{cov.toLocaleString()}</option>)
        }
      </select>
    </div>

    {/* ----------income */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="yearlyIncome" className='font-medium'>
        <div className='flex'>
          <p>Yearly Income</p>
          {
            errors.yearlyIncome && <p className='text-red-500'>*</p>
          }
        </div>
      </label>
      <input className='p-2 h-10 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="number" placeholder='enter annual selary'
        {...register('yearlyIncome', {
          required: true,
        })} />
    </div>

    {/* ----------spend */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="monthlySpend" className='font-medium'>
        <div className='flex'>
          <p>Monthly Spend</p>
          {
            errors.monthlySpend && <p className='text-red-500'>*</p>
          }
        </div>
      </label>
      <input className='p-2 h-10 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="number" placeholder='enter monthly spend cost'
        {...register('monthlySpend', {
          required: true,
        })} />
    </div>

    {/* ------------habit */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="habit" className='font-medium'>Do you smoke or drink?</label>
      <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

        {
        ...register('habit')
        }>
        <option value='no'>No</option>
        <option value='drink'>Drink</option>
        <option value='smoke'>Smoke</option>

      </select>
    </div>
    {/* ------------maritalStatus */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="maritalStatus" className='font-medium'>Whats your marital status?</label>
      <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

        {
        ...register('maritalStatus')
        }>
        <option value='single'>Single</option>
        <option value='married'>Married</option>

      </select>
    </div>

    {/* -------------actions */}
    <button className='btn-primary w-full rounded h-10 md:h-9'>
      <span className='flex justify-center'>
        <Spinner /> submit
      </span>
    </button>

  </form>
}

const Package = () => {
  return <div>

  </div>
}

export default Subscription
