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
    description: "Tokyo, Japan's bustling capital, seamlessly blends ultra-modern architecture with historic temples, offering a unique contrast of tradition and innovation.",
    longDescription: "Tokyo is a city of contrasts where ancient temples stand beside futuristic skyscrapers. As the world's most populous metropolitan area with over 37 million people, it offers endless experiences - from serene gardens to neon-lit entertainment districts, Michelin-starred restaurants to tiny ramen shops.",
    highlights: [
      "Shibuya Crossing - World's busiest intersection with organized chaos, crossed by up to 3,000 people at once",
      "Senso-ji Temple - Tokyo's oldest temple dating back to 628 AD in historic Asakusa district",
      "Tokyo Skytree - 634m tall tower with breathtaking city panoramas, tallest structure in Japan",
      "Harajuku & Takeshita Street - Youth culture and fashion epicenter with colorful street style",
      "Tsukiji Outer Market - Fresh seafood and traditional Japanese breakfast experience",
      "TeamLab Borderless - Immersive digital art museum with interactive installations"
    ],
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
      "Download Japan Transit Planner app for easy navigation on complex train system"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=800&fit=crop", // Tokyo skyline night
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=800&fit=crop", // Shibuya crossing
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=800&fit=crop", // Tokyo street
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=800&fit=crop", // Tokyo tower night
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=800&fit=crop", // Tokyo buildings
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop", // Japanese temple
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=800&fit=crop", // Temple architecture
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=800&fit=crop", // Japanese shrine
      "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=800&h=800&fit=crop", // Tokyo city view
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop", // Mt Fuji from Tokyo
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=800&fit=crop", // Tokyo neon lights
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=800&fit=crop"  // Cherry blossoms Tokyo
    ],
    itinerary: {
      tripName: "Tokyo City Highlights & Culture Tour",
      tripDuration: "2 Days • 14 Destinations",
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