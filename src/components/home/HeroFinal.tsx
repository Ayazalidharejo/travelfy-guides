

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "@/../public/hero.png"

const HeroFinal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const navigate = useNavigate();

  const handleFind = () => {
    console.log('🎯 Hero Find Button Clicked!');
    console.log('📝 Search Query:', searchQuery);
    console.log('📅 Check-In Date:', checkInDate);
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchQuery && searchQuery.trim()) {
      params.append('search', searchQuery.trim());
      console.log('✅ Added search param:', searchQuery.trim());
    }
    
    if (checkInDate) {
      params.append('date', checkInDate);
      console.log('✅ Added date param:', checkInDate);
    }
    
    // Navigate to tours page with parameters
    const queryString = params.toString();
    const finalUrl = `/tours${queryString ? '?' + queryString : ''}`;
    
    console.log('🚀 Final URL:', finalUrl);
    console.log('🔗 Full Path:', window.location.origin + finalUrl);
    
    navigate(finalUrl);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '700px' }}>
      {/* Background with Couple Image - Florence Cathedral */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-[700px] flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12">
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
            <div className="flex items-baseline gap-4 md:gap-8">
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

        {/* Buttons - Positioned at bottom: 20%, left: 50% */}
        <div 
          className="absolute flex gap-4"
          style={{
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {/* Start Your Journey Button - Gold/Tan Color */}
          <button
            onClick={() => navigate('/tours')}
            className="px-8 py-3 rounded-full bg-[#5C7AC0] text-white hover:bg-[#284078] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90"
            style={{
             
              fontSize: '14px',
              letterSpacing: '1px'
            }}
          >
            START YOUR JOURNEY
          </button>

          {/* Explore Tours Button - White Outlined */}
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-white"
            style={{
              border: '2px solid #5C7AC0',
              backgroundColor: 'transparent',
              fontSize: '14px',
              letterSpacing: '1px'
            }}
          >
            Contact us
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroFinal;