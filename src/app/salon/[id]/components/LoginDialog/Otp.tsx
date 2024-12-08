"use client"
import React, { useRef } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { hashSelector, loginDialogSelector, loginFromHeaderSelector, loginStepSelector, otpSelector, userIdSelector } from "@/recoil/auth.atom"
import { Button } from "@/components/ui/button"
import { useAuthServices } from "@/hooks/auth.hoook"
import { progressSelector } from "@/recoil/booking.atom"
import { cookies } from "next/headers"
import useCookie from "@/hooks/cookie.hook"
import { hashString } from "@/lib/utils"
import { confirmDialogSelector, confirmTextSelector } from "@/recoil/drawer.atom"

export function OTPInputControle() {
  const [value, setValue] = useRecoilState(otpSelector);
  const authService = useAuthServices();
  const userId = useRecoilValue(userIdSelector);
  const setLoginStep = useSetRecoilState(loginStepSelector);
  const hash = useRecoilValue(hashSelector);
  const setLoginDialog = useSetRecoilState(loginDialogSelector);
  const setProgress = useSetRecoilState(progressSelector);
  const isFromHeader = useRecoilValue(loginFromHeaderSelector);
  const setIsFromHeader = useSetRecoilState(loginFromHeaderSelector);
  const ConfirmRef = useRef<ConfirmbookingRefType>(null);
  const setConfirmDialog = useSetRecoilState(confirmDialogSelector);
  const setConfirmText = useSetRecoilState(confirmTextSelector);
  

  const handleOTPSubmit = async ()=>{
    let payload = {
      userId:userId as string,
      otp:value
    }
    let res = await authService.verifyOTP(payload);
    if(res.data?.data){
      localStorage.setItem("accessToken",hashString(res.data.data.accessToken || "",hash));
      localStorage.setItem("userId", res.data?.data?.id);
      if(res.data.data.newUser) setLoginStep(2);
      else{
        setLoginDialog(false);
        setConfirmDialog(true);
        setConfirmText("Login Successfull");
        if(!isFromHeader) setProgress(prev=>prev+1);
        setIsFromHeader(false);
      }
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
