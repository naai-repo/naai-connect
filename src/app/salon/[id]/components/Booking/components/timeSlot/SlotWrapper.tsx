import React from 'react'
import { DatePicker } from './Datepicker'
import TimePicker from './TimePicker'

const SlotWrapper = () => {
  return (
    <div className='flex flex-col gap-2 justify-center h-full items-center py-10 w-full  px-10'>
      <DatePicker/>
      <TimePicker/>
    </div>
  )
}

export default SlotWrapper