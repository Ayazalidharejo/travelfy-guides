"use client";
import React from "react";
import image from "@/../public/images/about.webp"

const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* ✅ Background Image from Unsplash */}
      <img
        src={image}
        alt="Japan travel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ✅ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>

      {/* ✅ Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text icons me green text-transparent bg-clip-text bg-[linear-gradient(to_left,_black_0%,_black_0%,_#5C7AC0_0%)]">
            Karvaan Tours
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200">
          Learn about our journey, our values, and the passion behind curating unforgettable travel experiences in Japan.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
