

// import React from 'react';
// import { Mountain, Building2, Sparkles, Utensils, Train, Camera, Heart, Globe, Calendar, MapPin, Cherry, Shield } from 'lucide-react';

// export default function DiscoverJapan() {
//   return (
//     <div className=" bg-gradient-to-b from-white to-gray-50 my-5">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-[#fff] to-[#EDE3D8] text- py-24 px-6">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-6xl font-bold mb-6">Discover Japan With US</h1>
//           <p className="text-2xl font-light mb-4">
//             Where Ancient Tradition Meets Cutting-Edge Innovation
//           </p>
//           <p className="text-lg opacity-90 max-w-3xl mx-auto">
//             Explore the Land of the Rising Sun - a fascinating country that seamlessly blends centuries-old culture with futuristic technology
//             Explore the Land of the Rising Sun - a fascinating country that seamlessly blends centuries-old culture with futuristic technology
//           </p>
//         </div>
//       </div>

      
//     </div>
//   );
// }

import React from 'react';
import { Cherry, Users, Shield, Award } from 'lucide-react';

export default function DiscoverJapan() {
  return (
    <div className="relative bg-gradient-to-r from-[#fff] to-[#EDE3D8] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Premium Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Cherry className="w-8 h-8 text-pink-500" />
          <span className="text-sm font-semibold text-gray-600 tracking-widest uppercase">
            Premium Japan Tours
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Discover Japan With <span className="text-blue-600">Voyage Stories</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl font-light mb-6 text-gray-700">
          Where Ancient Tradition Meets Cutting-Edge Innovation
        </p>
        
        {/* About Voyage Stories */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
            <strong className="text-gray-900">Voyage Stories</strong> is your trusted partner for authentic Japan experiences. We are a team of passionate travel experts specializing in <strong className="text-gray-900">customized private tours</strong> that showcase the real essence of Japan. With expert local guides, premium transportation, 24/7 customer support, and free cancellation within 24 hours, we ensure your Japanese adventure is seamless and unforgettable.
          </p>
        </div>

        {/* About Japan */}
        <div className="max-w-4xl mx-auto mb-10">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
            Experience the magical Land of the Rising Sun – a country where ancient temples stand beside futuristic skyscrapers, where serene zen gardens meet neon-lit streets. Explore <strong className="text-gray-900">Tokyo's</strong> electric energy, <strong className="text-gray-900">Kyoto's</strong> 2,000+ historic temples, <strong className="text-gray-900">Mount Fuji's</strong> majestic beauty, and <strong className="text-gray-900">Osaka's</strong> world-famous street food scene.
          </p>
          {/* <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Witness cherry blossoms in spring, ride the legendary bullet train at 320 km/h, savor authentic sushi and wagyu beef, immerse yourself in traditional tea ceremonies, and discover hidden bamboo forests. From sacred shrines to robot restaurants, from peaceful gardens to vibrant anime districts – Japan offers experiences you'll find nowhere else on Earth.
          </p> */}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all transform hover:scale-105">
           Customize your Tour
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 shadow-md transition-all hover:border-gray-400">
            View Tours
          </button>
        </div>

        {/* Trust Indicators */}
        {/* <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base">
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 text-blue-600" />
            <span><strong className="text-gray-900">1000+</strong> Happy Travelers</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Shield className="w-5 h-5 text-green-600" />
            <span><strong className="text-gray-900">Free</strong> Cancellation (24hrs)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Award className="w-5 h-5 text-yellow-600" />
            <span><strong className="text-gray-900">Expert</strong> Local Guides</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}