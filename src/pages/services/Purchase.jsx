import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate'
import Loader from '../../components/Loader'
import Checkout from './Checkout'

const Purchase = () => {
  const { _id } = useParams()
  const { data: service, isLoading, refetch, isError } = useQuery(['service'], () => axiosPrivate(`/service/service/${_id}`).then((res) => res.data))

  if (isLoading) return <Loader />
  return (
    <div>
      <Checkout service={service} />
    </div>
  )
}

export default Purchase