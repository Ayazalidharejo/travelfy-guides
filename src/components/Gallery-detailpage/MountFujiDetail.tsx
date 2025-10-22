// MountFuji.jsx
import React, { useState } from "react";
import { 
  X, MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train,
  ChevronDown, ChevronUp, Navigation, PlayCircle, Building, Mountain, Church, 
  ShoppingCart, Waves, Cable, Trees, Store, Gamepad2, Target, Info, Coffee, Music, Film
} from "lucide-react";
import DestinationModal from "./DestinationModal";

const MountFujiDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 1,
    name: "Mount Fuji",
    subtitle: "Japan's Sacred Peak",
    mainImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=800&fit=crop",
    description: "Mount Fuji, standing at 3,776 meters, is Japan's highest and most iconic mountain. This perfectly symmetrical volcanic cone has inspired artists for centuries.",
    longDescription: "Mount Fuji is more than just Japan's tallest peak - it's a sacred symbol deeply embedded in Japanese culture and spirituality. This active stratovolcano last erupted in 1707 and is now a UNESCO World Heritage Site.",
    highlights: [
      "Summit Climb - Challenging 6-8 hour trek to watch sunrise from 3,776m peak",
      "Lake Kawaguchi - Most accessible of Five Lakes with perfect Fuji reflections",
      "Chureito Pagoda - Iconic five-story pagoda with cherry blossoms and Fuji view",
      "Fuji Five Lakes - Kawaguchi, Yamanaka, Sai, Shoji, and Motosu lakes"
    ],
    bestTime: "July-September (Climbing) & October-February (Clear Views)",
    rating: 4.9,
    activities: ["Mountain Climbing", "Lake Cruises", "Photography", "Hiking Trails", "Shrine Visits", "Cable Car Rides"],
    cuisine: ["Hoto Noodles", "Fujinomiya Yakisoba", "Lake Fish", "Mountain Vegetables", "Fuji Tofu"],
    transportation: "Train to Kawaguchiko Station, then buses; express buses from Tokyo available",
    accommodation: "Lakeside hotels, mountain huts for climbers, traditional ryokans with Fuji views",
    tips: [
      "Book mountain huts months in advance for overnight climbing",
      "Start climb in afternoon, rest at station, summit for sunrise",
      "Bring warm clothes even in summer - summit temperature near freezing"
    ],
   gallery: [
  // 1. Chureito Pagoda
  "https://images.unsplash.com/photo-1677254817050-cb9b29fbb16e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2h1cmVpdG8lMjBQYWdvZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 2. Oshino Hakkai
  "https://images.unsplash.com/photo-1742223964139-0a0a309fb5ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3NoaW5vJTIwSGFra2FpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

  // 3. Arakura Fuji Sengen Shrine
  "https://images.unsplash.com/photo-1685460196051-d1f336e6ce96?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJha3VyYSUyMEZ1amklMjBTZW5nZW4lMjBTaHJpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 4. Kawaguchiko Lawson
  "https://images.unsplash.com/photo-1683976886501-055f309e6eab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGFrZSUyMEthd2FndWNoaWtvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

  // 5. Lake Kawaguchiko
  "https://images.unsplash.com/photo-1623529467457-11e110919d85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VucmlzZSUyMGF0JTIwTXQuJTIwRnVqaSUyMDV0aCUyMFN0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 6. Sunrise at Mt. Fuji 5th Station
  "https://images.unsplash.com/photo-1657199372069-bd8cb49315c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T2lzaGklMjBQYXJrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

  // 7. Kachi-Kachi Ropeway
  "https://images.unsplash.com/photo-1657199372069-bd8cb49315c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T2lzaGklMjBQYXJrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

  // 8. Oishi Park
  "https://images.unsplash.com/photo-1682394549510-538a3a2b5c32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnVqaS1RJTIwSGlnaGxhbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 9. Saiko Iyashi-no-Sato Nenba
  "https://media.istockphoto.com/id/2217331180/photo/saiko-iyashi-no-sato-nenba-traditional-japanese-village-scene.webp?a=1&b=1&s=612x612&w=0&k=20&c=dPiJFPuM3UQ6aZCwskctJD75I4CxwCLw_bhfIvKrWoE=",

  // 10. Fuji-Q Highland
  "https://images.unsplash.com/photo-1740732281588-83032598fe25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RnVqaS1RJTIwSGlnaGxhbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 11. Fuji Honchodori
  "https://images.unsplash.com/photo-1740732281588-83032598fe25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RnVqaS1RJTIwSGlnaGxhbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",

  // 12. Wind Cave
  "https://plus.unsplash.com/premium_photo-1749755216861-8df36b01e91f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEZ1amklMjBIb25jaG9kb3JpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",

  // 13. Ice Cave
  "https://images.unsplash.com/photo-1718664383798-cc5a3b6c620e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MTMlMjBXaW5kJTIwY2F2ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // new image

  // 14. Kitaguchi Hongu Fuji Sengen Shrine
  "https://images.unsplash.com/photo-1575683990472-562331e63ae6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SWNlJTIwY2F2ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // new image

  // 15. Lake Shoji
  "https://images.unsplash.com/photo-1738676721795-a8435cdb5f48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEtpdGFndWNoaSUyMGhhbmd1JTIwRnVqaSUyMHNlbmdlbiUyMHNocmluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // new image
  "https://images.unsplash.com/photo-1745244513666-2012e27f0f13?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TGFrZSUyMFNob2ppfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" // new image
],

    itinerary: {
      tripName: "Best Places to Visit from Tokyo to Mount Fuji Adventure",
      // tripDuration: "2 Days • 15 Destinations",
      items: [
       
        { 
          id: 2, day: 1, name: "Chureito Pagoda", icon: Building, color: "text-red-500", 
          location: "Chureito Pagoda, Fujiyoshida",  
          description: "The iconic five-story pagoda with Mt. Fuji backdrop. Climb 400 steps for breathtaking views.", 
          activities: ["Photography", "Hiking 400 steps", "Scenic views"], 
          cost: "Free entry" 
        },
        { 
          id: 3, day: 1, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600", 
          location: "Oshino Hakkai, Yamanashi",  
          description: "Eight sacred ponds with crystal-clear spring water fed by Mt. Fuji's snowmelt.", 
          activities: ["Pond viewing", "Traditional village walk", "Local snacks"], 
          cost: "¥300 pond area entry" 
        },
        { 
          id: 4, day: 1, name: "Arakura Fuji Sengen Shrine", icon: Church, color: "text-orange-600", 
          location: "Arakura Fuji Sengen Shrine, Fujiyoshida",   
          description: "Ancient shrine at the base of Chureito Pagoda. Peaceful atmosphere with Mt. Fuji views.", 
          activities: ["Shrine visit", "Prayer", "Omikuji fortune"], 
          cost: "Free" 
        },
        { 
          id: 5, day: 1, name: "Kawaguchiko Lawson", icon: ShoppingCart, color: "text-blue-500", 
          location: "Lawson Kawaguchiko Station", 
          description: "Famous convenience store with perfect Mt. Fuji framing! A must-visit Instagram spot.", 
          activities: ["Photo opportunity", "Snack shopping", "Convenience items"], 
          cost: "¥500-1000" 
        },
        { 
          id: 6, day: 1, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500", 
          location: "Lake Kawaguchiko, Yamanashi",  
          description: "Most accessible of the Fuji Five Lakes. Enjoy sunset reflections of Mt. Fuji.", 
          activities: ["Lake walk", "Sunset photography", "Dinner by lake"], 
          cost: "Free" 
        },
       
        { 
          id: 7, day: 1, name: "Sunrise at Mt. Fuji 5th Station", icon: Mountain, color: "text-amber-600", 
          location: "Fuji 5th Station", 
          description: "Watch the spectacular sunrise from 2,305m elevation. Breathtaking panoramic views.", 
          activities: ["Sunrise viewing", "Mountain photography", "Breakfast"], 
          cost: "¥2000 bus" 
        },
        { 
          id: 8, day: 1, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600", 
          location: "Kachi Kachi Ropeway, Fujikawaguchiko",  
          description: "Cable car ride to Mt. Tenjo observation deck. Panoramic views of Mt. Fuji.", 
          activities: ["Ropeway ride", "Observation deck", "Morning views"], 
          cost: "¥900 round trip" 
        },
        { 
          id: 9, day: 1, name: "Oishi Park", icon: Trees, color: "text-green-500", 
          location: "Oishi Park, Fujikawaguchiko", 
          description: "Flower gardens with Mt. Fuji views. Lavender in summer, cosmos in autumn.", 
          activities: ["Flower viewing", "Photography", "Park picnic"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 1, name: "Saiko Iyashi-no-Sato Nenba", icon: Building, color: "text-indigo-600", 
          location: "Saiko Iyashi-no-Sato", 
          description: "Traditional thatched-roof village showcasing rural life. Folk crafts and local cuisine.", 
          activities: ["Village tour", "Craft workshops", "Traditional lunch"], 
          cost: "¥500" 
        },
        { 
          id: 11, day: 2, name: "Fuji-Q Highland", icon: Gamepad2, color: "text-red-600", 
          location: "Fuji-Q Highland",  
          description: "Thrilling amusement park with record-breaking roller coasters and Mt. Fuji backdrop.", 
          activities: ["Roller coasters", "Theme park fun", "Entertainment"], 
          cost: "¥6000-8000" 
        },
        { 
          id: 12, day: 2, name: "Fuji Honchodori", icon: MapPin, color: "text-slate-600", 
          location: "Fuji Honchodori, Fujiyoshida", 
          description: "Traditional shopping street near Fuji-Q Highland. Local restaurants and souvenir shops.", 
          activities: ["Shopping", "Local dinner", "Street exploration"], 
          cost: "¥1500-2500" 
        },
        { 
          id: 13, day: 2, name: "Wind cave ", icon: Store, color: "text-amber-600", 
          location: "Gotemba Premium Outlets",   
          description: "Japan's largest outlet mall with 200+ stores. Mt. Fuji views while shopping.", 
          activities: ["Shopping", "Brand outlets", "Food court"], 
          cost: "Varies" 
        },
        { 
          id: 14, day: 2, name: "Ice cave ", icon: Gamepad2, color: "text-emerald-500", 
          location: "Yamanakako Lake Side Bowl",   
          description: "Fun bowling alley near Lake Yamanaka. Perfect way to end your Mt. Fuji adventure.", 
          activities: ["Bowling", "Arcade games", "Late night snacks"], 
          cost: "¥500-800 per game" 
        },
        { 
          id: 15, day: 2, name: "Kitaguchi hangu Fuji sengen shrine", icon: Gamepad2, color: "text-emerald-500", 
          location: "Yamanakako Lake Side Bowl",   
          description: "Fun bowling alley near Lake Yamanaka. Perfect way to end your Mt. Fuji adventure.", 
          activities: ["Bowling", "Arcade games", "Late night snacks"], 
          cost: "¥500-800 per game" 
        },
        { 
          id: 16, day: 2, name: "Lake Shoji", icon: Gamepad2, color: "text-emerald-500", 
          location: "Yamanakako Lake Side Bowl",   
          description: "Fun bowling alley near Lake Yamanaka. Perfect way to end your Mt. Fuji adventure.", 
          activities: ["Bowling", "Arcade games", "Late night snacks"], 
          cost: "¥500-800 per game" 
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

export default MountFujiDetail;