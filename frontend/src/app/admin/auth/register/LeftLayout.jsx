import Image from "next/image";
import React from "react";

const imageData = [
  {
    src: "/assets/auth/device.svg",
    alt: "Quick registration",
    heading: "Quick & easy registration",
    info: "Complete your registration with just your PAN card and bank details",
  },
  {
    src: "/assets/auth/clock.svg",
    alt: "Go live fast",
    heading: "Take your events live superfast!",
    info: "Publish your event within just 15 minutes! Add event details, dates and ticket and BAM! Your event is ready.",
  },
  {
    src: "/assets/auth/analytics.svg",
    alt: "Analytics",
    heading: "Monitor analytics & insights",
    info: "Track event sales, daily ticketing, get daily insights and more in real time.",
  },
];

const ImageContainer = ({ src, alt, heading, info }) => {
  return (
    <div className="flex gap-6 mb-10">
      <div className="w-12 h-12">
        <Image src={src} alt={alt} width={48} height={48} />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{heading}</h3>
        <p className="text-gray-600 mt-1">{info}</p>
      </div>
    </div>
  );
};

const LeftLayout = () => {
  return (
    <div className="bg-white px-10 py-16 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-12">
        Benefits of using–Do It Yourself our new event management tool
      </h1>
      {imageData.map((item) => (
        <ImageContainer
          key={item.alt}
          src={item.src}
          alt={item.alt}
          heading={item.heading}
          info={item.info}
        />
      ))}
    </div>
  );
};

export default LeftLayout;
