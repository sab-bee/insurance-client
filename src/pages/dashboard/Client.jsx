import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate'
import Loader from '../../components/Loader'

const Client = () => {
  const { data: packs, isLoding } = useQuery(['clientPackages'], () => axiosPrivate('/subscription/individual').then((res) => res.data))

  console.log(packs)
  if (isLoding) return <Loader></Loader>

  return (
    <div className='grid md:grid-cols-2'>
      {packs?.map((pack) => <PackOfIndividualClient key={pack._id} pack={pack} />)}
    </div>
  )
}

const PackOfIndividualClient = ({ pack }) => {
  const { packageName, approved, paid, premium, _id } = pack
  const navigate = useNavigate()
  return <div>
    <h2>
      {packageName}
    </h2>
    {
      (approved && !paid) &&
      <button className='btn-primary-md' onClick={() => { navigate('/payment', { state: { premium, _id } }) }}>pay</button>
    }
    {
      (approved && paid) &&
      <button className='btn-primary-md disabled:bg-green-500' disabled>paid</button>
    }
    {
      (!approved && !paid) &&
      <button className='btn-primary-md disabled:bg-yellow-500'  disabled>pending</button>
    }

  </div>
}

export default Client