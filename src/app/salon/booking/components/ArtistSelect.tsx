import { selctedArtistTypeSelector, selectedArtistServiceSelector, selectedArtistsSelector } from '@/recoil/booking.atom';
import { artistsSelector, getCartServicesSelector } from '@/recoil/salon.atom'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import MenIcon from "@/assets/images/men_icon.png";
import WomenIcon from "@/assets/images/women_icon.png";
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const ArtistSelect = () => {
  const selectedServices = useRecoilValue(getCartServicesSelector);
  const [selectionType, setSelectionType] = useRecoilState(selctedArtistTypeSelector)

  return (
    <div className='w-full pt-5 capitalize'>
      {selectedServices.length > 1 ?
        <div>
          <RadioGroup className='flex flex-col gap-2' defaultValue={selectionType} onValueChange={(e) => setSelectionType(e as artistSelectionType)}>
            <span className='flex gap-2 items-center text-gray-500 text-sm'> <User size={18} className='text-gray-600' /> single staff for all services</span>
            <div className='border p-4 rounded-lg shadow-sm max-h-[18rem] overflow-y-auto scrollbar-hide'>
              <div className={cn("flex items-center justify-between sticky -top-4 bg-[#fbfbfb]", selectionType == "single" && "py-2")}>
                <Label className='font-semibold uppercase' htmlFor="single">choose a staff</Label>
                <RadioGroupItem value="single" id="single" />
              </div>
              {selectionType == "single" && <SingleStaff />}
            </div>
            <div className='flex w-full items-center gap-2 uppercase py-4'><span className='h-[0.5px] w-full bg-slate-600'></span>or <span className='h-[0.5px] w-full bg-slate-600'></span></div>
            <span className='flex gap-2 items-center text-gray-400 text-sm'> <Users fill='#fbfbfb' size={18} className='text-gray-600' /> Multiple staff for all services</span>
            <div className='border py-4 rounded-lg shadow-sm max-h-fit overflow-y-auto scrollbar-hide'>
              <div className={cn("flex items-center justify-between sticky -top-4 bg-[#fbfbfb] px-4", selectionType == "multiple" && "py-2")}>
                <Label className='font-semibold uppercase' htmlFor="multiple">choose multiple staff</Label>
                <RadioGroupItem value="multiple" id="multiple" />
              </div>
              {selectionType == "multiple" && <SingleServiceArtistMultiSelect />}
            </div>
          </RadioGroup>
        </div>
        : <SingleServiceArtistMultiSelect />
      }
    </div>
  )
}

const SingleStaff = () => {
  const [selectedArtist, setSelectedArtist] = useRecoilState(selectedArtistsSelector);
  const allArtists = useRecoilValue(artistsSelector);

  return (
    <RadioGroup value={selectedArtist.id}>
      {allArtists.map((artist, ind) => (
        <div key={artist.id} className={cn('flex justify-between', ind != allArtists.length - 1 && 'border-b pb-2 pt-1')}>
          <div className="flex items-center space-x-4" onClick={() => setSelectedArtist(artist)}>
            <RadioGroupItem value={artist.id} id={artist.id} />
            <Label className='text-gray-500' htmlFor={artist.id}>{artist.name}</Label>
          </div>
          <div className="flex items-center gap-2">{artist.rating.toFixed(1)}<Star size={18} fill='#ffd000' color='#ffc300' /></div>
        </div>
      ))}
    </RadioGroup>
  )
}

const SingleServiceArtistMultiSelect = () => {
  const [selectedServiceArtist, setSelectedServiceArtist] = useRecoilState(selectedArtistServiceSelector);
  const allArtists = useRecoilValue(artistsSelector);
  const selectedServices = useRecoilValue(getCartServicesSelector);
  return (
    <div className='flex flex-col gap-4'>
      {selectedServices.map((service, ind) => (
        <div key={service.id} className={cn('flex flex-col gap-2 py-2 px-5', ind != selectedServices.length - 1 && ' border-b')}>
          <div className='flex items-center capitalize gap-2'>
            <Image className='h-8' src={service.targetGender === "male" ? MenIcon : WomenIcon} alt={"Gender.png"} />
            {service.serviceTitle}
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Artist" />
            </SelectTrigger>
            <SelectContent className='flex flex-col gap-2'>
            {allArtists.map((artist, ind) => (
              <SelectItem key={artist.id} value={artist.id} onClick={() => {
                // setSelectedServiceArtist(curr=>{
                //   if(curr.includes({artist,service})){
                    
                //   }
                // })
              }} >{artist.name}</SelectItem>
            ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}

export default ArtistSelect