declare type loginOTPResType = {
  status: string;
  message: string;
  data: {
    userId: string;
    phoneNumber: number;
    otp: string;
  };
};

declare type loginOtpPayload = {
  phoneNumber: string;
  name:string,
  gender:"male"|"female"|"not specified"
};

declare type verifyUserRes = {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: number;
    verified: boolean;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    accessToken: string;
    newUser: boolean;
  };
};

declare type UserDataresType = {
  status: string;
  message: string;
  data: userDataType
}

declare type verifyUserPayload = {
  userId: string;
  otp: string;
};
