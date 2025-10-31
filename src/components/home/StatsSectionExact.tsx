





import React, { useEffect, useState } from 'react';
import bgImage from "@/../public/images/count-img.webp"

// Counter Hook
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let incrementTime = Math.max(10, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

const stats = [
  { value: 3000, label: 'Satisfied travellers', format: (v: number) => `${(v / 1000).toFixed(1)}k+` },
  { value: 96, label: 'Urge to travel again', format: (v: number) => `${v}%` },
  { value: 300, label: 'Savings with early booking', format: (v: number) => `${v}+` },
];

const StatsSectionExactPosition: React.FC = () => {
  const maxValue = Math.max(...stats.map((stat) => stat.value));

  return (
    <>
      {/* Mobile-only version */}
      <section className="relative w-screen font-poppins overflow-hidden block md:hidden">
        <img
          src={bgImage}
          alt="Travel Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/35 z-10" />

        <div className="relative z-20 px-4 py-10">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const duration = (maxValue - stat.value) * 2 + 800;
              const animatedValue = useCounter(stat.value, duration);
              const displayValue = stat.format(animatedValue);

              return (
                <div
                  key={index}
                  className="rounded-md bg-white/80 backdrop-blur-sm shadow-md flex flex-col items-center justify-center text-center px-2 py-4"
                >
                  <div className="text-2xl font-extrabold text-[#1E3A8A] mb-1">
                    {displayValue}
                  </div>
                  <div className="text-[10px] leading-snug text-[#1E3A8A] font-semibold">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Desktop/Tablet version */}
      <section className="relative w-screen h-[68vh] font-poppins overflow-hidden hidden md:block">
        <img
          src={bgImage}
          alt="Travel Background"
          className="absolute inset-0 w-full h-full object-contain object-[center_bottom] z-0"
        />
        <div className="absolute inset-0 bg-black/25 z-10" />

        <div className="absolute z-20 w-full left-[58%] -translate-x-1/2 top-[32%] flex justify-center gap-4 md:gap-6 px-4">
          {stats.map((stat, index) => {
            const duration = (maxValue - stat.value) * 2 + 800;
            const animatedValue = useCounter(stat.value, duration);
            const displayValue = stat.format(animatedValue);

            return (
              <div
                key={index}
                className="w-[200px] md:w-[220px] h-[160px] md:h-[180px] rounded-md bg-gradient-to-b from-white/70 to-white/30 backdrop-blur-sm shadow-md flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-2">
                  {displayValue}
                </div>
                <div className="text-sm md:text-base text-[#1E3A8A] font-semibold leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default StatsSectionExactPosition;
