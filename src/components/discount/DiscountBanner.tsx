import { singleSalonDataSelector } from '@/recoil/salon.atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const DiscountBanner = () => {
  const salonData = useRecoilValue(singleSalonDataSelector);

  return (
    <div className='h-fit w-full py-1 rounded-md flex justify-center text-lg bg-gray-900 text-white relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none'></div>
      <span className='relative z-10'>
        {salonData?.data.discount}% OFF
      </span>
    </div>
  );
};

export default DiscountBanner;
