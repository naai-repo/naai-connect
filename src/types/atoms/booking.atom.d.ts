declare type bookingAtomTypr = {
  progress: number;
  selectedServices: SingleSalonServiceDataType[];
  artistSelectionType: artistSelectionType;
  selectedArtistService: selectedArtistServiceType[];
  cartTotal: cartTotalType;
  availableSlots:string[][]
  openDialoge:boolean;
  selectedDate: Date
};
declare type cartTotalType = {
  original: number;
  discounted: number;
};



declare type artistSelectionType = "single" | "multiple" | undefined;

declare type selectedArtistServiceType = {
  artist: SingleSalonArtistDataType;
  service: SingleSalonServiceDataType;
};
