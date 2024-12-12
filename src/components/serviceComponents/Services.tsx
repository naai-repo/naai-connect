
import SingleService from '@/components/serviceComponents/singleService'
import { filterSelector, pureServiceSelector, serviceSelector } from '@/recoil/salon.atom'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'

const Services = ({ from }: { from: string }) => {
  const pureServices = useRecoilValue(pureServiceSelector);
  const [services, setServices] = useRecoilState(serviceSelector);
  const [filterCount, setFilterCount] = useState(0);
  const filter = useRecoilValue(filterSelector);

  useEffect(() => {
    let updatedServices = [...pureServices];

    if (filter.search) {
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
        service.category === filter.categories
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
    <div className=' w-full'>
      <div className={cn('flex flex-col gap-2 px-1 pt-4')}>
        {services.map(service => (
          <SingleService key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default Services