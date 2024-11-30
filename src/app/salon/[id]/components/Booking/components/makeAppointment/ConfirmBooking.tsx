import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const ConfirmBooking = () => {
  return (
    <div>
      <div className="checkbox-wrapper">
        <Input id="_checkbox-26" type="checkbox" checked/>
        <Label htmlFor="_checkbox-26">
          <div className="tick_mark"></div>
        </Label>
      </div>
    </div>
  )
}

export default ConfirmBooking