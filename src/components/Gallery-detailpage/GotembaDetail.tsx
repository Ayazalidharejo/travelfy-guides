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
  description: `Gotemba, located at the eastern base of Mount Fuji at an elevation of 450 meters, is a lively city that blends shopping, cultural experiences, and outdoor adventures. It is most renowned for the Gotemba Premium Outlets, one of Japan's largest and most popular shopping destinations. With over 200 stores featuring both international and Japanese brands, the outlets attract millions of visitors annually. Shoppers are treated not only to world-class retail options but also to panoramic views of Mount Fuji on clear days, making every shopping trip a memorable experience. Beyond the outlets, Gotemba provides a gateway to nature and the Fuji-Hakone-Izu National Park, offering a perfect balance of urban convenience and outdoor exploration. Great for small group tours in Japan, group tours in Japan, and tours in Japan by train.`,

longDescription: `Gotemba sits on the southeastern slopes of Mount Fuji, offering some of the closest and clearest views of Japan's sacred mountain. The city is strategically located for travelers who want to combine a modern shopping experience with access to the natural beauty of the region. Hiking trails originating from Gotemba lead toward the higher slopes of Mount Fuji, allowing trekkers and adventure seekers to enjoy scenic paths, volcanic landscapes, and panoramic vistas. These trails are suitable for varying levels of difficulty, from easy nature walks to challenging climbs, and they are particularly spectacular during spring cherry blossom season and autumn when the foliage turns vibrant red and gold.

The natural environment around Gotemba is diverse and captivating. Rivers, forests, and volcanic formations create excellent spots for photography, picnics, and outdoor activities. Nearby lakes, such as Lake Yamanaka and Lake Kawaguchi, provide opportunities for boating, fishing, and lakeside relaxation, all with Mount Fuji in the background. Adventure enthusiasts can also engage in cycling, paragliding, and camping experiences, making Gotemba a hub for active travelers. 

Cultural experiences are also abundant in Gotemba. The city hosts several seasonal festivals that showcase local traditions, music, and cuisine. Art lovers can explore galleries, craft workshops, and exhibitions featuring both traditional Japanese art and contemporary pieces. Local breweries and craft beer pubs allow visitors to sample unique beverages, while restaurants offer specialties such as Hōtō noodles, freshwater fish dishes, and regional sweets. Visitors can explore the historical aspects of Gotemba as well, including old shrines and local landmarks that tell the story of the city’s relationship with Mount Fuji throughout centuries. 

For relaxation and wellness, Gotemba is home to numerous onsen resorts where travelers can soak in mineral-rich hot spring baths while gazing at the surrounding mountains. Many ryokan offer traditional Japanese hospitality with tatami rooms, kaiseki meals, and private baths, creating an immersive cultural experience. During winter, snow-capped Mount Fuji provides a breathtaking backdrop for these thermal baths, while spring and autumn offer milder temperatures and colorful natural scenery.

Gotemba is highly accessible, located along major highways and train lines, making it a convenient stop for travelers coming from Tokyo, Hakone, or Shizuoka. It is ideal for both day trips and multi-day stays, offering a combination of modern amenities and natural tranquility. The city caters to a wide range of visitors—from shopping enthusiasts and families to outdoor adventurers and culture seekers. Seasonal highlights include cherry blossom viewing in spring, summer hiking and festivals, autumn foliage tours, and winter photography of snow-capped landscapes. 

Overall, Gotemba provides a rich and multifaceted experience. Whether shopping at the world-class Premium Outlets, hiking the scenic trails of Mount Fuji, exploring local cuisine, participating in seasonal festivals, or simply enjoying the serene mountain environment, visitors are guaranteed a memorable journey. The city perfectly blends modern lifestyle with traditional culture, urban convenience with outdoor adventure, and relaxation with excitement. With Mount Fuji as a constant and awe-inspiring backdrop, Gotemba remains one of the most attractive and versatile destinations in the Fuji-Hakone-Izu region, offering something for every type of traveler and every season of the year.`
,
   highlights: [
  "Gotemba Premium Outlets - Japan's largest outlet mall with 290+ stores and stunning Mt. Fuji views, perfect for shopping enthusiasts",
  "Peace Park - Beautiful memorial park with Mt. Fuji observation deck, walking paths, and tranquil gardens for relaxation",
  "Gotemba Kogen Brewing - Award-winning craft brewery using pure Mt. Fuji spring water, offering tours and tastings",
  "Mt. Fuji Subashiri Trail - One of four climbing routes to Mt. Fuji summit, ideal for hiking and nature lovers",
  "Chichibunomiya Memorial Park - Japanese garden with seasonal flowers, open lawns, and panoramic mountain views",
  "Fuji Safari Park - Drive-through safari with 70+ animal species, interactive feeding zones, and family-friendly attractions",
  "Gotemba Art Museum - Showcases local and international art collections in a serene environment",
  "Mt. Fuji Panoramic Ropeway - Scenic cable car offering breathtaking views of the mountain and surrounding valleys",
  "Gotemba Kogen Hot Springs - Relaxing onsen experience with outdoor baths overlooking Mt. Fuji",
  "Local festivals and seasonal events - Enjoy cherry blossoms in spring and autumn foliage in fall around Gotemba area"
]
,
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
  "Bring layers - elevation makes it cooler than Tokyo, even in summer",
  "Arrive early at Gotemba Premium Outlets for best parking and fewer crowds",
  "Bring cash for small vendors, some shops may not accept credit cards",
  "Check outlet store maps and plan shopping route for maximum efficiency",
  "Use Gotemba Station or Shinjuku Expressway Bus for convenient access from Tokyo",
  "Try local restaurants near the outlets for Japanese specialties like tempura and udon",
  "Take photos with Mt. Fuji as backdrop from the outlet's open areas",
  "Combine with a visit to nearby Fuji Safari Park or nature trails for family-friendly day trips",
  "Check seasonal sales periods for biggest discounts (Golden Week, summer, winter)"
]
,
 
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
      tripName: " Best Places to visit in Gotemba Mt. Fuji Shopping & Nature Tour",
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