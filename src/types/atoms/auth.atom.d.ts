declare type User = {
  loginform: loginFormType;
  loginOTPRes: loginOTPResType;
  userDetails: UserType;
  openDialog: {
    val:boolean,
    header?:boolean
  };
  userData?: userDataType;
  hash:number
};

declare type loginFormType = {
  phoneNumber: string;
  name:string,
  gender:"male" | "female" | "not specified" | ""
  otp: string;
  step: number;
};

declare type UserType = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  accessToken: string;
  newUser: boolean;
};

type userDataType = {
  location: {
    type: "Point";
    coordinates: number[];
  };
  favourite: {
    salons: string[];
    artists: string[];
  };
  subscription: {
    expiryDate: string;
    plan: string;
    startDate: string;
  };
  _id: string;
  name: string;
  email: string;
  gender: string;
  phoneNumber: number;
  verified: boolean;
  status: string;
  imageKey: string;
  imageUrl: string;
  walkinSalons: string[];
  userType: string;
  dues: userDataType[];
  aniversary: string;
  birthDate: string;
  convertedAt: string;
  subscriptions: any[];
  membership: PackageMembershipType[];
  package: PackageMembershipType[];
  loyaltyPoints: {
    salonId: string;
    points: number;
    _id: string;
  }[];
};

declare type UserDuesType = {
  bookingId: string;
  salonId: string;
  amount: number;
  bookingDate: string;
  _id: string;
};

declare type ProductServiceType = {
  id: string;
  allotted_count: number;
  discount_type: number;
  discount_type_value: number;
  max_discount_amount: number;
  _id: string;
};

declare type PackageMembershipType = {
  id: string;
  salonId: string;
  name: string;
  services: ProductServiceType[];
  products: ProductServiceType[];
  _id: string;
  startDate: string;
};


declare type userLoginFieldSelector = keyof loginFormType