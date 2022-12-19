import React from 'react'
import { useForm } from 'react-hook-form';
import useFirebase from '../../hooks/useFirebase';
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Register = () => {
  const { google, create } = useFirebase()
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { state } = useLocation()

  const onSubmit = (data) => create.handleCreate(data);

  return (
    <div className='bg-white p-5 rounded-2xl shadow-lg shadow-zinc-200 lg:w-96 md:w-1/3 sm:w-1/2 w-4/5 mx-auto'>
      <h2 className='text-center text-lg font-bold mb-4'>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* ----------------name */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="name">
            <div className='flex'>
              <p>Name</p>
              {
                errors.name && <p className='text-red-500'>*</p>
              }
            </div>
          </label>
          <input type="text" placeholder='enter name'
            {...register("name", {
              required: true,
            })}
          />
        </div>
        {/* -----------email */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" >
            <div className='flex'>
              <p>Email</p>
              {
                errors.email && <p className='text-red-500'>*</p>
              }
              <p className='text-red-500 text-sm'>{errors.email?.message}</p>
            </div>
          </label>
          <input type="email" placeholder='enter email address'
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email',
              },
            })}
          />
        </div>
        {/* ---------------password */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" >
            <div className='flex'>
              <p>Password</p>
              {
                errors.password && <p className='text-red-500'>*</p>
              }
            </div>
          </label>
          <input type="password" placeholder='enter password'
            {...register('password', {
              required: true,
            })} />
        </div>
        {/* -------------actions */}
        <button className='btn-primary-md w-full'>
          <span className='flex justify-center'>
            <Spinner loading={create.cLoading} /> register
          </span>
        </button>
        <button type='button' className='bg-slate-100 hover:bg-slate-200 text-2xl p-2 rounded-full w-fit mx-auto block transition-colors duration-300' onClick={() => navigate('/account', { state: state })}><IoArrowBack /></button>
      </form>
    </div>
  )
}

export default Register