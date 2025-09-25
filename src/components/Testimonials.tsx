"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aisha Khan",
    location: "Tokyo, Japan",
    review:
      "Karvaan Tours made my trip unforgettable! The guides were knowledgeable and the itinerary was perfect.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Ali Raza",
    location: "Osaka, Japan",
    review:
      "Great service and friendly drivers. Highly recommend Karvaan Tours for anyone visiting Japan.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sara Malik",
    location: "Kyoto, Japan",
    review:
      "Beautiful experience with excellent support throughout the trip. Will book again!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    location: "Nagoya, Japan",
    review:
      "Very professional and friendly team. Everything was smooth and hassle-free.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 5,
    name: "Fatima Noor",
    location: "Hokkaido, Japan",
    review:
      "Amazing tour experience with a lot of cultural insights and fun moments.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Adjust number of visible cards based on screen width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(3);
      }
    }

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate max index for looping
  const maxIndex = testimonials.length - cardsToShow;

  // Previous button handler
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Next button handler
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Real feedback from travelers who explored Japan with Karvaan Tours.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Carousel container with overflow hidden */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {testimonials.map(({ id, name, location, review, rating, avatar }) => (
              <div
                key={id}
                className="box-border px-4"
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <div className="bg-gray-50 p-6 rounded-xl shadow text-left h-full flex flex-col justify-between">
                  <div className="flex items-center mb-4">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm text-gray-500">{location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">"{review}"</p>
                  <div className="flex">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonials"
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonials"
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
