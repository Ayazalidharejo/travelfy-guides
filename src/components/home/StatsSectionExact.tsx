import React from 'react';
import bgImage from "@/../public/images/Group.png"
import statImage1 from "@/../public/images/Subtract.png" // Add your 1st stat image (3.0k+)
import statImage2 from "@/../public/images/Subtract.png" // Add your 2nd stat image (96%)
import statImage3 from "@/../public/images/Subtract.png" // Add your 3rd stat image (300+)

const StatsSectionExact = () => {
  const stats = [
    { image: statImage1, value: '3.0k+', label: 'SATISFIED TRAVELERS' },
    { image: statImage2, value: '96%', label: 'RATE US TRAVEL QUALITY' },
    { image: statImage3, value: '300+', label: 'BOOKINGS WITH WORRY BOOKING' },
  ];

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
      <div 
        className="absolute inset-0" 
        // style={{ backgroundColor: 'rgba(30, 64, 175, 0.85)' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-center">
              <div className="text-center relative" style={{ width: '280px', height: '250px' }}>
                {/* Stat Image */}
                <img 
                  src={stat.image} 
                  alt={stat.value}
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
                    {stat.value}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSectionExact;

