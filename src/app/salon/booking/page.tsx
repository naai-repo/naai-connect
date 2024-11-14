"use client"
import MainWrapper from '@/components/mainWrapper/mainWrapper'
import { getCartServicesSelector } from '@/recoil/salon.atom'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Progress from './components/Progress'
import { progressSelector } from '@/recoil/booking.atom'
import Services from '@/components/serviceComponents/Services'
import ArtistSelect from './components/ArtistSelect'
import Cart from '@/components/demoCart/cart'

const Page = () => {
  const progress = useRecoilValue(progressSelector);
  return (
    <MainWrapper name="Booking" parentWrapper={{
      className : "flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-full"
    }} mainWrapper={{
      className : "grid flex-1 items-start gap-4 p-2 pt-0 sm:px-6 sm:py-0 md:gap-4 h-full w-full"
    }}>
      <div className="flex flex-col w-full items-start gap-2 md:gap-4 h-full z- p-2 ">
        <Progress/>
      <Cart/>
        {progress==0?<Services from='booking'/>:progress==1?<ArtistSelect/>:progress==2}
      </div>
    </MainWrapper>
  )
}

export default Page