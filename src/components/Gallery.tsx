
"use client";
import React, { useState } from "react";
import MountFujiDetail from "./Gallery-detailpage/MountFujiDetail";
import HakoneDetail from "./Gallery-detailpage/HakoneDetail";
import GotembaDetail from "./Gallery-detailpage/GotembaDetail";
import TokyoDetail from "./Gallery-detailpage/TokyoDetail";
import NikkoDetail from "./Gallery-detailpage/NikkoDetail";
import NaganoDetail from "./Gallery-detailpage/NaganoDetail";
// import KyotoDetail from "./Kyoto";

const Gallery = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Destinations data with their respective components
  const destinations = [
    { 
      id: 1, 
      name: "Mount Fuji", 
      subtitle: "Japan's Sacred Peak", 
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=800&fit=crop", 
      component: MountFujiDetail 
    },
    { 
      id: 2, 
      name: "Hakone", 
      subtitle: "Hot Spring Paradise with Fuji Views", 
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop", 
      component: HakoneDetail 
    },
    { 
      id: 3, 
      name: "Gotemba", 
      subtitle: "Shopping Paradise at Mount Fuji's Base", 
      image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=800&fit=crop", 
      component: GotembaDetail 
    },
    { 
      id: 4, 
      name: "Tokyo", 
      subtitle: "Where Tradition Meets Tomorrow", 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop", 
      component: TokyoDetail 
    },
    { 
      id: 5, 
      name: "Nikko", 
      subtitle: "Sacred Mountains & UNESCO Treasures", 
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop", 
      component: NikkoDetail 
    },
    { 
      id: 6, 
      name: "Nagano", 
      subtitle: "Alpine Beauty & Snow Monkeys", 
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop",
      component: NaganoDetail 
    },
    
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Explore Beautiful{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Japan Destinations
          </span>
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-12">
          Discover the most breathtaking places in Japan with Karvaan Tours
        </p>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
              className="relative group h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6">
                <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                <p className="text-white mt-2 italic">{destination.subtitle}</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Selected Destination Modal */}
      {selectedDestination && (
        <selectedDestination.component onClose={() => setSelectedDestination(null)} />
      )}
    </section>
  );
};

export default Gallery;