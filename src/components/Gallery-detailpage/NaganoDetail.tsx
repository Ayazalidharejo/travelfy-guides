// Nagano.jsx
import React, { useState } from "react";
import { Church, Mountain, Waves, Trees, Camera, Coffee, Store, Building, MapPin, Utensils } from "lucide-react";
import DestinationModal from "./DestinationModal";

const NaganoDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 6,
    name: "Nagano",
    subtitle: "Alpine Beauty & Snow Monkeys",
    mainImage:   "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop",
    description: "Nagano, nestled in Japan's Northern Alps, offers world-class skiing, the famous Zenko-ji Temple, and wild snow monkeys bathing in hot springs.",
    longDescription: "Nagano Prefecture is Japan's roof, encompassing much of the Japanese Alps. Famous for 1998 Winter Olympics and snow monkeys. This mountainous region offers pristine nature, ancient temples, and unique wildlife experiences.",
    highlights: [
      "Zenko-ji Temple - Historic 7th-century temple with hidden Buddha statue",
      "Jigokudani Monkey Park - Wild snow monkeys bathing in natural hot springs",
      "Hakuba Valley - World-class ski resort and 1998 Olympics venue",
      "Matsumoto Castle - Stunning original black castle, one of Japan's treasures",
      "Togakushi Shrine - Ancient shrine hidden in mystical cedar forests",
      "Kamikochi Valley - Pristine alpine valley perfect for hiking"
    ],
    bestTime: "December-March (Skiing & Snow Monkeys) & June-October (Hiking)",
    duration: "2-4 days",
    rating: 4.7,
    activities: ["Skiing", "Temple Visits", "Wildlife Watching", "Hiking", "Hot Springs", "Mountain Climbing"],
    cuisine: ["Soba Noodles", "Oyaki", "Shinshu Beef", "Wild Vegetables", "Chestnuts", "Sake", "Apple Pie"],
   
   
    tips: [
      "Visit snow monkeys early morning for best experience - they're most active then",
      "Try authentic handmade soba at local restaurants - Nagano is famous for it",
      "Book ski accommodations early for winter season - gets very busy",
      "Dress in layers - mountain weather changes quickly even in summer"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1735197679215-d3b2ff6c5734?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE5hZ2FubyUyMFN0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1596534633455-a2e1c12a8e76?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFplbmtvLWppJTIwVGVtcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1601376754000-117ee1af7db2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmFrYW1pc2UlMjBTaG9wcGluZyUyMFN0cmVldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      "https://plus.unsplash.com/premium_photo-1677829178071-1d8375486dd8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VG9nYWt1c2hpJTIwU2hyaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1636357725329-c7dc984f3587?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VG9nYWt1c2hpJTIwU29iYSUyMFJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1546840440-597c7a209382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fEppZ29rdWRhbmklMjBNb25rZXklMjBQYXJrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1690251670795-8f74a1037c23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8NyUyMFNoaWJ1JTIwT25zZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1655740394704-2ebf2a9987a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWF0c3Vtb3RvJTIwQ2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      "https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TmF3YXRlJTIwU3RyZWV0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1731897510082-e5f28ed72e34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEthbWlrb2NoaSUyMFZhbGxleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1696956261813-c8da5298a96d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S2FwcGElMjBCcmlkZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1734977057021-3ad76b10dec2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S2FtaWtvY2hpJTIwQnVzJTIwVGVybWluYWwlMjBDYWZlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
    ],
    itinerary: {
      tripName: " Best places to visit in Nagano Snow Monkeys & Alpine Adventure",
     
      items: [
        { 
          id: 1, day: 1, name: "Nagano Station", icon: Building, color: "text-blue-600", 
          location: "Nagano Station, Nagano City",  duration: "30 minutes", 
          description: "Start your journey at Nagano Station, gateway to the Japanese Alps. Modern station with tourist information and local specialties.", 
          activities: ["Information gathering", "Breakfast", "Transportation planning"], 
          cost: "Free" 
        },
        { 
          id: 2, day: 1, name: "Zenko-ji Temple", icon: Church, color: "text-red-500", 
          location: "Zenko-ji Temple, 491 Motoyoshicho, Nagano",  duration: "2 hours", 
          description: "One of Japan's most important Buddhist temples, founded in 642 AD. Houses the first Buddhist statue brought to Japan.", 
          activities: ["Temple visit", "Morning prayer ceremony", "Underground passage walk"], 
          cost: "¥500" 
        },
        { 
          id: 3, day: 1, name: "Nakamise Shopping Street", icon: Store, color: "text-purple-600", 
          location: "Nakamise-dori, Nagano City",  duration: "1 hour", 
          description: "Traditional shopping street with 50+ shops selling local crafts, oyaki dumplings, and Buddhist souvenirs.", 
          activities: ["Shopping", "Oyaki tasting", "Souvenir hunting"], 
          cost: "¥1000-2000" 
        },
        { 
          id: 4, day: 1, name: "Togakushi Shrine", icon: Church, color: "text-green-600", 
          location: "Togakushi, Nagano City",  duration: "2 hours", 
          description: "Ancient shrine complex in mystical cedar forests. Walk the 2km path lined with 350-year-old Japanese cedar trees.", 
          activities: ["Shrine visit", "Cedar forest walk", "Nature photography"], 
          cost: "Free" 
        },
        { 
          id: 5, day: 1, name: "Togakushi Soba Restaurant", icon: Utensils, color: "text-orange-600", 
          location: "Togakushi Village, Nagano",  duration: "1 hour", 
          description: "Try Togakushi's famous handmade soba noodles - one of Japan's top three soba producing regions.", 
          activities: ["Soba tasting", "Traditional lunch", "Local specialty"], 
          cost: "¥1200-1800" 
        },
        { 
          id: 6, day: 1, name: "Jigokudani Monkey Park", icon: Mountain, color: "text-blue-600", 
          location: "Jigokudani Yaenkoen, Yamanouchi Town",  duration: "2.5 hours", 
          description: "World-famous wild Japanese macaques bathing in natural hot springs. Only place in the world where monkeys bathe in onsen.", 
          activities: ["Monkey watching", "Forest trail", "Wildlife photography"], 
          cost: "¥800" 
        },
        { 
          id: 7, day: 1, name: "Shibu Onsen", icon: Waves, color: "text-orange-500", 
          location: "Shibu Onsen, Yamanouchi Town", duration: "Evening", 
          description: "Historic hot spring town with 1,300 years history. Nine public bathhouses, cobblestone streets.", 
          activities: ["Onsen bathing tour", "Night stroll", "Traditional atmosphere"], 
          cost: "¥500-1500" 
        },
        { 
          id: 8, day: 2, name: "Matsumoto Castle", icon: Building, color: "text-gray-700", 
          location: "4-1 Marunouchi, Matsumoto City",  duration: "2 hours", 
          description: "One of Japan's premier historic castles and national treasure. Beautiful original black castle built in 1592.", 
          activities: ["Castle interior tour", "Historical exhibits", "Castle grounds walk"], 
          cost: "¥700" 
        },
        { 
          id: 9, day: 2, name: "Nawate Street", icon: Store, color: "text-pink-600", 
          location: "Nawate-dori, Matsumoto City",  duration: "1 hour", 
          description: "Charming frog-themed shopping street along the river. Traditional shops, cafes, and the frog mascot Kaeru.", 
          activities: ["Street walking", "Shopping", "Local snacks"], 
          cost: "¥1000-2000" 
        },
        { 
          id: 10, day: 2, name: "Kamikochi Valley", icon: Mountain, color: "text-green-500", 
          location: "Kamikochi, Azumi, Matsumoto", duration: "3 hours", 
          description: "Pristine alpine valley at 1,500m elevation in the Northern Japan Alps. Crystal-clear Azusa River, stunning peaks.", 
          activities: ["Valley hiking", "Taisho Pond visit", "Mountain photography"], 
          cost: "¥2000 bus + ¥100 fee" 
        },
        { 
          id: 11, day: 2, name: "Kappa Bridge", icon: Camera, color: "text-cyan-500", 
          location: "Kappabashi, Kamikochi", duration: "30 minutes", 
          description: "Iconic 37m wooden suspension bridge crossing Azusa River. Spectacular views of Mt. Hotaka-dake.", 
          activities: ["Photography", "Bridge crossing", "Mountain viewing"], 
          cost: "Free" 
        },
        { 
          id: 12, day: 2, name: "Kamikochi Bus Terminal Cafe", icon: Coffee, color: "text-brown-600", 
          location: "Kamikochi Bus Terminal",  duration: "45 minutes", 
          description: "Relax with coffee and local sweets while enjoying the last views of the Northern Alps.", 
          activities: ["Coffee break", "Mountain views", "Souvenir shopping"], 
          cost: "¥500-800" 
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

export default NaganoDetail;