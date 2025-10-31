// Tokyo.jsx
import React, { useState } from "react";
import { Church, Building, MapPin, ShoppingCart, Trees, Camera, Store, Train, Utensils, Coffee, Users, Mountain } from "lucide-react";
import DestinationModal from "./DestinationModal";

const TokyoDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 4,
    name: "Tokyo",
    subtitle: "Where Tradition Meets Tomorrow",
    mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: `Tokyo, Japan's bustling capital, seamlessly blends ultra-modern architecture with historic temples, offering a unique contrast of tradition and innovation. The city pulses with energy yet also provides pockets of serenity, making it a destination that captivates every type of traveler. Perfect for tours in Japan Tokyo, guided tours in Japan, and small group tours in Japan—popular with travelers from the USA, Australia, and the Philippines.`,

longDescription: `Tokyo is a city of contrasts where ancient temples and shrines stand gracefully beside futuristic skyscrapers, neon-lit streets, and high-tech innovations. As the world's most populous metropolitan area with over 37 million people, Tokyo offers an endless array of experiences for visitors. From historic sites like Senso-ji Temple in Asakusa and Meiji Shrine in Shibuya to contemporary landmarks such as the Tokyo Skytree and Tokyo Tower, the city harmonizes the old and the new, reflecting centuries of culture alongside cutting-edge modernity.

Neighborhoods in Tokyo each have their own unique character. Shibuya dazzles with its famous crossing, shopping, and nightlife; Shinjuku combines skyscrapers with the peaceful Shinjuku Gyoen National Garden; Ginza offers high-end shopping and gourmet dining; Akihabara is the mecca for electronics, anime, and gaming culture; Harajuku provides vibrant youth culture, fashion, and quirky cafes. Each district has its own flavor, allowing travelers to experience multiple sides of the city in a single day. 

Food in Tokyo is as diverse as its neighborhoods. Michelin-starred restaurants sit alongside traditional izakayas and small ramen shops tucked in narrow alleyways. Sushi, tempura, kaiseki, and street food like takoyaki and yakitori provide a culinary journey that reflects Japan's rich gastronomic heritage. Tokyo’s markets, such as Tsukiji Outer Market and Toyosu Fish Market, offer fresh seafood and traditional ingredients, giving visitors a taste of authentic Japanese cuisine.

Cultural experiences abound in Tokyo. Museums such as the Tokyo National Museum, Mori Art Museum, and teamLab Borderless digital art museum showcase both traditional and contemporary art. Seasonal festivals, from cherry blossom viewing (hanami) in spring to vibrant summer matsuri, highlight Japan’s long-standing traditions and community spirit. Parks and gardens, including Ueno Park and the Imperial Palace East Gardens, provide tranquil escapes amidst the urban hustle.

For entertainment and nightlife, Tokyo offers something for everyone. The city’s theaters, concert halls, karaoke bars, and themed cafes cater to both locals and tourists. Nightlife districts like Roppongi and Kabukicho combine lively bars, clubs, and dining options, while quieter neighborhoods offer intimate cultural experiences and local hangouts. Modern attractions such as teamLab Planets, Odaiba’s futuristic entertainment complexes, and Tokyo Disneyland and DisneySea create unforgettable memories for families and travelers of all ages.

Tokyo also serves as a hub for day trips to nearby destinations such as Mount Fuji, Hakone, Nikko, Kamakura, and Yokohama. These excursions provide opportunities to explore Japan’s natural beauty, historic sites, and regional culture, all within easy reach of the capital. Transportation in Tokyo is extremely efficient, with an extensive subway and train network connecting neighborhoods, attractions, and surrounding regions, making it convenient for both short visits and extended stays.

Overall, Tokyo embodies the perfect balance between tradition and innovation, chaos and calm, history and modernity. Visitors can experience centuries-old cultural practices alongside futuristic technology, serene gardens alongside bustling streets, and gourmet dining alongside casual street food. Whether exploring sacred temples, shopping in high-end districts, enjoying vibrant nightlife, or simply observing the city’s energy from a quiet park bench, Tokyo offers a multidimensional and unforgettable experience that captures the spirit of Japan.`  
,
  highlights: [
  "Shibuya Crossing - World's busiest intersection with organized chaos, crossed by up to 3,000 people at once",
  "Senso-ji Temple - Tokyo's oldest temple dating back to 628 AD in historic Asakusa district",
  "Tokyo Skytree - 634m tall tower with breathtaking city panoramas, tallest structure in Japan",
  "Harajuku & Takeshita Street - Youth culture and fashion epicenter with colorful street style",
  "Tsukiji Outer Market - Fresh seafood and traditional Japanese breakfast experience",
  "TeamLab Borderless - Immersive digital art museum with interactive installations",
  "Meiji Shrine - Serene Shinto shrine surrounded by a peaceful forest in central Tokyo",
  "Odaiba - Modern entertainment hub with shopping, attractions, and waterfront views",
  "Akihabara - Electronics and anime district, famous for maid cafes and gaming culture",
  "Ueno Park & Zoo - Large public park with museums, cherry blossoms, and a historic zoo",
  "Tokyo National Museum - Japan’s oldest and largest museum showcasing art and artifacts",
  "Roppongi Hills - Luxury shopping, dining, and observation deck with city views",
  "Imperial Palace - Residence of the Emperor with beautiful East Gardens open to visitors",
  "Ginza - Upscale shopping district with designer boutiques, art galleries, and fine dining",
  "Yanaka District - Traditional Tokyo neighborhood with nostalgic streets, temples, and shops"
]
,
    bestTime: "March-May (Cherry Blossoms) & September-November (Mild Weather)",
    duration: "4-7 days",
    rating: 4.9,
    activities: ["City Tours", "Temple Visits", "Shopping", "Food Tours", "Photography", "Nightlife", "Museum Visits"],
    cuisine: ["Sushi", "Ramen", "Tempura", "Yakitori", "Tonkatsu", "Street Food", "Wagyu Beef", "Matcha Desserts"],
    transportation: "Extensive subway and JR train network with 13 metro lines, extremely efficient and punctual",
    accommodation: "From capsule hotels (¥3000) to luxury ryokans (¥50000+), every budget and style available",
   tips: [
  "Get Suica or Pasmo IC card for seamless public transport and convenience store payments",
  "Visit temples early morning (7-8am) to avoid crowds and experience peaceful atmosphere",
  "Try standing sushi bars (tachi-gui) for authentic and affordable experience",
  "Download Japan Transit Planner app for easy navigation on complex train system",
  "Bring cash as many small restaurants and shops may not accept credit cards",
  "Wear comfortable walking shoes - Tokyo involves a lot of walking and train transfers",
  "Check train schedules and avoid peak commuting hours (7-9am and 5-7pm) for comfort",
  "Explore side streets and local neighborhoods for hidden gems and small eateries",
  "Try seasonal street food in areas like Asakusa or Tsukiji Outer Market",
  "Carry a portable phone charger - long days of sightseeing drain battery quickly",
  "Use coin lockers at stations for storing bags while exploring attractions",
  "Visit observation decks like Tokyo Skytree or Tokyo Tower for city panoramas",
  "Take advantage of free Wi-Fi spots in major stations and tourist areas",
  "Respect local customs such as queuing and not talking loudly on trains",
   ]
,
    gallery: [
      "https://images.unsplash.com/photo-1646649806488-6ecec62f03e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFRzdWtpamklMjBPdXRlciUyME1hcmtldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Tokyo skyline night
      "https://images.unsplash.com/photo-1684224511966-09c5d5b6f3d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Vuc28tamklMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Shibuya crossing
      "https://images.unsplash.com/photo-1706813253696-10ee6332edd3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2Vuc28tamklMjBUZW1wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Tokyo street
      "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWtpaGFiYXJhJTIwRWxlY3RyaWMlMjBUb3dufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Tokyo tower night
      "https://plus.unsplash.com/premium_photo-1715106090962-9def47b4d8bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9reW8lMjBJbXBlcmlhbCUyMFBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Tokyo buildings
      "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2hpYnV5YSUyMENyb3NzaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Japanese temple
      "https://media.istockphoto.com/id/1219843172/photo/takeshite-street.webp?a=1&b=1&s=612x612&w=0&k=20&c=bGa1RBnxugKAu_mg_r558OLHs4s3ATlzsk0PHb8UvHM=", // Temple architecture
      "https://images.unsplash.com/photo-1703443371292-0d9081cc4787?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVpamklMjBTaHJpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Japanese shrine
      "https://images.unsplash.com/photo-1618478344639-5d934b25a0f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFlveW9naSUyMFBhcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Tokyo city view
      "https://images.unsplash.com/photo-1705695373213-115c102714fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2hpbmp1a3UlMjBHeW9lbiUyMEdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Mt Fuji from Tokyo
      "https://images.unsplash.com/photo-1707141249703-41ea35e7a4a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFNoaW5qdWt1JTIwR29sZGVuJTIwR2FpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Tokyo neon lights
      "https://media.istockphoto.com/id/1222684349/photo/tokyo-metropolitan-government-illuminated-by-blue.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Ug0CoAhNI6R9W462P2RW-Y1lqneH37EMJQ_L1G32XE=",  // Cherry blossoms Tokyo
      "https://images.unsplash.com/photo-1584202257553-4c07e497b675?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGVhbUxhYiUyMEJvcmRlcmxlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",  // Cherry blossoms Tokyo
      "https://images.unsplash.com/photo-1612486701496-b6ce3f27aba2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Um9wcG9uZ2klMjBIaWxsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",  // Cherry blossoms Tokyo
    ],
    itinerary: {
      tripName: " Best visit places in Tokyo City Highlights & Culture Tour",
      // tripDuration: "2 Days • 14 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Tsukiji Outer Market", icon: Store, color: "text-orange-600", 
          location: "Tsukiji Outer Market, Chuo City",  duration: "1.5 hours", 
          description: "Start early at Tokyo's famous seafood market. Fresh sushi breakfast, street food, and traditional Japanese ingredients.", 
          activities: ["Market exploration", "Fresh sushi breakfast", "Street food tasting"], 
          cost: "¥2000-3000" 
        },
        { 
          id: 2, day: 1, name: "Senso-ji Temple", icon: Church, color: "text-red-500", 
          location: "2-3-1 Asakusa, Taito City", duration: "2 hours", 
          description: "Tokyo's oldest temple (628 AD). Walk through massive Kaminarimon Gate with giant red lantern, shop at Nakamise Street.", 
          activities: ["Temple visit", "Nakamise shopping street", "Omikuji fortune drawing"], 
          cost: "Free" 
        },
        { 
          id: 3, day: 1, name: "Tokyo Skytree", icon: Building, color: "text-blue-600", 
          location: "1-1-2 Oshiage, Sumida City",  duration: "2 hours", 
          description: "634m tall broadcasting tower, tallest structure in Japan. Two observation decks at 350m and 450m with panoramic views.", 
          activities: ["Observation deck Tembo", "Sky Restaurant lunch", "Solamachi shopping mall"], 
          cost: "¥2100-3400" 
        },
        { 
          id: 4, day: 1, name: "Akihabara Electric Town", icon: Store, color: "text-yellow-600", 
          location: "Akihabara, Chiyoda City",  duration: "1.5 hours", 
          description: "Otaku paradise! Electronics, anime, manga, gaming arcades, and maid cafes. Tokyo's geek culture center.", 
          activities: ["Electronics shopping", "Arcade gaming", "Anime stores"], 
          cost: "¥1000-5000" 
        },
        { 
          id: 5, day: 1, name: "Tokyo Imperial Palace", icon: Mountain, color: "text-green-700", 
          location: "1-1 Chiyoda, Chiyoda City", duration: "1 hour", 
          description: "Home of Japanese Emperor. Beautiful East Gardens open to public with historic castle ruins and moats.", 
          activities: ["Garden walk", "Castle viewing", "Nijubashi Bridge photo"], 
          cost: "Free" 
        },
        { 
          id: 6, day: 1, name: "Shibuya Crossing", icon: MapPin, color: "text-purple-600", 
          location: "2-2-1 Dogenzaka, Shibuya City",  duration: "1.5 hours", 
          description: "World's busiest intersection with up to 3,000 people crossing at once. Iconic Tokyo experience with giant video screens.", 
          activities: ["Crossing experience", "Hachiko statue photo", "Shibuya 109 shopping"], 
          cost: "Free" 
        },
        { 
          id: 7, day: 1, name: "Harajuku & Takeshita Street", icon: ShoppingCart, color: "text-pink-500", 
          location: "Jingumae, Shibuya City", duration: "2 hours", 
          description: "Youth fashion capital with colorful street style. Trendy shops, unique fashion boutiques, and famous rainbow cotton candy.", 
          activities: ["Street fashion watching", "Crepe tasting", "Unique boutique shopping"], 
          cost: "¥1000-3000" 
        },
        { 
          id: 8, day: 2, name: "Meiji Shrine", icon: Trees, color: "text-green-600", 
          location: "1-1 Yoyogikamizonocho, Shibuya",  duration: "1.5 hours", 
          description: "Peaceful Shinto shrine dedicated to Emperor Meiji, surrounded by 70-hectare forest. Often see traditional weddings.", 
          activities: ["Shrine visit", "Forest walk through 100,000 trees", "Traditional ceremony viewing"], 
          cost: "Free" 
        },
        { 
          id: 9, day: 2, name: "Yoyogi Park", icon: Trees, color: "text-lime-600", 
          location: "Yoyogi Park, Shibuya City", duration: "1 hour", 
          description: "Tokyo's largest park. See street performers, cosplayers on weekends, and peaceful cherry blossoms in spring.", 
          activities: ["Park stroll", "Street performer watching", "Picnic area"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 2, name: "Shinjuku Gyoen Garden", icon: Trees, color: "text-emerald-600", 
          location: "11 Naitomachi, Shinjuku City",  duration: "1.5 hours", 
          description: "Stunning 58-hectare garden combining Japanese, English, and French landscape styles. 1,000+ cherry trees bloom in spring.", 
          activities: ["Garden walk", "Cherry blossom viewing", "Traditional tea house"], 
          cost: "¥500" 
        },
        { 
          id: 11, day: 2, name: "Shinjuku Golden Gai", icon: Store, color: "text-amber-600", 
          location: "1 Chome Kabukicho, Shinjuku",  duration: "1 hour", 
          description: "Tiny bar district with 200+ micro-bars in narrow alleys. Each bar seats only 5-10 people. Unique Tokyo nightlife experience.", 
          activities: ["Alley exploration", "Bar hopping", "Local interaction"], 
          cost: "¥500-1000 per bar" 
        },
        { 
          id: 12, day: 2, name: "Tokyo Metropolitan Government Building", icon: Building, color: "text-gray-700", 
          location: "2-8-1 Nishishinjuku, Shinjuku",  duration: "1 hour", 
          description: "Free observation deck at 202m! Panoramic views of Tokyo including Mt. Fuji on clear days. Designed by famous architect Kenzo Tange.", 
          activities: ["Free observation deck", "City views", "Mt Fuji spotting"], 
          cost: "Free" 
        },
        { 
          id: 13, day: 2, name: "TeamLab Borderless", icon: Camera, color: "text-pink-600", 
          location: "Azabudai Hills, Minato City",  duration: "2 hours", 
          description: "Immersive digital art museum with interactive installations. Rooms filled with projections, lights, and moving art. Must pre-book!", 
          activities: ["Digital art experience", "Interactive installations", "Photography"], 
          cost: "¥3800" 
        },
        { 
          id: 14, day: 2, name: "Roppongi Hills", icon: Building, color: "text-indigo-600", 
          location: "6-10-1 Roppongi, Minato City",  duration: "2 hours", 
          description: "Modern complex with shopping, dining, Tokyo City View observation deck, and Mori Art Museum. Beautiful night views.", 
          activities: ["Night view", "Mori Art Museum", "Luxury shopping"], 
          cost: "¥2000" 
        }
      ]
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openInGoogleMaps = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <DestinationModal 
      data={data} 
      onClose={onClose} 
      expandedItems={expandedItems} 
      toggleExpand={toggleExpand} 
      openInGoogleMaps={openInGoogleMaps} 
    />
  );
};

export default TokyoDetail;
// let see 