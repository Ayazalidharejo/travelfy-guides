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
    transportation: "Shinkansen from Tokyo to Nagano (90 minutes), local buses available",
    accommodation: "Ski resorts, onsen ryokans, city hotels, mountain lodges, traditional inns",
    tips: [
      "Visit snow monkeys early morning for best experience - they're most active then",
      "Try authentic handmade soba at local restaurants - Nagano is famous for it",
      "Book ski accommodations early for winter season - gets very busy",
      "Dress in layers - mountain weather changes quickly even in summer"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583725094311-ee8f5c85d63b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605536421908-6c0f5c45a39e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=800&fit=crop"
    ],
    itinerary: {
      tripName: "Nagano Snow Monkeys & Alpine Adventure",
      tripDuration: "2 Days • 12 Destinations",
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