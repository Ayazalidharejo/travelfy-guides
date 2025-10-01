

// "use client";
// import React from "react";

// const galleryCards = [
//   {
//     src: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=800&q=80",
//     title: "Tokyo",
//     subtitle: "Tradition Meets Tomorrow",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
//     title: "Kyoto",
//     subtitle: "Where Culture Blooms",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1504788363733-507549153474?auto=format&fit=crop&w=800&q=80",
//     title: "Osaka",
//     subtitle: "Vibrant Nights, Delicious Bites",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1584422022290-06639d5f1877?auto=format&fit=crop&w=800&q=80",
//     title: "Mount Fuji",
//     subtitle: "Nature’s Majestic Wonder",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1619022983184-e6c263346a61?auto=format&fit=crop&w=800&q=80",
//     title: "Hokkaido",
//     subtitle: "Snowy Peaks & Serenity",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1607082349250-f5ef37602f72?auto=format&fit=crop&w=800&q=80",
//     title: "Okinawa",
//     subtitle: "Island of Eternal Summer",
//   },
// ];

// const Gallery: React.FC = () => {
//   return (
//     <section className="bg-white py-20 px-6 md:px-20">
//       <div className="max-w-6xl mx-auto text-center">
//         {/* Section Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Moments from{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
//             Karvaan Tours
//           </span>
//         </h2>

//         <p className="text-gray-700 text-lg md:text-xl mb-12">
//           Experience the beauty of Japan through the lens of our past travelers.
//         </p>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {galleryCards.map((card, index) => (
//             <div
//               key={index}
//               className="relative group h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
//             >
//               {/* Background Image */}
//               <img
//                 src={card.src}
//                 alt={card.title}
//                 className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//               />

//               {/* Overlay Content */}
//               <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
//                 <h3 className="text-2xl font-bold text-white">{card.title}</h3>
//                 <p className="text-white mt-2 italic">{card.subtitle}</p>
//                 <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//                   View More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Gallery;



"use client";
import React, { useState } from "react";
import { X, MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train } from "lucide-react";

const japanPlaces = [
  {
    id: 1,
    name: "Tokyo",
    subtitle: "Tradition Meets Tomorrow",
    mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description: "Tokyo, Japan's bustling capital, seamlessly blends ultra-modern architecture with historic temples. From the neon lights of Shibuya to the serene Meiji Shrine, this megacity offers endless discoveries. Experience cutting-edge technology, world-class cuisine, and vibrant pop culture.",
    longDescription: "Tokyo is a city of contrasts where ancient temples stand beside futuristic skyscrapers. As the world's most populous metropolitan area, it offers an incredible array of experiences. Start your day at the historic Senso-ji Temple in Asakusa, then dive into the electric atmosphere of Shibuya Crossing. Explore the trendy neighborhoods of Harajuku and Shibuya, visit the peaceful Meiji Shrine, and end your evening in the neon-lit streets of Shinjuku. Tokyo's food scene is unparalleled, from Michelin-starred restaurants to tiny ramen shops. The city's efficient public transportation makes it easy to explore, and there's always something new to discover around every corner.",
    highlights: [
      "Shibuya Crossing - World's busiest intersection with thousands crossing simultaneously",
      "Senso-ji Temple - Tokyo's oldest temple dating back to 628 AD",
      "Tokyo Skytree - 634m tall observation tower with panoramic city views",
      "Tsukiji Outer Market - Fresh seafood paradise and street food haven",
      "Harajuku - Fashion and youth culture hub with unique street style",
      "Meiji Shrine - Peaceful Shinto shrine in the heart of the city",
      "Akihabara - Electronic and anime culture district",
      "Tokyo Tower - Iconic red and white landmark"
    ],
    bestTime: "March-May (Cherry Blossoms) & September-November (Mild Weather)",
    duration: "4-6 days",
    rating: 4.9,
    activities: ["City Tours", "Temple Visits", "Shopping", "Food Tours", "Photography", "Nightlife"],
    cuisine: ["Sushi", "Ramen", "Tempura", "Yakitori", "Street Food"],
    transportation: "Extensive subway and train network, extremely efficient and punctual",
    accommodation: "From capsule hotels to luxury ryokans, wide range of options available",
    tips: [
      "Get a Suica or Pasmo card for easy transportation",
      "Visit early morning to avoid crowds at popular temples",
      "Try standing sushi bars for authentic experience",
      "Respect local customs and etiquette",
      "Download offline maps and translation apps"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590829536736-bf151c83d5c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551633450-b5f3c644e648?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522424427542-68a475ceed6d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "Kyoto",
    subtitle: "Ancient Capital of Culture",
    mainImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "Kyoto, the cultural heart of Japan, preserves over 2,000 temples and shrines. This ancient capital enchants visitors with traditional geisha districts, zen gardens, and bamboo groves. Experience authentic tea ceremonies, explore historic palaces, and witness timeless Japanese traditions.",
    longDescription: "Kyoto served as Japan's capital for over 1,000 years and remains the cultural soul of the nation. With 17 UNESCO World Heritage Sites, this city is a living museum of Japanese history and tradition. Walk through the iconic red torii gates of Fushimi Inari, marvel at the golden splendor of Kinkaku-ji, and lose yourself in the mystical Arashiyama Bamboo Grove. The Gion district offers glimpses of geishas hurrying to appointments, while traditional machiya townhouses line quiet streets. Kyoto's kaiseki cuisine represents the pinnacle of Japanese culinary art, and participating in a tea ceremony here connects you to centuries of tradition. Every season brings new beauty, from cherry blossoms in spring to vibrant maple leaves in autumn.",
    highlights: [
      "Fushimi Inari Shrine - Thousands of vermilion torii gates creating tunnels up the mountain",
      "Kinkaku-ji (Golden Pavilion) - Stunning Zen temple covered in gold leaf",
      "Arashiyama Bamboo Grove - Towering bamboo forest creating an otherworldly atmosphere",
      "Gion District - Traditional geisha quarter with wooden machiya houses",
      "Kiyomizu-dera - UNESCO temple with wooden stage offering city views",
      "Nijo Castle - Former residence of Tokugawa shoguns",
      "Philosopher's Path - Cherry blossom-lined canal walk",
      "Nishiki Market - Kyoto's 400-year-old food market"
    ],
    bestTime: "March-April (Cherry Blossoms) & November (Autumn Colors)",
    duration: "3-5 days",
    rating: 4.9,
    activities: ["Temple Hopping", "Tea Ceremony", "Kimono Wearing", "Garden Tours", "Geisha Spotting", "Bamboo Forest Walk"],
    cuisine: ["Kaiseki", "Yudofu", "Matcha Desserts", "Obanzai", "Kyoto Wagashi"],
    transportation: "Buses are main transport, also subway lines and trains available",
    accommodation: "Traditional ryokans highly recommended for authentic experience",
    tips: [
      "Visit Fushimi Inari early morning to avoid crowds",
      "Purchase a bus day pass for unlimited travel",
      "Book tea ceremonies and kimono rentals in advance",
      "Respect temple etiquette and photography rules",
      "Explore small side streets for hidden gems"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484804959297-65e7c19d7c9f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624253321806-cff86f6e1b2b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518820755499-666aa6d5c4b2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    name: "Mount Fuji",
    subtitle: "Japan's Sacred Peak",
    mainImage: "https://images.unsplash.com/photo-1576675466848-be8cca8c0f58?auto=format&fit=crop&w=1200&q=80",
    description: "Mount Fuji, standing at 3,776 meters, is Japan's highest and most iconic mountain. This perfectly symmetrical volcanic cone has inspired artists for centuries. Surrounded by five lakes and beautiful landscapes, it offers breathtaking views, hiking trails, and spiritual significance.",
    longDescription: "Mount Fuji is more than just Japan's tallest peak - it's a sacred symbol deeply embedded in Japanese culture and spirituality. This active stratovolcano last erupted in 1707 and is now a UNESCO World Heritage Site. The climbing season runs from July to September when thousands attempt the challenging ascent to watch sunrise from the summit. The Fuji Five Lakes region at the mountain's base offers year-round beauty with stunning reflections of the peak on clear days. Lake Kawaguchi is particularly popular for photographers. The nearby Hakone region provides hot spring resorts with views of Fuji, while Chureito Pagoda offers the most iconic photo opportunity with the five-story pagoda framing the mountain. Whether climbing to the summit or admiring from afar, Fuji-san captivates all who see it.",
    highlights: [
      "Summit Climb - Challenging 6-8 hour trek to watch sunrise from 3,776m peak",
      "Lake Kawaguchi - Most accessible of Five Lakes with perfect Fuji reflections",
      "Chureito Pagoda - Iconic five-story pagoda with cherry blossoms and Fuji view",
      "Fuji Five Lakes - Kawaguchi, Yamanaka, Sai, Shoji, and Motosu lakes",
      "Hakone - Hot spring resort town with Fuji views and art museums",
      "Aokigahara Forest - Dense forest at Fuji's base (also called Sea of Trees)",
      "Oshino Hakkai - Eight sacred ponds with crystal clear spring water",
      "Fuji-Q Highland - Amusement park with thrilling roller coasters"
    ],
    bestTime: "July-September (Climbing) & October-February (Clear Views)",
    duration: "2-3 days",
    rating: 4.8,
    activities: ["Mountain Climbing", "Lake Cruises", "Photography", "Hot Springs", "Hiking Trails", "Cable Car Rides"],
    cuisine: ["Hoto Noodles", "Fujinomiya Yakisoba", "Lake Fish", "Mountain Vegetables"],
    transportation: "Train to Kawaguchiko, then buses; car rental recommended for flexibility",
    accommodation: "Lakeside hotels, traditional ryokans with onsen, mountain huts for climbers",
    tips: [
      "Book mountain huts months in advance for overnight climbing",
      "Start climb in afternoon, rest at 7th/8th station, summit for sunrise",
      "Bring warm clothes even in summer - summit is cold",
      "Visit on weekdays to avoid crowds",
      "Check weather forecasts - Fuji creates its own weather"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570145820259-a25a6a5d6f41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583319414569-a8f88a7f35e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576670159805-381d4d3a6b17?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617134135682-3e1f0f2ed9c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584422022290-06639d5f1877?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626433499373-20baa892e994?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    name: "Osaka",
    subtitle: "Kitchen of Japan",
    mainImage: "https://images.unsplash.com/photo-1590253230532-a67f2dc7e55e?auto=format&fit=crop&w=1200&q=80",
    description: "Osaka, Japan's third-largest city, is famous for its delicious street food and vibrant nightlife. Known as the 'Nation's Kitchen,' this energetic metropolis offers incredible culinary experiences, historic castles, and friendly locals. Experience the true taste of Japanese urban culture.",
    longDescription: "Osaka is Japan's kitchen and comedy capital, known for its food-obsessed culture and outgoing people. The city's merchant heritage created a unique atmosphere where locals pride themselves on hospitality and humor. Dotonbori's neon-lit streets showcase the famous running Glico Man sign and offer endless street food options - takoyaki, okonomiyaki, kushikatsu, and more. Osaka Castle, one of Japan's most famous landmarks, tells stories of samurai and shoguns. The Shinsekai district preserves retro Showa-era charm with its Tsutenkaku Tower. Universal Studios Japan offers world-class entertainment, while the Kuromon Market provides authentic local food experiences. Osaka serves as an excellent base for exploring nearby Kyoto, Nara, and Kobe, all within easy reach.",
    highlights: [
      "Osaka Castle - Magnificent 16th-century fortress with museum and beautiful grounds",
      "Dotonbori - Neon-lit entertainment district famous for street food and nightlife",
      "Universal Studios Japan - World-class theme park with unique Japanese attractions",
      "Kuromon Market - 'Osaka's Kitchen' with 150+ shops selling fresh seafood",
      "Shinsekai - Retro entertainment district with Tsutenkaku Tower",
      "Osaka Aquarium Kaiyukan - One of world's largest aquariums",
      "Umeda Sky Building - Futuristic building with floating garden observatory",
      "Shitennoji Temple - Japan's oldest officially-administered temple"
    ],
    bestTime: "March-May & September-November (Mild Weather)",
    duration: "2-4 days",
    rating: 4.7,
    activities: ["Food Tours", "Castle Visits", "Shopping", "Theme Parks", "River Cruises", "Comedy Shows"],
    cuisine: ["Takoyaki", "Okonomiyaki", "Kushikatsu", "Fugu", "Osaka Sushi"],
    transportation: "Extensive subway and JR lines, very affordable and efficient",
    accommodation: "Budget-friendly options, business hotels, and luxury stays available",
    tips: [
      "Say 'Ookini' instead of 'Arigato' like locals do",
      "Never double-dip kushikatsu in communal sauce",
      "Visit Dotonbori at night for best atmosphere",
      "Get Osaka Amazing Pass for free attractions and transport",
      "Try standing bars for cheap drinks and local interaction"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534274867514-d5b47f750f1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591619593541-ce65e5d1793f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548048026-5a1a941d93d3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624356381799-b6d52e81a1d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1628745239842-d0d03b2e33d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601823984263-b55d490ee1fe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598199877908-a9366c5d1eda?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504788230298-b0750fe7608a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "Hokkaido",
    subtitle: "Northern Wilderness",
    mainImage: "https://images.unsplash.com/photo-1560252556-e98b9cd46569?auto=format&fit=crop&w=1200&q=80",
    description: "Hokkaido, Japan's northernmost island, offers pristine natural beauty and world-class skiing. Experience stunning national parks, hot springs, fresh seafood, and the famous Sapporo Snow Festival. This winter wonderland transforms into a colorful paradise during summer with lavender fields and flower gardens.",
    longDescription: "Hokkaido is Japan's wild frontier, offering vast wilderness, powder snow skiing, and unique cultural experiences. Sapporo, the capital, hosts the world-famous Snow Festival every February, attracting millions to see massive ice sculptures. Niseko has become an international ski resort destination with incredibly light powder snow. In summer, Furano and Biei transform into rainbow landscapes with endless flower fields, particularly the purple lavender. Hokkaido's food scene is exceptional - fresh seafood from cold waters, Sapporo beer, Genghis Khan lamb BBQ, and rich dairy products. The indigenous Ainu culture adds another dimension to the island's heritage. Shiretoko National Park, a UNESCO World Heritage Site, offers pristine wilderness with brown bears, while the remote Akan and Daisetsuzan national parks provide true backcountry experiences.",
    highlights: [
      "Sapporo Snow Festival - Massive ice sculptures festival every February",
      "Niseko - World-renowned powder snow skiing and snowboarding",
      "Furano Lavender Fields - Endless purple fields bloom in July",
      "Biei Blue Pond - Stunning artificial pond with supernatural blue color",
      "Shiretoko National Park - UNESCO wilderness with bears and wildlife",
      "Otaru Canal - Historic port town with glassware and music boxes",
      "Hakodate - Historic port city with night views and morning market",
      "Jigokudani (Hell Valley) - Volcanic valley with hot springs"
    ],
    bestTime: "February (Snow Festival & Skiing) & July-August (Lavender)",
    duration: "5-7 days",
    rating: 4.8,
    activities: ["Skiing/Snowboarding", "Hot Springs", "Wildlife Watching", "Flower Viewing", "Seafood Tours", "Hiking"],
    cuisine: ["Fresh Seafood", "Soup Curry", "Jingisukan", "Sapporo Ramen", "Dairy Products"],
    transportation: "Car rental recommended for flexibility, trains connect major cities",
    accommodation: "Ski resorts, onsen ryokans, city hotels in Sapporo",
    tips: [
      "Rent a car to explore rural areas and flower fields",
      "Book ski accommodations well in advance",
      "Try uni (sea urchin) and ikura (salmon roe) donburi",
      "Winter requires serious cold weather gear",
      "Visit multiple onsen towns for varied experiences"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583725094311-ee8f5c85d63b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612556975381-cd3ac98f7098?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553531087-32e45f922b43?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583498602475-76067f4a6bed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619022983184-e6c263346a61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 6,
    name: "Okinawa",
    subtitle: "Tropical Paradise",
    mainImage: "https://images.unsplash.com/photo-1598024055266-e772a5f8c128?auto=format&fit=crop&w=1200&q=80",
    description: "Okinawa, Japan's subtropical island paradise, features crystal-clear waters, white sandy beaches, and unique Ryukyuan culture. This chain of islands offers incredible diving, snorkeling, and a laid-back atmosphere. Experience a different side of Japan with its distinct traditions, cuisine, and natural beauty.",
    longDescription: "Okinawa is Japan's tropical escape, a chain of 160 islands stretching toward Taiwan. The main island blends Japanese and distinct Ryukyuan culture, with influences from China and America. Naha, the capital, centers around Kokusai Street and the restored Shuri Castle, former seat of the Ryukyu Kingdom. The Churaumi Aquarium is world-class, featuring whale sharks and manta rays. Okinawa's beaches rival any tropical destination - Emerald Beach, Manza Beach, and the remote Kerama Islands offer pristine waters perfect for diving and snorkeling. The island's cuisine is unique - try goya champuru, Okinawa soba, and awamori spirit. The islands' residents are known for longevity, attributed to their healthy diet and lifestyle. Southern islands like Ishigaki and Miyakojima offer even more remote paradise experiences with incredible coral reefs.",
    highlights: [
      "Churaumi Aquarium - One of world's largest aquariums with whale sharks",
      "Shuri Castle - Restored UNESCO site of Ryukyu Kingdom (rebuilt after 2019 fire)",
      "Kerama Islands - Pristine diving and snorkeling paradise",
      "Cape Manzamo - Dramatic cliff formations with ocean views",
      "Ishigaki Island - Remote paradise with coral reefs and beaches",
      "American Village - Shopping and entertainment district",
      "Okinawa World - Cultural theme park with massive cave system",
      "Miyakojima - Beautiful island with stunning beaches"
    ],
    bestTime: "April-June & September-October (Avoid Typhoon Season)",
    duration: "4-6 days",
    rating: 4.7,
    activities: ["Scuba Diving", "Snorkeling", "Beach Activities", "Island Hopping", "Cultural Tours", "Marine Sports"],
    cuisine: ["Goya Champuru", "Okinawa Soba", "Taco Rice", "Umibudo", "Awamori"],
    transportation: "Car rental essential for main island, ferries between islands",
    accommodation: "Beach resorts, guesthouses, traditional minshuku available",
    tips: [
      "Rent a car to explore hidden beaches and attractions",
      "Book diving trips in advance during peak season",
      "Try shisa lion statues hunting - they're everywhere",
      "Respect local culture - pace is slower than mainland",
      "Visit remote islands for fewer crowds and pristine nature"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566054531654-af7c3462bdbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const Gallery: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Explore Beautiful{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Japan Destinations
          </span>
        </h2>

        <p className="text-gray-700 text-lg md:text-xl mb-12">
          Discover the most breathtaking places in Japan with Karvaan Tours
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {japanPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className="relative group h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={place.mainImage}
                alt={place.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6">
                <h3 className="text-2xl font-bold text-white">{place.name}</h3>
                <p className="text-white mt-2 italic">{place.subtitle}</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlace(null)}
                className="sticky top-4 float-right mr-4 mt-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-96 rounded-t-2xl overflow-hidden">
                <img
                  src={selectedPlace.mainImage}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h2 className="text-5xl font-bold mb-2">{selectedPlace.name}</h2>
                    <p className="text-2xl italic">{selectedPlace.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Best Time to Visit</p>
                      <p className="font-semibold text-sm text-gray-800">{selectedPlace.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
                    <Clock className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Recommended Duration</p>
                      <p className="font-semibold text-gray-800">{selectedPlace.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Traveler Rating</p>
                      <p className="font-semibold text-gray-800">{selectedPlace.rating}/5.0</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Compass className="w-8 h-8 text-red-600" />
                    About {selectedPlace.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">{selectedPlace.description}</p>
                  <p className="text-gray-600 leading-relaxed">{selectedPlace.longDescription}</p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Camera className="w-8 h-8 text-red-600" />
                    Top Highlights & Attractions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPlace.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                        <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities & Cuisine Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Activities */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <Users className="w-7 h-7 text-blue-600" />
                      Popular Activities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.activities.map((activity, idx) => (
                        <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cuisine */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <Utensils className="w-7 h-7 text-orange-600" />
                      Local Cuisine
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.cuisine.map((food, idx) => (
                        <span key={idx} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transportation & Accommodation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                      <Train className="w-6 h-6 text-purple-600" />
                      Transportation
                    </h3>
                    <p className="text-gray-700">{selectedPlace.transportation}</p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                      <Hotel className="w-6 h-6 text-pink-600" />
                      Accommodation
                    </h3>
                    <p className="text-gray-700">{selectedPlace.accommodation}</p>
                  </div>
                </div>

                {/* Travel Tips */}
                <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">💡 Insider Travel Tips</h3>
                  <ul className="space-y-2">
                    {selectedPlace.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-indigo-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Photo Gallery */}
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <Camera className="w-8 h-8 text-red-600" />
                    Photo Gallery ({selectedPlace.gallery.length}+ Images)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {selectedPlace.gallery.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <img
                          src={img}
                          alt={`${selectedPlace.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;