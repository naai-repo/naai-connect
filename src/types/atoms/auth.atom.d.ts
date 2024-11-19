declare type User = {
  loginform: loginFormType;
  loginOTPRes: loginOTPResType;
  userDetails:UserType;
  openDialog: boolean;
};

declare type loginFormType = {
  phoneNumber: string;
  otp: string;
  step: number;
};

declare type UserType = {
  id?: string;
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
