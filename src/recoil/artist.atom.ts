import { atom, selector } from "recoil";

export const ArtistAtom = atom<ArtistAtomType>({
  key: 'ArtistAtom',
  default: {
    id: '',
    artistDialg:false
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

// artistDialg selector
export const ArtistDialgSelector = selector<boolean>({
  key: 'ArtistDialgSelector',
  get: ({ get }) => get(ArtistAtom).artistDialg ?? false,
  set: ({ set }, newValue) => {
    set(ArtistAtom, (prev) => ({
      ...prev,
      artistDialg: newValue as boolean
    }))
  }
})
