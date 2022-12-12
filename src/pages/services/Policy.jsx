import React from 'react'
import { RiShieldCheckFill } from "react-icons/ri";
import { BsPinAngleFill } from "react-icons/bs";

const Policy = ({ policy }) => {
  const { service, premium, returns, desc } = policy
  return (
    <div className='md:w-[600px] mx-auto'>
      <h2 className='text-xl font-medium text-center'>Policy for this Serivce</h2>
      <div className='shadow-lg shadow-zinc-100 p-8 rounded-lg border-2 mt-10 font-medium'>
        <p className='mb-2'>You have choose <span className='border-b-2 border-primary capitalize'>{service}</span> service</p>

        <Points point={`you have to pay $${premium}/month premium`} />
        <Points point={`${returns}`} />
        <Points point={`${desc}`} />

        <p className='mt-2 space-x-2'>
          <BsPinAngleFill className='inline-block text-red-500' />
          <span className='text-sm text-zinc-400 underline'>premium varies according to age and amount of coverage</span>
        </p>

      </div>

    </div>
  )
}

const Points = ({ point }) => {
  return <p className='space-x-2'>
    <RiShieldCheckFill className='text-green-500 inline-block' />
    <span>{point}</span>
  </p>
}

export default Policy