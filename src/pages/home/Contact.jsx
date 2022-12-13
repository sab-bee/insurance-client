import React from 'react'

const Contact = () => {
  return (
    <div className='container grid grid-cols-1 md:grid-cols-3 justify-items-center items-center gap-y-4'>
      <ViaEmail />
      <ViaPhone />
    </div>
  )
}

const ViaEmail = () => {
  return <div className='w-full md:w-4/5 lg:w-1/2 col-span-2'>
    <h2 className='text-center text-white font-bold'>CONTACT US</h2>
    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      </div>
      <input type="text" id="email-address-icon" className="bg-gray-50 text-gray-900 text-sm rounded block w-full pl-10 p-2.5 dark:bg-white outline-none " placeholder="name@someone.com" />
    </div>
    <div>
      <textarea className='w-full rounded mt-2 p-4 outline-none' name="" id="" rows="5" placeholder='write your query....'></textarea>
    </div>
    <button className="bg-gray-700 text-white px-3 h-10 md:h-9 rounded">send email</button>
  </div>
}

const ViaPhone = () => {
  return <div className='text-white font-bold'>
    <p>+4478654231</p>
    <p>+4478654221</p>
    <p>facebook.com/uni-insurance/bd</p>
    <p>twitter.com/uni-insurance/bd</p>
  </div>
}

export default Contact