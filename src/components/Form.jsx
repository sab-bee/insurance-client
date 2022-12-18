import React from 'react'

export const Email = ({ hookForm }) => {
  const { register, formState: { errors }, handleSubmit } = hookForm

  return <div className='flex flex-col gap-2'>
    <label htmlFor="email" >Email</label>
    <input className='p-2 h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="email" placeholder='enter email address'
      {...register("mail", { required: "Email Address is required" })}
    />
  </div>
}

export const Password = () => {
  return <div className='flex flex-col gap-2'>
    <label htmlFor="password" >Password</label>
    <input className='p-2 h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="password" placeholder='enter password' />
  </div>
}