import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loginDialogSelector, loginStepSelector, otpResSelector, phoneNumberSelector, userIdSelector, userInputFieldSelector } from '@/recoil/auth.atom';
import { forwardRef, useImperativeHandle } from 'react';
import { useRecoilState } from 'recoil';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthServices } from '@/hooks/auth.hoook';
import { ArrowLeftFromLine } from 'lucide-react';
import { OTPInputControle } from './Otp';

const GENDERS = ["male", "female", "not specified"]

const LoginDialog = forwardRef<LoginDialogRefType>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(loginDialogSelector);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberSelector);
  const [loginStep, setLoginStep] = useRecoilState(loginStepSelector);
  const [otpRes, setOtpRes] = useRecoilState(otpResSelector);
  const [userId, setUserId] = useRecoilState(userIdSelector);
  const [userName, setuserName] = useRecoilState(userInputFieldSelector("name")) ;
  const [userGender, setUserGender] = useRecoilState(userInputFieldSelector("gender"));
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
    let payload = {
      phoneNumber,
      name: userName as string,
      gender: userGender as "male" | "female" | "not specified"
    }
    let res = await authService.getOTP(payload);
    console.log(res.data?.data);
    if (res.status == 200) {
      setOtpRes(res?.data as loginOTPResType);
      setUserId(res.data?.data?.userId as string);
      setLoginStep(1);
    }
  }

  const handleGender = (val:string)=>{
    setUserGender(val);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit flex flex-col pb-10 rounded-lg pt-2">
        <DialogHeader className="pb-5">
          <span className='flex justify-end'>{loginStep == 1 && <Button onClick={() => setLoginStep(0)} className='w-fit'><ArrowLeftFromLine /></Button>}</span>
          <h2 className='text-center text-lg text-nowrap text-black px-5'>Login or Create Account</h2>
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
              <Input placeholder='Enter Name' type='text' value={userName} onChange={(e) => setuserName(e.target.value)} />
              <Select onValueChange={(val)=>handleGender(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className='capitalize'>
                  {GENDERS.map((gender)=>(
                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button disabled={phoneNumber.length < 10 || userName.toString().length==0 || userGender.toString().length==0} onClick={() => { getOTP() }}>Get OTP</Button></div>
              : <OTPInputControle />
            }
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
})

export default LoginDialog

