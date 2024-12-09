import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useBookingService } from '@/hooks/booking.hooks';
import { cn, currencyConverter, dehash, formatDate, formatDateToDDMMYYYY, formatTimeTo12Hour, removeTimeZoneOffsetToDate } from '@/lib/utils';
import { hashSelector, userDataSelector } from '@/recoil/auth.atom';
import { bookingDateSelector, bookingDialogSelector, bookingOverlayLoadingSelector, bookingScheduleSelector, bookingSlotsSelector, cartTotalSelector, makeAppointmentSelector, progressSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { getCartServicesSelector, resetCartServicesSelector, salonIdSelector } from '@/recoil/salon.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { confirmDialogSelector } from '@/recoil/drawer.atom';
import ConfirmBookingDialog from '@/components/confirmDialog/ConfirmBooking';

const MakeAppointment = () => {
  const progress = useRecoilValue(progressSelector);
  const bookingService = useBookingService();
  const timeSchedule = useRecoilValue(bookingScheduleSelector);
  const salonId = useRecoilValue(salonIdSelector);
  const bookingTimeSlot = useRecoilValue(bookingSlotsSelector);
  const bookingDate = useRecoilValue(bookingDateSelector);
  const [appointment, setAppointment] = useRecoilState(makeAppointmentSelector);
  const [loading, setLoading] = useState(false);
  const userData = useRecoilValue(userDataSelector);
  const totalBookingCost = useRecoilValue(cartTotalSelector);
  const cartServices = useRecoilValue(getCartServicesSelector);
  const ConfirmBookingRef = useRef<ConfirmbookingRefType>(null);
  const setOpen = useSetRecoilState(bookingDialogSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const setSelctedArtistService = useSetRecoilState(selectedArtistServiceSelector);
  const resetCart = useSetRecoilState(resetCartServicesSelector);
  const setBookingDate = useSetRecoilState(bookingDateSelector);
  const setBookingSlot = useSetRecoilState(bookingSlotsSelector);
  const hash = useRecoilValue(hashSelector);
  const setConfirmDialog = useSetRecoilState(confirmDialogSelector);
  const setisOverLayLoading = useSetRecoilState(bookingOverlayLoadingSelector);

  const makeAppointmentHandler = async () => {
    setLoading(true);
    try {
      setisOverLayLoading(true);
      let payload: MakeAppointmentPayload = {
        key: timeSchedule?.timeSlots[0].key as number,
        salonId,
        bookingDate:formatDateToDDMMYYYY(removeTimeZoneOffsetToDate(bookingDate)),
        timeSlot: bookingTimeSlot,
        phoneNumber: userData?.phoneNumber.toString() as string,
        timeSlots: timeSchedule?.timeSlots as allTimeSlotsType[]
      }
      const token = dehash(localStorage.getItem('accessToken') || "",hash);
      let res = await bookingService.makeAppointment(payload, token as string);
      setAppointment(res.data);
    } catch (error) {
      console.error("error while making appointment", error);
    } finally {
      setisOverLayLoading(false);
      setLoading(false);
    }
  }
  const getOriginalServicePrice = (serviceId: string) => {
    const service = cartServices.find((service) => service.id === serviceId);
    return service?.cutPrice ?? 0;
  }

  const ConfirmBooking = async () => {
    const token = dehash(localStorage.getItem('accessToken')|| "",hash);
    let res = await bookingService.confirmAppointment(appointment as MakeAppointmentResType,token as string);
    if(res.status==200){
      setConfirmDialog(true);
      setSelctedArtistService([]);
      setBookingDate(new Date());
      setBookingSlot([]);
      resetCart();
      setProgress(0);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (progress == 3) {
      makeAppointmentHandler();
    }
  }, [progress])

  return (
    <div className='w-full p-3'>
      <ConfirmBookingDialog ref={ConfirmBookingRef}/>
        <div className='flex flex-col gap-5'>
          <div className='flex p-2 shadow border rounded-md text-base font-semibold capitalize text-black'>
            <div className='flex flex-col items-center border-r-2 flex-grow '>
              <p className='text-sm font-normal'>Booking For</p>
              {appointment?.booking?.userName}
            </div>
            <div className='flex flex-col items-center border-r-2 flex-grow'>
              <p className='text-sm font-normal'>Booking Date</p>
              {formatDate(appointment?.booking?.bookingDate as string)}
            </div>
            <div className='flex flex-col items-center  flex-grow'>
              <p className='text-sm font-normal'>Booking Time</p>
              {appointment?.booking?.timeSlot.start && formatTimeTo12Hour(appointment?.booking?.timeSlot.start as string)}
            </div>
          </div>
          <div className='border shadow-md rounded-lg p-3 pt-1 '>
            <div className='flex flex-col gap-2 border-b-2'>
              <h4 className='text-lg text-gray-500'>Services</h4>
              {appointment?.booking?.artistServiceMap?.map((booking, ind) => {
                return (
                  <div className={cn('w-full flex justify-between items-start', ind != appointment.booking.artistServiceMap.length - 1 && "border-b")}>
                    <div>
                      <h4 className='text-base'>{booking.serviceName}</h4>
                      <p>{booking.artistName ? booking.artistName:"Random Artist"}</p>
                    </div>
                    <p>+ {currencyConverter(getOriginalServicePrice(booking.serviceId))}</p>
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col gap-2 pt-2 uppercase text-lg'>
              <div className='flex justify-between'>
                <h3>subtotal</h3>
                + {currencyConverter(totalBookingCost.original)}
              </div>
              <div className='flex justify-between'>
                <h3 >discount</h3>
                - {currencyConverter(totalBookingCost.original-totalBookingCost.discounted)}
              </div>
            </div>
          </div>
          <div className='border rounded-lg p-3 shadow-md flex justify-between uppercase text-xl font-semibold text-gray-900'>
            <h2>Grand total</h2>
            {currencyConverter(totalBookingCost.discounted)}
          </div>
        </div>
      <div className='p-1 bg-background py-3 fixed bottom-0 w-[90%] '>
        <Button onClick={()=>{
          ConfirmBooking();
      }} className='w-full'>Confirm Booking</Button>
      </div>
    </div>
  )
}

export default MakeAppointment