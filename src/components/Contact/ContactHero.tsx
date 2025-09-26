"use client";
import React from "react";

const ContactHero: React.FC = () => {
  return (
    <section
      className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Get in Touch with <span className="text-red-500">Karvaan Tours</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          Have questions or ready to plan your adventure? We're here to help!
        </p>
        <a
          href="#contactForm"
          className="inline-block bg-red-600 hover:bg-red-700 transition text-white font-semibold px-8 py-3 rounded-lg shadow-lg"
        >
          Contact Us Now
        </a>
      </div>
    </section>
  );
};

export default ContactHero;
