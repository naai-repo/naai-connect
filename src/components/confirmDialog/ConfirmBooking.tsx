import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRecoilState } from 'recoil'
import { confirmDialogSelector, confirmTextSelector } from '@/recoil/drawer.atom'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'


const ConfirmBookingDialog = forwardRef<ConfirmbookingRefType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(confirmDialogSelector);
  const [confirmText,setConfirmText] = useRecoilState(confirmTextSelector);
  const [confirmed,setConfirmed] = useState(false);

  useEffect(() => {
    setConfirmed(false)
    const timeoutId = setTimeout(() => {
      setConfirmed(true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [open]); 

  const openDialog = () => {
    setOpen(true);
  }
  const closeDialog = () => {
    setConfirmText(undefined)
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return { openDialog, closeDialog };
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={(e) => {
      if (!e) closeDialog();
    }}>
        <DialogContent className='w-[80%] md:w-[40%] p-1'>
        <DialogTitle className='flex justify-end'>
            <X size={20} className='text-gray-500' onClick={()=>closeDialog()}/>
          </DialogTitle>
          <DialogHeader>
            <DialogDescription className='p-5'>
              <div className="checkbox-wrapper">
                <Input id="_checkbox-26" type="checkbox" checked={confirmed} />
                <Label htmlFor="_checkbox-26">
                  <div className="tick_mark"></div>
                </Label>
              </div>
              <div className='pt-7 pb-4 text-xl font-semibold text-center text-green-500'>
                {confirmText?confirmText:"Booking Confirmed"}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
})

export default ConfirmBookingDialog;