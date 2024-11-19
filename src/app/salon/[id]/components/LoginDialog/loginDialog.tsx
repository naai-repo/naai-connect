import { loginDialogSelector, loginStepSelector, otpResSelector, phoneNumberSelector, userIdSelector } from '@/recoil/auth.atom'
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
import { useAuthServices } from '@/hooks/auth.hoook';

const LoginDialog = forwardRef<LoginDialogRefType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(loginDialogSelector);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberSelector);
  const [loginStep,setLoginStep] = useRecoilState(loginStepSelector);
  const [otpRes,setOtpRes] = useRecoilState(otpResSelector);
  const [userId,setUserId] = useRecoilState(userIdSelector);
  const authService = useAuthServices();

  const openSheet = () => {
    setOpen(true);
  }
  const closeSheet = () => {
    setOpen(false);
  }
  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  const getOTP = async ()=>{
    let res = await authService.getOTP({phoneNumber});
    console.log(res.data?.data);
    if(res.status==200){
      setOtpRes(res?.data as loginOTPResType );
      setUserId(res.data?.data?.userId as string);
      setLoginStep(1);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit flex flex-col pb-10 rounded-lg pt-2">
        <DialogHeader className="pb-5">
          <span className='flex justify-end'>{loginStep==1 && <Button onClick={()=>setLoginStep(0)} className='w-fit'><ArrowLeftFromLine /></Button>}</span>
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
            <Button disabled={phoneNumber.length<10} onClick={()=>{getOTP()}}>Get OTP</Button></React.Fragment>
            : <OTPInputControle/>
            }
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
})

export default LoginDialog

