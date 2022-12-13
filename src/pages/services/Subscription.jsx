import React from 'react'
import { useParams } from 'react-router-dom'

const Subscription = () => {
  const {_id} = useParams()
  
  return (
    <div className='container'>Subscription</div>
  )
}

export default Subscription