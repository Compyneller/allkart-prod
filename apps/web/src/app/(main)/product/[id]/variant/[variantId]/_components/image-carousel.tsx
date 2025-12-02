import { cn } from "@/lib/utils";
import { ProductImage } from "@repo/types";
import React, { useState } from "react";

const ImageCarousel = ({ data }: { data: ProductImage[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="w-full">
      <div className=" h-[500px] flex items-center justify-center w-full border rounded-lg">
        <img
          className="w-full h-[500px] object-contain "
          src={data[currentImage]?.url}
          alt=""
        />
      </div>
      <div className="flex mt-3 justify-center  items-center gap-2">
        {data.map((image, index) => (
          <div
            className={cn(
              "flex w-full flex-1 ",
              currentImage === index
                ? "ring-2 ring-accent-foreground rounded-lg"
                : ""
            )}
            key={image?.id}>
            <img
              className="w-full  h-24 object-contain cursor-pointer border rounded-lg"
              src={image?.url}
              alt=""
              onClick={() => setCurrentImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
