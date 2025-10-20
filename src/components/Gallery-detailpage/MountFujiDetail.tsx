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
    duration: "2-3 days",
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
      "https://images.unsplash.com/photo-1570145820259-a25a6a5d6f41?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=800&fit=crop"
    ],
    itinerary: {
      tripName: "Tokyo to Mount Fuji Adventure",
      tripDuration: "2 Days • 15 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Theatre1010", icon: PlayCircle, color: "text-purple-600", 
          location: "Theatre1010, Tokyo",  duration: "1 hour", 
          description: "Start your journey from Tokyo's Theatre1010. This modern cultural hub offers a glimpse into Tokyo's vibrant arts scene.", 
          activities: ["Cultural exploration", "Morning coffee", "Travel preparation"], 
          cost: "Free to ¥500" 
        },
        { 
          id: 2, day: 1, name: "Chureito Pagoda", icon: Building, color: "text-red-500", 
          location: "Chureito Pagoda, Fujiyoshida",  duration: "2 hours", 
          description: "The iconic five-story pagoda with Mt. Fuji backdrop. Climb 400 steps for breathtaking views.", 
          activities: ["Photography", "Hiking 400 steps", "Scenic views"], 
          cost: "Free entry" 
        },
        { 
          id: 3, day: 1, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600", 
          location: "Oshino Hakkai, Yamanashi",  duration: "1.5 hours", 
          description: "Eight sacred ponds with crystal-clear spring water fed by Mt. Fuji's snowmelt.", 
          activities: ["Pond viewing", "Traditional village walk", "Local snacks"], 
          cost: "¥300 pond area entry" 
        },
        { 
          id: 4, day: 1, name: "Arakura Fuji Sengen Shrine", icon: Church, color: "text-orange-600", 
          location: "Arakura Fuji Sengen Shrine, Fujiyoshida",  duration: "1 hour", 
          description: "Ancient shrine at the base of Chureito Pagoda. Peaceful atmosphere with Mt. Fuji views.", 
          activities: ["Shrine visit", "Prayer", "Omikuji fortune"], 
          cost: "Free" 
        },
        { 
          id: 5, day: 1, name: "Kawaguchiko Lawson", icon: ShoppingCart, color: "text-blue-500", 
          location: "Lawson Kawaguchiko Station", duration: "30 minutes", 
          description: "Famous convenience store with perfect Mt. Fuji framing! A must-visit Instagram spot.", 
          activities: ["Photo opportunity", "Snack shopping", "Convenience items"], 
          cost: "¥500-1000" 
        },
        { 
          id: 6, day: 1, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500", 
          location: "Lake Kawaguchiko, Yamanashi",  duration: "Evening stroll", 
          description: "Most accessible of the Fuji Five Lakes. Enjoy sunset reflections of Mt. Fuji.", 
          activities: ["Lake walk", "Sunset photography", "Dinner by lake"], 
          cost: "Free" 
        },
        { 
          id: 7, day: 1, name: "Kawaguchiko Music Forest", icon: Music, color: "text-pink-600", 
          location: "Music Forest Museum, Kawaguchiko",  duration: "1.5 hours", 
          description: "Enchanting music box museum with evening performances and illuminated gardens.", 
          activities: ["Music box collection", "Garden walk", "Evening concert"], 
          cost: "¥1800" 
        },
        { 
          id: 8, day: 2, name: "Sunrise at Mt. Fuji 5th Station", icon: Mountain, color: "text-amber-600", 
          location: "Fuji 5th Station",  duration: "2 hours", 
          description: "Watch the spectacular sunrise from 2,305m elevation. Breathtaking panoramic views.", 
          activities: ["Sunrise viewing", "Mountain photography", "Breakfast"], 
          cost: "¥2000 bus" 
        },
        { 
          id: 9, day: 2, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600", 
          location: "Kachi Kachi Ropeway, Fujikawaguchiko",  duration: "1.5 hours", 
          description: "Cable car ride to Mt. Tenjo observation deck. Panoramic views of Mt. Fuji.", 
          activities: ["Ropeway ride", "Observation deck", "Morning views"], 
          cost: "¥900 round trip" 
        },
        { 
          id: 10, day: 2, name: "Oishi Park", icon: Trees, color: "text-green-500", 
          location: "Oishi Park, Fujikawaguchiko", duration: "1 hour", 
          description: "Flower gardens with Mt. Fuji views. Lavender in summer, cosmos in autumn.", 
          activities: ["Flower viewing", "Photography", "Park picnic"], 
          cost: "Free" 
        },
        { 
          id: 11, day: 2, name: "Saiko Iyashi-no-Sato Nenba", icon: Building, color: "text-indigo-600", 
          location: "Saiko Iyashi-no-Sato",  duration: "1.5 hours", 
          description: "Traditional thatched-roof village showcasing rural life. Folk crafts and local cuisine.", 
          activities: ["Village tour", "Craft workshops", "Traditional lunch"], 
          cost: "¥500" 
        },
        { 
          id: 12, day: 2, name: "Fuji-Q Highland", icon: Gamepad2, color: "text-red-600", 
          location: "Fuji-Q Highland",  duration: "3 hours", 
          description: "Thrilling amusement park with record-breaking roller coasters and Mt. Fuji backdrop.", 
          activities: ["Roller coasters", "Theme park fun", "Entertainment"], 
          cost: "¥6000-8000" 
        },
        { 
          id: 13, day: 2, name: "Fuji Honchodori", icon: MapPin, color: "text-slate-600", 
          location: "Fuji Honchodori, Fujiyoshida", duration: "1.5 hours", 
          description: "Traditional shopping street near Fuji-Q Highland. Local restaurants and souvenir shops.", 
          activities: ["Shopping", "Local dinner", "Street exploration"], 
          cost: "¥1500-2500" 
        },
        { 
          id: 14, day: 2, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", 
          location: "Gotemba Premium Outlets",  duration: "2 hours", 
          description: "Japan's largest outlet mall with 200+ stores. Mt. Fuji views while shopping.", 
          activities: ["Shopping", "Brand outlets", "Food court"], 
          cost: "Varies" 
        },
        { 
          id: 15, day: 2, name: "Yamanakako Lake Side Bowl", icon: Gamepad2, color: "text-emerald-500", 
          location: "Yamanakako Lake Side Bowl",  duration: "1-2 hours", 
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