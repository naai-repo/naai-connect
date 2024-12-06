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
import { loginDialogSelector, loginFromHeaderSelector, loginStepSelector, otpResSelector, phoneNumberSelector, userIdSelector, userInputFieldSelector } from '@/recoil/auth.atom';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthServices } from '@/hooks/auth.hoook';
import { ArrowLeftFromLine } from 'lucide-react';
import { OTPInputControle } from './Otp';
import { progressSelector } from "@/recoil/booking.atom";

const GENDERS = ["male", "female", "not specified"]

const UserInfo = () => {
  const [userId, setUserId] = useRecoilState(userIdSelector);
  const [userName, setuserName] = useRecoilState(userInputFieldSelector("name"));
  const [userGender, setUserGender] = useRecoilState(userInputFieldSelector("gender"));
  const setLoginDialog = useSetRecoilState(loginDialogSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const isFromHeader = useRecoilValue(loginFromHeaderSelector);
  const setIsFromHeader = useSetRecoilState(loginFromHeaderSelector);
  const authService = useAuthServices();

  

  const updateUser = async () => {
    let payload = {
      userId: userId as string,
      data: {
        name: userName as string,
        gender: userGender as "male" | "female" | "not specified"
      }
    }
    let res = await authService.updateUserData(payload);
    console.log(res.data?.data);
    if (res.status == 200) {
      setLoginDialog(false);
      if(!isFromHeader) setProgress(prev=>prev+1);
      setIsFromHeader(false);
    }
  }

  const handleGender = (val: string) => {
    setUserGender(val);
  }

  return (
    <div className="flex flex-col gap-2 justify-start px-5">
      <div className='flex flex-col gap-3 justify-start'>
        <Input placeholder='Enter Name' type='text' value={userName} onChange={(e) => setuserName(e.target.value)} />
        <Select onValueChange={(val) => handleGender(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent className='capitalize'>
            {GENDERS.map((gender) => (
              <SelectItem className="capitalize" key={gender} value={gender}>{gender}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button disabled={userName.toString().length == 0 || userGender.toString().length == 0} onClick={() => { updateUser()}}>Continue</Button></div>
    </div>
  )
}

export default UserInfo

