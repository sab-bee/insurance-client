import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { axiosPrivate } from '../../api/axiosPrivate'

const Admin = () => {
  const { data: unAppPacks, isLoding, refetch } = useQuery(['clientUnapprovedPacks'], () => axiosPrivate('/subscription/all_pending').then((res) => res.data))
  if (isLoding) return <Loader></Loader>

  return (
    <div className='grid md:grid-cols-2'>
      {unAppPacks?.map((unPack) => <PackOfIndividualClient key={unPack._id} unPack={unPack} refetch={refetch} />)}
    </div>
  )
}

const PackOfIndividualClient = ({ unPack, refetch }) => {
  const { packageName, premium, userAge, coverage, yearlyIncome, monthlySpend, user, _id } = unPack
  const [modal, setModal] = useState(false)
  const handleApprove = () => {
    axiosPrivate.post(`subscription/approve/${_id}`).then((res) => {
      setModal(false)
      refetch()
    })
  }
  return <div>
    <h2>
      {packageName} plan package

    </h2>
    <button className='btn-primary-md' onClick={() => setModal(true)}>
      review
    </button>
    <AnimatePresence>
      {
        modal &&

        <motion.div className='w-full -left-0 flex items-center justify-center h-screen fixed top-0 backdrop-blur-[5px]'
          key={modal}
          onClick={() => setModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          exit={{ opacity: 0 }}>
          <motion.div className='w-4/5 md:w-3/5 lg:w-[500px] min-h-[320px] bg-white p-4 rounded-2xl shadow-lg flex flex-col justify-between'
            key={modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: .5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            exit={{ opacity: 0, scale: .5 }}>
            <div className='p-2 space-y-4'>
              <h2 className='text-primary font-bold text-center'>Package Review</h2>
              <div className='grid grid-cols-2'>
                <div className='p-4 bg-slate-50 rounded-md'>
                  <h2 className='underline'>Package Name</h2>
                  <p className='capitalize'>{packageName} plan</p>
                </div>
                <div className='p-4 bg-slate-50 rounded-md'>
                  <h2 className='underline'>Client's Age </h2>
                  <p>{userAge} years old</p>
                </div>
                <div className='p-4 bg-slate-50 rounded-md'>
                  <h2 className='underline'>Required Coverage</h2>
                  <p>$ {coverage.toLocaleString()}</p>
                </div>

                <div className='p-4 bg-slate-50 rounded-md '>
                  <h2 className='underline'>Yearly Income</h2>
                  <p>$ {yearlyIncome.toLocaleString()}</p>
                </div>
                <div className='p-4 bg-slate-50 rounded-md'>
                  <h2 className='underline'>Monthly Spend</h2>
                  <p>$ {monthlySpend.toLocaleString()}</p>
                </div>
                <div className='p-4 bg-slate-50 rounded-md'>
                  <h2 className='underline'>Monthly Spend</h2>
                  <p>$ {premium.toLocaleString()}</p>
                </div>
              </div>

              <p className='text-sm'>Please check properly before approving. because we don't refund.</p>

            </div>
            <button className='btn-primary-md w-full bottom-0' onClick={() => handleApprove()}>approve</button>
          </motion.div>
        </motion.div>

      }
    </AnimatePresence>
  </div>
}

export default Admin