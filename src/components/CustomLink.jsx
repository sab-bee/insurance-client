import React from 'react'
import { Link } from 'react-router-dom'

const CustomLink = ({ children, to }) => {
  return (
    <Link to={to} className='hover:text-primary font-medium transition-colors ease-linear' >{children}</Link>
  )
}

export default CustomLink