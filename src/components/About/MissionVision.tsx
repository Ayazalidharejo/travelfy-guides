"use client";
import React from "react";

const MissionVision: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Mission</span> &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600">Vision</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Mission */}
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-2xl font-semibold text-red-600 mb-4 flex items-center gap-2">
              🎯 Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To offer immersive, culturally rich, and personalized travel experiences across Japan — 
              connecting hearts, stories, and landscapes through every journey with{" "}
              <span className="font-semibold text-red-500">Karvaan Tours</span>.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
              🌅 Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the most trusted and beloved travel partner for discovering Japan — known for authenticity, 
              local expertise, and unforgettable memories. We envision <span className="font-semibold text-yellow-600">Karvaan Tours</span> 
              as a symbol of meaningful travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
