import React from 'react'

const SingleService = ({ service }) => {
  const { title, premium, desc, returns } = service
  return (
    <div className='shadow-lg shadow-zinc-100 rounded-lg bg-white hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden'>
      <img className='object-cover h-[200px] w-full' src="https://picsum.photos/400" alt="thumbnail" />
      <div className='p-6 space-y-4'>
        <h2 className='text-xl font-bold capitalize'>{title}</h2>
        <p className='text-sm text-gray-600'>{desc}</p>
        <p className='underline'>facilities</p>
        {
          returns.map((ret, i) => <span className='text-primary font-medium' key={i}>{ret}, </span>)
        }
        <h2 className='text-3xl font-bold'>${premium}/month</h2>
      </div>
      <button className='btn-primary w-full rounded-none h-10 md:h-9'>purchase plan</button>
    </div>
  )
}

export default SingleService