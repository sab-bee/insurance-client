import React from 'react'
import { useNavigate } from 'react-router-dom'
import BannerSVG from '../../assets/BannerSVG'
import Contact from './Contact'
import Moto from './Moto'

const Home = () => {
  return (
    <>
      <div className='content pt-4 md:pt-0'>
        <div className='container mt-10 md:h-[70vh] flex items-center '>
          <Banner></Banner>
        </div>
        <div className='bg-background py-10'>
          <div className='container'>
            <Moto></Moto>
          </div>
        </div>
        <div className='bg-white py-10'>
          <Contact></Contact>
        </div>
      </div>

    </>
  )
}

const Banner = () => {
  const navigate = useNavigate()
  return <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-stretch gap-x-12 gap-y-6 pb-4'>
    <BannerSVG />
    <div className='space-y-4'>
      <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>We Care About the Highest Quality And Best Price Of Our Insurance</h2>
      <p className='text-sm text-gray-500'>For us, this is just the beginning. We are sustained by belief that the carriers of tomorrow should never be tied to the legacies of yesterday. The Progressive Group of Insurance Companies has always lived up We lead clients through accelerating change, helping them harness the power of technology to deliver new.</p>
      <button className='btn-primary-lg' onClick={() => navigate('/service')}>Get stated</button>
    </div>
  </div>
}

export default Home