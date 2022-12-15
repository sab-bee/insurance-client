import React from 'react'
import { useNavigate } from 'react-router-dom'
import BannerSVG from '../../assets/BannerSVG'
import Contact from './Contact'
import Moto from './Moto'

const Home = () => {
  return (
    <>
      <div className='content'>
        <div className='container mt-10 md:h-[70vh] flex items-center '>
          <Banner></Banner>
        </div>
        <div className='bg-zinc-50 py-10'>
          <div className='container'>
            <Moto></Moto>
          </div>
        </div>
        <div className='bg-primary py-10'>
          <Contact></Contact>
        </div>
      </div>

    </>
  )
}

const Banner = () => {
  const navigate = useNavigate()
  return <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-stretch gap-x-12 gap-y-6'>
    <BannerSVG />

    <div className='space-y-4'>
      <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>We Care About the Highest Quality And Best Price Of Our Insurance</h2>
      <p className='text-sm text-gray-500'>For us, this is just the beginning. We are sustained by belief that the carriers of tomorrow should never be tied to the legacies of yesterday. The Progressive Group of Insurance Companies has always lived up We lead clients through accelerating change, helping them harness the power of technology to deliver new.</p>
      <button className='bg-primary text-white shadow-lg shadow-green-200 font-medium rounded-full px-6 py-2 hover:bg-gray-800 hover:shadow-none transition-colors ease-linear' onClick={() => navigate('/service')}>Get stated</button>
    </div>
  </div>
}

export default Home