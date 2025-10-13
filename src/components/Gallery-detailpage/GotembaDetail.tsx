// Gotemba.jsx
import React, { useState } from "react";
import { Store, Trees, ShoppingCart, Mountain, Camera, Coffee, MapPin, Building, Utensils, Cable, Church } from "lucide-react";
import DestinationModal from "./DestinationModal";

const GotembaDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 3,
    name: "Gotemba",
    subtitle: "Shopping Paradise at Mount Fuji's Base",
    mainImage: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=800&fit=crop",
    description: "Gotemba, located at the eastern base of Mount Fuji at 450m elevation, is famous for its massive premium outlets with spectacular mountain views and access to Mt. Fuji trails.",
    longDescription: "Gotemba sits on the southeastern slope of Mount Fuji, providing some of the clearest and closest views of Japan's sacred mountain. Beyond shopping, it offers access to nature, breweries, and outdoor activities with Mt. Fuji as a constant backdrop.",
    highlights: [
      "Gotemba Premium Outlets - Japan's largest outlet mall with 290+ stores and stunning Mt. Fuji views",
      "Peace Park - Beautiful memorial park with Mt. Fuji observation deck and walking paths",
      "Gotemba Kogen Brewing - Award-winning craft brewery using pure Mt. Fuji spring water",
      "Mt. Fuji Subashiri Trail - One of four climbing routes to Mt. Fuji summit",
      "Chichibunomiya Memorial Park - Japanese garden with seasonal flowers and mountain views",
      "Fuji Safari Park - Drive-through safari with 70+ animal species"
    ],
    bestTime: "October-February (Clearest Mt. Fuji Views) & Year-round Shopping",
    duration: "1-2 days",
    rating: 4.6,
    activities: ["Shopping", "Photography", "Hiking", "Brewery Tours", "Safari", "Nature Walks", "Mt. Fuji Viewing"],
    cuisine: ["Gotemba Koshihikari Rice", "Local Sake", "Craft Beer", "Mishima Croquettes", "Wasabi Dishes", "Fuji Trout"],
    transportation: "JR Gotemba Line from Tokyo (2 hours); highway buses from Shinjuku (1.5 hours); car rental recommended",
    accommodation: "Business hotels from ¥6000, resort hotels with onsen and Mt. Fuji views, budget accommodation near outlets",
    tips: [
      "Visit outlets on weekdays to avoid weekend crowds - much more relaxed shopping",
      "Best Mt. Fuji views in winter mornings (Dec-Feb) when air is clearest",
      "Combine with Hakone (30 min bus) for hot springs experience",
      "Bring layers - elevation makes it cooler than Tokyo, even in summer"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=800&fit=crop", // Shopping mall
      "https://images.unsplash.com/photo-1583319414569-a8f88a7f35e6?w=800&h=800&fit=crop", // City view
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=800&fit=crop", // Mt. Fuji
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop", // Mt. Fuji view
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=800&fit=crop", // Japanese landscape
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop", // Mountain scenery
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop", // Nature
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop", // Landscape
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop", // Temple
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=800&fit=crop", // Japanese shrine
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=800&fit=crop", // Mt. Fuji
      "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=800&fit=crop"  // Mt. Fuji landscape
    ],
    itinerary: {
      tripName: "Gotemba Mt. Fuji Shopping & Nature Tour",
      tripDuration: "2 Days • 11 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Gotemba Station", icon: Building, color: "text-blue-600", 
          location: "Gotemba Station, Shizuoka", time: "09:00 AM", duration: "30 minutes", 
          description: "Arrive at Gotemba Station. Gateway to Mt. Fuji area with tourist information and local specialties.", 
          activities: ["Station arrival", "Tourist info", "Local map"], 
          cost: "Free" 
        },
        { 
          id: 2, day: 1, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", 
          location: "1312 Fukasawa, Gotemba", time: "10:00 AM", duration: "3-4 hours", 
          description: "Japan's largest outlet mall with 290+ international and Japanese brands. Stunning Mt. Fuji backdrop - shop with mountain views!", 
          activities: ["Designer shopping", "Food court lunch", "Mt. Fuji photography"], 
          cost: "Varies (20-70% off retail)" 
        },
        { 
          id: 3, day: 1, name: "Mt. Fuji Observation Deck", icon: Camera, color: "text-purple-600", 
          location: "Gotemba Premium Outlets Observation Area", time: "02:30 PM", duration: "30 minutes", 
          description: "Special viewing deck inside outlets complex. Perfect photo spot with unobstructed Mt. Fuji views.", 
          activities: ["Mt. Fuji photography", "Observation", "Panoramic views"], 
          cost: "Free" 
        },
        { 
          id: 4, day: 1, name: "Peace Park (Heiwa Koen)", icon: Trees, color: "text-green-500", 
          location: "Peace Park, Gotemba", time: "03:30 PM", duration: "1 hour", 
          description: "Beautiful memorial park built for world peace. Walking paths, monuments, and excellent Mt. Fuji viewpoints with seasonal flowers.", 
          activities: ["Park walk", "Peace monument visit", "Mt. Fuji photography"], 
          cost: "Free" 
        },
        { 
          id: 5, day: 1, name: "Chichibunomiya Memorial Park", icon: Trees, color: "text-emerald-600", 
          location: "Chichibunomiya Memorial Park, Gotemba", time: "05:00 PM", duration: "1 hour", 
          description: "Japanese garden dedicated to Prince Chichibu. Beautiful landscaping, koi ponds, and seasonal flowers with Mt. Fuji views.", 
          activities: ["Japanese garden stroll", "Koi pond viewing", "Seasonal flowers"], 
          cost: "¥300" 
        },
        { 
          id: 6, day: 1, name: "Gotemba Kogen Brewing", icon: ShoppingCart, color: "text-blue-500", 
          location: "719 Kamishinano, Gotemba", time: "06:30 PM", duration: "1.5 hours", 
          description: "Award-winning craft brewery using pure Mt. Fuji underground spring water. Tours available with tasting of pilsner, weizen, and seasonal brews.", 
          activities: ["Brewery tour", "Beer tasting (5 types)", "Restaurant dinner"], 
          cost: "¥1500 (tour + tasting)" 
        },
        { 
          id: 7, day: 2, name: "Mt. Fuji Subashiri 5th Station", icon: Mountain, color: "text-gray-600", 
          location: "Mt. Fuji Subashiri Trail 5th Station", time: "07:00 AM", duration: "2 hours", 
          description: "One of four Mt. Fuji climbing routes. Drive to 2,000m elevation for sunrise views. Starting point for summit attempts (Jul-Sep only).", 
          activities: ["Sunrise viewing", "Mountain photography", "Trail exploration"], 
          cost: "¥2000 bus (seasonal)" 
        },
        { 
          id: 8, day: 2, name: "Fuji Safari Park", icon: Mountain, color: "text-orange-600", 
          location: "2255-27 Suyama, Susono", time: "10:00 AM", duration: "3 hours", 
          description: "Drive-through safari park with 70+ species including lions, tigers, bears, elephants. Mt. Fuji backdrop makes it unique!", 
          activities: ["Safari bus tour", "Animal feeding", "Walking zone"], 
          cost: "¥3200 (car) / ¥4800 (safari bus)" 
        },
        { 
          id: 9, day: 2, name: "Otome Toge Pass", icon: Camera, color: "text-pink-600", 
          location: "Otome Pass, Hakone-Gotemba Border", time: "02:00 PM", duration: "1 hour", 
          description: "Mountain pass at 1,005m with spectacular panoramic views of Mt. Fuji and Lake Ashi. Popular photography spot.", 
          activities: ["Scenic photography", "Mountain views", "Lake Ashi observation"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 2, name: "Mishima Taisha Shrine", icon: Church, color: "text-red-500", 
          location: "2-1-5 Omiyacho, Mishima", time: "04:00 PM", duration: "1 hour", 
          description: "Historic Shinto shrine founded over 1,200 years ago. Beautiful architecture and ancient trees. Important cultural site.", 
          activities: ["Shrine visit", "Architecture viewing", "Traditional ceremony"], 
          cost: "Free" 
        },
        { 
          id: 11, day: 2, name: "Mishima Skywalk", icon: Cable, color: "text-cyan-500", 
          location: "313 Sasahara, Mishima", time: "05:30 PM", duration: "1 hour", 
          description: "Japan's longest pedestrian suspension bridge at 400m! Walk above valley with Mt. Fuji views. Thrilling experience!", 
          activities: ["Bridge walk", "Suspension experience", "Sunset Mt. Fuji views"], 
          cost: "¥1100" 
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

export default GotembaDetail;