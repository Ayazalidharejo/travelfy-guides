// Hakone.jsx
import React, { useState } from "react";
import { Train, Building, Mountain, Waves, Church, Trees, Camera, Coffee, Store, MapPin, Cable, Utensils } from "lucide-react";
import DestinationModal from "./DestinationModal";

const HakoneDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 2,
    name: "Hakone",
    subtitle: "Hot Spring Paradise with Fuji Views",
    mainImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop",
    description: "Hakone is a mountainous hot spring resort town famous for its stunning views of Mount Fuji, volcanic valleys, and world-class art museums.",
    longDescription: "Hakone has been a popular hot spring destination for over 1,200 years, offering respite from urban Tokyo life with its therapeutic sulfur waters, mountain scenery, and cultural attractions. Part of Fuji-Hakone-Izu National Park.",
    highlights: [
      "Lake Ashi Cruise - Pirate ship cruise with stunning Mt. Fuji views across caldera lake",
      "Hakone Ropeway - Cable car over Owakudani volcanic valley with panoramic vistas",
      "Owakudani Valley - Active volcanic valley with sulfur vents and famous black eggs",
      "Hakone Open-Air Museum - Japan's first outdoor sculpture museum with 120+ works",
      "Hakone Shrine - Historic lakeside shrine with iconic red torii gate in water",
      "Hakone Checkpoint - Reconstructed Edo-period checkpoint on historic Tokaido road"
    ],
    bestTime: "March-May & September-November (Clear Fuji Views, Mild Weather)",
    duration: "1-2 days",
    rating: 4.8,
    activities: ["Hot Springs", "Lake Cruises", "Museum Visits", "Hiking", "Cable Car Rides", "Photography", "Art Viewing"],
    cuisine: ["Onsen Tamago", "Hakone Soba", "Black Eggs (Kuro-Tamago)", "Kaiseki Ryori", "Local Tofu", "Yosegi Zaiku Crafts"],
    transportation: "Hakone Freepass (¥6,100) covers all transport; Romance Car limited express from Shinjuku (85 min)",
    accommodation: "Traditional ryokans with onsen from ¥15,000, modern hotels with Mt. Fuji views, many with private baths",
    tips: [
      "Purchase Hakone Freepass for unlimited transport and museum discounts - saves money",
      "Stay overnight in ryokan for authentic onsen experience with multi-course kaiseki dinner",
      "Visit Owakudani early (before 10am) to avoid crowds and tour groups",
      "Try black eggs (kuro-tamago) boiled in sulfur springs - said to add 7 years to life!"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop", // Hakone torii gate
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=800&fit=crop", // Mt Fuji view
      "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=800&fit=crop", // Lake scenery
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop", // Japanese temple
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&h=800&fit=crop", // Mountain landscape
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop", // Mt Fuji
      "https://images.unsplash.com/photo-1605536421908-6c0f5c45a39e?w=800&h=800&fit=crop", // Hot spring
      "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=800&fit=crop", // Traditional village
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=800&fit=crop", // Shrine
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=800&fit=crop", // Temple architecture
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=800&fit=crop", // Mountain view
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop"  // Japanese landscape
    ],
    itinerary: {
      tripName: "Hakone Onsen & Art Circuit",
      tripDuration: "2 Days • 12 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Hakone-Yumoto Station", icon: Train, color: "text-blue-600", 
          location: "Hakone-Yumoto Station, Hakone Town", time: "09:00 AM", duration: "30 minutes", 
          description: "Starting point in Hakone. Purchase Hakone Freepass here for unlimited transport. Explore hot spring town with traditional shops.", 
          activities: ["Station arrival", "Freepass purchase", "Onsen town stroll"], 
          cost: "¥6100 Freepass (2-day)" 
        },
        { 
          id: 2, day: 1, name: "Hakone Tozan Railway", icon: Train, color: "text-green-600", 
          location: "Hakone Tozan Railway", time: "10:00 AM", duration: "40 minutes", 
          description: "Scenic mountain railway with switchback system climbing 445m. Beautiful views during ascent through mountain forests.", 
          activities: ["Scenic train ride", "Mountain photography", "Valley views"], 
          cost: "Included in Freepass" 
        },
        { 
          id: 3, day: 1, name: "Hakone Open-Air Museum", icon: Building, color: "text-purple-600", 
          location: "1121 Ninotaira, Hakone Town", time: "11:00 AM", duration: "2 hours", 
          description: "Japan's first outdoor sculpture museum (1969) with 120+ works by Rodin, Moore, Picasso. Beautiful mountain setting with foot bath!", 
          activities: ["Sculpture viewing", "Picasso Pavilion", "Foot bath relaxation"], 
          cost: "¥1600" 
        },
        { 
          id: 4, day: 1, name: "Gora Park", icon: Trees, color: "text-green-500", 
          location: "1300 Gora, Hakone Town", time: "01:30 PM", duration: "1 hour", 
          description: "Beautiful French-style formal park with fountains, rose garden, and tea ceremony house. Seasonal flowers year-round.", 
          activities: ["Garden walk", "Tea ceremony experience", "Flower viewing"], 
          cost: "¥550" 
        },
        { 
          id: 5, day: 1, name: "Hakone Ropeway", icon: Cable, color: "text-orange-500", 
          location: "Hakone Ropeway (Sounzan to Togendai)", time: "03:00 PM", duration: "30 minutes", 
          description: "Spectacular cable car ride over volcanic valley. Amazing aerial views of active sulfur vents and surrounding mountains.", 
          activities: ["Ropeway ride", "Aerial photography", "Valley observation"], 
          cost: "Included in Freepass" 
        },
        { 
          id: 6, day: 1, name: "Owakudani Valley", icon: Mountain, color: "text-orange-600", 
          location: "Owakudani, Hakone Town", time: "03:30 PM", duration: "1.5 hours", 
          description: "Active volcanic valley with steaming sulfur vents. Try famous black eggs (kuro-tamago) boiled in 80°C sulfur springs - eating one adds 7 years to life!", 
          activities: ["Valley walk", "Black egg tasting (¥500/5 eggs)", "Sulfur vent observation"], 
          cost: "¥500 (eggs)" 
        },
        { 
          id: 7, day: 1, name: "Lake Ashi Cruise", icon: Waves, color: "text-cyan-500", 
          location: "Lake Ashi, Hakone", time: "05:30 PM", duration: "1 hour", 
          description: "Scenic pirate ship cruise across caldera lake with Mt. Fuji backdrop (on clear days). Lake formed 3,000 years ago by volcanic eruption.", 
          activities: ["Pirate ship cruise", "Mt. Fuji photography", "Lake views"], 
          cost: "¥1200 (Included in Freepass)" 
        },
        { 
          id: 8, day: 1, name: "Hakone Checkpoint Museum", icon: Building, color: "text-brown-600", 
          location: "1 Hakone, Hakone Town", time: "07:00 PM", duration: "45 minutes", 
          description: "Reconstructed Edo-period checkpoint on historic Tokaido road. Learn about samurai-era travel restrictions and security.", 
          activities: ["Historical museum", "Checkpoint tour", "Edo period learning"], 
          cost: "¥500" 
        },
        { 
          id: 9, day: 1, name: "Hakone Shrine", icon: Church, color: "text-red-500", 
          location: "80-1 Motohakone, Hakone Town", time: "08:00 PM", duration: "1 hour", 
          description: "Historic lakeside shrine founded in 757 AD. Famous red torii gate standing in Lake Ashi. Walk through ancient cedar forest.", 
          activities: ["Shrine visit", "Torii gate photography", "Cedar forest walk"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 2, name: "Amazake Chaya Tea House", icon: Coffee, color: "text-amber-600", 
          location: "395-1 Hatajuku, Hakone Town", time: "09:00 AM", duration: "1 hour", 
          description: "400-year-old thatched-roof tea house on Old Tokaido Road. Try amazake (sweet sake) and power mochi that sustained travelers.", 
          activities: ["Traditional breakfast", "Amazake tasting", "Historical ambiance"], 
          cost: "¥800-1200" 
        },
        { 
          id: 11, day: 2, name: "Pola Museum of Art", icon: Camera, color: "text-pink-600", 
          location: "1285 Kozukayama, Sengokuhara", time: "10:30 AM", duration: "2 hours", 
          description: "Modern museum with 9,500+ works including Impressionists (Monet, Renoir), contemporary Japanese art. Stunning architecture in forest setting.", 
          activities: ["Art viewing", "Museum cafe", "Forest nature trail"], 
          cost: "¥1800" 
        },
        { 
          id: 12, day: 2, name: "Hakone Glass Museum", icon: Store, color: "text-blue-400", 
          location: "940-48 Sengokuhara, Hakone", time: "01:00 PM", duration: "1.5 hours", 
          description: "Venetian Glass Museum (Hakone Garasunomori) with stunning collection in romantic Italian-style garden. Crystal glass trees sparkle in sunlight.", 
          activities: ["Glass art viewing", "Italian garden stroll", "Museum shop"], 
          cost: "¥1500" 
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

export default HakoneDetail;