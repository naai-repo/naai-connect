declare type SalonAtomType = {
  salonId:string;
  filterFalter:filterState;
  filters:filterState
  singleSalonData : salonData;
  services:SingleSalonServiceDataType[];
  selectedService:SingleSalonServiceDataType;
  categories:string[];
  isOverLayLoading:boolean;
  isOpen:boolean
}

declare type filterState = {
  sortby?: "desc"|"asc",
  categories?:string,
  gender?:"male"|"female",
  search?:string
}

declare type filterFalterKeysType = keyof filterState;

