import Searchbar from '@/components/Searchbar/searchbar'
import SingleService from '@/components/serviceComponents/singleService'
import { serviceSelector } from '@/recoil/salon.atom'
import { useRecoilValue } from 'recoil'

const Services = () => {
  const services = useRecoilValue(serviceSelector);
  return (
    <div className='pt-4 w-full'>
      <div className='flex justify-between items-center pb-4 pt-2 sticky top-[14.8rem] md:top-[10rem] bg-[#fbfbfb]'>
        <h1 className='font-bold text-lg'>Services</h1>
        <Searchbar/>
      </div>
      <div className='flex flex-col gap-2'>
        {services.map(service=>(
          <SingleService service={service}/>
        ))}
      </div>
    </div>
  )
}

export default Services