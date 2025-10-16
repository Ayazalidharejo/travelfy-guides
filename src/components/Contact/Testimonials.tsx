"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

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
      "The cherry blossoms tour was magical. Karvaan Tours's attention to detail is top-notch.",
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
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        What Our Travelers Say
      </h2>

      <div className="relative">
        {/* Custom Previous Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#5C7AC0] hover:bg-[#284078] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Custom Next Button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#5C7AC0] hover:bg-[#284078] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map(({ name, role, photo, message }, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center max-w-md mx-auto hover:shadow-xl transition-shadow duration-300 h-full">
                <img
                  src={photo}
                  alt={name}
                  className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-red-100"
                />
                <p className="text-gray-700 italic mb-4 flex-grow">"{message}"</p>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
                  <span className="text-sm text-red-600">{role}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #5C7AC0;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          background: #5C7AC0;
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;