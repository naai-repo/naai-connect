import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../ui/button';
import { currencyConverter } from '@/lib/utils';
import { ArrowRightFromLine, X } from 'lucide-react';
import { getCartServicesSelector, resetCartServicesSelector } from '@/recoil/salon.atom';
import { progressSelector } from '@/recoil/booking.atom';
import { useRouter } from 'next/navigation';

const Cart = () => {

  const cartServices = useRecoilValue(getCartServicesSelector);
  const clearCart = useSetRecoilState(resetCartServicesSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const router = useRouter();

  if(!cartServices.length){
    return <></>
  }

  const getTotal = ()=>{
    const total =  cartServices.reduce((acc, service) => {
      if(service.variables.length>0){
        const selectedVariable = service.variables.find(variable=>variable.selected);
        return acc + (selectedVariable?.variableCutPrice || 0)
      }
      return acc + service.cutPrice;
    }, 0) ?? 0;
    return currencyConverter(total);
  }

  return (
    <div className='flex justify-between items-center fixed bottom-5 w-[90%] ms-1 p-5 shadow-md z-50 bg-[#fbfbfb] border border-gray-600 rounded-lg'>
      <div className='flex flex-col text-lg '>
        <span className='text-sm'>Total</span>
        {getTotal()}
      </div>
      <Button onClick={()=>{
        setProgress(count=>count+1);
        router.push('/salon/booking');
      }}>Select Artist <ArrowRightFromLine/></Button>
      <Button className='absolute -top-4 -right-3 rounded-full p-2 text-red-600'
        variant={"outline"}
        onClick={() => clearCart()}>
         <X size={18}/>
      </Button>
    </div>
  )
}

export default Cart;