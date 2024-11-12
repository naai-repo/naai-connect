import { atom, selector } from "recoil";
import { salonAtom } from "./salon.atom";

export const bookingAtom = atom({
  key:"bookingAtom",
  default: {
  } as bookingAtomTypr
})

