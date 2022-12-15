import React, { useState } from 'react'
import CustomLink from './CustomLink'
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase.init';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Navbar = ({ children }) => {
	const [menu, setMenu] = useState(false)
	const navigate = useNavigate()
	const [user] = useAuthState(auth)

	return (
		<>
			<div className='fixed top-0 w-full z-10'>
				<div className='bg-white Navbar shadow-lg shadow-gray-100 h-20'>
					<div className='container flex justify-between items-center h-full'>
						<button className='font-bold' onClick={() => navigate('/')}>
							<img className='w-10' src="https://i.ibb.co/StpPqfp/growth.png" alt="logo" />
						</button>
						<div className='links space-x-8 hidden md:block'>
							<CustomLink to='/'>Home</CustomLink>
							<CustomLink to='/about'>About us</CustomLink>
							<CustomLink to='/service'>Services</CustomLink>

							{
								!user ? <button className='btn-primary-md' onClick={() => navigate('/account')}>Login</button> : <button className='btn-secondary-md' onClick={() => {
									signOut(auth)
									toast('logged out', {
										icon: '🙂'
									})
								}
								}>logout</button>
							}

						</div>
						<button className='md:hidden text-2xl text-primary' onClick={() => setMenu(!menu)}>
							<CgMenuLeft className={`${menu ? '-top-9' : 'top-3'} relative transition-all duration-300`} />
							<CgClose className={`${menu ? '-top-3' : '-top-16'} relative transition-all duration-300`} />
						</button>
					</div>
				</div>

				<div className={`${!menu ? 'left-full' : 'left-0'} absolute md:hidden w-full bg-zinc-50 transition-all duration-500 pt-16 h-screen`}>
					<div className='container flex flex-col text-center space-y-4 ' onClick={() => setMenu(false)}>
						<CustomLink to='/' >Home</CustomLink>
						<CustomLink to='/about' >About us</CustomLink>
						<CustomLink to='/service'>Services</CustomLink>
						{
							!user ? <button className='btn-primary-md-mob' onClick={() => navigate('/account')}>Login</button> : <button className='btn-secondary-mob' onClick={() => signOut(auth)}>logout</button>
						}
					</div>
				</div>

			</div>

			<div className='mt-20'>
				{children}
			</div>
		</>
	)
}

export default Navbar