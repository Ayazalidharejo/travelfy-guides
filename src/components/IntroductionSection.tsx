

import { Link } from 'react-router-dom';
import IntroVersion1, { IntroVersion10, IntroVersion11, IntroVersion12, IntroVersion13, IntroVersion14, IntroVersion15, IntroVersion16, IntroVersion17, IntroVersion18, IntroVersion19, IntroVersion2, IntroVersion20, IntroVersion21, IntroVersion22, IntroVersion23, IntroVersion24, IntroVersion25, IntroVersion3, IntroVersion4, IntroVersion5, IntroVersion6, IntroVersion7, IntroVersion8, IntroVersion9 } from './Intro';

export default function IntroductionSection() {
  return (
    <section className="py-20 bg-[linear-gradient(to_bottom,_#ffffff,_#e2e7f5)]" >
      <div className="max-w-8xl mx-auto text-center px-6">
        {/* Simple Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6  leading-tight">
           Discover Japan  <span className="text-[#5C7AC0]">With us</span>
         </h1>
        
        {/* Simple Paragraph */}
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          Karvaan Tours crafts guided, private, and small‑group tours in Japan with transparent package pricing. We operate in Mount Fuji, Hakone, Gotemba, Tokyo, Nikko, and Nagano—tailored for families, seniors, and luxury travelers. Serving guests from the USA, Australia, and the Philippines with 2024–2026 departures. Trusted for 10+ years with licensed local guides, 5‑star guest reviews, and secure, flexible bookings—plan less, experience more.
        </p>
      </div>
      
    </section>
  );
}