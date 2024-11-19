"use client"
import { artistByIdSelector } from '@/recoil/salon.atom';
import { useParams } from 'next/navigation';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { ArtistProfile } from './components/artistProfile';

const page = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const artistData = useRecoilValue(artistByIdSelector(id as string));
  
  return (
    <div>
      <ArtistProfile/>
    </div>
  )
}

export default page