"use client";
import React from "react";

const ContactHero: React.FC = () => {
  return (
    <section
      className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/40 "></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Get in Touch with <span className="text-[#5C7AC0]">Karvaan Tours</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          Have questions or ready to plan your adventure? We're here to help!
        </p>
       
      </div>
    </section>
  );
};

export default ContactHero;