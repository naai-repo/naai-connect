import { currencyConverter, dehash } from '@/lib/utils';
import { hashSelector, loginDialogSelector, userIdSelector } from '@/recoil/auth.atom';
import { bookingDialogSelector, bookingSlotsSelector, cartTotalSelector, progressSelector, selctedArtistTypeSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { artistsSelector, getCartServicesSelector, resetCartServicesSelector, salonIdSelector, stepOneCartSelector } from '@/recoil/salon.atom';
import { ArrowRightFromLine, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '../ui/button';

// Type definitions
type ContinueButtonProps = {
  onProgressChange: () => void;
};

type CartPropsType = {
  fromBooking?:boolean
}

const Cart: React.FC<CartPropsType> = ({fromBooking}) => {
  const cartServices = useRecoilValue(getCartServicesSelector);
  const clearCart = useSetRecoilState(resetCartServicesSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const [cartTotal, setCartTotal] = useRecoilState(cartTotalSelector);
  const progress = useRecoilValue(progressSelector);
  const [bookingDialg,setbookingDialog] = useRecoilState(bookingDialogSelector);
  const selectedServicesArtist = useRecoilValue(selectedArtistServiceSelector);
  const setOpenLoginDialog = useSetRecoilState(loginDialogSelector);
  const hash = useRecoilValue(hashSelector);
  const user = dehash(localStorage.getItem("accessToken") || "",hash);
  const allArtists = useRecoilValue(artistsSelector);
  const [cartPrice,setCartPrice] = useRecoilState(stepOneCartSelector);
  
  useEffect(() => {
      const discountedPrice = selectedServicesArtist.reduce((accum, serviceArtist) => {
        if (serviceArtist.service.variables.length > 0) {
          return accum + (serviceArtist.service.variables.find((variable) => variable.selected)?.variablePrice ?? 0);
        } else {
          const selectedArtist = allArtists.find((artist) => artist.id === serviceArtist.artist)
          const foundService = selectedArtist?.services.find((service) => service.serviceId == serviceArtist.service.id);
          return accum + (foundService?.price ?? 0);
        }
      }, 0)

      const price = selectedServicesArtist.reduce((accum, serviceArtist) => {
        if (serviceArtist.service.variables.length > 0) {
          const selectedVariable = serviceArtist.service.variables.find(variable => variable.selected);
          return accum + (selectedVariable?.variableCutPrice || 0);
        }
        return accum + (serviceArtist.service.cutPrice ?? 0)
      }, 0)
      setCartTotal({ original: price, discounted: discountedPrice })
  }, [selectedServicesArtist]);
  
  if (!cartServices.length) {
    return null;
  }

  return (
    <div className='flex justify-between items-center w-full justify-self-center relative p-5 shadow-md  bg-[#fbfbfb] border border-gray-600 rounded-lg'>
      <div className='flex flex-col text-base text-start font-semibold'>
        <span className='text-base text-gray-600'>Total</span>
        {progress==0?<div>
          <span className='line-through text-gray-600'>{currencyConverter(cartPrice.cutPrice)}</span>
            <span className='pl-2'>{currencyConverter(cartPrice.basePrice)}</span>
        </div>:
          <div>
            <span className='line-through text-gray-600'>{currencyConverter(cartTotal.original)}</span>
            <span className='pl-2'>{currencyConverter(cartTotal.discounted)}</span>
          </div>
        }
      </div>
      <ContinueButton onProgressChange={() =>{
        if(progress==1 && !user) {
          setOpenLoginDialog(true);
        }
        else setProgress(p => p + 1);
        }} />
      {!fromBooking && <Button
        className='absolute -top-4 -right-3 rounded-full p-2 '
        variant="outline"
        onClick={() => {
          setCartPrice({
            basePrice:0,
            cutPrice:0
          });
          clearCart();
          setbookingDialog(false);
        }}
      >
        <X size={18} />
      </Button>
      }
    </div>
  );
};

const ContinueButton: React.FC<ContinueButtonProps> = ({ onProgressChange }) => {
  const [displayText, setDisplayText] = useState("Select Artist");
  const artistSelectionType = useRecoilValue(selctedArtistTypeSelector);
  const selectedArtistService = useRecoilValue(selectedArtistServiceSelector);
  const cartServices = useRecoilValue(getCartServicesSelector);
  const [bookingDialg,setbookingDialog] = useRecoilState(bookingDialogSelector);
  const selectedSlot = useRecoilValue(bookingSlotsSelector)
  const hash = useRecoilValue(hashSelector);
  const user = dehash(localStorage.getItem("accessToken") || "",hash);
  const progress = useRecoilValue(progressSelector);
  
  useEffect(() => {
    if (progress === 0) setDisplayText("Select Artist");
    else if (progress === 1 && !user) setDisplayText("Login to Continue");
    else if (progress===1) setDisplayText("Select Time");
    else setDisplayText("Confirm Booking");
  }, [progress]);

  const disableContinue = ():boolean =>{
    if(progress==0) return false;
    else if(progress==1 && !user) {
      if(artistSelectionType=="multiple" && selectedArtistService.length==cartServices.length)return false;
      else if(artistSelectionType=="single" && selectedArtistService.length==1)return false;
      return true;
    }
    else if(progress === 1){
      if(selectedArtistService.length==cartServices.length) return false;
      return true;
    }
    else if(progress === 2 && selectedSlot.length>0){
      return false;
    }
    return true;
  }

  return (
    <Button disabled={disableContinue()} onClick={()=>{
      if(!bookingDialg) setbookingDialog(true);
        onProgressChange();
      }}>
      {displayText}
      <ArrowRightFromLine />
    </Button>
  );
};

export default Cart;
