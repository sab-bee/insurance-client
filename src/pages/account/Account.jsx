import React from 'react'
import { Outlet } from 'react-router-dom'


const Account = () => {
  return (
    <div className='pt-12 md:pt-20 bg-background min-h-screen'>
      <h2 className='text-xl font-bold text-center mb-8 border-b border-slate-200 pb-1 w-fit mx-auto'>Welcome to Uni Insurance</h2>
      <Outlet />
    </div>
  )
}

export default Account