import { SingleSalonResponseType } from "@/services/salon/types";
import { atom, selector } from "recoil";
import { SalonAtomType } from "./types";


export const salonAtom = atom({
  key:"salonAtom",
  default:{
    
  } as SalonAtomType
})


export const singleSalonDataSelector = selector<SingleSalonResponseType | undefined>({
  key: 'singleSalonDataSelector',
  get: ({ get }) => {
    const salonData = get(salonAtom);
    return salonData?.singleSalonData ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(salonAtom, (prev) => ({
      ...prev,
      singleSalonData: newValue as SingleSalonResponseType,
    }));
  },
});