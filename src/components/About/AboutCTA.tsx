"use client";
import React from "react";

const AboutCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] py-16 px-6 md:px-20 text-center rounded-lg max-w-6xl mx-auto my-20 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to start your unforgettable journey with <span className="underline decoration-white/70">Karvaan Tours</span>?
      </h2>
      <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
        Contact us today and let’s craft your perfect Japan travel experience!
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="/contact"
          className="bg-white text-red-600 font-semibold px-8 py-3 rounded-md shadow-md hover:bg-red-50 transition"
        >
          Contact Us
        </a>
        <a
          href="/tours"
          className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-red-600 transition"
        >
          Explore Tours
        </a>
      </div>
    </section>
  );
};

export default AboutCTA;
