import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { axiosPublic } from '../../api/axiosPublic'
import Checkout from './Checkout'

const Purchase = () => {
  const { _id } = useParams()
  const { data: service, isLoading, refetch, isError } = useQuery(['service'], () => axiosPublic(`/services/service/${_id}`).then((res) => res.data))

  if (isLoading) return
  return (
    <div>
      <Checkout service={service} />
    </div>
  )
}

export default Purchase