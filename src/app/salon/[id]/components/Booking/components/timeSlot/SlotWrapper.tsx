import React from 'react'
import { DatePicker } from './Datepicker'
import TimePicker from './TimePicker'
import { useRecoilValue } from 'recoil';
import { availableSlotsSelector } from '@/recoil/booking.atom';

const SlotWrapper = () => {
  const availableSlots = useRecoilValue(availableSlotsSelector);

  return (
    <div className='flex flex-col gap-2 justify-center h-full items-center px-2 md:px-10 lg:px-14 py-5 w-full '>
        <DatePicker/>
        {availableSlots[0][0].length==0 && <div className='text-red-500 capitalize text-sm pt-10'><p>
          <sup>*</sup>Artist not available on this date</p>
          <p>Please Select different Date or artist</p>
          </div>
          }
      <TimePicker/>
    </div>
  )
}

export default SlotWrapper