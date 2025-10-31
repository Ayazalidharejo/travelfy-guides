
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "@/../public/hero.webp"

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
    <>
      {/* ========== MOBILE ONLY SECTION ========== */}
      <div className="md:hidden relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 py-12">
          {/* Centered Heading */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 
                className="text-white font-black uppercase leading-none"
                style={{ 
                  fontSize: '40px',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '2px'
                }}
              >
                MEET
              </h1>
              <h1 
                className="text-white font-black uppercase leading-none mt-2"
                style={{ 
                  fontSize: '64px',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '2px'
                }}
              >
                VOYAGE
              </h1>
              <h1 
                className="text-white font-black uppercase leading-none mt-2"
                style={{ 
                  fontSize: '52px',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '2px'
                }}
              >
                STORIES
              </h1>
            </div>
          </div>

          {/* Buttons at Bottom */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate('/tours')}
              className="w-full px-6 py-3.5 rounded-full bg-[#5C7AC0] text-white font-semibold uppercase tracking-wide text-sm shadow-lg active:scale-95 transition-transform"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full px-6 py-3.5 rounded-full border-2 border-white text-white bg-transparent font-semibold uppercase tracking-wide text-sm shadow-lg active:scale-95 transition-transform"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP/LAPTOP ONLY SECTION - ORIGINAL ========== */}
      <div className="hidden md:block relative w-full overflow-hidden" style={{ minHeight: '700px' }}>
        {/* Background - desktop/laptop (cover) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-[700px] flex flex-col justify-between px-12 lg:px-20 py-12">
          {/* Main Content - Full Width */}
          <div className="flex-1 flex flex-col justify-center pt-8">
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
              <div className="flex flex-wrap items-baseline gap-8">
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

          {/* Desktop Buttons */}
          <div 
            className="flex gap-4 absolute"
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
    </>
  );
};

export default HeroFinal;