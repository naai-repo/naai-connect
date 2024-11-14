import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Progress from './components/Progress';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from '@/components/demoCart/cart';
import { useRecoilValue } from 'recoil';
import { progressSelector } from '@/recoil/booking.atom';
import Services from '@/components/serviceComponents/Services';
import ArtistSelect from './components/ArtistSelect';

const BookingWrapper = forwardRef<BookingSheetType>(({ }, ref) => {
  const [data, setData] = useState({ open: false });
  const progress = useRecoilValue(progressSelector);

  const openSheet = () => {
    setData({ open: true });
  }
  const closeSheet = () => {
    setData({ open: false });
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });
  return (
    <Sheet
      open={data.open} onOpenChange={(e) => {
      if (data.open != e) setData({ ...data, open: e });
    }}>
      <SheetContent className='p-0 w-full sm:min-w-[70%] md:min-w-[60%] 2xl:min-w-[40%] overflow-y-auto scrollbar-hide'>
        <SheetHeader>
          <SheetTitle className='fixed top-0 w-full bg-[#fbfbfb] pb-4 p-2'>
            <div className='flex justify-end pb-2'>
            <Button onClick={()=>closeSheet()} size={"icon"} variant={"outline"} className='rounded-lg'><X/></Button>
            </div>
            <div className='w-full'>
              <Progress/>
            </div>
          </SheetTitle>
          <Cart/>
          <div className='mt-32'>
            {progress==0?<Services from='booking'/>:progress==1?<ArtistSelect/>:progress==2}
          </div>
          
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
})

export default BookingWrapper