import Loader from "../../components/Loader"
import useServices from "../../hooks/useServices"
import SingleService from "./SingleService"

const Services = () => {
  const { services, isLoading, refetch } = useServices()
  if (isLoading) return <Loader />
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-6 md:py-12">
        <h2 className=" text-secondary bg-blue-100 font-bold px-4 py-1 rounded-full w-fit mx-auto">OUR SERVICES</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12'>
          {
            services.map((service, index) => <SingleService key={index} service={service} />)
          }
        </div>
      </div>
    </div>

  )
}

export default Services