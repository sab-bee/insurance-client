import React, { useState } from 'react'
import CustomLink from './CustomLink'
import { CgMenuLeft, CgClose } from "react-icons/cg";

const Navbar = ({ children }) => {
	const [menu, setMenu] = useState(false)
	return (
		<>
			<div className='fixed top-0 w-full'>
				<div className='bg-white Navbar shadow-lg shadow-gray-100 h-14 z-10'>
					<div className='nav w-3/4 mx-auto flex justify-between items-center h-full'>
						<h2 className='logo font-medium'>Logo</h2>

						<div className='links space-x-8 hidden md:block'>
							<CustomLink to='/'>Home</CustomLink>
							<CustomLink to='/about'>About us</CustomLink>
							<CustomLink to='/contact'>Contact</CustomLink>
							<button className='bg-primary text-white shadow-lg shadow-green-200 font-medium rounded-full px-4 py-1 hover:bg-gray-800 hover:shadow-none transition-colors ease-linear'>Login</button>
						</div>
						<button className='md:hidden text-2xl' onClick={() => setMenu(!menu)}>
							{
								!menu ? <CgMenuLeft/> : <CgClose/>
							}
						</button>
					</div>
				</div>

				<div className={`${!menu ? 'translate-x-full' : 'translate-x-0'} nav-mob md:hidden w-full bg-white transition-all duration-500 h-screen pt-16`}>
					<div className='flex flex-col text-center space-y-4 w-3/4 mx-auto' onClick={() => setMenu(false)}>
						<CustomLink to='/' >Home</CustomLink>
						<CustomLink to='/about' >About us</CustomLink>
						<CustomLink to='/contact' >Contact</CustomLink>
						<button className='bg-primary text-white shadow-lg shadow-green-200 font-medium rounded-full px-4 py-1 hover:bg-gray-800 hover:shadow-none transition-colors ease-linear'>Login</button>
					</div>
				</div>
			</div>

			<div className='Main'>
				{children}
			</div>
		</>
	)
}

export default Navbar