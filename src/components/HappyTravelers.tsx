
import React, { useState, useEffect, useRef } from 'react';

const HappyTravelers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const stats = [
    { value: 2500, label: 'Happy Travelers', suffix: '+' },
    { value: 150, label: 'Destinations', suffix: '+' },
    { value: 50, label: 'Expert Guides', suffix: '+' },
    { value: 4.9, label: 'Average Rating', suffix: '★', isDecimal: true }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Duration increase kiya hai - 3000ms (3 seconds) tak
    const durations = [3000, 2800, 2600, 2400];
    const increments = stats.map((stat, index) => {
      const duration = durations[index];
      const steps = 80; // Steps bhi increase kiye for smoother animation
      const increment = stat.value / steps;
      const stepTime = duration / steps;

      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setCounts(prev => {
          const newCounts = [...prev];
          if (currentStep <= steps) {
            newCounts[index] = Math.floor(increment * currentStep);
          } else {
            newCounts[index] = stat.value;
            clearInterval(timer);
          }
          return newCounts;
        });
      }, stepTime);

      return timer;
    });

    return () => {
      increments.forEach(clearInterval);
    };
  }, [isVisible]);

  const formatNumber = (num, isDecimal = false) => {
    if (isDecimal) {
      return num.toFixed(1);
    }
    return num.toLocaleString();
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-hero"
    >
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white">
                {formatNumber(counts[index], stat.isDecimal)}
                {stat.suffix}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyTravelers;