import React from 'react'
import { Outlet } from 'react-router-dom'


const Account = () => {
  return (
    <div className='pt-12 md:pt-20'>
      <h2 className='text-2xl font-bold text-center mb-4'>User Account</h2>
      <Outlet />
    </div>
  )
}

export default Account