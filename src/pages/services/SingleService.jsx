import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleService = ({ service }) => {
  const { title, minPremium, policy, image, tier, _id } = service
  const navigate = useNavigate()
  return (
    <div className='bg-white shadow-md shadow-zinc-200 hover:shadow-lg hover:-translate-y-2 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden p-6'>
      <div className='bg-zinc-100 border w-fit px-3 rounded-full mb-4'>
        {tier}
      </div>
      <img className={`object-cover h-[200px] w-full ${!image && 'bg-gray-50 animate-pulse rounded-lg'}`} src={image} alt="thumbnail" />
      <div className='space-y-4 mt-4'>
        <h2 className='text-xl font-bold capitalize'>{title}</h2>
        <p className='underline'>facilities</p>
        {
          <span className='font-medium'>{policy.returns}</span>
        }
        <div className=''>
          <h2 className='text-center text-sm font-medium my-4'>
            <span className='text-2xl font-bold'>$</span>
            <span className='text-5xl font-bold'>{minPremium}</span>/month
          </h2>
        </div>
      </div>
      <button className='btn-primary-md w-full '
        onClick={() => navigate(`/estimate/${_id}`)}
      >take a look</button>
    </div>
  )
}

export default SingleService