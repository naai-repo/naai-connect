import { atom, selector } from "recoil";

export const ArtistAtom = atom<ArtistAtomType>({
  key: 'ArtistAtom',
  default: {
    id: '',
    artistDialg:false,
    selectedArtist: {} as SingleSalonArtistDataType
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


export const ArtistByIdSelector = selector<SingleSalonArtistDataType>({
  key: 'ArtistByIdSelector',
  get: ({ get }) => {return get(ArtistAtom).selectedArtist ?? {} as SingleSalonArtistDataType},
  set: ({ set }, newValue) => {
    set(ArtistAtom, (prev) => ({
      ...prev,
      selectedArtist: newValue as SingleSalonArtistDataType
    }))
  }
})