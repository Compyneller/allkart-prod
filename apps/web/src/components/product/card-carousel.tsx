import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const CardCarousel = ({ images }: { images: { url: string }[] }) => {
  return (
    <Carousel className="w-full aspect-square flex items-center justify-center overflow-hidden cursor-grab">
      <CarouselContent >
        {images?.map((image, index) => (
          <CarouselItem key={index} >
            <div className="relative w-full aspect-square">
              <Image
                fill
                src={image.url}
                alt={`Variant Image ${index + 1}`}
                className="w-full aspect-square object-cover rounded-md"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CardCarousel;
