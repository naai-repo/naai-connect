declare type SalonAtomType = {
  salonId:string;
  filterFalter:filterState;
  filters:filterState
  singleSalonData : salonData;
  services:SingleSalonServiceDataType[];
  selectedService:SingleSalonServiceDataType;
  categories:string[];
  stepOneCart:StepOneCartType
  isOverLayLoading:boolean;
  isOpen:boolean
}

declare type StepOneCartType = {
  basePrice:number,
  cutPrice:number
}

declare type filterState = {
  sortby?: "desc"|"asc",
  categories?:string,
  gender?:"male"|"female"|"unisex",
  search?:string
}

declare type filterFalterKeysType = keyof filterState;

