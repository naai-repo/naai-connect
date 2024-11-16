import { atom, selector } from "recoil";

export const bookingAtom = atom({
  key:"bookingAtom",
  default: {
    progress:0,
    cartTotal:{
      original:0,
      discounted:0
    },
    availableSlots:[[""]],
    selectedDate:new Date(),
    selectedArtistService:[] as selectedArtistServiceType[]
  } as bookingAtomTypr
})

// diaolge selector
export const bookingDialogSelector = selector<boolean>({
  key:"bookingDialogSelector",
  get:({get})=>{
    const data = get(bookingAtom)
    return data.openDialoge ?? false;
  },
  set:({set},newVal)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      openDialoge:newVal as boolean
    }))
  }
})

// date selector
export const bookingDateSelector = selector<Date>({
  key:"bookingDateSelector",
  get:({get})=>{
    const data = get(bookingAtom)
    return data.selectedDate ?? new Date();
  },
  set:({set},newVal)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      selectedDate:newVal as Date
    }))
  }
})

// slots selector
export const bookingSlotsSelector = selector<string[][]>({
  key:"bookingSlotsSelector",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.availableSlots ?? [[]];
  },
  set:({set},newVal)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      availableSlots: newVal as string[][]
    }))
  }
})

// multiple artist booking select
export const selectedArtistServiceSelector = selector<selectedArtistServiceType[]>({
  key:"selectedArtistServiceSelector",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.selectedArtistService ?? [];
  },
  set:({set},val)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      selectedArtistService:val as selectedArtistServiceType[]
    }))
  }
})

export const progressSelector = selector<number>({
  key:"progressSelector",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.progress ?? 0;
  },
  set:({set},val)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      progress:val as number
    }))
  }
});

// cart total
export const cartTotalSelector = selector<cartTotalType>({
  key:"cartTotalSelector",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.cartTotal ?? {original:0,discounted:0};
  },
  set:({set},val)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      cartTotal:val as cartTotalType
    }))
  }
})


export const selctedArtistTypeSelector = selector<artistSelectionType>({
  key:"selctedArtistType",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.artistSelectionType ?? undefined;
  },
  set:({set},val)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      artistSelectionType:val as artistSelectionType
    }))
  }
})