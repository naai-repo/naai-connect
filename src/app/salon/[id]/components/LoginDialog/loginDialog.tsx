import { loginDialogSelector, loginStepSelector, phoneNumberSelector } from '@/recoil/auth.atom'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useRecoilState } from 'recoil'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OTPInputControle } from './Otp';

const LoginDialog = forwardRef<LoginDialogRefType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(loginDialogSelector);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberSelector);
  const [loginStep,setLoginStep] = useRecoilState(loginStepSelector);

  const openSheet = () => {
    setOpen(true);
  }
  const closeSheet = () => {
    setOpen(false);
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  const getOpt = async ()=>{
     
  }

  return (
    <Dialog open={open} onOpenChange={(e) => {
      if (!e) closeSheet();
    }}>
      <DialogContent className="w-fit flex flex-col pb-10 rounded-lg pt-2">
        <DialogHeader className="pb-5">
          <span className='flex justify-end'>{loginStep==1 && <Button className='w-fit'><ArrowLeftFromLine /></Button>}</span>
          <h2 className='text-center text-lg text-nowrap text-black px-5'>Login or Create Account</h2>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-2 justify-start px-5">
          {loginStep==0 ? <React.Fragment><Input
              id="mobile-number"
              placeholder="Enter your mobile number"
              type="number"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              value={phoneNumber ?? ""}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  setPhoneNumber(e.target.value)
                }
              }}
            />
            <Button disabled={phoneNumber.length<10} onClick={()=>setLoginStep(1)}>Get OTP</Button></React.Fragment>
            : <OTPInputControle/>
            }
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
})

export default LoginDialog

