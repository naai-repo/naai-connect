import { atom, selector } from "recoil";
import { salonAtom } from "./salon.atom";

export const bookingAtom = atom({
  key:"bookingAtom",
  default: {
    progress:0
  } as bookingAtomTypr
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

// single artist booking select
export const selectedArtistsSelector = selector<SingleSalonArtistDataType>({
  key:"selectedArtistsSelector",
  get:({get})=>{
    const data = get(bookingAtom);
    return data.selectedArtist ?? {};
  },
  set:({set},val)=>{
    set(bookingAtom,(prev)=>({
      ...prev,
      selectedArtists:val as SingleSalonArtistDataType
    }))
  }
});

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