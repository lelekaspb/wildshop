"use client";

import Image from "next/image";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel(props: {
  images: string[] | null;
  product_title: string;
}) {
  const {
    images,
    product_title,
  }: { images: string[] | null; product_title: string } = props;
  return (
    <>
      {images && images.length > 1 && (
        <Carousel showStatus={false} showThumbs={false}>
          {images.map((image, index) => (
            <div key={index}>
              <Image
                alt={product_title}
                src={image}
                width={500}
                height={500}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          ))}
        </Carousel>
      )}

      {images && images.length == 1 && (
        <div>
          <Image
            alt={product_title}
            src={images[0]}
            width={500}
            height={500}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}

      {!images && (
        <div>
          <Image
            alt={product_title}
            src={placeholder}
            width={500}
            height={500}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
    </>
  );
}
