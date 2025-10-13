"use client";
import React from "react";
import {
  MapPin,
  Clock,
  UserCheck,
  Headset,
  Star,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: <MapPin className="text-red-600 w-8 h-8 mb-3" />,
    title: "Expert Guides & Best Drivers ",
    description:
      "Our experienced guides bring Japan's culture and history to life with every tour.",
  },
  {
    icon: <UserCheck className="text-red-600 w-8 h-8 mb-3" />,
    title: "Customized & Private Tours",
    description:
      "Our drivers know every corner of Japan to ensure you have a smooth, safe journey.",
  },
  {
    icon: <Clock className="text-red-600 w-8 h-8 mb-3" />,
    title: "24 Hours Free Cancellation",
    description:
      "Book with confidence — cancel free up to 24 hours before your tour starts.",
  },
  {
    icon: <Truck className="text-red-600 w-8 h-8 mb-3" />,
    title: "Reliable Transportation",
    description:
      "Comfortable and safe rides so you can relax and enjoy your adventure.",
  },
  {
    icon: <Headset className="text-red-600 w-8 h-8 mb-3" />,
    title: "24/7 Customer Support",
    description:
      "We're here for you anytime during your journey for any assistance you need.",
  },
  {
    icon: <Star className="text-red-600 w-8 h-8 mb-3" />,
    title: "Trusted by 1000+ Travelers",
    description:
      "Highly rated and loved by our customers worldwide for unforgettable experiences.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Karvaan Tours
          </span>
          ?
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12">
          We go beyond the ordinary to deliver exceptional travel experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
