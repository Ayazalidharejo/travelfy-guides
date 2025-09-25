"use client";
import React from "react";

const IntroductionSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Karvaan Tours
          </span>
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          We are your trusted travel partner for unforgettable journeys across Japan.
          Our mission is to connect travelers with the rich culture, breathtaking
          landscapes, and timeless beauty of Japan. Whether you're planning a solo
          adventure, family vacation, or a guided tour — we're here to make it
          effortless, exciting, and unforgettable.
        </p>
      </div>
    </section>
  );
};

export default IntroductionSection;
