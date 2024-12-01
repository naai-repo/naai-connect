declare type TimeSlotResType = {
  salonId: string;
  timeSlots: allTimeSlotsType[];
  timeSlotsVisible: string[][];
  artistsTimeSlots: any;
};

declare type allTimeSlotsType = {
  key: number;
  possible: boolean;
  timeSlot: singletimeSlotType[];
  order: orderType[];
};

declare type orderType = {
  service: {
    reminderDays: number;
    _id: string;
    salonId: string;
    category: string;
    serviceTitle: string;
    description: string;
    targetGender: string;
    avgTime: number;
    variables: ServiceVariableType[];
    basePrice: number;
    cutPrice: number;
    productsUsed: [];
    createdAt: string;
    updatedAt: string;
  };
  artist: string;
  time: 1;
};

declare type singletimeSlotType = {
  slot: string[];
  key: number;
};

declare type TimeSlotPayload = {
  salonId: string;
  requests: TimeSlotRequestType[];
  date: string;
};

declare type TimeSlotRequestType = {
  service: string;
  artist: string;
  variable?: ServiceVariableType;
};

declare type MakeAppointmentPayload = {
  key: number;
  salonId: string;
  phoneNumber: string;
  timeSlot: string[];
  bookingDate: string;
  timeSlots: allTimeSlotsType[];
};

declare type MakeAppointmentResType = {
  booking: {
    salonId: string;
    userId: string;
    userName: string;
    paymentId: string;
    paymentStatus: string;
    bookingStatus: string;
    bookingDate: string;
    coupon: {
      couponId: string;
      couponCode: string;
      discount: number;
      max_value: number;
    };
    timeSlot: {
      start: string;
      end: string;
    };
    bookingType: string;
    artistServiceMap: ArtistServiceMapType[];
  };
  totalTime: number;
};

declare type ArtistServiceMapType = {
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  artistId: string;
  artistName: string;
  artistType: string;
  secondaryArtists: string[];
  chosenBy: string;
  variable: {
    variableId: string;
    variableType: string;
    variableName: string;
  };
  timeSlot: {
    start: string;
    end: string;
  };
};

declare type ConfirmAppointmentResType = {
  status: string;
  message: string;
  data: {
    userId:string;
    userName: string;
    bookingType:string;
    bookingMode: string;
    salonId: string;
    amount: number;
    paymentAmount: number;
    amountDue: number;
    paymentId: string;
    bookingStatus: string;
    paymentStatus: string;
    areDuesCleared: false;
    bill: {
      cashDiscount: number;
      percentageDiscount: number;
      percentageDiscountAmount: number;
      duesCleared: number;
      roundOff: number;
      taxIncluded: true;
    };
    membership: {
      _id: string;
      name: string;
      amount: number;
      cost: number;
      discountCost: number;
      tax: number;
      qty: number;
      staffId: string;
      staffName: string;
    };
    package: {
      _id: string;
      name: string;
      amount: number;
      cost: number;
      discountCost: number;
      tax: number;
      qty: number;
      staffId: string;
      staffName: string;
    };
    loyaltyPoints: {
      points_earned: number;
      points_redeemed: number;
    };
    timeSlot: {
      start: string;
      end: string;
    };
    bookingDate: string;
    coupon: {
      couponId: string;
      couponCode: string;
      discount: number;
      max_value: number;
      couponDiscount: number;
    };
    artistServiceMap: ArtistServiceMapType[];
    excludeGst: boolean;
    _id:string;
    duesCleared: [];
    products: [];
    payments: [];
  };
};
