"use client";
import React from "react";

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-yellow-500 py-16 px-6 md:px-20 text-center text-white rounded-lg mx-6 md:mx-20 my-12 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Start Your Adventure with{" "}
        <span className="bg-white/30 px-2 rounded">Karvaan Tours</span>?
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
        Book your dream tour today and experience the beauty and culture of Japan like never before!
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="/tours"
          className="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white/90 transition"
        >
          Explore Tours
        </a>
        <a
          href="/contact"
          className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-red-600 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
