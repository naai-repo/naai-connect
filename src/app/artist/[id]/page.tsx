"use client"
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Profile from "../../../assets/Artist.svg";
import React, { useEffect, useRef, useState } from 'react'
import { singleSalonDataSelector } from '@/recoil/salon.atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import StarRating from '@/components/rating/Rating';
import { Separator } from '@radix-ui/react-select';
import { Phone, Share2 } from 'lucide-react';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import Services from '@/components/serviceComponents/Services';
import Cart from '@/components/demoCart/cart';
import Searchbar from '@/app/salon/[id]/components/Filter/FilterCategories';
import BookingWrapper from '@/components/Booking/BookingWrapper';
import MainWrapper from '@/components/mainWrapper/mainWrapper';
import { useArtistService } from '@/hooks/artist.hook';
import { ArtistByIdSelector } from '@/recoil/artist.atom';
import { Skeleton } from '@/components/ui/skeleton';
import { useSalonService } from '@/hooks/salon.hooks';

const Page = () => {
  const params = useParams();
  const id = params?.id as string | null;
  const artistId = localStorage.getItem("selectedArtist");
  const [selectedArtist,setSelctedArtist] = useRecoilState(ArtistByIdSelector);
  const salonData = useRecoilValue(singleSalonDataSelector);
  const bookingRef = useRef<BookingSheetType>(null);
  const artistService = useArtistService();
  const salonService = useSalonService();
  const [loading,setLoading] = useState(false);
  const [salonLoading,setSalonLoading] = useState(false);
  const salonId = localStorage.getItem("salonId");
  const setSalonData = useSetRecoilState(singleSalonDataSelector);
  
  const getArtist = async () => {
      setLoading(true);
    try {
      let res = await artistService.getArtistById(artistId as string);
      setSelctedArtist(res.data?.data as SingleSalonArtistDataType);
    } catch (error:any) {
      console.error("Artist not found")
    } finally{
      setLoading(false);
    }
  }

  const getSalon = async()=>{
    setSalonLoading(true);
    try {
      let res = await salonService.getSalonDataById(salonId as string);
      setSalonData(res.data?.data)
    } catch (error:any) {
      console.error("Salon not found")
    } finally{
      setSalonLoading(false)
    }
  }

  useEffect(()=>{
    if(salonId) getSalon();
    if(id) getArtist();
  },[id])

  return (
    <MainWrapper name="Salon" parentWrapper={{
      className: "flex flex-col sm:px-4 sm:py-4  h-full"
    }} mainWrapper={{
      className: "grid flex-1 items-start gap-4 p-2 pt-0 sm:px-6 sm:py-0 md:gap-4 h-full w-full"
    }}>
      <div className="w-full z-10">
      <BookingWrapper ref={bookingRef} />
        {loading?<Skeleton/>:
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="sticky top-12 bg-[#fbfbfb] w-full">
            <div className="flex items-center w-full gap-4">
              <div className="flex items-center justify-start w-fit flex-1">
                {selectedArtist?.imageUrl?.length > 0 ? <img src={selectedArtist?.imageUrl} alt={".png"} className='min-w-24 min-h-24 rounded-full shadow-xl p-[1px]' /> :
                  <img src={Profile} alt='.png' className='min-w-24 min-h-24 rounded-full shadow-2xl p-[1px]' />}
              </div>
              <div className="text-left flex justify-between w-full capitalize">
                <div className="w-full">
                  <h1 className="sm:text-lg font-bold">{selectedArtist?.name}</h1>
                  <p className="text-sm text-gray-600">Works at</p>
                  <h1 className="text-gray-600  sm:text-2xl">{salonData?.data?.name}</h1>
                </div>
                <div className="w-fit">
                  <StarRating rating={selectedArtist?.rating ?? 0} />
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
            <div className='sticky top-[14rem] md:top-[15rem] bg-[#fbfbfb] py-2'><Searchbar /></div>
            <div className="pt-2">{!salonLoading && <Services from='artist' />}</div>
            <div className="w-[94%] right-[3%] fixed bottom-5">
              <Cart />
            </div>
          </CardContent>
        </Card>
        }
      </div>
    </MainWrapper>
  )
}

export default Page