import { forwardRef, useImperativeHandle } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";

import Cart from '@/components/demoCart/cart';
import { Button } from '@/components/ui/button';
import { bookingDialogSelector, progressSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ArtistSelect from './components/ArtistSelect';
import Progress from './components/Progress';
import SlotWrapper from './components/timeSlot/SlotWrapper';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';

const BookingWrapper = forwardRef<BookingSheetType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(bookingDialogSelector);
  const [progress, setProgress] = useRecoilState(progressSelector);
  const setSelctedArtistService = useSetRecoilState(selectedArtistServiceSelector);

  const openSheet = () => {
    setOpen(true);
  }
  const closeSheet = () => {
    for(let i=0;i<progress;i++){
      window.history.back();
    }
    setSelctedArtistService([]);
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
      <DialogContent className="h-[100%] max-w-[100%] sm:h-[90%] sm:max-w-[60%] flex flex-col py-4 px-2 sm:p-4 overflow-y-auto scrollbar-hide">
        <DialogHeader className="flex flex-row justify-end items-center">
          <Button variant="outline" className="py-4 px-2" size="sm" onClick={(e) => {
            closeSheet();
          }}>
            <X size={18} ></X>
          </Button>
        </DialogHeader>
          <div className='w-full'>
            <Progress />
          </div>
        <Cart />
        <div className='pt-[4.9rem]'>
          {progress == 1 ? <ArtistSelect /> : progress == 2?<SlotWrapper/>:progress==3}
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default BookingWrapper