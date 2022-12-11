import SingleService from "./SingleService"

const Services = () => {
  const services = [
    {
      "title": "term plan",
      "premium": '10',
      "returns": ["coverage"],
      "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate id dolorum rem. Nesciunt est quae aliquam, quasi sed voluptatem beatae."
    },
    {
      "title": "life plan",
      "premium": "60",
      "returns": ["converage under condition"], "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate id dolorum rem. Nesciunt est quae aliquam, quasi sed voluptatem beatae."
    },
    {
      "title": "endowment plan",
      "premium": "90",
      "returns": ["coverage", "interest"], "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate id dolorum rem. Nesciunt est quae aliquam, quasi sed voluptatem beatae."
    },
    {
      "title": "ulip plan",
      "premium": "120",
      "returns": ["coverage", "interest"], "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate id dolorum rem. Nesciunt est quae aliquam, quasi sed voluptatem beatae."
    },
  ]
  return (
    <div className="bg-zinc-50 h-screen">
      <div className="w-3/4 mx-auto py-6 md:py-12">
        <h2 className=" text-primary bg-green-100 font-bold px-4 py-1 rounded-full w-fit mx-auto">OUR SERVICES</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
          {
            services.map((service, index) => <SingleService key={index} service={service} />)
          }
        </div>
      </div>

    </div>
  )
}

export default Services