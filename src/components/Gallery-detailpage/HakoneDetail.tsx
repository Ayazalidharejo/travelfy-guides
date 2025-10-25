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
  description: `Hakone is one of the most popular gateways to exploring the Fuji-Hakone-Izu National Park and the scenic Mount Fuji region. Located just a short trip from Tokyo, Hakone offers a perfect blend of natural beauty, cultural heritage, and relaxing experiences. Visitors often begin their journey by purchasing the Hakone Freepass, a convenient all-in-one ticket that provides unlimited access to trains, buses, cable cars, ropeways, and sightseeing cruises on Lake Ashi. The pass also offers discounted entry to many of Hakone’s attractions, making it an ideal option for first-time visitors and seasoned travelers alike.

Hakone-Yumoto Station serves as the main entry point to the town. The station area itself is charming, lined with traditional shops, cafes, and restaurants where you can sample local delicacies. A short walk from the station leads to hot spring baths and onsen resorts, which Hakone is famous for. Visitors can soak in mineral-rich thermal waters while enjoying views of verdant hills and, on clear days, glimpses of Mount Fuji in the distance. Many ryokan (traditional inns) offer an immersive experience with tatami rooms, Japanese-style hospitality, and private onsen baths.

The surrounding region is rich in natural and cultural attractions. A ride on the Hakone Tozan Railway winds through picturesque mountains, offering stunning views of valleys, rivers, and seasonal foliage. For panoramic vistas, the Hakone Ropeway takes visitors from Sounzan to Togendai, passing over the volcanic Owakudani Valley, known for its steaming vents, sulfuric hot springs, and the famous black eggs boiled in volcanic waters. Lake Ashi, a crater lake formed by volcanic activity, is another highlight. Visitors can enjoy scenic cruises, traditional pirate-ship tours, or lakeside strolls while admiring the reflections of Mount Fuji on calm waters.

Hakone also boasts numerous cultural landmarks and museums. The Hakone Open-Air Museum showcases contemporary sculptures set against lush landscapes, blending art with nature in a way unique to Japan. The Pola Museum of Art houses collections of Western and Japanese masterpieces in a serene forested setting. Historical sites like Hakone Shrine, hidden among towering cedar trees near Lake Ashi, provide a glimpse into Japan’s spiritual heritage. Torii gates at the shrine by the water create iconic photo opportunities, especially during sunrise or misty mornings.

Food and shopping in Hakone reflect local traditions and flavors. Streets in Hakone-Yumoto and surrounding areas are dotted with souvenir shops, craft stores, and snack stalls. Signature treats include black eggs from Owakudani, yuba (tofu skin) delicacies, and handmade sweets. Traditional crafts such as woodwork, pottery, and local textiles are available in small boutiques, making Hakone an excellent place to experience Japanese artistry and culture firsthand.

Throughout the year, Hakone transforms with the seasons. Cherry blossoms in spring, lush green forests in summer, vibrant red and golden leaves in autumn, and snow-capped mountains in winter create a visual feast for travelers and photographers. Outdoor enthusiasts can enjoy hiking trails around the Hakone mountains, exploring hidden valleys, waterfalls, and volcanic formations. Wellness seekers can combine their visit with spa treatments, meditation, and hot spring relaxation, making Hakone a destination that balances adventure, culture, and rejuvenation.

Whether you are here for a day trip from Tokyo or an extended stay, Hakone offers an immersive experience of Japan’s natural beauty, historical richness, and serene ambiance. The combination of scenic landscapes, cultural treasures, culinary delights, and rejuvenating hot springs makes it one of the most memorable destinations in the Fuji-Hakone-Izu region. Every corner of Hakone tells a story of tradition, nature, and harmony, ensuring that visitors leave with a deep appreciation for the unique charm of this mountain town.`
,
  highlights: [
  "Lake Ashi Cruise - Pirate ship cruise with stunning Mt. Fuji views across caldera lake",
  "Hakone Ropeway - Cable car over Owakudani volcanic valley with panoramic vistas",
  "Owakudani Valley - Active volcanic valley with sulfur vents and famous black eggs",
  "Hakone Open-Air Museum - Japan's first outdoor sculpture museum with 120+ works",
  "Hakone Shrine - Historic lakeside shrine with iconic red torii gate in water",
  "Hakone Checkpoint - Reconstructed Edo-period checkpoint on historic Tokaido road",
  "Gora Park - French-style landscape park with seasonal flowers and tea houses",
  "Pola Museum of Art - Modern museum with European and Japanese art in a forest setting",
  "Hakone Venetian Glass Museum - Displays Venetian glass art with beautiful gardens",
  "Onshi-Hakone Park - Scenic park offering panoramic views of Lake Ashi and Mt. Fuji"
]
,
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
  "Try black eggs (kuro-tamago) boiled in sulfur springs - said to add 7 years to life!",
  "Bring cash - many local shops and restaurants do not accept cards",
  "Dress in layers - mountain weather can change quickly even in summer",
  "Combine with a cruise on Lake Ashi for scenic views of Mount Fuji",
  "Book accommodations and transportation early during peak seasons (spring and autumn)"
]
,
    gallery: [
      "https://images.unsplash.com/photo-1750137666716-1fb31a9a9b09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fEhha29uZS1ZdW1vdG8lMjBTdGF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Hakone torii gate
      "https://images.unsplash.com/photo-1723829361220-6d93f36ebe72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SGFrb25lJTIwVG96YW4lMjBSYWlsd2F5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Mt Fuji view
      "https://images.unsplash.com/photo-1560156798-20ca50dee3b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGFrb25lJTIwT3Blbi1BaXIlMjBNdXNldW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Lake scenery
      "https://plus.unsplash.com/premium_photo-1733266867792-946b3758ed5a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R29yYSUyMFBhcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Japanese temple
      "https://images.unsplash.com/photo-1631069615023-f78f564420d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFrb25lJTIwUm9wZXdheXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Mountain landscape
      "https://images.unsplash.com/photo-1688268963227-a045cea1272d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fE93YWt1ZGFuaSUyMFZhbGxleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Mt Fuji
      "https://images.unsplash.com/photo-1611494584979-1312c7c6bee5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fExha2UlMjBBc2hpJTIwQ3J1aXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Hot spring
      "https://images.unsplash.com/photo-1707989921992-239ea6cf9553?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE93YWt1ZGFuaSUyMFZhbGxleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Traditional village
      "https://images.unsplash.com/photo-1583901362846-13c55e045708?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFrb25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Shrine
      "https://images.unsplash.com/photo-1652969209299-25c19cf42cad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE93YWt1ZGFuaSUyMFZhbGxleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Temple architecture
      "https://images.unsplash.com/photo-1752438851027-39d2ac0748c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fExha2UlMjBBc2hpJTIwQ3J1aXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Mountain view
      "https://images.unsplash.com/photo-1698498828264-923451a3f9e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGFrb25lJTIwQ2hlY2twb2ludCUyME11c2V1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",  // Japanese landscape
      "https://images.unsplash.com/photo-1696436392889-d6520968a826?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9sYSUyME11c2V1bSUyMG9mJTIwQXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",  // Japanese landscape
    ],
    itinerary: {
      tripName: " Best place to visit Hakone Onsen & Art Circuit",
      // tripDuration: "2 Days • 12 Destinations",
      items: [
        { 
          id: 1, day: 1, name: "Hakone-Yumoto Station", icon: Train, color: "text-blue-600", 
          location: "Hakone-Yumoto Station, Hakone Town",  duration: "30 minutes", 
          description: "Starting point in Hakone. Purchase Hakone Freepass here for unlimited transport. Explore hot spring town with traditional shops.", 
          activities: ["Station arrival", "Freepass purchase", "Onsen town stroll"], 
          cost: "¥6100 Freepass (2-day)" 
        },
        { 
          id: 2, day: 1, name: "Hakone Tozan Railway", icon: Train, color: "text-green-600", 
          location: "Hakone Tozan Railway",  duration: "40 minutes", 
          description: "Scenic mountain railway with switchback system climbing 445m. Beautiful views during ascent through mountain forests.", 
          activities: ["Scenic train ride", "Mountain photography", "Valley views"], 
          cost: "Included in Freepass" 
        },
        { 
          id: 3, day: 1, name: "Hakone Open-Air Museum", icon: Building, color: "text-purple-600", 
          location: "1121 Ninotaira, Hakone Town",  duration: "2 hours", 
          description: "Japan's first outdoor sculpture museum (1969) with 120+ works by Rodin, Moore, Picasso. Beautiful mountain setting with foot bath!", 
          activities: ["Sculpture viewing", "Picasso Pavilion", "Foot bath relaxation"], 
          cost: "¥1600" 
        },
        { 
          id: 4, day: 1, name: "Gora Park", icon: Trees, color: "text-green-500", 
          location: "1300 Gora, Hakone Town",  duration: "1 hour", 
          description: "Beautiful French-style formal park with fountains, rose garden, and tea ceremony house. Seasonal flowers year-round.", 
          activities: ["Garden walk", "Tea ceremony experience", "Flower viewing"], 
          cost: "¥550" 
        },
        { 
          id: 5, day: 1, name: "Hakone Ropeway", icon: Cable, color: "text-orange-500", 
          location: "Hakone Ropeway (Sounzan to Togendai)",  duration: "30 minutes", 
          description: "Spectacular cable car ride over volcanic valley. Amazing aerial views of active sulfur vents and surrounding mountains.", 
          activities: ["Ropeway ride", "Aerial photography", "Valley observation"], 
          cost: "Included in Freepass" 
        },
        { 
          id: 6, day: 1, name: "Owakudani Valley", icon: Mountain, color: "text-orange-600", 
          location: "Owakudani, Hakone Town",  duration: "1.5 hours", 
          description: "Active volcanic valley with steaming sulfur vents. Try famous black eggs (kuro-tamago) boiled in 80°C sulfur springs - eating one adds 7 years to life!", 
          activities: ["Valley walk", "Black egg tasting (¥500/5 eggs)", "Sulfur vent observation"], 
          cost: "¥500 (eggs)" 
        },
        { 
          id: 7, day: 1, name: "Lake Ashi Cruise", icon: Waves, color: "text-cyan-500", 
          location: "Lake Ashi, Hakone",  duration: "1 hour", 
          description: "Scenic pirate ship cruise across caldera lake with Mt. Fuji backdrop (on clear days). Lake formed 3,000 years ago by volcanic eruption.", 
          activities: ["Pirate ship cruise", "Mt. Fuji photography", "Lake views"], 
          cost: "¥1200 (Included in Freepass)" 
        },
        { 
          id: 8, day: 1, name: "Hakone Checkpoint Museum", icon: Building, color: "text-brown-600", 
          location: "1 Hakone, Hakone Town",  duration: "45 minutes", 
          description: "Reconstructed Edo-period checkpoint on historic Tokaido road. Learn about samurai-era travel restrictions and security.", 
          activities: ["Historical museum", "Checkpoint tour", "Edo period learning"], 
          cost: "¥500" 
        },
        { 
          id: 9, day: 1, name: "Hakone Shrine", icon: Church, color: "text-red-500", 
          location: "80-1 Motohakone, Hakone Town",  duration: "1 hour", 
          description: "Historic lakeside shrine founded in 757 AD. Famous red torii gate standing in Lake Ashi. Walk through ancient cedar forest.", 
          activities: ["Shrine visit", "Torii gate photography", "Cedar forest walk"], 
          cost: "Free" 
        },
        { 
          id: 10, day: 2, name: "Amazake Chaya Tea House", icon: Coffee, color: "text-amber-600", 
          location: "395-1 Hatajuku, Hakone Town", duration: "1 hour", 
          description: "400-year-old thatched-roof tea house on Old Tokaido Road. Try amazake (sweet sake) and power mochi that sustained travelers.", 
          activities: ["Traditional breakfast", "Amazake tasting", "Historical ambiance"], 
          cost: "¥800-1200" 
        },
        { 
          id: 11, day: 2, name: "Pola Museum of Art", icon: Camera, color: "text-pink-600", 
          location: "1285 Kozukayama, Sengokuhara", duration: "2 hours", 
          description: "Modern museum with 9,500+ works including Impressionists (Monet, Renoir), contemporary Japanese art. Stunning architecture in forest setting.", 
          activities: ["Art viewing", "Museum cafe", "Forest nature trail"], 
          cost: "¥1800" 
        },
        { 
          id: 12, day: 2, name: "Hakone Glass Museum", icon: Store, color: "text-blue-400", 
          location: "940-48 Sengokuhara, Hakone",  duration: "1.5 hours", 
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