"use client";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtistIdSelector } from "@/recoil/artist.atom";
import { artistByIdSelector } from "@/recoil/salon.atom";
import { Bookmark, Camera, ChevronRight, Phone, Share, Star } from "lucide-react";
import { useRecoilValue } from "recoil";
import Profile from "../../../../assets/Artist.svg";
import Image from "next/image";

export const ArtistProfile = () => {

  const id = useRecoilValue(ArtistIdSelector)
  const selectedArtist = useRecoilValue(artistByIdSelector(id));

  return (
    <div className={cn("w-full")}> {/* Responsive padding */}
      <Card className="w-full mx-auto border-0 shadow-none"> {/* Centered Card with max-width for larger screens */}
        <CardHeader className="">
          <div className="flex items-center space-x-6 p-6  w-full">
            <div className="flex items-center justify-center">
              {selectedArtist?.imageUrl?.length>0?<img src={selectedArtist?.imageUrl} alt={".png"} className='w-14 h-14 rounded-full'/>:
              <Image src={Profile} alt='.png' className='w-24 h-24'/>}
            </div>
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold">Lalit</h1>
              <p className="text-gray-600">Works at</p>
              <h1 className="text-gray-600 text-lg sm:text-2xl">Tangles Salon</h1>
            </div>
          </div>
        </CardHeader>

        <div className="p-4 sm:p-6">
          {/* Rating Section */}
          <div>
            <h1 className="text-lg font-semibold">Rating</h1>
          </div>
          <div className="flex items-center mt-2 space-x-1 sm:space-x-2">
            {[...Array(4)].map((_, index) => (
              <Star key={index} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            ))}
            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />
            <Button variant="outline" className="ml-4  sm:flex">
              View Salon
              <ChevronRight className="text-red-500 h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>

        <CardContent>
          {/* Icon Section */}
          <section className="w-full py-4 px-0 bg-white-100">
            <div className="flex justify-evenly space-x-2 sm:space-x-8 py-2">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              <Share className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              <Bookmark className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}