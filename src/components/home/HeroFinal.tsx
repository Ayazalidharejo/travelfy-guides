

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "@/../public/hero.png"

const HeroFinal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const navigate = useNavigate();

  const handleFind = () => {

    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchQuery && searchQuery.trim()) {
      params.append('search', searchQuery.trim());
   
    }
    
    if (checkInDate) {
      params.append('date', checkInDate);
   
    }
    
    // Navigate to tours page with parameters
    const queryString = params.toString();
    const finalUrl = `/tours${queryString ? '?' + queryString : ''}`;
    
   
    
    navigate(finalUrl);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '700px' }}>
      {/* Background - mobile disabled (we will render a separate image element instead) */}
      <div className="hidden md:hidden"></div>
      {/* Background - desktop/laptop (cover) */}
      <div 
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-[700px] flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12">
        {/* Mobile-only hero image (complete, separate) */}
        <div className="md:hidden w-full mb-4">
          <img
            src={image}
            alt="Hero"
            className="w-full h-64 object-contain"
          />
        </div>
        {/* Main Content - Full Width */}
        <div className="flex-1 flex flex-col justify-center pt-6 md:pt-8">
          {/* Main Heading */}
          <div className="mb-8 w-full max-w-4xl">
            {/* MEET - Top line, white, smaller */}
            <h1 
              className="text-white font-black uppercase mb-2" 
              style={{ 
                fontSize: 'clamp(40px, 5vw, 50px)', 
                lineHeight: '1',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '900',
                letterSpacing: '2px'
              }}
            >
              MEET
            </h1>
            
            {/* VOYAGE (blue) and STORIES (white) on same line */}
            <div className="flex flex-wrap items-baseline gap-2 md:gap-8">
              <h1 
                className="font-black uppercase" 
                style={{ 
                  fontSize: 'clamp(40px, 11vw, 70px)', 
                  lineHeight: '0.9',
                  color: '#284078',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '2px'
                }}
              >
                VOYAGE
              </h1>
              
              <h1 
                className="text-white font-black uppercase" 
                style={{ 
                  fontSize: 'clamp(44px, 7vw, 70px)', 
                  lineHeight: '1',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '2px'
                }}
              >
                STORIES
              </h1>
            </div>
          </div>

        </div>

        {/* Buttons - Mobile stacked, fixed near bottom (only mobile) */}
        <div className="hidden md:hidden absolute inset-x-0 bottom-6 z-20 px-6">
          <div className="flex flex-col items-stretch gap-3 max-w-sm mx-auto">
            <button
              onClick={() => navigate('/tours')}
              className="w-full px-5 py-2.5 rounded-full bg-[#5C7AC0] text-white hover:bg-[#284078] font-semibold uppercase tracking-wide text-xs whitespace-nowrap shadow-lg"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full px-5 py-2.5 rounded-full border border-[#5C7AC0] hover:text-[#284078] text-white bg-transparent font-semibold uppercase tracking-wide text-xs whitespace-nowrap shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div 
          className="hidden md:flex gap-4 absolute"
          style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <button
            onClick={() => navigate('/tours')}
            className="px-8 py-3 rounded-full bg-[#5C7AC0] text-white hover:bg-[#284078] font-semibold uppercase tracking-wider transition-all duration-300"
          >
            START YOUR JOURNEY
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 rounded-full border border-[#5C7AC0] text-white bg-transparent font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Contact us
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroFinal;