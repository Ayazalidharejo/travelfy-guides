"use client"
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Fast parallax effect for Y-axis
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);   // fast
  const y2 = useTransform(scrollY, [0, 500], [0, 250]);   // faster
  const y3 = useTransform(scrollY, [0, 500], [0, 350]);   // fastest

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
        {/* Mount Fuji */}
        <motion.div
          style={{ y: y1 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1504788363733-507549153474?auto=format&fit=crop&w=1600&q=80"
            alt="Mount Fuji Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* Osaka Castle */}
        <motion.div
          style={{ y: y2 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1600&q=80"
            alt="Osaka Castle Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* Kyoto Cherry Blossoms */}
        <motion.div
          style={{ y: y3 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80"
            alt="Kyoto Cherry Blossoms Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </div>

      {/* Central Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/40">
        <p className="text-gray-200 mt-4 max-w-4xl text-lg md:text-xl">
          Explore the timeless beauty of Japan with us. From the iconic Mount Fuji 
          to the historic castles and breathtaking cherry blossoms — your dream 
          journey starts here.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 hover:scale-105 transition transform text-white px-6 py-3 rounded-lg shadow-lg font-medium">
            Explore Tours
          </button>
          <button className="bg-white/80 hover:bg-white hover:scale-105 transition transform text-black px-6 py-3 rounded-lg shadow-lg font-medium">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
