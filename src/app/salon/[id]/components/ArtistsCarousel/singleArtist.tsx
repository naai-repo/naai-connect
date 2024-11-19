import StarRating from '@/components/rating/Rating'
import Artist from "../../../../../assets/Artist.svg"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const SingleArtist = ({artist}:{artist:SingleSalonArtistDataType}) => {
  const router = useRouter();

  return (
    <div onClick={()=>router.push(`/artist/${artist.id}`)} className='border min-w-fit capitalize shadow-md rounded-md flex gap-2 p-2'>
      {artist.imageUrl?.length>0?<img src={artist.imageUrl} alt={".png"} className='w-14 h-14 rounded-full'/>:
      <Image src={Artist} alt='.png' className='w-14 h-14'/>}
      <div className='flex flex-col caption-top'>
        <span>{artist.name}</span>
        <span className='w-fit'>{<StarRating rating={artist.rating}/>}</span>
      </div>
    </div>
  )
}

export default SingleArtist;