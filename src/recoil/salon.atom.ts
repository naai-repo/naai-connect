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

export const serviceAddToCartSelector = selector<string>({
  key: "serviceAddToCartSelector",
  get: ({ get }) => {
    return ""; 
  },
  set: ({ set }, id) => {
    set(salonAtom, (prev) => {
      const services = prev.singleSalonData?.services?.map(service => {
        if (service.id === id) {
          return { ...service, incart: true };
        }
        return service;
      });
      const showServices = prev.services.map((service)=>{
        if (service.id === id) {
          return { ...service, incart: true };
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


export const serviceRemoveFromCartSelector = selector<string>({
  key:"serviceRemoveFromCartSelector",
  get:({get})=> {return ""},
  set:({set},id)=>{
    set(salonAtom, (prev) => {
      let services = prev.singleSalonData.services.map(service=>{
        if(service.id === id){
          return { ...service, incart: false };
        }
        return service;
      })
      const showServices = prev.services.map((service)=>{
        if (service.id === id) {
          return { ...service, incart: false };
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
      services:prev.services.map(service=>({...service,incart:false})),
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