"use client";
import React from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504788363733-507549153474?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584422022290-06639d5f1877?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1619022983184-e6c263346a61?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607082349250-f5ef37602f72?auto=format&fit=crop&w=800&q=80",
];

const Gallery: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Moments from{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Karvaan Tours
          </span>
        </h2>

        <p className="text-gray-700 text-lg md:text-xl mb-12">
          Experience the beauty of Japan through the lens of our past travelers.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md group">
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
