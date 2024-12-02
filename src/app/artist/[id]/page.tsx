"use client"
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Profile from "../../../assets/Artist.svg";
import React from 'react'
import { artistByIdSelector, singleSalonDataSelector } from '@/recoil/salon.atom';
import { useRecoilValue } from 'recoil';
import StarRating from '@/components/rating/Rating';
import { Separator } from '@radix-ui/react-select';
import { Phone, Share2 } from 'lucide-react';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import Services from '@/components/serviceComponents/Services';
import Cart from '@/components/demoCart/cart';
import Searchbar from '@/app/salon/[id]/components/Filter/FilterCategories';

const Page = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const artistId = localStorage.getItem("selectedArtist");
  const selectedArtist = useRecoilValue(artistByIdSelector(artistId as string));
  const salonData = useRecoilValue(singleSalonDataSelector);

  return (
    <Card className="w-full border-0 shadow-none"> 
      <CardHeader className="fixed top-12 bg-white w-full">
        <div className="flex items-center w-full gap-4">
          <div className="flex items-center justify-start w-fit flex-1">
            {selectedArtist?.imageUrl?.length > 0 ? <img src={selectedArtist?.imageUrl} alt={".png"} className='min-w-24 min-h-24 rounded-full shadow-xl p-[1px]' /> :
              <img src={Profile} alt='.png' className='min-w-24 min-h-24 rounded-full shadow-2xl p-[1px]' />}
          </div>
          <div className="text-left flex justify-between w-full">
            <div className="w-full">
              <h1 className="text-lg sm:text-2xl font-bold">{selectedArtist?.name}</h1>
              <p className="text-gray-600">Works at</p>
              <h1 className="text-gray-600 text-lg sm:text-2xl">{salonData?.data?.name}</h1>
            </div>
            <div className="w-fit">
              <StarRating rating={selectedArtist?.rating} />
            </div>
          </div>
        </div>
        <Separator />
        {/* Icon Section */}
        <section className="w-full px-0 bg-white-100">
          <div className="flex justify-evenly space-x-2 sm:space-x-8 py-2">
            <Phone onClick={() => window.open(`tel:${salonData?.data.phoneNumber}`, "_self")} className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            <Share2
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: selectedArtist?.name || "Artist Profile",
                      text: `Check out this profile at ${salonData?.data?.name}`,
                      url: window.location.href,
                    })
                    .then(() => console.log("Successfully shared"))
                    .catch((error) => console.error("Error sharing:", error));
                } else {
                  // Fallback: Copy to clipboard
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => alert("URL copied to clipboard"))
                    .catch(() => alert("Failed to copy URL"));
                }
              }}
              className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 cursor-pointer"
            />
            <InstagramLogoIcon onClick={() => {
              window.open(`https://www.instagram.com`, "_blank")
            }} className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </div>
        </section>
      </CardHeader>
      <CardContent className="bg-[#fbfbfb] w-full">
        <div className='sticky top-[14.5rem] md:top-[14rem] bg-[#fbfbfb] py-2'><Searchbar /></div>
        <div className="pt-2"><Services from='artist' /></div>
        <div className="w-[94%] right-[3%] fixed bottom-5">
          <Cart />
        </div>
      </CardContent>
    </Card>
  )
}

export default Page