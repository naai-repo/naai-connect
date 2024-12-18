import MenIcon from "@/assets/images/men_icon.png";
import WomenIcon from "@/assets/images/women_icon.png";
import UnisexIcon from "@/assets/images/unisex.png";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, currencyConverter, Dummy } from '@/lib/utils';
import { selctedArtistTypeSelector, selectedArtistServiceSelector } from '@/recoil/booking.atom';
import { artistsSelector, getCartServicesSelector } from '@/recoil/salon.atom';
import { Star, User, Users } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const ArtistSelect = () => {
  const selectedServices = useRecoilValue(getCartServicesSelector);
  const [selectionType, setSelectionType] = useRecoilState(selctedArtistTypeSelector);
  const setSelectedArtistServices = useSetRecoilState(selectedArtistServiceSelector);

  return (
    <div className='w-full p-2 capitalize pb-20'>
      {selectedServices.length > 1 ?
        <div>
          <RadioGroup className='flex flex-col gap-2' defaultValue={selectionType} onValueChange={(e) => {
            setSelectionType(e as artistSelectionType);
            setSelectedArtistServices([])
          }}>
            <span className='flex gap-2 items-center text-gray-500 text-sm'> <User size={18} className='text-gray-600' /> single staff for all services</span>
            <div className='border p-4 rounded-lg shadow-sm max-h-[18rem] overflow-y-auto scrollbar-hide'>
              <div className={cn("flex items-center justify-between sticky -top-4 bg-white", selectionType == "single" && "py-2")}>
                <Label className='font-semibold uppercase' htmlFor="single">choose a staff</Label>
                <RadioGroupItem value="single" id="single" />
              </div>
              {selectionType == "single" && <SingleStaff />}
            </div>
            <div className='flex w-full items-center gap-2 uppercase py-4'><span className='h-[0.5px] w-full bg-slate-600'></span>or <span className='h-[0.5px] w-full bg-slate-600'></span></div>
            <span className='flex gap-2 items-center text-gray-400 text-sm'> <Users fill='#fbfbfb' size={18} className='text-gray-600' /> Multiple staff for all services</span>
            <div className='border py-4 rounded-lg shadow-sm max-h-fit overflow-y-auto scrollbar-hide'>
              <div className={cn("flex items-center justify-between sticky -top-4 bg-white px-4", selectionType == "multiple" && "py-2")}>
                <Label className='font-semibold uppercase' htmlFor="multiple">choose multiple staff</Label>
                <RadioGroupItem value="multiple" id="multiple" />
              </div>
              {selectionType == "multiple" && <MultiServicemultiArtist />}
            </div>
          </RadioGroup>
        </div>
        : <MultiServicemultiArtist />
      }
    </div>
  )
}

const SingleStaff = () => {
  const selectedServices = useRecoilValue(getCartServicesSelector);
  const [selectedServiceArtist, setSelectedServiceArtist] = useRecoilState(selectedArtistServiceSelector);
  const allArtists = useRecoilValue(artistsSelector);

  const filteredArtists = useMemo(() => allArtists.filter(artist =>
    artist.services.some(service => (service.serviceId === selectedServices[0].id))
  ), [selectedServices]);

  const handleServicesArtist = (artist: SingleSalonArtistDataType) => {

    const servicesArtist: selectedArtistServiceType[] = selectedServices.map((service) => {
      const selectedArtist = allArtists.find(art => art.id == artist.id);
      const artistService = selectedArtist?.services.find(s => s.serviceId == service.id);
      const artistToAssign = artistService ? artist.id : Dummy.artist;
      return {
        service,
        artist: artistToAssign
      }
    })

    setSelectedServiceArtist(servicesArtist);
  }

  return (
    <RadioGroup className="max-h-44 md:max-h-32" defaultValue={selectedServiceArtist[0]?.artist || ""}>
      {filteredArtists.map((artist, ind) => (
        <div key={artist.id} className={cn('flex justify-between', ind != filteredArtists.length - 1 && 'border-b pb-2 pt-1')}>
          <div className="flex items-center space-x-4" onClick={() => handleServicesArtist(artist)}>
            <RadioGroupItem value={artist.id} id={artist.id} />
            <Label className='text-gray-500' htmlFor={artist.id}>{artist.name}</Label>
          </div>
          <div className="flex items-center gap-2">{artist.rating.toFixed(1)}<Star size={18} fill='#ffd000' color='#ffc300' /></div>
        </div>
      ))}
    </RadioGroup>
  )
}

const MultiServicemultiArtist = () => {
  const [selectedServiceArtist, setSelectedServiceArtist] = useRecoilState(selectedArtistServiceSelector);
  const allArtists = useRecoilValue(artistsSelector);
  const selectedServices = useRecoilValue(getCartServicesSelector);
  const setSelectionType = useSetRecoilState(selctedArtistTypeSelector);

  const filteredArtists = (serviceId: string) => {
    return allArtists.filter(artist => {
      const artistServices = artist.services.map(service => (service.serviceId));
      return artistServices.includes(serviceId);
    }) ?? [];
  }

  const getArtistPrice = (artist: SingleSalonArtistDataType, serviceToAssing: SingleSalonServiceDataType) => {
    const service = artist.services.find((service) => service.serviceId == serviceToAssing.id);
    const discount = serviceToAssing.basePrice - (service?.price || 0);
    return discount;
  }

  const handleArtistSelect = (artistId: string, serviceToAssign: SingleSalonServiceDataType) => {
    if (selectedServices.length == 1) {
      setSelectionType("multiple")
    }
    const artist = allArtists.find((art => art.id === artistId));
    setSelectedServiceArtist((prevSelected) => {
      const existingIndex = prevSelected.findIndex((item) => item.service.id === serviceToAssign.id);

      if (existingIndex > -1) {
        const updatedSelected = [...prevSelected];

        updatedSelected[existingIndex] = {
          artist: artist?.id as string,
          service: serviceToAssign
        };
        return updatedSelected;
      }

      return [
        ...prevSelected,
        {
          artist: artist?.id as string,
          service: serviceToAssign
        }
      ];
    });
  };

  const getSelectedArtist = (service: SingleSalonServiceDataType): string => {
    const data = selectedServiceArtist.find((artistService) => artistService.service.id === service.id);
    if (data) return data.artist;
    return "";
  }

  return (
    <div className='flex flex-col gap-4 max-h-56 md:max-h-44'>
      {selectedServices.map((service, ind) => (
        <div key={service.id} className={cn('flex flex-col gap-2 py-2 px-5', ind != selectedServices.length - 1 && 'border-b')}>
          <div className="flex justify-between">
            <div className='flex items-center capitalize gap-2'>
              <Image className='h-8 w-8 rounded-full' src={service.targetGender === "male" ? MenIcon : service.targetGender === "female"? WomenIcon:UnisexIcon} alt={"Gender.png"} />
              {service.serviceTitle}
            </div>
            {service.variables.length > 0 ? currencyConverter(service.variables.find(variable => variable.selected)?.variableCutPrice ?? 0) : service.cutPrice}
          </div>
          <Select defaultValue={getSelectedArtist(service)} onValueChange={(e) => (handleArtistSelect(e, service))}>
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="Choose Artist" />
            </SelectTrigger>
            <SelectContent className='flex flex-col gap-2'>
              {filteredArtists(service.id).map((artist) => {
                const price = getArtistPrice(artist, service);
                return <SelectItem className='flex w-full justify-between' key={artist.id} value={artist.id} >
                  <div className={cn('flex gap-2 capitalize', price > 0 && "text-gray-500")}>
                    <span className='text-black'>{artist.name}</span>
                    {price > 0 ? " ( - " : price > 0 ? "( + " : ""} {price > 0 ? `${currencyConverter(price)} )` : price > 0 ? `${currencyConverter(price)} )` : ""}
                  </div>
                  <div className="flex items-center gap-2 text-xs">{artist.rating.toFixed(1)}<Star size={12} fill='#ffd000' color='#ffc300' /></div>
                </SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}

export default ArtistSelect