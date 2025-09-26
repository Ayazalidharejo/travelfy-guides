"use client";
import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* ✅ Background Image from Unsplash */}
      <img
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80"
        alt="Japan travel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ✅ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>

      {/* ✅ Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">
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
