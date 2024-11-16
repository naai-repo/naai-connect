import { currencyConverter } from '@/lib/utils';
import { bookingDialogSelector, cartTotalSelector, progressSelector, selctedArtistTypeSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { getCartServicesSelector, resetCartServicesSelector } from '@/recoil/salon.atom';
import { ArrowRightFromLine, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getUserIdSelector, loginDialogSelector } from '@/recoil/auth.atom';

// Type definitions
type ContinueButtonProps = {
  userId?:string;
  progress: number;
  onProgressChange: () => void;
};

const Cart: React.FC = () => {
  const cartServices = useRecoilValue(getCartServicesSelector);
  const clearCart = useSetRecoilState(resetCartServicesSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const [cartTotal, setCartTotal] = useRecoilState(cartTotalSelector);
  const progress = useRecoilValue(progressSelector);
  const [bookingDialg,setbookingDialog] = useRecoilState(bookingDialogSelector);
  const selectedServicesArtist = useRecoilValue(selectedArtistServiceSelector);
  const userId = useRecoilValue(getUserIdSelector);
  const setOpenLoginDialog = useSetRecoilState(loginDialogSelector);

  useEffect(()=>{
    const discountedPrice = selectedServicesArtist.reduce((accum,serviceArtist)=>{
      const foundService = serviceArtist.artist.services.find((service)=>service.serviceId==serviceArtist.service.id);
      return accum + (foundService?.cutPrice ?? 0);
    },0)

    const price = selectedServicesArtist.reduce((accum,serviceArtist)=>{
      return accum + (serviceArtist.service.cutPrice ?? 0)
    },0)
    setCartTotal({original:price,discounted:discountedPrice})
  },[selectedServicesArtist]);

  useEffect(() => {
    if (cartServices.length > 0) {
      const total = cartServices.reduce((acc, service) => {
        if (service.variables.length > 0) {
          const selectedVariable = service.variables.find(variable => variable.selected);
          return acc + (selectedVariable?.variableCutPrice || 0);
        }
        return acc + service.cutPrice;
      }, 0);

      setCartTotal({ original: total, discounted: total } as cartTotalType);
    }
  }, [cartServices]);

  if (!cartServices.length) {
    return null;
  }

  return (
    <div onClick={()=>{
      if(!bookingDialg) setbookingDialog(true);
    }} className='flex justify-between items-center fixed bottom-5 w-[94%] right-[3%] justify-self-center p-5 shadow-md z-50 bg-[#fbfbfb] border border-gray-600 rounded-lg'>
      <div className='flex flex-col text-base text-start font-semibold'>
        <span className='text-base text-gray-600'>Total</span>
        <div>
          <span className='line-through text-gray-600'>{currencyConverter(cartTotal.original)}</span>
          <span className='pl-2'>{currencyConverter(cartTotal.discounted)}</span>
        </div>
      </div>
      <ContinueButton progress={progress} userId={userId} onProgressChange={() =>{
        if(progress==1 && !userId) {
          setOpenLoginDialog(true);
        }
        else setProgress(p => p + 1);
        }} />
      <Button
        className='absolute -top-4 -right-3 rounded-full p-2 '
        variant="outline"
        onClick={() => {
          clearCart();
          setProgress(0);
        }}
      >
        <X size={18} />
      </Button>
    </div>
  );
};

const ContinueButton: React.FC<ContinueButtonProps> = ({userId, progress, onProgressChange }) => {
  const [displayText, setDisplayText] = useState("Select Artist");
  const artistSelectionType = useRecoilValue(selctedArtistTypeSelector);
  const selectedArtistService = useRecoilValue(selectedArtistServiceSelector);
  const cartServices = useRecoilValue(getCartServicesSelector);
  const [bookingDialg,setbookingDialog] = useRecoilState(bookingDialogSelector);
  const router = useRouter();

  useEffect(() => {
    if (progress === 0) setDisplayText("Select Artist");
    else if (progress === 1 && !userId) setDisplayText("Login to Continue");
    else if (progress===1) setDisplayText("Select Time");
    else setDisplayText("Confirm Booking");
  }, [progress]);

  const disableContinue = ():boolean =>{
    if(progress==0) return false;
    else if(progress==1 && !userId) {
      if(artistSelectionType=="multiple" && selectedArtistService.length==cartServices.length)return false;
      else if(artistSelectionType=="single" && selectedArtistService.length==1)return false;
      return true;
    }
    else if(progress === 1){
      if(artistSelectionType=="multiple" && selectedArtistService.length==cartServices.length)return false;
      else if(artistSelectionType=="single" && selectedArtistService.length==1)return false;
      return true;
    }
    else if(progress === 2){
      return true;
    }
    return true;
  }

  const handleHash = ()=>{
    if(progress === 0){
      router.push("#artist");
    }else if(progress===1 && userId){
      router.push("#time");
    }else if(progress==2){
      router.push("#confirm");
    }
  }
  return (
    <Button disabled={disableContinue()} onClick={()=>{
      if(!bookingDialg) setbookingDialog(true);
      onProgressChange();
      handleHash();
      }}>
      {displayText}
      <ArrowRightFromLine />
    </Button>
  );
};

export default Cart;
