"use client"
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { loginDialogSelector, otpSelector, userIdSelector } from "@/recoil/auth.atom"
import { Button } from "@/components/ui/button"
import { useAuthServices } from "@/hooks/auth.hoook"
import { progressSelector } from "@/recoil/booking.atom"

export function OTPInputControle() {
  const [value, setValue] = useRecoilState(otpSelector);
  const authService = useAuthServices();
  const userId = useRecoilValue(userIdSelector);
  const setLoginDialog = useSetRecoilState(loginDialogSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const handleOTPSubmit = async ()=>{
    let payload = {
      userId:userId as string,
      otp:value
    }
    let res = await authService.verifyOTP(payload);
    if(res.data?.data){
      if (typeof window !== "undefined") {
        // Safe to use localStorage
        localStorage.setItem("accessToken", res.data?.data?.accessToken);
        localStorage.setItem("userId", res.data?.data?.id);
      }
      setLoginDialog(false);
      setProgress(prev=>prev+1);
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-center text-sm">
        Enter your one-time password.
      </div>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button disabled={value.length<6} onClick={()=>handleOTPSubmit()}>Submit</Button>
    </div>
  )
}
