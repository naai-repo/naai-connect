import MenIcon from "@/assets/images/men_icon.png";
import WomenIcon from "@/assets/images/women_icon.png";
import { currencyConverter } from "@/lib/utils";
import { selectedServiceSelector, serviceAddToCartSelector, serviceRemoveFromCartSelector } from "@/recoil/salon.atom";
import { Minus, Plus } from "lucide-react";
import Image from 'next/image';
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import ServiceCategory from "./ServiceCategory";

const SingleService = ({ service }: { service: SingleSalonServiceDataType }) => {
  const setSelectedService = useSetRecoilState(selectedServiceSelector);
  const setServiceAddToCart = useSetRecoilState(serviceAddToCartSelector);

  const setRemoveServiceFromCart = useSetRecoilState(serviceRemoveFromCartSelector);

  const ServiceCategoryRef = useRef<ServiceCategoryRefType>(null);

  const addToCart = (service:SingleSalonServiceDataType) => {
    if(service.variables.length==0){
      setServiceAddToCart(service.id);
      return;
    }
    setSelectedService(service);
    ServiceCategoryRef.current?.openSheet();
  }

  return (
    <div className='p-3 border rounded-lg flex flex-col gap-1 shadow-md'>
      <ServiceCategory ref={ServiceCategoryRef}/>
      <div className='flex justify-between w-full items-center'>
        <h2 className='font-semibold capitalize'>{service?.serviceTitle}</h2>
        {service.targetGender=="male"?<Image className="h-8" src={MenIcon} alt="men" /> :
        <Image className="h-8" src={WomenIcon} alt="women" />}
      </div>
      <div>{currencyConverter(service.cutPrice)}</div>
      {service.incart? <Button className="w-fit" onClick={()=>{setRemoveServiceFromCart(service.id)}}><Minus/> Remove</Button>
        : <Button className="w-fit" onClick={()=>addToCart(service)}><Plus/> Add</Button>}
    </div>
  )
}

export default SingleService;