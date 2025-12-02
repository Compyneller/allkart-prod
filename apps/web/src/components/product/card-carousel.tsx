import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const CardCarousel = ({ images }: { images: { url: string }[] }) => {
  return (
    <Carousel className="w-full aspect-[1/1] flex items-center justify-center overflow-hidden cursor-grab">
      <CarouselContent >
        {images?.map((image, index) => (
          <CarouselItem key={index} >
            <img
              src={image.url}
              alt={`Variant Image ${index + 1}`}
              className="w-full aspect-[1/1] object-cover rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CardCarousel;
