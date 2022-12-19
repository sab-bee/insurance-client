import useFirebase from '../../hooks/useFirebase'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Login = () => {
  const { google, login } = useFirebase()
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { state } = useLocation()

  const onSubmit = (data) => login.handleLogin(data);

  return (
    <div className='bg-white p-5 rounded-2xl shadow-lg shadow-zinc-200 lg:w-96 md:w-1/3 sm:w-1/2 w-4/5 mx-auto'>
      <h2 className="text-center font-bold text-lg mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
            <Spinner loading={login.eLoding} /> login
          </span>
        </button>
        <button type='button' className='underline w-fit mx-auto block' onClick={() => navigate('/account/register', { state: state })}>create an account</button>
        <button type='button' onClick={() => google.handleGoogleSign()} className='btn-neutral w-full flex items-center justify-center gap-2  '><FcGoogle className='text-2xl' /><span>signin with google</span></button>
      </form>

    </div>
  )
}

export default Login