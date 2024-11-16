declare type SingleSalonResponseType = {
  status: string;
  message: string;
  data: salonData;
};

declare type salonData = {
  data: SingleSalonDataType;
  artists: SingleSlonArtistDataType[];
  services: SingleSalonServiceDataType[];
};

declare type SingleSalonDataType = {
  location: Location;
  timing: Timing;
  discountTime: DiscountTime;
  links: Links;
  referrer: Referrer;
  subscription: Subscription;
  id: string;
  address: string;
  name: string;
  salonType: string;
  rating: number;
  closedOn: string;
  memberships: Membership[];
  phoneNumber: number;
  activeSubscriptions: any[];
  owner: string;
  gst: string;
  pan: string;
  live: boolean;
  paid: boolean;
  bookings: number;
  discount: number;
  images: {
    key: string;
    url: string;
    id: string;
  }[];
  logo: {
    key: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  WalkinUsers: string[];
  taxIncluded: true;
};

declare type SingleSalonArtistDataType = {
  location: Location;
  timing: {
    start: string;
    end: string;
  };
  links: Links;
  id: string;
  name: string;
  rating: number;
  salonId: string;
  services: ArtistServiceDataType[];
  targetGender: string;
  phoneNumber: number;
  offDay: string[];
  availability: boolean;
  live: boolean;
  paid: boolean;
  bookings: number;
  imageKey: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare type SingleSalonServiceDataType = {
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
  productsUsed: any[];
  active: boolean;
  reminderDays: number;
  assignedArtists: string[];
  incart?:boolean;
  createdAt: string;
  updatedAt: string;
};

declare type ServiceVariableType = {
  variableType: string;
  variableName: string;
  variablePrice: number;
  variableCutPrice: number;
  variableTime: number;
  id: string;
  selected?:boolean;
}

declare type ArtistServiceDataType = {
  serviceId: string;
  variables: ArtistServiceVariableDataType[];
  price: number;
  id: string;
  cutPrice: number;
};

declare type ArtistServiceVariableDataType = {
  variableId: string;
  price: number;
  id: string;
  cutPrice: number;
};

type DiscountTime = {
  start: string;
  end: string;
};

type Links = {
  instagram: string;
};

type Location = {
  type: string;
  coordinates: number[];
};

type Referrer = {
  referrerId: string;
  referralCode: string;
};

type Subscription = {
  planId: string;
  planName: string;
  renewed: boolean;
  features: any[];
  startDate: Date;
  endDate: Date;
};
type Membership = {
  _id: string;
  name: string;
  endDate: Date;
  startDate: Date;
  isActive: boolean;
};

type Timing = {
  opening: string;
  closing: string;
};

declare type CategoriesResType = {
  status: string;
  message: string;
  data: string[];
};
