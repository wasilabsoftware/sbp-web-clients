"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[560px]">
      {/* Main Image */}
      <div className="relative w-full h-[300px] lg:h-[480px] rounded-xl lg:rounded-3xl overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 w-full overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative w-20 h-20 lg:w-[100px] lg:h-[100px] rounded-xl flex-shrink-0 overflow-hidden transition-all ${
              selectedIndex === index
                ? "ring-[3px] ring-berry-red"
                : "hover:opacity-80"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Vista ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
