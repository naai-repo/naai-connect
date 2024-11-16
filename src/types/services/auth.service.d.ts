declare type loginResType = {
  status: string;
  message: string;
  data: {
    userId: string;
    phoneNumber: number;
    otp: string;
  };
};

declare type loginOtpPayload = {
  phoneNumber:string
}