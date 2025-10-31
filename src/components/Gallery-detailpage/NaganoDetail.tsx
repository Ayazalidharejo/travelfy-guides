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
    description: `Nagano, nestled in Japan's Northern Alps, offers world-class skiing, the famous Zenko-ji Temple, and wild snow monkeys bathing in hot springs. This region blends natural beauty, cultural heritage, and unique wildlife experiences, making it a must-visit destination in Japan. Popular for family tours in Japan, senior-friendly guided tours in Japan, and walking tours in Japan.`,

longDescription: `Nagano Prefecture is often called the "roof of Japan" because it encompasses much of the Japanese Alps, a vast mountain range known for its towering peaks, scenic valleys, and pristine nature. The region has long been celebrated for outdoor adventures, from skiing and snowboarding in the winter to hiking, trekking, and mountain climbing in the warmer months. The 1998 Winter Olympics were hosted in Nagano, cementing its global reputation as a premier winter sports destination, with modern resorts, well-maintained trails, and spectacular alpine scenery attracting visitors from all over the world.

One of Nagano's most famous cultural sites is Zenko-ji Temple, a Buddhist temple founded in the 7th century and considered one of Japan’s most important pilgrimage sites. The temple houses the first Buddhist statue ever brought to Japan, known as the Hibutsu, or “Hidden Buddha,” which is kept secret and only revealed to the public on rare occasions. Pilgrims and tourists alike visit Zenko-ji to experience its serene halls, historic architecture, and peaceful gardens. Walking through the temple complex, one can witness the deep spirituality of the area, participate in traditional rituals, and explore the quaint streets lined with shops selling local crafts, snacks, and souvenirs.

Nagano is also famous for its unique wildlife, most notably the Japanese macaques, or snow monkeys, which are found in the Jigokudani Monkey Park near Yamanouchi. These monkeys are famous for their habit of bathing in natural hot springs during the winter months, creating a rare and captivating spectacle for visitors. Watching the monkeys relax in steaming onsen pools while surrounded by snow-covered forests is an experience unlike anywhere else in the world. The area also offers opportunities for nature walks, photography, and learning about local conservation efforts.

Beyond the temple and monkeys, Nagano is dotted with other historical and cultural landmarks, including Matsumoto Castle, one of Japan's most beautiful original castles, known as the "Crow Castle" for its striking black exterior. The castle provides insight into Japan's feudal history and offers panoramic views of the surrounding city and mountains. Visitors can also explore traditional towns such as Obuse, known for chestnut sweets, art museums, and Edo-period architecture, giving a glimpse into the local lifestyle and craftsmanship.

Nagano's natural beauty extends beyond its mountains and forests. The region is home to several scenic lakes, rivers, and hot spring towns (onsen), including Shiga Kogen, one of Japan's largest ski areas, and Nozawa Onsen, a charming village combining traditional ryokan inns with modern ski facilities. Hiking trails lead through alpine meadows, dense cedar forests, and past waterfalls, offering diverse opportunities for adventure and relaxation. Seasonal changes bring different charms: cherry blossoms in spring, lush greenery in summer, vibrant autumn foliage, and snowy landscapes in winter.

Local cuisine in Nagano is another highlight. Visitors can savor soba noodles, a specialty made from buckwheat grown in the region, along with oyaki dumplings, mountain vegetables, and fresh river fish. Many onsen towns offer kaiseki meals, where seasonal ingredients are beautifully prepared and presented, enhancing the overall travel experience. Traditional festivals, such as the Nagano Lantern Festival or Obuse Chestnut Festival, add cultural richness, with parades, performances, and local delicacies available for visitors to enjoy.

Nagano is easily accessible from Tokyo via bullet train or express trains, making it an ideal destination for both weekend trips and extended stays. Its combination of cultural heritage, natural beauty, winter sports, unique wildlife, and culinary delights ensures that every traveler finds something memorable. From meditating at Zenko-ji Temple, watching snow monkeys in steaming hot springs, skiing down alpine slopes, exploring historic castles, or sampling local dishes, Nagano offers a complete and unforgettable Japanese experience.

Overall, Nagano perfectly balances Japan's spiritual, historical, and natural wonders. The prefecture offers a harmonious mix of mountains, forests, temples, castles, hot springs, and unique wildlife, making it a destination where visitors can connect with both nature and culture. Whether seeking adventure, relaxation, or cultural immersion, Nagano remains a timeless jewel in Japan's Northern Alps, captivating all who explore its landscapes and heritage.`  
,
   highlights: [
  "Zenko-ji Temple - Historic 7th-century temple housing the Hidden Buddha, a key pilgrimage site",
  "Jigokudani Monkey Park - Famous for wild Japanese macaques bathing in natural hot springs during winter",
  "Hakuba Valley - World-class ski resort, venue of the 1998 Winter Olympics, offering slopes for all levels",
  "Matsumoto Castle - Striking original black castle known as Crow Castle, symbol of feudal Japan",
  "Togakushi Shrine - Ancient Shinto shrine complex nestled in mystical cedar forests with hiking trails",
  "Kamikochi Valley - Pristine alpine valley with crystal-clear rivers, ideal for hiking and nature photography",
  "Shiga Kogen - Extensive highland ski area and hiking destination with panoramic mountain views",
  "Nozawa Onsen - Traditional hot spring village with charming streets and local delicacies",
  "Obuse Town - Cultural town famous for chestnut sweets, Edo-period architecture, and Hokusai art museum",
  "Lake Suwa - Scenic lake with historical shrines, leisure activities, and hot spring resorts",
  "Ueda Castle - Historic samurai castle with preserved grounds and seasonal cherry blossoms",
  "Narai-juku - Edo-period post town offering a glimpse into traditional Japanese life and architecture",
  "Kiso Valley - Picturesque valley with traditional villages and hiking trails along the Nakasendo route",
  "Matsushiro - Historic castle town with samurai houses, temples, and museums",
  "Snow Monkey Onsen Experience - Unique opportunity to observe monkeys up close in natural hot springs",
  "Local Cuisine Experiences - Savor soba noodles, oyaki dumplings, and mountain vegetable dishes in local inns"
]
,
    bestTime: "December-March (Skiing & Snow Monkeys) & June-October (Hiking)",
    duration: "2-4 days",
    rating: 4.7,
    activities: ["Skiing", "Temple Visits", "Wildlife Watching", "Hiking", "Hot Springs", "Mountain Climbing"],
    cuisine: ["Soba Noodles", "Oyaki", "Shinshu Beef", "Wild Vegetables", "Chestnuts", "Sake", "Apple Pie"],
   
   
    tips: [
  "Visit snow monkeys early in the morning for the best experience - they are most active then",
  "Try authentic handmade soba at local restaurants - Nagano is famous for it",
  "Book ski accommodations early for the winter season as it gets very busy",
  "Dress in layers - mountain weather can change quickly even in summer",
  "Bring cash as many local restaurants, shops, and small attractions do not accept credit cards",
  "Carry comfortable walking shoes for hiking and exploring traditional villages",
  "Check the weather forecast before visiting alpine areas to avoid sudden storms",
  "Use public transport passes like Alpico or Nagano Free Pass for convenient travel",
  "Learn a few basic Japanese phrases; locals appreciate polite greetings and thanks",
  "Respect hot spring etiquette - wash before entering onsen and avoid swimsuits",
 
]
,
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