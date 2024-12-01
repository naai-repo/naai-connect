'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const brands = [
  {
    name: "Monsoon Salon & Spa",
    logo: "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/5012c74f-e479-4044-a561-df47a7fdd3c7.png",
  },
  {
    name: "Toni&Guy",
    logo: "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/ea34a262-5492-411e-a756-177ae3e6fd55.png",
  },
  {
    name: "Jawed Habib",
    logo: "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/2c0c0ef4-05d4-49f0-a9b6-808ec0bba942.png",
  },
  {
    name: "Looks Salon",
    logo: "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/208e3302-0154-41fb-a814-f5211662626b.png",
  },
  {
    name: "Lakmé Salon",
    logo:"https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/30f6b568-0384-4a72-a2f0-6fb3ccac7256.png"
  },
  {
    name: "Naturals",
    logo:"https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/1d463cd5-7a12-4584-8896-e2cb78189a95.png"
  }
]

export function BrandsSection() {
  const [api, setApi] = useState<any>()

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#A0163A] mb-4">
            Brands love us
          </h2>
          <p className="text-xl text-gray-600">
            We waited until we could do it right.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {brands.map((brand, index) => (
              <CarouselItem key={index} className="flex items-center md:basis-1/3 lg:basis-1/4">
                <div className="p-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="mx-auto"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Updated With Our Service and Products - IT&apos;S FREE
          </h2>
          <p className="text-gray-600 mb-8">
            Get early access to all the new updates and launches, and be the one who recommends stylist in your locality
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input 
              type="email"
              placeholder="Your email" 
              className="h-12 flex-1"
            />
            <Button 
              className="bg-black hover:bg-black/90 text-[#A0163A] h-12"
            >
              Join now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

