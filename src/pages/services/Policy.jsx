
import { RiShieldCheckFill } from "react-icons/ri";
import { BsPinAngleFill } from "react-icons/bs";
import { motion } from "framer-motion"

const Policy = ({ policy, setPolicy }) => {
  const { service, premium, returns, desc } = policy

  return (
    <motion.div className="w-full flex items-center justify-center h-screen fixed top-0 backdrop-blur-sm bg-[rgba(0,0,0,0.08)]"
      onClick={() => setPolicy({})}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      exit={{ opacity: 0 }}
    >
      <motion.div key='modal' className='w-4/5 md:w-[500px] min-h-[250px] bg-white p-8 rounded-xl border border-primary mt-10 font-medium'
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        exit={{ scale: 0.3, opacity: 0 }}>
        <h2 className='text-xl font-medium text-center mb-2'>Policy for this Serivce</h2>
        <p className='mb-2'>You have choose <span className='border-b-2 border-primary capitalize'>{service}</span> service</p>

        <Points point={`premium $${premium}/month`} />
        <Points point={`${returns}`} />
        <Points point={`${desc}`} />

        <p className='mt-2 space-x-2'>
          <BsPinAngleFill className='inline-block text-red-500' />
          <span className='text-sm text-zinc-400 underline'>premium varies according to age and amount of coverage</span>
        </p>

        <button className="btn-primary w-full mt-4">get subscribtion</button>
      </motion.div>
    </motion.div>
  )
}

const Points = ({ point }) => {
  return <p className='space-x-2'>
    <RiShieldCheckFill className='text-green-500 inline-block' />
    <span>{point}</span>
  </p>
}

export default Policy