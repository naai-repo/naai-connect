declare type User = {
  loginform: loginFormType;
  loginRes: loginResType;
  userDetails:userDetailsType;
  openDialog:boolean;
};

declare type loginFormType = {
  phoneNumber: string;
  otp: string;
  step:number
};

declare type userDetailsType = {
  status: "success";
  message: string; // Empty string for now
  data: {
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    favourite: {
      salons: any[]; // Array of any type since it's empty
      artists: any[]; // Array of any type since it's empty
    };
    subscription: {
      startDate: string; // ISO date string
    };
    _id: string;
    name: string;
    email: string;
    gender: string;
    phoneNumber: number;
    userType: string;
    verified: boolean;
    status: string;
    imageKey: string;
    imageUrl: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    dues: {
      bookingId: string;
      salonId: string;
      amount: number;
      bookingDate: string; // ISO date string
      _id: string;
    }[];
    aniversary: string; // Assuming it's a string for now
    birthDate: string; // ISO date string
    convertedAt: string; // Assuming it's a string for now
    membership: {
      id: string;
      salonId: string;
      name: string;
      wallet_amount: number;
      all_services_discount_max_count: number;
      all_products_discount_max_count: number;
      services: any[]; // Array of any type since it's empty
      products: any[]; // Array of any type since it's empty
      _id: string;
      startDate: string; // ISO date string
    }[];
    package: {
      id: string;
      salonId: string;
      name: string;
      services: {
        id: string;
        allotted_count: number;
        discount_type: number;
        discount_type_value: number;
        max_discount_amount: number;
        _id: string;
      }[];
      products: {
        id: string;
        allotted_count: number;
        discount_type: number;
        discount_type_value: number;
        max_discount_amount: number;
        _id: string;
      }[];
      _id: string;
      startDate: string; // ISO date string
    }[];
    subscriptions: any[]; // Array of any type since it's empty
    walkinSalons: string[]; // Array of strings
    loyaltyPoints: {
      salonId: string;
      points: number;
      _id: string;
    }[];
  };
};

