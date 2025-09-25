"use client";
import React from "react";

const tours = [
  {
    id: 1,
    title: "Mount Fuji Adventure",
    description:
      "Experience the iconic Mount Fuji with guided hikes and breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1504788363733-507549153474?auto=format&fit=crop&w=800&q=80",
    price: "$299",
  },
  {
    id: 2,
    title: "Osaka Castle Tour",
    description:
      "Explore the historic Osaka Castle and its beautiful surroundings with expert guides.",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
    price: "$199",
  },
  {
    id: 3,
    title: "Kyoto Cherry Blossom Festival",
    description:
      "Witness the stunning cherry blossoms in Kyoto during the peak season.",
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=800&q=80",
    price: "$249",
  },
];

const FeaturedTours: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Featured Tours
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12">
          Discover some of our most popular and exciting tour packages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold text-lg">
                    {tour.price}
                  </span>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
