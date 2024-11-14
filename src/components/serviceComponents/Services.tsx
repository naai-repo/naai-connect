
import Filter from '@/app/salon/[id]/components/Filter/FilterWrapper'
import SingleService from '@/components/serviceComponents/singleService'
import { filterSelector, pureServiceSelector, serviceSelector } from '@/recoil/salon.atom'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Searchbar from '../../app/salon/[id]/components/Filter/FilterCategories'
import { cn } from '@/lib/utils'
import Cart from '../demoCart/cart'

const Services = ({from}:{from:string}) => {
  const pureServices = useRecoilValue(pureServiceSelector);
  const [services,setServices] = useRecoilState(serviceSelector);
  const ServiceFilterRef = useRef<ServiceFilterRefType>(null);
  const [filterCount,setFilterCount] = useState(0);
  const filter = useRecoilValue(filterSelector);

  useEffect(()=>{
    let updatedServices = [...pureServices];

    if(filter.search){
      updatedServices = updatedServices.filter(service => service.serviceTitle.toLowerCase().includes(filter.search?.toLowerCase() as string));
    }

    if (filter.sortby) {
      setFilterCount(count => count + 1);
      updatedServices.sort((a, b) => 
        filter.sortby === "desc" ? b.cutPrice - a.cutPrice : a.cutPrice - b.cutPrice
      );
    }

    if (filter.categories) {
      setFilterCount(count => count + 1);
      updatedServices = updatedServices.filter(service => 
        service.category===filter.categories
      );
    }

    if (filter.gender) {
      setFilterCount(count => count + 1);
      updatedServices = updatedServices.filter(service => 
        service.targetGender === filter.gender
      );
    }

    setServices(updatedServices);
  }, [filter]);

  return (
    <div className='pt-4 w-full'>
      <Filter ref={ServiceFilterRef}/>
      <div className={cn('flex justify-between items-center pb-3 pt-3 bg-[#fbfbfb] sticky',from=="hero"?'top-[14.8rem] md:top-[10rem]':"top-28")}>
        <h1 className='font-bold text-lg'>Services</h1>
        <div className='flex items-center gap-2'>
          <SlidersHorizontal className='rotate-90' onClick={()=>ServiceFilterRef.current?.openSheet()}/>
          <Searchbar/>
        </div>
      </div>
      <div className='flex flex-col gap-2 px-1'>
        {services.map(service=>(
          <SingleService key={service.id} service={service}/>
        ))}
      </div>
    </div>
  )
}

export default Services