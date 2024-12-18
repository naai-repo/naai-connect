import MenIcon from "@/assets/images/men_icon.png";
import unisexIcon from "@/assets/images/unisex.png";
import WomenIcon from "@/assets/images/women_icon.png";
import { currencyConverter } from "@/lib/utils";
import { selectedServiceSelector, serviceAddToCartSelector, serviceRemoveFromCartSelector, stepOneCartSelector } from "@/recoil/salon.atom";
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
  const setStepOneCart = useSetRecoilState(stepOneCartSelector);

  const ServiceCategoryRef = useRef<ServiceCategoryRefType>(null);

  const addToCart = (service: SingleSalonServiceDataType) => {
    if (service.variables.length == 0) {
      setServiceAddToCart({ ...service, incart: true });
      setStepOneCart((prev) => ({
        ...prev,
        basePrice:prev.basePrice+service.basePrice,
        cutPrice:prev.cutPrice+service.cutPrice
      }))
      return;
    }
    setSelectedService(service);
    ServiceCategoryRef.current?.openSheet();
  }

  const removefromService = (service: SingleSalonServiceDataType) => {
    if (service.variables.length == 0) {
      setStepOneCart((prev) => ({
        ...prev,
        basePrice:prev.basePrice-service.basePrice,
        cutPrice:prev.cutPrice-service.cutPrice
      }))
      setRemoveServiceFromCart({ ...service, incart: false });
      return;
    }

    setStepOneCart(prev => ({
      ...prev,
      basePrice: prev.basePrice - (service.variables.find(variable => variable.selected)?.variableCutPrice || 0),
      cutPrice: prev.cutPrice - (service.variables.find(variable => variable.selected)?.variableCutPrice || 0)
    }));

    const cartService = {
      ...service,
      variables: service.variables.length > 0 ? service.variables.map(variable => ({ ...variable, selected: false })) : [],
      incart: false
    }

    setRemoveServiceFromCart(cartService);
  }

  return (
    <div className='p-3 border rounded-lg flex flex-col gap-1 shadow-md'>
      <ServiceCategory ref={ServiceCategoryRef} />
      <div className='flex justify-between w-full items-center'>
        <h2 className='font-semibold capitalize'>{service?.serviceTitle}</h2>
        {service.targetGender == "male" ? <Image className="h-8" src={MenIcon} alt="men" /> : service.targetGender == "female" ?
          <Image className="h-8" src={WomenIcon} alt="women" /> : <Image className="h-8 w-8 rounded-full" src={unisexIcon} alt="unisex" />}
      </div>
      <div>
        {service.cutPrice!=service.basePrice}<span className='line-through text-gray-600'>{currencyConverter(service.cutPrice)}</span>
        <span className='pl-2'>{currencyConverter(service.basePrice)}</span>
      </div>
      {service.incart ? <Button className="w-fit" onClick={() => { removefromService(service) }}><Minus /> Remove</Button>
        : <Button className="w-fit" onClick={() => addToCart(service)}><Plus /> Add</Button>}
    </div>
  )
}

export default SingleService;