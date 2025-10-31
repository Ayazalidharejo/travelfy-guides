"use client";
import React from "react";
import { Heart, Globe, Users, Leaf, MessageCircle } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Integrity",
    description:
      "We believe in transparency and honesty in every interaction.",
  },
  {
    icon: <Globe className="w-8 h-8 text-yellow-500" />,
    title: "Cultural Respect",
    description:
      "We honor and promote respect for local traditions and customs.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Local Expertise",
    description:
      "Every tour is designed with deep local knowledge and insider tips.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-teal-500" />,
    title: "Sustainability",
    description:
      "We promote eco-conscious travel experiences that preserve nature.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
    title: "Communication",
    description:
      "We're always here for our customers, before, during, and after the trip.",
  },
];

const CoreValues: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our <span className="text-transparent bg-clip-text icons me green text-transparent bg-clip-text bg-black">Core Values</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-lg">
          These are the principles that guide everything we do at Karvaan Tours—from crafting the best Japan tour packages to designing guided and self guided tours in Japan for travelers from the USA, Australia, and the Philippines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {values.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-xl transition cursor-default"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
