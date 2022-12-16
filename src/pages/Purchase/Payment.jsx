import React from 'react'
import { useLocation } from 'react-router-dom'

const Payment = () => {
  const { state: { premium, _id } } = useLocation() //double destructure
  
  return (
    <div className='w-3/4 mx-auto'>Payment</div>
  )
}

export default Payment