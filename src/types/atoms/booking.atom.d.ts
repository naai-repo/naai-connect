


declare type bookingAtomTypr = {
  progress:number
  selectedServices: SingleSalonServiceDataType[]
  selectedArtist:SingleSlonArtistDataType
  artistSelectionType:artistSelectionType;
  selectedArtistService: selectedArtistServiceType[]
}

declare type artistSelectionType = "single"|"multiple" | undefined;

declare type selectedArtistServiceType = {
  artist:SingleSlonArtistDataType
  service:SingleSalonServiceDataType
}