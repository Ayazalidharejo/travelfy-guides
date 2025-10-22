// Nikko.jsx
import React, { useState } from "react";
import { Building, Church, Waves, Mountain, Trees, Camera, Coffee, Store, MapPin, Cable } from "lucide-react";
import DestinationModal from "./DestinationModal";

const NikkoDetail = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const data = {
    id: 5,
    name: "Nikko",
    subtitle: "Sacred Mountains & UNESCO Treasures",
    mainImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop",
    description: "Nikko, a mountain town north of Tokyo, is home to UNESCO World Heritage shrines and temples set among stunning natural scenery.",
    longDescription: "Nikko has been a center of Shinto and Buddhist mountain worship for over 1,200 years. The town is famous for its ornate Toshogu Shrine, spectacular waterfalls, and autumn foliage that draws visitors from around the world.",
    highlights: [
      "Toshogu Shrine - Ornate UNESCO shrine with famous Three Wise Monkeys and Sleeping Cat carvings",
      "Kegon Falls - Spectacular 97-meter waterfall, one of Japan's three most beautiful falls",
      "Lake Chuzenji - Beautiful mountain lake at 1,269m elevation formed by volcanic eruption",
      "Shinkyo Bridge - Sacred vermillion bridge over Daiya River, symbol of Nikko",
      "Taiyuin Temple - Beautiful mausoleum with stunning lacquerwork and gold decorations",
      "Senjogahara Marshland - Vast highland marsh with wooden walking paths"
    ],
    bestTime: "May-June (Fresh Green) & October-November (Autumn Colors)",
    duration: "1-2 days",
    rating: 4.8,
    activities: ["Temple Visits", "Hiking", "Waterfall Viewing", "Hot Springs", "Photography", "Nature Walks"],
    cuisine: ["Yuba (Tofu Skin)", "Nikko Soba", "Rainbow Trout", "Wild Vegetables", "Sake", "Manju Sweets"],
    transportation: "Limited Express train from Tokyo Asakusa Station takes 2 hours",
    accommodation: "Traditional ryokans, onsen hotels, budget guesthouses, temple lodgings available",
    tips: [
      "Purchase combo ticket for shrines to save money - covers multiple UNESCO sites",
      "Visit shrines before 9am to avoid tour groups and enjoy peaceful morning atmosphere",
      "Autumn colors peak late October to early November - book accommodations early",
      "Wear comfortable walking shoes - lots of stairs at shrines and temples"
    ],
    gallery: [
      "https://plus.unsplash.com/premium_photo-1754578763138-35c3961038e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9idSUyME5pa2tvJTIwU3RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Nikko shrine
      "https://plus.unsplash.com/premium_photo-1694475015396-04415449ebf0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U2hpbmt5byUyMEJyaWRnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Japanese temple
      "https://images.unsplash.com/photo-1720331991913-c00e0f6b2e86?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Umlubm9qaSUyMFRlbXBsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Temple architecture
      "https://images.unsplash.com/photo-1696252302905-eccf37382f9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG9zaG9ndSUyMFNocmluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Japanese landscape
      "https://images.unsplash.com/photo-1747484948678-2c3c5aa6c56a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGFpeXVpbiUyMFRlbXBsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Mt Fuji/mountains
      "https://images.unsplash.com/photo-1677742332081-69bdd9c5f233?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEZ1dGFyYXNhbiUyMFNocmluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Japanese garden
      "https://images.unsplash.com/photo-1709739321071-6658c37f22d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8S2FubWFuZ2FmdWNoaSUyMEFieXNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Kyoto temple
      "https://images.unsplash.com/photo-1756621608435-0c593f2932c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMzfHxBa2VjaGlkYWlyYSUyMFJvcGV3YXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", // Japanese mountains
      "https://images.unsplash.com/photo-1592127635407-630b340b8fcc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGFrZSUyMENodXplbmppfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500", // Nature scenery
      "https://media.istockphoto.com/id/1130059712/photo/kegon-falls-in-nikko-japan.webp?a=1&b=1&s=612x612&w=0&k=20&c=oy3JAhgcszh1JBY01FBrUBB5-XGhKH7SVksKXVXckcU=", // Mountain landscape
      "https://images.unsplash.com/photo-1683341960939-84c4e7095875?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Unl1enUlMjBGYWxsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", // Hot spring
      "https://images.unsplash.com/photo-1690251670795-8f74a1037c23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8WXVtb3RvJTIwT25zZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"  // Traditional village
    ],
    itinerary: {
      tripName: " Best visit places in Nikko UNESCO Heritage & Nature Tour",
      
      items: [
        { 
          id: 1, day: 1, name: "Tobu Nikko Station", icon: Building, color: "text-blue-600", 
          location: "Tobu Nikko Station, Nikko City",  duration: "30 minutes", 
          description: "Arrive at Nikko Station from Tokyo. Pick up tourist maps and purchase World Heritage Pass for unlimited bus access.", 
          activities: ["Station arrival", "Pass purchase", "Information gathering"], 
          cost: "¥2000 2-day pass" 
        },
        { 
          id: 2, day: 1, name: "Shinkyo Bridge", icon: Building, color: "text-red-500", 
          location: "Shinkyo Bridge, 2307 Sannai, Nikko",  duration: "30 minutes", 
          description: "Sacred vermillion bridge spanning Daiya River. Built in 1636, one of Japan's three most beautiful bridges. Symbol of Nikko.", 
          activities: ["Bridge viewing", "Photography", "River walk"], 
          cost: "¥300 to cross" 
        },
        { 
          id: 3, day: 1, name: "Rinnoji Temple", icon: Church, color: "text-purple-600", 
          location: "Rinnoji Temple, 2300 Sannai, Nikko", duration: "1 hour", 
          description: "Important Buddhist temple founded in 766 AD. Houses three giant golden Buddha statues and beautiful Shoyo-en Garden.", 
          activities: ["Temple visit", "Garden stroll", "Buddha viewing"], 
          cost: "¥400" 
        },
        { 
          id: 4, day: 1, name: "Toshogu Shrine", icon: Church, color: "text-orange-600", 
          location: "Toshogu Shrine, 2301 Sannai, Nikko",  duration: "2.5 hours", 
          description: "Ornate UNESCO World Heritage shrine dedicated to Tokugawa Ieyasu. Famous for Three Wise Monkeys, Sleeping Cat, and elaborate gold decorations.", 
          activities: ["Shrine exploration", "Carving viewing", "Five-story pagoda visit"], 
          cost: "¥1300" 
        },
        { 
          id: 5, day: 1, name: "Taiyuin Temple", icon: Church, color: "text-gold-600", 
          location: "Taiyuin Temple, 2300 Sannai, Nikko",  duration: "1 hour", 
          description: "Stunning mausoleum of Tokugawa Iemitsu. Beautiful lacquerwork, intricate carvings, and peaceful moss garden.", 
          activities: ["Temple tour", "Architecture viewing", "Garden walk"], 
          cost: "¥550" 
        },
        { 
          id: 6, day: 1, name: "Futarasan Shrine", icon: Church, color: "text-green-600", 
          location: "Futarasan Shrine, 2307 Sannai, Nikko",  duration: "45 minutes", 
          description: "Ancient shrine founded in 782 AD, dedicated to mountain deities. Beautiful vermillion buildings and sacred trees.", 
          activities: ["Shrine visit", "Fortune drawing", "Sacred tree viewing"], 
          cost: "¥200" 
        },
        { 
          id: 7, day: 1, name: "Kanmangafuchi Abyss", icon: Mountain, color: "text-gray-600", 
          location: "Kanmangafuchi Abyss, Nikko",  duration: "1 hour", 
          description: "Mysterious ravine with 70 Jizo statues along the path. Legend says the number of statues changes each time you count.", 
          activities: ["Scenic walk", "Jizo statues viewing", "Photography"], 
          cost: "Free" 
        },
        { 
          id: 8, day: 2, name: "Akechidaira Ropeway", icon: Cable, color: "text-blue-500", 
          location: "Akechidaira Ropeway, Nikko",  duration: "1 hour", 
          description: "Cable car ride to observation deck at 1,373m. Spectacular views of Lake Chuzenji, Kegon Falls, and surrounding mountains.", 
          activities: ["Ropeway ride", "Observation deck", "Mountain photography"], 
          cost: "¥800 round trip" 
        },
        { 
          id: 9, day: 2, name: "Lake Chuzenji", icon: Waves, color: "text-blue-500", 
          location: "Lake Chuzenji, Nikko",  duration: "1.5 hours", 
          description: "Beautiful mountain lake at 1,269m elevation formed 20,000 years ago by volcanic eruption. Surrounded by mountains and hiking trails.", 
          activities: ["Lake cruise", "Lakeside walk", "Scenic photography"], 
          cost: "¥1250 cruise" 
        },
        { 
          id: 10, day: 2, name: "Kegon Falls", icon: Mountain, color: "text-cyan-500", 
          location: "Kegon Falls, Chugushi, Nikko",  duration: "1 hour", 
          description: "Spectacular 97-meter waterfall, one of Japan's three most beautiful falls. Elevator descends to viewing platform at the base.", 
          activities: ["Waterfall viewing", "Elevator ride to base", "Nature photography"], 
          cost: "¥570" 
        },
        { 
          id: 11, day: 2, name: "Ryuzu Falls", icon: Waves, color: "text-teal-500", 
          location: "Ryuzu Falls, Nikko", duration: "45 minutes", 
          description: "Beautiful two-pronged waterfall resembling dragon's head. Tea house with viewing deck overlooking the falls.", 
          activities: ["Waterfall viewing", "Tea house break", "Nature walk"], 
          cost: "Free (tea ¥500)" 
        },
        { 
          id: 12, day: 2, name: "Yumoto Onsen", icon: Waves, color: "text-orange-500", 
          location: "Yumoto Onsen, Nikko",  duration: "2 hours", 
          description: "Traditional hot spring village at 1,500m elevation. Sulfurous waters with healing properties. Public foot baths available.", 
          activities: ["Onsen bathing", "Foot bath", "Mountain village stroll"], 
          cost: "¥700 public bath" 
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

export default NikkoDetail;