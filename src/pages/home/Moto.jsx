import React from 'react'

const Moto = () => {

  const protections = [
    {
      "title": "Proper care",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://i.ibb.co/ZhKpmfX/care.png"
    }, {
      "title": "Set for Life",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://i.ibb.co/XCWFBL6/life.png"
    }, {
      "title": "Tailored Cover",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus eleifend tortor, vel molestie orci feugiat sit amet.",
      "thumb": "https://i.ibb.co/yd5rLZr/cover.png"
    }
  ]


  return (
    <div className='text-center'>
      <div className='space-y-6 mb-8'>
        <span className='bg-blue-100 text-secondary font-bold px-4 py-1 rounded-full '>PROTECTION</span>
        <h2 className='text-2xl font-bold'>Take the worry out of life
          with insurance protection</h2>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, pariatur!</p>
        <div className='flex justify-center gap-x-2'>
          <div className='py-1 bg-secondary w-4 rounded-full'></div>
          <div className='py-1 bg-secondary w-2 rounded-full'></div>
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