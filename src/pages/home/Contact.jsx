import React from 'react'

const Contact = () => {
  return (
    <div className='container'>
      <ViaEmail />
    </div>
  )
}

const ViaEmail = () => {
  return <div className='sm:w-96 mx-auto p-4 shadow-lg rounded-2xl shadow-gray-200 text-center'>
    <span className='bg-blue-100 text-secondary font-bold px-4 py-1 rounded-full'>CONTACT US</span>
    <div className="relative mt-8">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
      </div>
      <input type="text" id="email-address-icon" className="block w-full pl-10 p-2.5 " placeholder="your@email.com" />
    </div>
    <div>
      <textarea className='w-full rounded mt-2 p-4 outline-none h-28' rows="5" placeholder='write your query....'></textarea>
    </div>
    <button className="btn-primary-md w-28 mt-2 ml-auto block">send email</button>
  </div>
}

export default Contact