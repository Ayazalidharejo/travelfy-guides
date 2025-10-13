// import React from 'react';
// import bgImage from "@/../public/images/Group.png"
// import statImage1 from "@/../public/images/Subtract.png" // Add your 1st stat image (3.0k+)
// import statImage2 from "@/../public/images/Subtract.png" // Add your 2nd stat image (96%)
// import statImage3 from "@/../public/images/Subtract.png" // Add your 3rd stat image (300+)

// const StatsSectionExact = () => {
//   const stats = [
//     { image: statImage1, value: '2500+', label: 'SATISFIED TRAVELERS' },
//     { image: statImage2, value: '150+', label: 'DESTINATION QUALITY' },
//     { image: statImage3, value: '50+', label: 'EXPERIENCED GUIDES' },
//     { image: statImage3, value: '4.5', label: 'AVERAGE RATING' },
//   ];

//   return (
//     <section 
//       className="py-20 relative overflow-hidden"
//       style={{
//         backgroundImage: `url('${bgImage}')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* Blue Overlay */}
//       <div 
//         className="absolute inset-0" 
//         // style={{ backgroundColor: 'rgba(30, 64, 175, 0.85)' }}
//       ></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
//           {stats.map((stat, index) => (
//             <div key={index} className="flex justify-center">
//               <div className="text-center relative" style={{ width: '280px', height: '250px' }}>
//                 {/* Stat Image */}
//                 <img 
//                   src={stat.image} 
//                   alt={stat.value}
//                   className="w-full h-full object-contain"
//                   style={{ display: 'block' }}
//                 />
                
//                 {/* Text Overlay on Image */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
//                   <div 
//                     className="font-extrabold mb-2" 
//                     style={{ 
//                       fontSize: '64px', 
//                       lineHeight: '1',
//                       color: '#1E3A8A',
//                       textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
//                     }}
//                   >
//                     {stat.value}
//                   </div>
//                   <div 
//                     className="font-bold uppercase tracking-wide text-center" 
//                     style={{ 
//                       fontSize: '13px',
//                       color: '#1E3A8A',
//                       textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
//                       lineHeight: '1.3',
//                       maxWidth: '220px'
//                     }}
//                   >
//                     {stat.label}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSectionExact;

import React, { useEffect, useState } from 'react';
import bgImage from "@/../public/images/Group.png"
import statImage1 from "@/../public/images/Subtract.png"
import statImage2 from "@/../public/images/Subtract.png"
import statImage3 from "@/../public/images/Subtract.png"

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
  { image: statImage1, value: 2500, suffix: '+', label: 'SATISFIED TRAVELERS' },
  { image: statImage2, value: 150, suffix: '+', label: 'DESTINATION QUALITY' },
  { image: statImage3, value: 50, suffix: '+', label: 'EXPERIENCED GUIDES' },
  { image: statImage3, value: 4.5, suffix: '', label: 'AVERAGE RATING' },
];

// Find max value for integer stats
const maxValue = Math.max(...stats.filter(s => Number.isInteger(s.value)).map(s => s.value));

const StatsSectionExact = () => {
  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blue Overlay */}
      <div className="absolute inset-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            // Ulta proportional duration: zyada value par kam duration
            const duration = typeof stat.value === 'number' && Number.isInteger(stat.value)
              ? (maxValue - stat.value) * 2 + 800
              : 1200;
            const animatedValue = typeof stat.value === 'number' && Number.isInteger(stat.value)
              ? useCounter(stat.value, duration)
              : stat.value;
            return (
              <div key={index} className="flex justify-center">
                <div className="text-center relative" style={{ width: '280px', height: '250px' }}>
                  {/* Stat Image */}
                  <img 
                    src={stat.image} 
                    alt={String(stat.value)}
                    className="w-full h-full object-contain"
                    style={{ display: 'block' }}
                  />
                  
                  {/* Text Overlay on Image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <div 
                      className="font-extrabold mb-2" 
                      style={{ 
                        fontSize: '64px', 
                        lineHeight: '1',
                        color: '#1E3A8A',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      {animatedValue}{stat.suffix}
                    </div>
                    <div 
                      className="font-bold uppercase tracking-wide text-center" 
                      style={{ 
                        fontSize: '13px',
                        color: '#1E3A8A',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        lineHeight: '1.3',
                        maxWidth: '220px'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSectionExact;
// ...existing code...