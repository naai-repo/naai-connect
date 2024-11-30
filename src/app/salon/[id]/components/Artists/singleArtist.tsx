import StarRating from '@/components/rating/Rating'
import Artist from "../../../../../assets/Artist.svg"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ArtistDialgSelector, ArtistIdSelector } from '@/recoil/artist.atom'
import { singleSalonDataSelector } from '@/recoil/salon.atom'

const SingleArtist = ({artist}:{artist:SingleSalonArtistDataType}) => {

  const setOpen =  useSetRecoilState(ArtistDialgSelector);
  const setArtistId = useSetRecoilState(ArtistIdSelector);
  const salonData = useRecoilValue(singleSalonDataSelector);

  return (
    <div onClick={()=>{
      setArtistId(artist.id)
      setOpen(true)
    }} className='border min-w-fit capitalize shadow-md rounded-md flex justify-between gap-2 p-2'>
      <div className='flex gap-2 items-start'>
      {artist.imageUrl?.length>0?<img src={artist.imageUrl} alt={".png"} className='w-14 h-14 rounded-full'/>:
      <Image src={Artist} alt='.png' className='w-14 h-14'/>}
      <div className='flex flex-col caption-top'>
        <span>{artist.name}</span>
        <span className='text-gray-400 text-xs'>{salonData?.data?.name}</span>
      </div>
      </div>
      
      <StarRating rating={artist.rating}/>
    </div>
  )
}

export default SingleArtist;