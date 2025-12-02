"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductVariant } from "@repo/types";

const VariantCard = ({ variant }: { variant: ProductVariant }) => {
  return (
    <div>
      <CardCarousel images={variant.prod_img} />
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Unit:</span> {variant.unit_value}{" "}
          <span className="uppercase">{variant.unit}</span>
        </p>
        <p className="text-sm">
          <span className="font-medium">Price:</span> ₹
          {Number(variant?.selling_price)}
        </p>
        <p className="text-sm">
          <span className="font-medium">Stock:</span> {variant.stock}
        </p>
      </div>
    </div>
  );
};

const CardCarousel = ({ images }: { images: { url: string }[] }) => {
  return (
    <Carousel className="w-full overflow-hidden cursor-grab">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={image.url}
              alt={`Variant Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default VariantCard;
