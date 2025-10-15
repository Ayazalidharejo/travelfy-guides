"use client";
import React from "react";

const MissionVision: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Our <span className=" icons me green text-transparent bg-gradient-to-r from-[#284078] to-[#5C7AC0] text-transparent bg-clip-text">Mission</span> &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284078] to-[#5C7AC0] text-transparent bg-clip-text">Vision</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Mission */}
          <div className="bg-gradient-to-r from-[#284078] to-[#5C7AC0] text-transparent bg-clip-text rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#284078] to-[#5C7AC0] text-transparent bg-clip-text mb-4 flex items-center gap-2">
              <span className="text-white">🎯</span> Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To offer immersive, culturally rich, and personalized travel experiences across Japan — 
              connecting hearts, stories, and landscapes through every journey with{" "}
              <span className="font-semibold hover:text-[#284078] text-[#5C7AC0]">Karvaan Tours</span>.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-2xl font-semibold icons me green text-transparent bg-clip-text bg-[linear-gradient(to_left,_black_20%,_black_0%,_#284078_60%)] mb-4 flex items-center gap-2">
          <span className="text-white">🌅</span> Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the most trusted and beloved travel partner for discovering Japan — known for authenticity, 
              local expertise, and unforgettable memories. We envision <span className="font-semibold icons me green text-transparent bg-clip-text bg-[linear-gradient(to_left,_black_20%,_black_0%,_#5C7AC0_60%)]">Karvaan Tours</span> 
                as a symbol of meaningful travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
