"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Traveler",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    message:
      "Karvaan Tours ne mera Japan trip bohat hi smooth aur memorable banaya. Highly recommend!",
  },
  {
    name: "Ahmed Ali",
    role: "Travel Blogger",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    message:
      "Amazing service and guides who knew everything about Japan. Truly an unforgettable experience.",
  },
  {
    name: "Sana Mir",
    role: "Photographer",
    photo: "https://randomuser.me/api/portraits/women/72.jpg",
    message:
      "The cherry blossoms tour was magical. Karvaan Tours’s attention to detail is top-notch.",
  },
  {
    name: "Bilal Shah",
    role: "Adventurer",
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
    message:
      "Best drivers, flexible cancellation, and a very friendly team. Will travel again with Karvaan!",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 max-w-7xl mx-auto overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        What Our Travelers Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-w-full"
      >
        {testimonials.map(({ name, role, photo, message }, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center max-w-md mx-auto">
              <img
                src={photo}
                alt={name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-700 italic mb-4">"{message}"</p>
              <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
              <span className="text-sm text-red-600">{role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
