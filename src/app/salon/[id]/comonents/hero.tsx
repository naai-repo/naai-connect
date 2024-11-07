import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isSalonOpenSelector, singleSalonDataSelector } from '@/recoil/salon.atom'
import { MapPinned, PhoneCall } from 'lucide-react'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ImageCarousel from './ImageCarousel'
import StarRating from '@/components/rating/Rating'
import Services from './Services'


const Hero = () => {
  const salonData = useRecoilValue(singleSalonDataSelector);
  const [isopen, setIsOpen] = useRecoilState(isSalonOpenSelector);

  useEffect(() => {
    const openingTime = new Date();
    const closingTime = new Date();
    const [openingHour, openingMinute] = (salonData?.data?.timing.opening || "00:00").split(":").map(Number);
    const [closingHour, closingMinute] = (salonData?.data?.timing.closing || "00:00").split(":").map(Number);

    openingTime.setHours(openingHour, openingMinute, 0, 0);
    closingTime.setHours(closingHour, closingMinute, 0, 0);

    const current = new Date();

    if (current >= openingTime && current <= closingTime) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [salonData, setIsOpen]);

  function formatTimeTo12Hour(time24: string): string {
    if (!time24) return "";

    const [hour, minute] = time24.split(":").map(Number);

    if (isNaN(hour) || isNaN(minute)) return "";

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  const openGoogleMaps = () => {
    if (!salonData?.data?.address) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const destination = salonData.data.location
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
        
        // Open Google Maps in a new tab
        window.open(googleMapsUrl, "_blank");
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to fetch your location. Please check your location settings.");
      }
    );
  };

  return (
    <div className='w-full p-5 pt-0 pb-0 flex flex-col'>
      <div className='flex flex-col gap-2 sticky pt-5 pb-3 top-14 md:top-0 bg-[#fbfbfb] z-30'>
        <div className='flex justify-between w-full'>
          <h2 className='font-semibold text-2xl uppercase '>{salonData?.data?.name}</h2>
          <StarRating rating={salonData?.data.rating ?? 0}/>
        </div>
        <div className='text-gray-500 text-sm'>
          {salonData?.data.address}
        </div>
        <div className='border w-fit rounded-2xl px-5 flex gap-4 text-sm text-gray-500' >
          <span className={cn(isopen ? "text-green-600" : "text-red-500")}>{isopen ? "Open now" : "Close now"}</span> -
          <span>{formatTimeTo12Hour(salonData?.data.timing.opening as string)} -
            {formatTimeTo12Hour(salonData?.data.timing.closing as string)} (Today)
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='flex gap-1 items-center'>
            <Button size={"sm"} onClick={openGoogleMaps} variant={"outline"}><MapPinned className='text-blue-500' size={18}/> Direction</Button>
          </span>
          <span className='flex gap-1 items-center'>
            <Button onClick={() => window.open(`tel:${salonData?.data.phoneNumber}`, "_self")}
             size={"sm"} variant={'outline'}><PhoneCall className='text-blue-500' size={18}/> {salonData?.data.phoneNumber}</Button>
          </span>
        </div>
      </div>
      <div className='flex gap-1 px-1 md:px-0'>
        <img className='hidden md:block md:max-w-[60%] mix-blend-darken' src={salonData?.data.images[0].url as string} alt='img.png' />
        <div className='flex flex-col justify-between gap-1'>
          {salonData?.data?.images[1] && <img className='hidden md:block ' src={salonData?.data?.images[1].url as string} alt="img.png" />}
          <div className='hidden md:block'><ImageCarousel images={salonData?.data.images.slice(2)}/></div>
          <div className='md:hidden'><ImageCarousel images={salonData?.data?.images}/></div>
        </div>
      </div>
       <Services/> 
    </div>
  )
}

export default Hero