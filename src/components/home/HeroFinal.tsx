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
                fontSize: 'clamp(40px, 5vw, 60px)', 
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
                  fontSize: 'clamp(60px, 11vw, 50px)', 
                  lineHeight: '0.9',
                  color: '#3B82F6',
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
                  fontSize: 'clamp(44px, 7vw, 50px)', 
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

     {/* Description Text - Bottom Left
<div className="w-full h-full flex items-end justify-start ">
  <p className="text-white text-xl leading-relaxed text-left  mb-4 ml-4">
    Discover unforgettable journeys, unique experiences,
  </p>
</div> */}

          {/* <div className="mb-5 ">
        

          
            <p className="text-white  text-start text-lg ms-4 leading-relaxed">
            and meaningful connections — all in one place.
            </p>
          </div> */}
          
          {/* Button-style CTA */}
          {/* <div 
            className="inline-block px-4 py-2 rounded-md text-white ms-2"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: '18px',
              maxWidth: 'fit-content'
            }}
          >
            Start exploring Japan and create stories.
          </div> */}
        </div>

        {/* Search Card - "Find Your Escape" - Bottom Center */}
        {/* <div className="w-full max-w-5xl mx-auto">
          <div 
            className="bg-white rounded-xl shadow-2xl"
            style={{ padding: '32px' }}
          >
            <h2 
              className="text-gray-900 font-bold mb-6" 
              style={{ fontSize: '24px' }}
            >
              Find Your Escape
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Destination Input with Icon */}
              {/* <div className="flex-1 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search destination"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                  className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ height: '50px' }}
                />
              </div> */}
              
              {/* Check Dates Input with Icon */}
              {/* <div className="md:w-64 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="date"
                  placeholder="Check dates"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFind()}
                  className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ height: '50px' }}
                />
              </div> */}
              
{/*              
              <button
                onClick={handleFind}
                className="md:w-36 w-full px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 text-base"
                style={{ height: '50px' }}
              >
                Find
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroFinal;

