import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type ImagesType = {
  key: string;
  url: string;
  id: string;
}

const ImageCarousel = ({images}:{images?:ImagesType[]}) => {
  return (
    <Carousel  plugins={[
      Autoplay({
        delay: 5000,
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