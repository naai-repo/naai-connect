import MenIcon from "@/assets/images/men_icon.png";
import WomenIcon from "@/assets/images/women_icon.png";
import { currencyConverter } from "@/lib/utils";
import Image from 'next/image';
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const SingleService = ({ service }: { service: SingleSalonServiceDataType }) => {
  return (
    <div className='p-3 border rounded-lg flex flex-col gap-1'>
      <div className='flex justify-between w-full items-center'>
        <h2 className='font-semibold capitalize'>{service?.serviceTitle}</h2>
        {service.targetGender=="male"?<Image className="h-8" src={MenIcon} alt="men_icon" /> :
        <Image className="h-8" src={WomenIcon} alt="women_icon" />}
      </div>
      <div>{currencyConverter(service.cutPrice)}</div>
      <Button className="w-fit"><Plus/> Add</Button>
    </div>
  )
}

export default SingleService