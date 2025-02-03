"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any[] }) => {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div>No images available.</div>;
  }


  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index] || "/fallback-image.jpg"}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex gap-4 mt-8">
        {items.map((item, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item._id || i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item || "/fallback-image.jpg"}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;