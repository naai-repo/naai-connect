import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

type ImagesType = {
  key: string;
  url: string;
  id: string;
}

const ImageCarousel = ({images}:{images?:ImagesType[]}) => {
  return (
    <Carousel  plugins={[
      Autoplay({
        delay: 4000,
      }),
    ]}>
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image.url} alt={`Image ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ImageCarousel