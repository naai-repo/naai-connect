"use client";
import { Button } from "@/components/ui/button";
import Cart from "@/components/demoCart/cart";
import StarRating from "@/components/rating/Rating";
import Services from "@/components/serviceComponents/Services";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader
} from "@/components/ui/sheet";
import { ArtistDialgSelector, ArtistIdSelector } from "@/recoil/artist.atom";
import { artistByIdSelector, artistServicesSelector, pureServiceSelector, serviceSelector, singleSalonDataSelector } from "@/recoil/salon.atom";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Phone, Share2, X } from "lucide-react";
import Image from "next/image";
import { forwardRef, useImperativeHandle } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Profile from "../../../../../assets/Artist.svg";
import Searchbar from "@/components/serviceComponents/Filter/FilterCategories";

export const ArtistProfile = forwardRef<ArtistDialgReftype>(({ }, ref) => {
  const [open, setOpen] = useRecoilState(ArtistDialgSelector);
  const id = useRecoilValue(ArtistIdSelector);
  const selectedArtist = useRecoilValue(artistByIdSelector(id));
  const salonData = useRecoilValue(singleSalonDataSelector);
  const artistServices = useRecoilValue(artistServicesSelector(id));
  const allServices = useRecoilValue(pureServiceSelector)
  const setServices = useSetRecoilState(serviceSelector);

  const openSheet = () => {
    setOpen(true);
    setServices(artistServices);
  }
  const closeSheet = () => {
    setOpen(false);
    setServices(allServices);
  }

  useImperativeHandle(ref, () => {
    return { openSheet, closeSheet };
  });

  return (
    <Sheet key={"bottom"} open={open} onOpenChange={(e) => {
      if (open != e) setOpen(e);
    }}>
      <SheetContent side={"bottom"} className="p-0 rounded-t-2xl shadow-inner h-full overflow-auto scrollbar-hide ">
        <SheetHeader className='flex flex-col fixed top-0 right-0 bg-white w-full'>
          <div className='flex justify-end p-2 gap-2'>
            <Button size={"icon"} variant={"outline"} onClick={() => { setOpen(false) }}><X /></Button>
          </div>
        </SheetHeader>
        <SheetDescription className="p-0 capitalize">
          <Card className="w-full border-0 shadow-none"> {/* Centered Card with max-width for larger screens */}
            <CardHeader className="fixed top-12 bg-white w-full">
              <div className="flex items-center w-full gap-4">
                <div className="flex items-center justify-start w-fit flex-1">
                  {selectedArtist?.imageUrl?.length > 0 ? <img src={selectedArtist?.imageUrl} alt={".png"} className='min-w-24 min-h-24 rounded-full shadow-xl p-[1px]' /> :
                    <Image src={Profile} alt='.png' className='min-w-24 min-h-24 rounded-full shadow-2xl p-[1px]' />}
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
                <Cart/>
              </div>
            </CardContent>
          </Card>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
})