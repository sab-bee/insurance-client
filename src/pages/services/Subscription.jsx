import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate';
import Loader from '../../components/Loader';
import Spinner from '../../components/Spinner';
import useLocalSotrage from '../../hooks/useLocalStorage';

const Subscription = () => {
  const { _id } = useParams()
  const [insurancePackage, setInsurancePackage] = useState({})

  const { data: service, isLoading, refetch, isError } = useQuery(['service'], () => axiosPrivate(`/service/service/${_id}`).then((res) => res.data))

  if (isLoading) return <Loader />
  return (
    <div className='container py-8'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Information form</h2>
        <h3>please give us proper information our system will provide you the best possible package</h3>
      </div>
      <SubmitForm service={service} setInsurancePackage={setInsurancePackage} />
      <Package insurancePackage={insurancePackage} />
    </div>
  )
}

const SubmitForm = ({ service, setInsurancePackage }) => {

  const [coverage, setCoverage] = useState('5000000')
  const [yearlyIncome, setYearlyIncome] = useState('1000000')
  const [monthlySpend, setMonthlySpend] = useState('30000')
  const { name, age } = useLocalSotrage()

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
    axiosPrivate.post('/service/package', { ...data, coverage, yearlyIncome, monthlySpend, userAge: age, _id: service._id }).then((res) => setInsurancePackage(res.data))
  }

  return <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/5 md:w-2/5 sm:w-1/2 mx-auto space-y-4 my-8 md:my-12'>

    {/* ------------name */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="Gender" className='font-medium'>Name</label>
      <input className='p-2 h-10 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' disabled type="text" value={name}
      />
    </div>

    {/* ------------age */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="Gender" className='font-medium'>Age</label>
      <input className='p-2 h-10 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' disabled type="text" value={age}
      />
    </div>

    {/* ----------coverage */}
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
      <label htmlFor="Gender" className='font-medium'>Required Coverage</label>
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
      <label htmlFor="yearlyIncome" className='font-medium'>Yearly Income</label>
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
      <label htmlFor="monthlySpend" className='font-medium'>Monthly Spend</label>
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
      <label htmlFor="maritalStatus" className='font-medium'>What's your marital status?</label>
      <select className='p-2 min-h-10 md:min-h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded'

        {
        ...register('maritalStatus')
        }>
        <option value='single'>Single</option>
        <option value='married'>Married</option>

      </select>
    </div>

    {/* -------------actions */}
    <button className='btn-primary-md w-full rounded h-10 md:h-9'>
      <span className='flex justify-center'>
        <Spinner /> submit
      </span>
    </button>

  </form>
}

const Package = ({ insurancePackage }) => {
  const { premium } = insurancePackage
  return <div>
    {premium}
  </div>
}

export default Subscription
