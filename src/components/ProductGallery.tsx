"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [image, setImage] = useState(images[0]);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function updateOrigin(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y))
    });

    if (event.pointerType === "mouse") {
      setZoomed(true);
    }
  }

  return (
    <section>
      <div
        className={`galleryMain ${zoomed ? "isZoomed" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={alt}
        onPointerMove={updateOrigin}
        onPointerDown={(event) => {
          updateOrigin(event);
          if (event.pointerType !== "mouse") setZoomed((current) => !current);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setZoomed(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setZoomed((current) => !current);
          }
        }}
      >
        <Image
          className="galleryZoomImage"
          src={image}
          alt={alt}
          fill
          priority
          sizes="(min-width: 760px) 55vw, 100vw"
          style={{
            objectFit: "cover",
            transform: zoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`
          }}
        />
      </div>
      <div className="thumbs">
        {images.map((src) => (
          <button
            className={`thumb ${src === image ? "active" : ""}`}
            key={src}
            type="button"
            onClick={() => {
              setImage(src);
              setZoomed(false);
              setOrigin({ x: 50, y: 50 });
            }}
            aria-label="Select product image"
          >
            <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </section>
  );
}
