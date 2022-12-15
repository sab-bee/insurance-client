import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CustomLink = ({ children, to }) => {
  const { pathname } = useLocation()
  return (
    <Link to={to} className={`${pathname === to && 'text-primary'} hover:text-primary font-medium transition-all ease-linear`} >{children}</Link>
  )
}

export default CustomLink