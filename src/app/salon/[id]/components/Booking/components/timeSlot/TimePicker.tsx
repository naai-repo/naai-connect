import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRecoilValue } from 'recoil'
import { bookingDateSelector, bookingSlotsSelector } from '@/recoil/booking.atom'
import { Button } from '@/components/ui/button'
import { Clock3 } from 'lucide-react'

type DividedSlots = {
  morning: string[][];
  afternoon: string[][];
  evening: string[][];
};

const TimePicker = () => {
  const bookingDate = useRecoilValue(bookingDateSelector);
  const availableSlots = useRecoilValue(bookingSlotsSelector);

  function formatCustomDate(date:Date) {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${weekday}, ${month} ${day}, ${year}`;
  }

  const [dividedSlots, setDividedSlots] = useState<DividedSlots>({
    morning: [],
    afternoon: [],
    evening: []
  });

  // Helper function to parse time into a comparable hour value
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60; // Convert to fractional hours
  };

  // useEffect to divide slots on `availableSlots` change
  useEffect(() => {
    const divideSlots = (slots: string[][]) => {
      const morning = slots.filter(([start]) => parseTime(start) <= 11.5); // Till 11:30 AM
      const afternoon = slots.filter(([start]) => parseTime(start) > 11.5 && parseTime(start) <= 15.5); // Till 3:30 PM
      const evening = slots.filter(([start]) => parseTime(start) > 15.5); // After 3:30 PM
      return { morning, afternoon, evening };
    };

    setDividedSlots(divideSlots(availableSlots));
  }, [availableSlots]); 

  return (
    <div className='flex w-full flex-col items-center border rounded-lg py-5 shadow-sm'>
      <h2 className='capitalize text-gray-500'>Select Time Slot</h2>
    <Dialog>
      <DialogTrigger className='border flex shadow-sm items-center gap-2 px-4 py-1 rounded-md' disabled={!bookingDate}><Clock3 size={18}/> Select time Slot</DialogTrigger>
      <DialogContent className='w-[80%] sm:w-[60%] px-8 rounded-md'>
        <DialogHeader>
          <DialogTitle className='font-normal text-sm text-center text-gray-500'>{formatCustomDate(bookingDate)}</DialogTitle>
          <DialogDescription className='text-start'>
          <h3 className='text-gray-600'>Morning</h3>
              {dividedSlots.morning.length > 0 ? (
                <ul>
                  {dividedSlots.morning.map(([start, end], index) => (
                    <li key={index}>{`${start} - ${end}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No slots available</p>
              )}
              <h3 className='text-gray-600 mt-4'>Afternoon</h3>
              {dividedSlots.afternoon.length > 0 ? (
                <ul>
                  {dividedSlots.afternoon.map(([start, end], index) => (
                    <li key={index}>{`${start} - ${end}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No slots available</p>
              )}

              <h3 className='text-gray-600 mt-4'>Evening</h3>
              {dividedSlots.evening.length > 0 ? (
                <ul>
                  {dividedSlots.evening.map(([start, end], index) => (
                    <li key={index}>{`${start} - ${end}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No slots available</p>
              )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
   </div>
  )
}

export default TimePicker