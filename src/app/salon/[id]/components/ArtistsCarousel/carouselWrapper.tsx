import { artistsSelector } from '@/recoil/salon.atom';
import React from 'react'
import { useRecoilValue } from 'recoil';
import SingleArtist from './singleArtist';

const AllArtistCarousel = () => {

  const allArtists = useRecoilValue(artistsSelector);
  return (
    <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
      {allArtists.map((artist)=>(
        <SingleArtist key={artist.id} artist={artist}/>
      ))}
    </div>
  )
}

export default AllArtistCarousel;


