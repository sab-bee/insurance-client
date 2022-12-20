import React from 'react'
import { Outlet } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineCluster, AiOutlineStar, AiOutlineTags, AiOutlineUser, AiOutlineAppstoreAdd, AiOutlineNodeExpand } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import DashLink from '../../components/DashLink';

import Loader from '../../components/Loader';
import { useAdmin } from '../../hooks/useAdmin';

const Dashboard = () => {
  const { data, isLoading } = useAdmin()
  if (isLoading) return <Loader></Loader>

  return (
    <div className='w-3/4 mx-auto pt-8'>
      <h2 className='text-center text-xl font-bold mb-8'>Dashboard</h2>
      <div className='border border-primary shadow-lg shadow-zinc-100 px-2 py-2 text-primary rounded-xl flex justify-center gap-x-2 w-fit mx-auto'>
        <DashLink to='/dashboard/admin'>Admin</DashLink>
        <DashLink to='/dashboard/agent'>Agent</DashLink>
        <DashLink to='/dashboard'>Client</DashLink>

      </div>

      <div className='w-4/5 mx-auto shadow-lg mt-8 p-5 rounded-2xl'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard