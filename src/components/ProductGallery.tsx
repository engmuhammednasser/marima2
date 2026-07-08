"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [image, setImage] = useState(images[0]);

  return (
    <section>
      <div className="galleryMain">
        <Image src={image} alt={alt} fill priority sizes="(min-width: 760px) 55vw, 100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="thumbs">
        {images.map((src) => (
          <button className="thumb" key={src} type="button" onClick={() => setImage(src)} aria-label="Select product image">
            <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </section>
  );
}
