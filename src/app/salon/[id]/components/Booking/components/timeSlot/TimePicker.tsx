import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { availableSlotsSelector, bookingDateSelector, bookingSlotsSelector } from '@/recoil/booking.atom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DividedSlots = {
  morning: string[][];
  afternoon: string[][];
  evening: string[][];
};

const TimePicker = () => {
  const availableSlots = useRecoilValue(availableSlotsSelector);
  const [bookingSlot, setBookingSlots] = useRecoilState(bookingSlotsSelector);
  const bookigDate = useRecoilValue(bookingDateSelector)
  const [dividedSlots, setDividedSlots] = useState<DividedSlots>({
    morning: [],
    afternoon: [],
    evening: []
  });

  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  useEffect(() => {
    const divideSlots = (slots: string[][]) => {
      const morning = slots.filter(([start]) => parseTime(start) <= 11.5); // Till 11:30 AM
      const afternoon = slots.filter(([start]) => parseTime(start) > 11.5 && parseTime(start) <= 15.5); // Till 3:30 PM
      const evening = slots.filter(([start]) => parseTime(start) > 15.5); // After 3:30 PM
      return { morning, afternoon, evening };
    };
    setDividedSlots(divideSlots(availableSlots));
  }, [availableSlots]);

  const isAvailable = (time: string[]) => {
    let curr = new Date();
    let start = new Date(bookigDate);
    let end = new Date(bookigDate);

    const [startTime, endTime] = time;
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    start.setHours(startHour, startMinute, 0, 0);
    end.setHours(endHour, endMinute, 0, 0);
    
    if (curr > start || curr > end) {
        return true; 
    }
    return false; 
};

  return (
    <>
      {availableSlots[0][0].length == 0 ? null :
        <div className='flex w-full flex-col items-center border rounded-lg py-5 px-2 shadow-lg'>
          <h2 className='capitalize text-gray-500'>Select Time Slot</h2>
          <div>
            <span className='text-gray-600 text-base'>Morning</span>
            {dividedSlots.morning.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {dividedSlots.morning.map(([start, end], index) => (
                  <Button disabled={isAvailable([start, end])} onClick={() => setBookingSlots([start, end])} variant={"outline"} className={cn(bookingSlot[0] == start && bookingSlot[1] == end && "bg-gray-200", 'rounded-2xl focus:bg-gray-200 shadow-md  text-xs')} key={index}>{`${start} - ${end}`}</Button>
                ))}
              </div>
            ) : (
              <p>No slots available</p>
            )}
            <h3 className='text-gray-600 mt-4 text-base'>Afternoon</h3>
            {dividedSlots.afternoon.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {dividedSlots.afternoon.map(([start, end], index) => (
                  <Button disabled={isAvailable([start, end])} onClick={() => setBookingSlots([start, end])} variant={"outline"} className={cn(bookingSlot[0] == start && bookingSlot[1] == end && "bg-gray-200", 'rounded-2xl focus:bg-gray-200 shadow-md  text-xs')} key={index}>{`${start} - ${end}`}</Button>
                ))}
              </div>
            ) : (
              <p>No slots available</p>
            )}

            <h3 className='text-gray-600 mt-4 text-base'>Evening</h3>
            {dividedSlots.evening.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {dividedSlots.evening.map(([start, end], index) => (
                  <Button disabled={isAvailable([start, end])} onClick={() => setBookingSlots([start, end])} variant={"outline"} className={cn(bookingSlot[0] == start && bookingSlot[1] == end && "bg-gray-200", 'rounded-2xl focus:bg-gray-200 shadow-md text-xs ')} key={index}>{`${start} - ${end}`}</Button>
                ))}
              </div>
            ) : (
              <p>No slots available</p>
            )}
          </div>
        </div>
      }
    </>
  )
}

export default TimePicker