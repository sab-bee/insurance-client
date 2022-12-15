import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleService = ({ service }) => {
  const { title, minPremium, policy, _id } = service
  const navigate = useNavigate()
  return (
    <div className='shadow-lg shadow-zinc-200 rounded-lg bg-white hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden'>
      <img className='object-cover h-[200px] w-full' src="https://picsum.photos/400" alt="thumbnail" />

      <div className='p-6 space-y-4'>
        <h2 className='text-xl font-bold capitalize'>{title}</h2>
        <p className='underline'>facilities</p>
        {
          <span className='text-primary font-medium'>{policy.returns}</span>
        }

        <div className=''>
          <p className='underline'>starting range</p>
          <h2 className='text-center text-sm font-medium mt-4'>
            <span className='text-2xl'>$</span>
            <span className='text-5xl font-bold'>{minPremium}</span>/month
          </h2>
        </div>
      </div>


      <button className='btn-primary-md w-full rounded-none h-10 md:h-9'
        onClick={() => navigate(`/purchase/${_id}`)}
      >purchase plan</button>
    </div>
  )
}

export default SingleService