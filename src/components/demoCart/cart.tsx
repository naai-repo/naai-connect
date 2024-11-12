import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../ui/button';
import { currencyConverter } from '@/lib/utils';
import { X } from 'lucide-react';
import { getCartServicesSelector, resetCartServicesSelector } from '@/recoil/salon.atom';

const Cart = () => {

  const cartServices = useRecoilValue(getCartServicesSelector);
  const clearCart = useSetRecoilState(resetCartServicesSelector);

  if(!cartServices.length){
    return <></>
  }

  const getTotal = ()=>{
    const total =  cartServices.reduce((acc, item) => acc + item.cutPrice, 0) ?? 0;
    return currencyConverter(total);
  }

  return (
    <div className='flex justify-between items-center fixed bottom-5 w-[90%] ms-3 p-5 shadow-md z-50 bg-[#fbfbfb] border border-gray-600 rounded-lg'>
      <div className='flex flex-col text-lg '>
        <span className='text-sm'>Total</span>
        {getTotal()}
      </div>
      <Button >Proceed</Button>
      <Button className='absolute -top-4 -right-3 rounded-full p-2 text-red-600'
        variant={"outline"}
        onClick={() => clearCart()}>
         <X size={18}/>
      </Button>
    </div>
  )
}

export default Cart;