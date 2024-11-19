import { atom, selector } from "recoil";



export const ArtistAtom = atom<ArtistAtomType>({
  key: 'ArtistAtom',
  default: {
    id: '',
  }
})

// id selctor
export const ArtistIdSelector = selector<string>({
  key: 'ArtistIdSelector',
  get: ({ get }) => get(ArtistAtom).id ?? "",
  set: ({ set }, newValue) => {
    set(ArtistAtom, (prev) => ({
      ...prev, id: newValue as string
    }))
  }
});


