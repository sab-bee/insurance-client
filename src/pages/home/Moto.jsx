import React from 'react'

const Moto = () => {

  const protections = [
    {
      "title": "Peace of Mind",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://secuure.netlify.app/images/protection/01.png"
    }, {
      "title": "Set for Life",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://secuure.netlify.app/images/protection/02.png"
    }, {
      "title": "Tailored Cover",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://secuure.netlify.app/images/protection/03.png"
    }
  ]
  return (
    <div className='text-center'>
      <div className='space-y-6 mb-8'>
        <span className='bg-green-100 text-primary font-bold px-4 py-1 rounded-full '>PROTECTION</span>
        <h2 className='text-2xl font-bold'>Take the worry out of life
          with insurance protection</h2>
        <div className='flex justify-center gap-x-2'>
          <div className='py-1 bg-primary w-8 rounded-full'></div>
          <div className='py-1 bg-primary w-4 rounded-full'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center'>
        {
          protections.map((protection, index) =>
            <div key={index} className='flex flex-col items-center gap-y-4 p-8 shadow-lg shadow-gray-200 rounded-xl hover:scale-105 transition-all ease-linear cursor-pointer bg-white'>
              <img className='h-[100px]' src={protection.thumb} alt="thumbnail" />
              <h2 className='font-medium border-b-2 border-primary pb-1'>{protection.title}</h2>
              <p className='text-gray-600'>{protection.desc}</p>
            </div>)
        }
      </div>

    </div>
  )
}

export default Moto