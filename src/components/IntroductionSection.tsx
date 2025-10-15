

// // import React from 'react';
// // import { Cherry, Users, Shield, Award } from 'lucide-react';

// // export default function DiscoverJapan() {
// //   return (
// //     <div className="relative bg-gradient-to-r from-[#fff] to-[#EDE3D8] py-20 px-6">
// //       <div className="max-w-7xl mx-auto text-center">
// //         {/* Premium Badge */}
// //         <div className="flex items-center justify-center gap-2 mb-6">
// //           <Cherry className="w-8 h-8 text-pink-500" />
// //           <span className="text-sm font-semibold text-gray-600 tracking-widest uppercase">
// //              Japan Tours
// //           </span>
// //         </div>
        
// //         {/* Main Heading */}
// //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
// //           Discover Japan With <span className="text-blue-600">Voyage Stories</span>
// //         </h1>
        
// //         {/* Tagline */}
// //         <p className="text-xl md:text-2xl font-light mb-6 text-gray-700">
// //           Where Ancient Tradition Meets Cutting-Edge Innovation
// //         </p>
        
// //         {/* About Voyage Stories */}
// //         <div className="max-w-4xl mx-auto mb-8">
// //           <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
// //             <strong className="text-gray-900">Voyage Stories</strong> is your trusted partner for authentic Japan experiences. We are a team of passionate travel experts specializing in <strong className="text-gray-900">customized private tours</strong> that showcase the real essence of Japan. With expert local guides, premium transportation, 24/7 customer support, and free cancellation within 2-3 days, we ensure your Japanese adventure is seamless and unforgettable.
// //           </p>
// //         </div>

// //         {/* About Japan */}
// //         <div className="max-w-4xl mx-auto mb-10">
// //           <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
// //             Experience the magical Land of the Rising Sun – a country where ancient temples stand beside futuristic skyscrapers, where serene zen gardens meet neon-lit streets. Explore <strong className="text-gray-900">Tokyo's</strong> electric energy, <strong className="text-gray-900">Kyoto's</strong> 2,000+ historic temples, <strong className="text-gray-900">Mount Fuji's</strong> majestic beauty, and <strong className="text-gray-900">Osaka's</strong> world-famous street food scene.
// //           </p>
// //           {/* <p className="text-base md:text-lg text-gray-600 leading-relaxed">
// //             Witness cherry blossoms in spring, ride the legendary bullet train at 320 km/h, savor authentic sushi and wagyu beef, immerse yourself in traditional tea ceremonies, and discover hidden bamboo forests. From sacred shrines to robot restaurants, from peaceful gardens to vibrant anime districts – Japan offers experiences you'll find nowhere else on Earth.
// //           </p> */}
// //         </div>

// //         {/* CTA Buttons */}
// //         <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
// //           <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all transform hover:scale-105">
// //            Customize your Tour
// //           </button>
// //           <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 shadow-md transition-all hover:border-gray-400">
// //             View Tours
// //           </button>
// //         </div>

        
// //       </div>
// //     </div>
// //   );
// // }
// import { Cherry, Sparkles } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function IntroductionSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-[#fff7f0] via-[#f5f5fa] to-[#EDE3D8] py-20 px-6 overflow-hidden">
//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-40 h-40 bg-pink-100 rounded-full opacity-30 blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#5C7AC0]  hover:bg-[#284078] rounded-full opacity-20 blur-3xl" />
//       <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-100 rounded-full opacity-20 blur-2xl" />

//       <div className="max-w-7xl mx-auto text-center relative z-10">
//         {/* Badge */}
//         <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
//           <Cherry className="w-8 h-8 text-pink-500 animate-bounce" />
//           <span className="text-sm font-bold text-gray-800 tracking-widest uppercase bg-gradient-to-r from-pink-200 via-yellow-100 to-orange-100 px-4 py-1.5 rounded-full shadow-md">
//             🇯🇵 Explore Japan
//           </span>
//         </div>
        
//         {/* Main Heading */}
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
//           Discover Japan with{" "}
//           <span className="bg-gradient-to-r from-red-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
//             Karvaan Tours
//           </span>
//         </h1>
        
//         {/* Tagline */}
//         <div className="flex items-center justify-center gap-2 mb-10">
//           <Sparkles className="w-6 h-6 text-yellow-500" />
//           <p className="text-xl md:text-2xl font-light text-gray-700">
//             Where ancient tradition meets modern wonder
//           </p>
//           <Sparkles className="w-6 h-6 text-yellow-500" />
//         </div>

//         {/* About Section - Main Content */}
//         <div className="max-w-4xl mx-auto mb-12">
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/50">
//             <p className="text-lg md:text-xl text-gray-800 mb-5 leading-relaxed">
//               Welcome to <strong className="text-transparent bg-gradient-to-r from-[#000] to-[#5C7AC0] bg-clip-text">Karvaan Tours</strong>, your gateway to experiencing the real Japan. We craft <strong className="text-gray-900">personalized journeys</strong> that go beyond the ordinary tourist trail, revealing the heart and soul of this extraordinary land.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
//               From the neon-lit streets of <strong className="text-gray-900">Tokyo</strong> to the serene temples of <strong className="text-gray-900">Kyoto</strong>, from the majestic peak of <strong className="text-gray-900">Mount Fuji</strong> to the vibrant food scene of <strong className="text-gray-900">Osaka</strong>—we bring Japan's magic to life through authentic experiences, expert guides, and unforgettable moments.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Whether you're seeking cultural immersion, culinary adventures, or hidden gems off the beaten path, our team of passionate Japan experts creates journeys tailored perfectly to your dreams. <strong className="text-red-600">Your adventure. Your pace. Your perfect Japan story.</strong>
//             </p>
//           </div>
//         </div>

//         {/* Quick Highlights */}
//         <div className="max-w-3xl mx-auto mb-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="bg-gradient-to-br from-red-50 to-pink-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-3xl mb-2">🎎</div>
//               <div className="text-sm font-semibold text-gray-800">Cultural Immersion</div>
//             </div>
//             <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-3xl mb-2">🏯</div>
//               <div className="text-sm font-semibold text-gray-800">Hidden Treasures</div>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-3xl mb-2">🍜</div>
//               <div className="text-sm font-semibold text-gray-800">Culinary Journey</div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-3xl mb-2">⛩️</div>
//               <div className="text-sm font-semibold text-gray-800">Sacred Temples</div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Buttons */}
//        {/* <div className="flex flex-wrap items-center justify-center gap-4">
//   <Link to="/tours">
//     <button className="group bg-gradient-to-r from-[#000] to-[#5C7AC0] hover:from-red-700 hover:to-yellow-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
//       <span className="relative z-10">Start Your Journey</span>
//       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
//     </button>
//   </Link>

//   <Link to="/contact">
//     <button className="bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg border-2 border-yellow-400 shadow-lg transition-all hover:border-yellow-500 hover:shadow-xl hover:scale-105">
//       Contact us
//     </button>
//   </Link>
// </div> */}

//         {/* Bottom tagline */}
//         <p className="text-sm text-gray-600 mt-8 italic">
//           "Creating memories that last a lifetime, one journey at a time"
//         </p>
//       </div>
//     </section>
//   );
// }
// #fce7ec

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
      {/* <IntroVersion1/>
      <IntroVersion2/>
      <IntroVersion3/>
      <IntroVersion4/>
      <IntroVersion5/>
      <IntroVersion6/>
      <IntroVersion7/>
      <IntroVersion8/>
      <IntroVersion9/>
      <IntroVersion10/>
      <IntroVersion11/>
      <IntroVersion12/>
      <IntroVersion14/>
      <IntroVersion15/>
      <IntroVersion16/>
      <IntroVersion17/>
      <IntroVersion18/>
      <IntroVersion19/>
      <IntroVersion20/>
      <IntroVersion21/>
      <IntroVersion22/>
      <IntroVersion23/>
      <IntroVersion24/>
      <IntroVersion25/> */}
    </section>
  );
}