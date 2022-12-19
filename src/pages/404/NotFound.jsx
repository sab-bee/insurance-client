import React from 'react'

const NotFound = () => {
  return (
    <div className='w-3/4 mx-auto min-h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
      <img src="https://farm66.staticflickr.com/65535/52573111456_974e7a8779_b.jpg" alt="" />
      <div className='space-y-2 text-center hidden md:block'>
        <h2 className='text-9xl font-extrabold'>404</h2>
        <p className='text-2xl font-medium'>Page not found</p>
        <p>The link you are trying to access is not available at this moment. Please come some day later or maybe dont</p>
      </div>
    </div>
  )
}

export default NotFound