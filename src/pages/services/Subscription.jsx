import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate';
import { auth } from '../../auth/firebase.init';
import Loader from '../../components/Loader';
import Spinner from '../../components/Spinner';


const Subscription = () => {
  const { _id } = useParams()

  const { data: service, isLoading, refetch, isError } = useQuery(['service'], () => axiosPrivate(`/service/service/${_id}`).then((res) => res.data))

  if (isLoading) return <Loader />
  return (
    <div className='container py-8'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Information form</h2>
        <h3 className='text-sm'>please give us proper information our system will provide you the best possible package</h3>
      </div>
      <SubmitForm service={service} />
    </div>
  )
}

const SubmitForm = ({ service }) => {
  const [coverage, setCoverage] = useState('5000000')
  const [yearlyIncome, setYearlyIncome] = useState('1000000')
  const [monthlySpend, setMonthlySpend] = useState('30000')
  const { state } = useLocation()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cov = document.querySelector('.cov');
    const yinc = document.querySelector('.yinc');
    const mspn = document.querySelector('.mspn');
    if (cov) {
      cov.style.left = `${Number(coverage / 2)}+ %`;
    }
    if (yinc) {
      yinc.style.left = `${Number(yearlyIncome / 2)}+ %`;
    }
    if (mspn) {
      mspn.style.left = `${Number(monthlySpend / 2)}+ %`;
    }
  })

  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    setLoading(true)
    axiosPrivate.post('/service/package', { ...data, coverage, yearlyIncome, monthlySpend, userAge: state.userAge, _id: service._id }).then((res) => {
      setLoading(false)
      navigate('/payment', { state: res.data })
    })
  }

  return <div className='lg:w-96 md:w-2/3 mx-auto space-y-4 my-8 md:my-12 p-10 pb-5 bg-white shadow-lg shadow-zinc-200 rounded-2xl'>
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

      {/* ------------name */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="Gender" >Name</label>
        <input disabled type="text" value={user.displayName}
        />
      </div>

      {/* ------------age */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="Gender" >Age</label>
        <input  disabled type="text" value={state.userAge}
        />
      </div>

      {/* ------------gender */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="Gender" >Gender</label>
        <select 
          {
          ...register('gender')
          }>
          <option value='male'>Male</option>
          <option value='female'>Female</option>

        </select>
      </div>

      {/* ----------coverage */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="Gender" >Required Coverage</label>
        <input className='buble h-2 rounded-lg appearance-none cursor-pointer bg-primary' type="range" min="5000000" max="40000000" step="5000000" value={coverage}
          onChange={({ target: { value: radius } }) => {
            setCoverage(radius);
          }}
        />
        <span className="buble text-primary font-bold">
          {Number(coverage).toLocaleString()}
        </span>
      </div>

      {/* ----------income */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="yearlyIncome" >Yearly Income</label>
        <input className='cov h-2 rounded-lg appearance-none cursor-pointer bg-primary' type="range" min="1000000" max="20000000" step="500000" value={yearlyIncome}
          onChange={({ target: { value: radius } }) => {
            setYearlyIncome(radius);
          }}
        />
        <span className="yinc text-primary font-bold">
          {Number(yearlyIncome).toLocaleString()}
        </span>
      </div>

      {/* ----------spend */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="monthlySpend" >Monthly Spend</label>
        <input className='cov h-2 rounded-lg appearance-none cursor-pointer bg-primary' type="range" min="30000" max="500000" step="10000" value={monthlySpend}
          onChange={({ target: { value: radius } }) => {
            setMonthlySpend(radius);
          }}
        />
        <span className="mspn text-primary font-bold">
          {Number(monthlySpend).toLocaleString()}
        </span>
      </div>

      {/* ------------habit */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="habit" >Do you smoke or drink?</label>
        <select
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
        <label htmlFor="maritalStatus" >What's your marital status?</label>
        <select 

          {
          ...register('maritalStatus')
          }>
          <option value='single'>Single</option>
          <option value='married'>Married</option>

        </select>
      </div>

      {/* -------------actions */}
      <button className='btn-primary-md w-full rounded  '>
        <span className='flex justify-center'>
          <Spinner loading={loading} /> purchase
        </span>
      </button>
    </form>
  </div>
}

export default Subscription
