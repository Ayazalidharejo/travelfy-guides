

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
          Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
          We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
          Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
          With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
          From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
          At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime. 
          Join us and let us turn your travel dreams into reality.
        </p>
      </div>
      
    </section>
  );
}