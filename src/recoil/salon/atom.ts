import { salonData, SingleSalonResponseType } from "@/services/salon/types";
import { atom, selector } from "recoil";
import { SalonAtomType } from "./types";


export const salonAtom = atom({
  key:"salonAtom",
  default:{
    isOverLayLoading:false
  } as SalonAtomType
})


export const singleSalonDataSelector = selector<salonData | undefined>({
  key: 'singleSalonDataSelector',
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

export const salonLoading = selector<boolean>({
  key:"salonLoading",
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.isOverLayLoading ?? false;
  },
  set:({set},val)=>{
    set(salonAtom,(prev)=>({
      ...prev,
      isOverLayLoading:val as boolean
    }))
  }
})