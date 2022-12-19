import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashLink = ({ children, to }) => {
  const { pathname } = useLocation()
  return (
    <Link to={to} className={`${pathname === to && 'bg-primary text-white'}  font-medium transition-all ease-linear px-2 rounded-lg py-1`} >{children}</Link>
  )
}

export default DashLink