"use client"
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRecoilState } from "recoil"
import { otpSelector } from "@/recoil/auth.atom"
import { Button } from "@/components/ui/button"
import { ArrowLeftFromLine } from "lucide-react"

export function OTPInputControle() {
  const [value, setValue] = useRecoilState(otpSelector);

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
      <Button>Submit</Button>
    </div>
  )
}
