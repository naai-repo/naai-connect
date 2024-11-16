declare type TimeSlotResType = {
  salonId: string;
  timeSlots: allTimeSlotsType;
  timeSlotsVisible:string[][];
};

declare type allTimeSlotsType = {
  key: number;
  possible: boolean;
  timeSlot: singletimeSlotType;
  order:orderType[],
};

declare type orderType = {
  service: {
    reminderDays: number;
    id: string;
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
  salonId:string,
  requests:TimeSlotRequestType[],
  date:string
}

declare type TimeSlotRequestType = {
  service:string,
  artist:string,
  variable?:ServiceVariableType
}