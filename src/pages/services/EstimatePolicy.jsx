
import { RiShieldCheckFill } from "react-icons/ri";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

const EstimatePolicy = ({ policyPlan, setPolicyPlan }) => {
  const { title, premium, policy, _id } = policyPlan
  const navigate = useNavigate()

  return (
    <motion.div className="w-full flex items-center justify-center h-screen fixed top-0 backdrop-blur-sm bg-[rgba(0,0,0,0.08)]"
      onClick={() => setPolicyPlan({})}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      exit={{ opacity: 0 }}
    >
      <motion.div key='modal' className='w-4/5 md:w-[500px] min-h-[250px] bg-white p-8 rounded-xl border border-primary mt-10 font-medium'
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        exit={{ scale: 0.3, opacity: 0 }}>
        <h2 className='text-xl font-medium text-center mb-2'>Policy for this Serivce</h2>
        <p className='mb-2'>You have choose <span className='border-b-2 border-primary capitalize'>{title}</span> service</p>

        <Points point={`premium around $${premium}/month`} />
        <Points point={`${policy.returns}`} />
        <Points point={`${policy.desc}`} />

        <div className='mt-2 text-xs text-zinc-400 font-normal'>
          <p>disclaimer :</p>
          <p className='border-b w-fit'>premium may vary based on financial information</p>
        </div>

        <button className="btn-primary-md w-full mt-4 rounded"
          onClick={() => navigate(`/subscription/${_id}`)}
        >get subscription</button>
      </motion.div>
    </motion.div >
  )
}

const Points = ({ point }) => {
  return <p className='space-x-2'>
    <RiShieldCheckFill className='text-green-500 inline-block' />
    <span>{point}</span>
  </p>
}

export default EstimatePolicy