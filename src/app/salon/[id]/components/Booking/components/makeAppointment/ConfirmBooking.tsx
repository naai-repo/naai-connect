import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const ConfirmBookingDialog = forwardRef<ConfirmbookingRefType>(({ }, ref) => {
  const [data, setData] = useState({ open: false });

  const openDialog = () => {
    setData({ open: true });
  }
  const closeDialog = () => {
    setData({ open: false });
  }

  useImperativeHandle(ref, () => {
    return { openDialog, closeDialog };
  });

  return (
    <div>
      <Dialog open={data.open} onOpenChange={(e) => {
      if (data.open != e) setData({ ...data, open: e });
    }}>
        <DialogContent className='w-[80%] md:w-auto'>
          <DialogHeader>
            <DialogDescription>
              <div className="checkbox-wrapper">
                <Input id="_checkbox-26" type="checkbox" checked />
                <Label htmlFor="_checkbox-26">
                  <div className="tick_mark"></div>
                </Label>
              </div>
              <div className='pt-5 text-xl font-semibold text-center'>
                Booking Confirmed
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
})

export default ConfirmBookingDialog;