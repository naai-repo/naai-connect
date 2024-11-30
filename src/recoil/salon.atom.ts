import { faL } from "@fortawesome/free-solid-svg-icons";
import { atom, selector, selectorFamily } from "recoil";

const defaultState = {
  isOverLayLoading: false,
  salonId: "000000000000000000000000",
  filterFalter: {
    sortby: undefined,
    categories: "",
    gender: undefined,
    search:""
  },
  filters: {
    sortby: undefined,
    categories: "",
    gender: undefined,
    search:"",
  },
  isOpen: false,
};

export const salonAtom = atom({
  key: "salonAtom",
  default: defaultState as SalonAtomType,
});

export const salonIdSelector = selector<string>({
  key: "salonIdSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData.salonId ?? "000000000000000000000000";
  },
  set: ({ set }, val) => {
    set(salonAtom, (prev) => ({
      ...prev,
      salonId: val as string,
    }));
  },
});

// artist selector
export const artistsSelector = selector<SingleSalonArtistDataType[]>({
  key: "artistsSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData.singleSalonData?.artists ?? [];
  }
})

// artist by id
export const artistByIdSelector = selectorFamily<SingleSalonArtistDataType,string>({
  key:"artistByIdSelector",
  get:(id)=>({get})=>{
    const salonData = get(salonAtom);
    const artist = salonData.singleSalonData?.artists?.find((artist)=>artist.id===id);
    return artist ?? null;
  },
})

export const singleSalonDataSelector = selector<salonData | undefined>({
  key: "singleSalonDataSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.singleSalonData ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(salonAtom, (prev) => ({
      ...prev,
      singleSalonData: newValue as salonData,
    }));
  },
});

export const isSalonOpenSelector = selector<boolean>({
  key: "isSalonOpenSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData.isOpen ?? false;
  },
  set: ({ set }, val) => {
    set(salonAtom, (prev) => ({
      ...prev,
      isOpen: val as boolean,
    }));
  },
});

export const salonLoading = selector<boolean>({
  key: "salonLoading",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.isOverLayLoading ?? false;
  },
  set: ({ set }, val) => {
    set(salonAtom, (prev) => ({
      ...prev,
      isOverLayLoading: val as boolean,
    }));
  },
});

export const pureServiceSelector = selector<SingleSalonServiceDataType[]>({
  key: "pureServiceSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.singleSalonData?.services ?? [];
  },
})

// service selector
export const serviceSelector = selector<SingleSalonServiceDataType[]>({
  key: "serviceSelector",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.services ?? [];
  },
  set: ({ set }, newValue) => {
    set(salonAtom, (prev) => ({
      ...prev,
      services:newValue as SingleSalonServiceDataType[]
    }))
  }
});

export const categorySelector = selector({
  key: "categorySelectory",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.categories ?? [];
  },
  set: ({ set }, val) => {
    set(salonAtom, (prev) => ({
      ...prev,
      categories: val as string[],
    }));
  },
});

// filters
export const filtersFalterFieldSelector = selectorFamily<
  filterState[filterFalterKeysType] | undefined,
  filterFalterKeysType
>({
  key: "filtersFalterFieldSelector",
  get:
    (field) =>
    ({ get }) => {
      const salonData = get(salonAtom);
      return salonData.filterFalter[field] ?? undefined;
    },
  set:
    (field) =>
    ({ set }, val) => {
      set(salonAtom, (prev) => ({
        ...prev,
        filterFalter: { ...prev.filterFalter, [field]: val },
      }));
    },
});

export const filtersFieldSelector = selectorFamily<
  filterState[filterFalterKeysType] | undefined,
  filterFalterKeysType
>({
  key: "filtersFieldSelector",
  get:
    (field) =>
    ({ get }) => {
      const salonData = get(salonAtom);
      return salonData.filters[field] ?? undefined;
    },
  set:
    (field) =>
    ({ set }, val) => {
      set(salonAtom, (prev) => ({
        ...prev,
        filters: { ...prev.filters, [field]: val },
      }));
    },
});

export const filterSelector  = selector({
  key:"filterSelector",
  get:({get})=> {
    const salonData = get(salonAtom);
    return salonData?.filters ?? {};
  },
})

export const ApplyFilterSelector = selector({
  key: "ApplyFilterSelector",
  get: ({ get }) => {},
  set: ({ set }) => {
    set(salonAtom, (prev) => ({
      ...prev,
      filters:{...prev.filterFalter}
    }))
  }
})


export const resetFilterSelector = selector({
  key: "resetFilter",
  get: ({ get }) => {},
  set:
    ({ set }) => {
      set(salonAtom, (prev) => ({
        ...prev,
        filterFalter: {},
        filters: {},
      }));
    },
});

// service search
export const serviceSesrchSelector = selector({
  key:"serviceSesrchSelector",
  get:({get})=> {
    const salonData = get(salonAtom);
    return salonData?.filters.search ?? "";
  },
  set:({set},val)=>{
    set(salonAtom, (prev) => ({
      ...prev,
      filterFalter: { ...prev.filterFalter, search: val as string},
      filters: { ...prev.filters, search: val as string},
    }))
  }
})

// Artist Services getter
export const artistServicesSelector = selectorFamily<SingleSalonServiceDataType[],string>({
  key: "artistServicesSelector",
  get:(id)=>({get})=>{
    const salonData = get(salonAtom);
    const salonServices = salonData?.singleSalonData?.services ?? [];
    const foundArtist = salonData.singleSalonData?.artists.find(artist=>artist.id === id) as SingleSalonArtistDataType;
    const artistServices = salonServices.filter((service)=>{
      return foundArtist?.services?.find(artistService=> artistService.serviceId === service.id) ?? [];
    })
    return artistServices;
  },
})

// cart functionality
export const selectedServiceSelector = selector<SingleSalonServiceDataType>({
  key:"selectedServiceSelector",
  get:({get})=> {
    const salonData = get(salonAtom);
    return salonData?.selectedService ?? {};
  },
  set:({set},val)=>{
    set(salonAtom, (prev) => ({
      ...prev,
      selectedService: val as SingleSalonServiceDataType,
    }))
  }
})

export const serviceAddToCartSelector = selector<SingleSalonServiceDataType>({
  key: "serviceAddToCartSelector",
  get: ({ get }) => {
    return {} as SingleSalonServiceDataType; 
  },
  set: ({ set }, cartService) => {
    let cartServicedup =  {...cartService} as SingleSalonServiceDataType
    set(salonAtom, (prev) => {
      const services = prev.singleSalonData?.services?.map(service => {
        if (service.id === cartServicedup.id) {
          return cartServicedup;
        }
        return service;
      });
      const showServices = prev.services.map((service)=>{
        if (service.id === cartServicedup.id) {
          return cartServicedup;
        }
        return service;
      })
      return { ...prev,
        services:showServices,
        singleSalonData:{
        ...prev.singleSalonData,
        services:services
      }};
    });
  },
});


export const serviceRemoveFromCartSelector = selector<SingleSalonServiceDataType>({
  key:"serviceRemoveFromCartSelector",
  get:({get})=> {return {} as SingleSalonServiceDataType},
  set:({set},cartService) => {
    let cartServicedup =  {...cartService} as SingleSalonServiceDataType;
    set(salonAtom, (prev) => {
      let services = prev.singleSalonData.services.map(service=>{
        if(service.id === cartServicedup.id){
          return cartServicedup
        }
        return service;
      })
      const showServices = prev.services.map((service)=>{
        if (service.id === cartServicedup.id) {
          return cartServicedup
        }
        return service;
      })
      return { ...prev,
        services:showServices,
        singleSalonData:{
        ...prev.singleSalonData,
        services:services
      }};
    })
  }
});

export const resetCartServicesSelector = selector({
  key:"resetCartServicesSelector",
  get:({get})=> {},
  set:({set})=>{
    set(salonAtom, (prev) => ({
      ...prev,
      services:prev.services.map(service=>({...service,
        variables:service.variables?.map(variable=>({...variable,selected:false})) || [],
        incart:false})),
      singleSalonData: {
        ...prev.singleSalonData,
        services:prev.singleSalonData.services.map(service => ({...service, incart: false}))}
    }))
  }
});

export const getCartServicesSelector = selector<SingleSalonServiceDataType[]>({
  key:"getCartServicesSelector",
  get:({get})=> {
    const salonData = get(salonAtom);
    return salonData.singleSalonData?.services?.filter(service=>service.incart) ?? [];
  }
});