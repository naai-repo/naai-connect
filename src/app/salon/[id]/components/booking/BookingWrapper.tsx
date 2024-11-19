import { forwardRef, useImperativeHandle } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";

import Cart from '@/components/demoCart/cart';
import { Button } from '@/components/ui/button';
import { bookingDialogSelector, cartTotalSelector, progressSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { Variable, X } from 'lucide-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ArtistSelect from './components/ArtistSelect';
import Progress from './components/Progress';
import SlotWrapper from './components/timeSlot/SlotWrapper';
import { getCartServicesSelector, resetCartServicesSelector, selectedServiceSelector } from '@/recoil/salon.atom';

const BookingWrapper = forwardRef<BookingSheetType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(bookingDialogSelector);
  const [progress, setProgress] = useRecoilState(progressSelector);
  const setSelctedArtistService = useSetRecoilState(selectedArtistServiceSelector);
  const resetCart = useSetRecoilState(resetCartServicesSelector);

  const openSheet = () => {
    setOpen(true);
  }
  const closeSheet = () => {
    setSelctedArtistService([]);
    resetCart();
    setProgress(0);
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  return (
    <Dialog open={open} onOpenChange={(e) => {
      if (!e) closeSheet();
    }}>
      <DialogContent className="h-[100%] max-w-[100%] sm:h-[90%] sm:max-w-[60%] flex flex-col pt-0 px-2 sm:p-4 ">
        <DialogHeader className="flex items-center bg-white pb-2">
          <div className='flex justify-end w-full'>
          <Button variant="outline" className="py-4 px-2" size="sm" onClick={(e) => {
            closeSheet();
          }}>
            <X size={18} ></X>
          </Button>
          </div>
          
          <div className='w-full '>
            <Progress />
        </div>
        </DialogHeader>
        <DialogDescription className='overflow-y-auto scrollbar-hide mb-24'>
        <div>
          {progress == 1 ? <ArtistSelect /> : progress == 2?<SlotWrapper/>:progress==3}
        </div>
        </DialogDescription>
          <DialogFooter className='fixed bottom-5 w-[94%] right-[3%]'>
          <Cart/>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default BookingWrapper