declare type bookingAtomTypr = {
  progress: number;
  selectedServices: SingleSalonServiceDataType[];
  artistSelectionType: artistSelectionType;
  selectedArtistService: selectedArtistServiceType[];
  sceduleAppointment?:TimeSlotResType
  cartTotal: cartTotalType;
  availableSlots:string[][]
  openDialoge:boolean;
  selectedDate: Date;
  selectedTime?:string[];
  artistNotAvailable:boolean;
  makeAppointment?:MakeAppointmentResType;
  appointmentArtists?:SingleSalonArtistDataType[];
  isOverLayLoading:boolean;
  bookingContineLoading:boolean;
  resetCartPrice:boolean
};
declare type cartTotalType = {
  original: number;
  discounted: number;
};



declare type artistSelectionType = "single" | "multiple" | undefined;

declare type selectedArtistServiceType = {
  artist: string;
  service: SingleSalonServiceDataType;
};
