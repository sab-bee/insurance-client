import React from 'react'

const Checkout = ({ service }) => {
  const { title, premium, returns, desc, _id } = service
  return (
    <div className='w-3/4 mx-auto'>
      {title}
    </div>
  )
}

export default Checkout