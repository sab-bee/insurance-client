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
			<div className='fixed top-0 w-full'>
				<div className='bg-white Navbar shadow-lg shadow-gray-100 h-14 z-10'>
					<div className='nav w-3/4 mx-auto flex justify-between items-center h-full'>
						<h2 className='logo font-medium'>Logo</h2>

						<div className='links space-x-8 hidden md:block'>
							<CustomLink to='/'>Home</CustomLink>
							<CustomLink to='/about'>About us</CustomLink>
							<CustomLink to='/service'>Services</CustomLink>
							<CustomLink to='/contact'>Contact</CustomLink>

							{
								!user ? <button className='btn-primary' onClick={() => navigate('/account')}>Login</button> : <button className='btn-secondary' onClick={() => {
									signOut(auth)
									toast('logged out')
								}
								}>logout</button>
							}

						</div>
						<button className='md:hidden text-2xl' onClick={() => setMenu(!menu)}>
							{
								!menu ? <CgMenuLeft /> : <CgClose />
							}
						</button>
					</div>
				</div>

				<div className={`${!menu ? 'left-full' : 'left-0'} absolute md:hidden w-full bg-zinc-50 transition-all duration-500 pt-16 h-screen`}>
					<div className='flex flex-col text-center space-y-4 w-3/4 mx-auto' onClick={() => setMenu(false)}>
						<CustomLink to='/' >Home</CustomLink>
						<CustomLink to='/about' >About us</CustomLink>
						<CustomLink to='/service'>Services</CustomLink>
						<CustomLink to='/contact' >Contact</CustomLink>
						{
							!user ? <button className='btn-primary-mob' onClick={() => navigate('/account')}>Login</button> : <button className='btn-secondary-mob' onClick={() => signOut(auth)}>logout</button>
						}
					</div>
				</div>

			</div>

			<div className='mt-16'>
				{children}
			</div>
		</>
	)
}

export default Navbar