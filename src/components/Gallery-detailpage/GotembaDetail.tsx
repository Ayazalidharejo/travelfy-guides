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
    "https://images.unsplash.com/photo-1731736176703-df630e52781e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdvdGVtYmElMjBTdGF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Gotemba Station
    "https://images.unsplash.com/photo-1745696333441-0ac675af0726?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TXQuJTIwRnVqaSUyME9ic2VydmF0aW9uJTIwRGVja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Gotemba Premium Outlets
    "https://images.unsplash.com/photo-1723375860841-33c26cc54349?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGVhY2UlMjBQYXJrJTIwKEhlaXdhJTIwS29lbil8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Mt. Fuji Observation Deck
    "https://media.istockphoto.com/id/1321885433/photo/kameido-central-park-koto-ku-tokyo.webp?a=1&b=1&s=612x612&w=0&k=20&c=blRDiI_e4mZ3LNAkVJIRGgu7rO7YQKWsppv_XD5aikQ=", // Peace Park
    "https://media.istockphoto.com/id/1253583676/photo/countryside-near-gotemba-with-mt-fuji.webp?a=1&b=1&s=612x612&w=0&k=20&c=QtUUKH9JtyyHXtqDawuWkwyuobyN_Q-3dr6CLXwszGk=", // Chichibunomiya Memorial Park
    "https://media.istockphoto.com/id/1813244208/photo/mt-fuji-and-autumn-foliage-in-fuji-five-lakes-region-japan-lake-shojiko-lake-shoji.webp?a=1&b=1&s=612x612&w=0&k=20&c=bxwbr-zI8N1fFtyrd9uA2gwn8SgW0cAmu43lKhUcMGA=", // Gotemba Kogen Brewing
    "https://media.istockphoto.com/id/1827975389/photo/mt-fuji-climbing-at-station-8th-on-yoshida-trailhead.webp?a=1&b=1&s=612x612&w=0&k=20&c=aSyxjir1nRVrqGTg0hgaMZh-aMfsXVck3C-FEgtI1a8=", // Subashiri 5th Station
    "https://media.istockphoto.com/id/1417843940/photo/scenery-of-mt-norikuradake-in-summer-japan.webp?a=1&b=1&s=612x612&w=0&k=20&c=Icrzne_OCrzvueupyUHJuMGjmG2E0lUYv9VyQkYJiPA=", // Fuji Safari Park
    "https://images.unsplash.com/photo-1713067783167-cc48bebd44b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWlzaGltYSUyMFRhaXNoYSUyMFNocmluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Otome Toge Pass
    "https://plus.unsplash.com/premium_photo-1723983556753-1eef0b499e15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fE1pc2hpbWElMjBTa3l3YWxrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Mishima Taisha Shrine
   
  ]




,

    itinerary: {
      tripName: "Gotemba Mt. Fuji Shopping & Nature Tour",
      // tripDuration: "2 Days • 11 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Gotemba Station", icon: Building, color: "text-blue-600", 
          location: "Gotemba Station, Shizuoka", duration: "30 minutes", 
          description: "Arrive at Gotemba Station. Gateway to Mt. Fuji area with tourist information and local specialties.", 
          activities: ["Station arrival", "Tourist info", "Local map"], 
          cost: "Free" 
        },
        { 
          id: 2, day: 1, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", 
          location: "1312 Fukasawa, Gotemba",  duration: "3-4 hours", 
          description: "Japan's largest outlet mall with 290+ international and Japanese brands. Stunning Mt. Fuji backdrop - shop with mountain views!", 
          activities: ["Designer shopping", "Food court lunch", "Mt. Fuji photography"], 
          cost: "Varies (20-70% off retail)" 
        },
        { 
          id: 3, day: 1, name: "Mt. Fuji Observation Deck", icon: Camera, color: "text-purple-600", 
          location: "Gotemba Premium Outlets Observation Area",  duration: "30 minutes", 
          description: "Special viewing deck inside outlets complex. Perfect photo spot with unobstructed Mt. Fuji views.", 
          activities: ["Mt. Fuji photography", "Observation", "Panoramic views"], 
          cost: "Free" 
        },
        { 
          id: 4, day: 1, name: "Peace Park (Heiwa Koen)", icon: Trees, color: "text-green-500", 
          location: "Peace Park, Gotemba",  duration: "1 hour", 
          description: "Beautiful memorial park built for world peace. Walking paths, monuments, and excellent Mt. Fuji viewpoints with seasonal flowers.", 
          activities: ["Park walk", "Peace monument visit", "Mt. Fuji photography"], 
          cost: "Free" 
        },
        { 
          id: 5, day: 1, name: "Chichibunomiya Memorial Park", icon: Trees, color: "text-emerald-600", 
          location: "Chichibunomiya Memorial Park, Gotemba",  duration: "1 hour", 
          description: "Japanese garden dedicated to Prince Chichibu. Beautiful landscaping, koi ponds, and seasonal flowers with Mt. Fuji views.", 
          activities: ["Japanese garden stroll", "Koi pond viewing", "Seasonal flowers"], 
          cost: "¥300" 
        },
        { 
          id: 6, day: 1, name: "Gotemba Kogen Brewing", icon: ShoppingCart, color: "text-blue-500", 
          location: "719 Kamishinano, Gotemba",  duration: "1.5 hours", 
          description: "Award-winning craft brewery using pure Mt. Fuji underground spring water. Tours available with tasting of pilsner, weizen, and seasonal brews.", 
          activities: ["Brewery tour", "Beer tasting (5 types)", "Restaurant dinner"], 
          cost: "¥1500 (tour + tasting)" 
        },
        { 
          id: 7, day: 2, name: "Mt. Fuji Subashiri 5th Station", icon: Mountain, color: "text-gray-600", 
          location: "Mt. Fuji Subashiri Trail 5th Station", duration: "2 hours", 
          description: "One of four Mt. Fuji climbing routes. Drive to 2,000m elevation for sunrise views. Starting point for summit attempts (Jul-Sep only).", 
          activities: ["Sunrise viewing", "Mountain photography", "Trail exploration"], 
          cost: "¥2000 bus (seasonal)" 
        },
        { 
          id: 8, day: 2, name: "Fuji Safari Park", icon: Mountain, color: "text-orange-600", 
          location: "2255-27 Suyama, Susono",  duration: "3 hours", 
          description: "Drive-through safari park with 70+ species including lions, tigers, bears, elephants. Mt. Fuji backdrop makes it unique!", 
          activities: ["Safari bus tour", "Animal feeding", "Walking zone"], 
          cost: "¥3200 (car) / ¥4800 (safari bus)" 
        },
        { 
          id: 9, day: 2, name: "Otome Toge Pass", icon: Camera, color: "text-pink-600", 
          location: "Otome Pass, Hakone-Gotemba Border",  duration: "1 hour", 
          description: "Mountain pass at 1,005m with spectacular panoramic views of Mt. Fuji and Lake Ashi. Popular photography spot.", 
          activities: ["Scenic photography", "Mountain views", "Lake Ashi observation"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 2, name: "Mishima Taisha Shrine", icon: Church, color: "text-red-500", 
          location: "2-1-5 Omiyacho, Mishima",  duration: "1 hour", 
          description: "Historic Shinto shrine founded over 1,200 years ago. Beautiful architecture and ancient trees. Important cultural site.", 
          activities: ["Shrine visit", "Architecture viewing", "Traditional ceremony"], 
          cost: "Free" 
        },
        { 
          id: 11, day: 2, name: "Mishima Skywalk", icon: Cable, color: "text-cyan-500", 
          location: "313 Sasahara, Mishima",  duration: "1 hour", 
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