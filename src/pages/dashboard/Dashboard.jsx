import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineCluster, AiOutlineStar, AiOutlineTags, AiOutlineUser, AiOutlineAppstoreAdd, AiOutlineNodeExpand } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import DashLink from '../../components/DashLink';

const Dashboard = () => {
  const [expand, setExpand] = useState(false)
  const admin = true
  return (
    <div className='w-3/4 mx-auto pt-8'>
      <div className='border border-primary shadow-lg shadow-zinc-100 px-2 py-2 text-primary rounded-full flex justify-center gap-x-2 w-fit mx-auto'>
        <DashLink to='/dashboard'>Admin</DashLink>
        <DashLink to='/dashboard/package'>Package</DashLink>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard