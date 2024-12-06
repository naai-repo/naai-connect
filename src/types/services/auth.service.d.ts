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
  data: userDataType;
};

declare type verifyUserPayload = {
  userId: string;
  otp: string;
};

declare type userDataPayloadType = {
  userId: string;
  data: UserUpdateType;
};

declare type UserUpdateType = {
  name:string,
  gender:"male"|"female"|"not specified"
}

declare type userUpdateResType = {
  status: string;
  message: string;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: string | null;
    upsertedCount: number;
    matchedCount: number;
  };
};
