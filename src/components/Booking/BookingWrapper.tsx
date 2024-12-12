import { forwardRef, memo, useImperativeHandle } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";

import Cart from '@/components/demoCart/cart';
import { Button } from '@/components/ui/button';
import { bookingDateSelector, bookingDialogSelector, bookingOverlayLoadingSelector, bookingSlotsSelector, progressSelector, selctedArtistTypeSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { X } from 'lucide-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ArtistSelect from './components/ArtistSelect';
import MakeAppointment from './components/makeAppointment/MakeAppointment';
import Progress from './components/Progress';
import SlotWrapper from './components/timeSlot/SlotWrapper';
import { Spinner } from '@/components/ui/spinner';

const BookingWrapper = forwardRef<BookingSheetType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(bookingDialogSelector);
  const [progress, setProgress] = useRecoilState(progressSelector);
  const setSelctedArtistService = useSetRecoilState(selectedArtistServiceSelector);
  const setBookingDate = useSetRecoilState(bookingDateSelector);
  const setBookingSlot = useSetRecoilState(bookingSlotsSelector);
  const isOverlayLoading = useRecoilValue(bookingOverlayLoadingSelector);
  const setArtistSelectionType = useSetRecoilState(selctedArtistTypeSelector)

  const openSheet = () => {
    setOpen(true);
  }
  const closeSheet = () => {
    setSelctedArtistService([]);
    setBookingDate(new Date());
    setArtistSelectionType(undefined);
    setBookingSlot([]);
    setProgress(0);
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  return (
    <Dialog open={open}>
      <DialogContent className="h-[100%] max-w-[100%] sm:h-[90%] sm:max-w-[60%] flex flex-col pt-0 px-2 sm:p-4 ">
        <DialogHeader className="flex items-center bg-white py-2">
          <div className='flex justify-end w-full '>
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
          {isOverlayLoading ?
            <div className="absolute flex items-center justify-center backdrop-blur-[0.5px] h-full w-full">
              <div className="p-1 rounded-full bg-primary flex flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%]">
                <Spinner size={"medium"} className='text-white'></Spinner>
              </div>
            </div>
            : null}
          <div>
            {progress == 1 ? <ArtistSelect /> : progress == 2 ? <SlotWrapper /> : progress == 3 ? <MakeAppointment /> : progress == 4}
          </div>
        </DialogDescription>
        <DialogFooter className='fixed bottom-5 w-[94%] right-[3%]'>
          {progress < 3 && <Cart fromBooking/>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default memo(BookingWrapper);

