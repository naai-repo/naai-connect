import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { loginDialogSelector, loginStepSelector, otpResSelector, phoneNumberSelector, userIdSelector } from '@/recoil/auth.atom';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRecoilState } from 'recoil';

import ConfirmBookingDialog from "@/components/confirmDialog/ConfirmBooking";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthServices } from '@/hooks/auth.hoook';
import { ArrowLeftFromLine, X } from 'lucide-react';
import { OTPInputControle } from './Otp';
import UserInfo from "./UserInfo";

const GENDERS = ["male", "female", "not specified"]

const LoginDialog = forwardRef<LoginDialogRefType>(({}, ref) => {
  const [open, setOpen] = useRecoilState(loginDialogSelector);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberSelector);
  const [loginStep, setLoginStep] = useRecoilState(loginStepSelector);
  const [otpRes, setOtpRes] = useRecoilState(otpResSelector);
  const [userId, setUserId] = useRecoilState(userIdSelector);
  const ConfirmBookingRef = useRef<ConfirmbookingRefType>(null);
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

  const getOTP = async () => {
    let res = await authService.getOTP({phoneNumber});
    if (res.status == 200) {
      setOtpRes(res?.data as loginOTPResType);
      setUserId(res.data?.data?.userId as string);
      setLoginStep(1);
    }
  }

  return (
    <>
    <ConfirmBookingDialog ref={ConfirmBookingRef} />
    <Dialog open={open}>
      <DialogContent className="w-fit flex flex-col pb-12 rounded-lg pt-1 px-2">
        {loginStep==0 && <div className="flex justify-end"><Button className="w-fit p-2" variant={"outline"} onClick={()=>closeSheet()}><X /> </Button></div>}
        <DialogHeader className="pb-5 ">
          <span className='flex justify-end'>{loginStep == 1 && <Button onClick={() => setLoginStep(0)} className='w-fit'><ArrowLeftFromLine /></Button>}</span>
          <h2 className='text-center text-lg text-nowrap text-black px-5'>{loginStep<2?"Login or Create Account":"Enter User Details"}</h2>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-2 justify-start px-5">
            {loginStep == 0 ? <div className='flex flex-col gap-3 justify-start'>
              <Input
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
              <Button disabled={phoneNumber.length < 10 } onClick={() => { getOTP() }}>Get OTP</Button></div>
              : loginStep==1?<OTPInputControle />:<UserInfo/>
            }
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
    </>
  )
})

export default LoginDialog

