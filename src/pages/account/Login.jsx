import React from 'react'
import useFirebase from '../../hooks/useFirebase'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Login = () => {
  const { google, login } = useFirebase()
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => login.handleLogin(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/5 md:w-2/5 sm:w-1/2 w-4/5 mx-auto space-y-4'>
        {/* -----------email */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-medium'>Email</label>
          <input className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="email" placeholder='enter email address'
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email',
              },
            })}
          />
          <p className='text-red-500'>{errors.email?.message}</p>
        </div>

        {/* ---------------password */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='font-medium'>Password</label>
          <input className='p-2 h-10 md:h-9 border-2 outline-none focus:border-zinc-400 transition-colors duration-300 rounded' type="password" placeholder='enter password'
            {...register('password', {
              required: 'you must secify password',
            })} />
          <p className='text-red-500'>{errors.password?.message}</p>
        </div>

        {/* -------------actions */}
        <button className='btn-primary w-full rounded h-10 md:h-9'>
          <span className='flex justify-center'>
            <Spinner loading={login.eLoding} /> login
          </span>
        </button>
        <button type='button' className='underline w-fit mx-auto block' onClick={() => navigate('/account/register')}>create an account</button>
        <button type='button' onClick={() => google.handleGoogleSign()} className='btn-secondary w-full rounded flex items-center justify-center gap-2 h-10 md:h-9'><FcGoogle className='text-2xl' /><span>signin with google</span></button>
      </form>

    </>
  )
}

export default Login