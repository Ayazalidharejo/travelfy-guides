// "use client";
// import React, { useState } from "react";
// import { 
//   X, MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train,
//   ChevronDown, ChevronUp, Navigation, PlayCircle, Building, Mountain, Church, 
//   ShoppingCart, Waves, Cable, Trees, Store, Gamepad2, Target, Info
// } from "lucide-react";

// const japanPlaces = [
//   {
//     id: 1,
//     name: "Mount Fuji",
//     subtitle: "Japan's Sacred Peak",
//     mainImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=800&fit=crop",
//     description: "Mount Fuji, standing at 3,776 meters, is Japan's highest and most iconic mountain. This perfectly symmetrical volcanic cone has inspired artists for centuries.",
//     longDescription: "Mount Fuji is more than just Japan's tallest peak - it's a sacred symbol deeply embedded in Japanese culture and spirituality. This active stratovolcano last erupted in 1707 and is now a UNESCO World Heritage Site.",
//     highlights: [
//       "Summit Climb - Challenging 6-8 hour trek to watch sunrise from 3,776m peak",
//       "Lake Kawaguchi - Most accessible of Five Lakes with perfect Fuji reflections",
//       "Chureito Pagoda - Iconic five-story pagoda with cherry blossoms and Fuji view",
//       "Fuji Five Lakes - Kawaguchi, Yamanaka, Sai, Shoji, and Motosu lakes"
//     ],
//     bestTime: "July-September (Climbing) & October-February (Clear Views)",
//     duration: "2-3 days",
//     rating: 4.9,
//     activities: ["Mountain Climbing", "Lake Cruises", "Photography", "Hiking Trails", "Shrine Visits", "Cable Car Rides"],
//     cuisine: ["Hoto Noodles", "Fujinomiya Yakisoba", "Lake Fish", "Mountain Vegetables", "Fuji Tofu"],
//     transportation: "Train to Kawaguchiko Station, then buses; express buses from Tokyo available",
//     accommodation: "Lakeside hotels, mountain huts for climbers, traditional ryokans with Fuji views",
//     tips: [
//       "Book mountain huts months in advance for overnight climbing",
//       "Start climb in afternoon, rest at station, summit for sunrise",
//       "Bring warm clothes even in summer - summit temperature near freezing"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1570145820259-a25a6a5d6f41?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Tokyo to Mount Fuji Adventure",
//       tripDuration: "2 Days • 11 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Theatre1010", 
//           icon: PlayCircle, 
//           color: "text-purple-600", 
//           location: "Theatre1010, Tokyo",
//           time: "09:00 AM",
//           duration: "1 hour",
//           description: "Start your journey from Tokyo's Theatre1010. This modern cultural hub in Kita-Senju offers a glimpse into Tokyo's vibrant arts scene.",
//           activities: ["Cultural exploration", "Morning coffee", "Travel preparation"],
//           cost: "Free to ¥500"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Chureito Pagoda", 
//           icon: Building, 
//           color: "text-red-500", 
//           location: "Chureito Pagoda, Fujiyoshida",
//           time: "12:00 PM",
//           duration: "2 hours",
//           description: "The iconic five-story pagoda with Mt. Fuji backdrop. Climb 400 steps for breathtaking views. Best during cherry blossom season!",
//           activities: ["Photography", "Hiking 400 steps", "Scenic views"],
//           cost: "Free entry"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Oshino Hakkai", 
//           icon: Mountain, 
//           color: "text-blue-600", 
//           location: "Oshino Hakkai, Yamanashi",
//           time: "02:30 PM",
//           duration: "1.5 hours",
//           description: "Eight sacred ponds with crystal-clear spring water fed by Mt. Fuji's snowmelt. Traditional thatched-roof houses surround the ponds.",
//           activities: ["Pond viewing", "Traditional village walk", "Local snacks"],
//           cost: "¥300 pond area entry"
//         },
//         { 
//           id: 4, 
//           day: 1,
//           name: "Arakura Fuji Sengen Shrine", 
//           icon: Church, 
//           color: "text-orange-600", 
//           location: "Arakura Fuji Sengen Shrine, Fujiyoshida",
//           time: "04:30 PM",
//           duration: "1 hour",
//           description: "Ancient shrine at the base of Chureito Pagoda. Peaceful atmosphere with Mt. Fuji views and traditional architecture.",
//           activities: ["Shrine visit", "Prayer", "Omikuji fortune"],
//           cost: "Free"
//         },
//         { 
//           id: 5, 
//           day: 1,
//           name: "Kawaguchiko Lawson", 
//           icon: ShoppingCart, 
//           color: "text-blue-500", 
//           location: "Lawson Kawaguchiko Station",
//           time: "06:00 PM",
//           duration: "30 minutes",
//           description: "Famous convenience store with perfect Mt. Fuji framing! A must-visit Instagram spot. Stock up on snacks and drinks.",
//           activities: ["Photo opportunity", "Snack shopping", "Convenience items"],
//           cost: "¥500-1000"
//         },
//         { 
//           id: 6, 
//           day: 1,
//           name: "Lake Kawaguchiko", 
//           icon: Waves, 
//           color: "text-cyan-500", 
//           location: "Lake Kawaguchiko, Yamanashi",
//           time: "07:00 PM",
//           duration: "Evening stroll",
//           description: "Most accessible of the Fuji Five Lakes. Enjoy sunset reflections of Mt. Fuji on the calm lake waters. Perfect end to Day 1!",
//           activities: ["Lake walk", "Sunset photography", "Dinner by lake"],
//           cost: "Free"
//         },
//         { 
//           id: 7, 
//           day: 2,
//           name: "Kachi-Kachi Ropeway", 
//           icon: Cable, 
//           color: "text-gray-600", 
//           location: "Kachi Kachi Ropeway, Fujikawaguchiko",
//           time: "09:00 AM",
//           duration: "1.5 hours",
//           description: "Cable car ride to Mt. Tenjo observation deck. Panoramic views of Mt. Fuji, Lake Kawaguchiko, and surrounding mountains.",
//           activities: ["Ropeway ride", "Observation deck", "Morning views"],
//           cost: "¥900 round trip"
//         },
//         { 
//           id: 8, 
//           day: 2,
//           name: "Oishi Park", 
//           icon: Trees, 
//           color: "text-green-500", 
//           location: "Oishi Park, Fujikawaguchiko",
//           time: "11:00 AM",
//           duration: "1 hour",
//           description: "Flower gardens with Mt. Fuji views. Lavender in summer, cosmos in autumn. Beautiful seasonal flowers year-round.",
//           activities: ["Flower viewing", "Photography", "Park picnic"],
//           cost: "Free"
//         },
//         { 
//           id: 9, 
//           day: 2,
//           name: "Fuji Honchodori", 
//           icon: MapPin, 
//           color: "text-slate-600", 
//           location: "Fuji Honchodori, Fujiyoshida",
//           time: "01:00 PM",
//           duration: "1.5 hours",
//           description: "Traditional shopping street near Fuji-Q Highland. Local restaurants, souvenir shops, and authentic Fujiyoshida experience.",
//           activities: ["Shopping", "Local lunch", "Street exploration"],
//           cost: "¥1500-2500"
//         },
//         { 
//           id: 10, 
//           day: 2,
//           name: "Gotemba Premium Outlets", 
//           icon: Store, 
//           color: "text-amber-600", 
//           location: "Gotemba Premium Outlets",
//           time: "03:00 PM",
//           duration: "2-3 hours",
//           description: "Japan's largest outlet mall with 200+ stores. Mt. Fuji views while shopping for international and Japanese brands at discounted prices.",
//           activities: ["Shopping", "Brand outlets", "Food court"],
//           cost: "Varies"
//         },
//         { 
//           id: 11, 
//           day: 2,
//           name: "Yamanakako Lake Side Bowl", 
//           icon: Gamepad2, 
//           color: "text-emerald-500", 
//           location: "Yamanakako Lake Side Bowl",
//           time: "06:00 PM",
//           duration: "1-2 hours",
//           description: "Fun bowling alley near Lake Yamanaka. Perfect way to end your Mt. Fuji adventure with entertainment and relaxation.",
//           activities: ["Bowling", "Arcade games", "Dinner nearby"],
//           cost: "¥500-800 per game"
//         }
//       ]
//     }
//   },
//   {
//     id: 2,
//     name: "Hakone",
//     subtitle: "Hot Spring Paradise with Fuji Views",
//     mainImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop",
//     description: "Hakone is a mountainous hot spring resort town famous for its stunning views of Mount Fuji, volcanic valleys, and art museums.",
//     longDescription: "Hakone has been a popular hot spring destination for centuries, offering respite from urban life with its therapeutic waters and mountain scenery.",
//     highlights: [
//       "Lake Ashi Cruise - Pirate ship cruise with stunning Mt. Fuji views",
//       "Hakone Ropeway - Cable car over volcanic valley with panoramic vistas",
//       "Owakudani Valley - Active volcanic valley with sulfur vents and black eggs",
//       "Hakone Open-Air Museum - World-class outdoor sculpture museum"
//     ],
//     bestTime: "March-May & September-November (Clear Fuji Views)",
//     duration: "1-2 days",
//     rating: 4.8,
//     activities: ["Hot Springs", "Lake Cruises", "Museum Visits", "Hiking", "Cable Car Rides", "Photography"],
//     cuisine: ["Onsen Tamago", "Hakone Soba", "Black Eggs", "Kaiseki Ryori", "Local Tofu"],
//     transportation: "Hakone Freepass covers all transport; Romance Car from Shinjuku Station",
//     accommodation: "Traditional ryokans with onsen, modern hotels, many with Mt. Fuji views",
//     tips: [
//       "Purchase Hakone Freepass for unlimited transport and discounts",
//       "Stay overnight in ryokan for authentic onsen experience",
//       "Visit Owakudani early to avoid crowds and tour groups"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Hakone Onsen & Art Tour",
//       tripDuration: "1 Day • 8 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Hakone-Yumoto Station", 
//           icon: Train, 
//           color: "text-blue-600", 
//           location: "Hakone-Yumoto Station",
//           time: "09:00 AM",
//           duration: "30 minutes",
//           description: "Starting point in Hakone. Purchase Hakone Freepass here. Explore onsen town atmosphere and local shops.",
//           activities: ["Station arrival", "Freepass purchase", "Town exploration"],
//           cost: "¥6100 Freepass"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Hakone Open-Air Museum", 
//           icon: Building, 
//           color: "text-purple-600", 
//           location: "Hakone Open-Air Museum",
//           time: "10:00 AM",
//           duration: "2 hours",
//           description: "World-class sculpture museum in beautiful mountain setting. Features Picasso Pavilion and outdoor installations.",
//           activities: ["Sculpture viewing", "Picasso collection", "Foot bath"],
//           cost: "¥1600"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Owakudani Valley", 
//           icon: Mountain, 
//           color: "text-orange-600", 
//           location: "Owakudani, Hakone",
//           time: "01:00 PM",
//           duration: "1.5 hours",
//           description: "Active volcanic valley with steaming vents. Try famous black eggs boiled in sulfur springs (said to add 7 years to life!).",
//           activities: ["Valley walk", "Black egg tasting", "Sulfur observation"],
//           cost: "¥500"
//         },
//         { 
//           id: 4, 
//           day: 1,
//           name: "Lake Ashi Cruise", 
//           icon: Waves, 
//           color: "text-cyan-500", 
//           location: "Lake Ashi, Hakone",
//           time: "03:00 PM",
//           duration: "1 hour",
//           description: "Pirate ship cruise across Lake Ashi with Mt. Fuji backdrop. Beautiful photo opportunities on clear days.",
//           activities: ["Boat cruise", "Mt. Fuji views", "Lake photography"],
//           cost: "¥1200"
//         },
//         { 
//           id: 5, 
//           day: 1,
//           name: "Hakone Shrine", 
//           icon: Church, 
//           color: "text-red-500", 
//           location: "Hakone Shrine, Moto-Hakone",
//           time: "04:30 PM",
//           duration: "1 hour",
//           description: "Historic lakeside shrine with iconic red torii gate in water. Peaceful cedar forest setting.",
//           activities: ["Shrine visit", "Torii photography", "Forest walk"],
//           cost: "Free"
//         }
//       ]
//     }
//   },
//   {
//     id: 3,
//     name: "Gotemba",
//     subtitle: "Shopping Paradise at Mount Fuji's Base",
//     mainImage: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=800&fit=crop",
//     description: "Gotemba, located at the eastern base of Mount Fuji, is famous for its massive premium outlets and spectacular mountain views.",
//     longDescription: "Gotemba sits at 450 meters elevation on the southeastern slope of Mount Fuji, providing some of the best views of the mountain from its shopping complexes.",
//     highlights: [
//       "Gotemba Premium Outlets - Japan's largest outlet mall with 200+ stores",
//       "Peace Park - Beautiful park with Mt. Fuji views and walking paths",
//       "Gotemba Kogen Brewing - Local craft brewery using Mt. Fuji spring water",
//       "Mt. Fuji Subashiri Trail - Hiking access to Mount Fuji climbing routes"
//     ],
//     bestTime: "October-February (Clearest Mt. Fuji Views) & Year-round Shopping",
//     duration: "1 day",
//     rating: 4.6,
//     activities: ["Shopping", "Photography", "Hiking", "Brewery Tours", "Racing Events", "Nature Walks"],
//     cuisine: ["Gotemba Koshihikari Rice", "Local Sake", "Craft Beer", "Mishima Croquettes", "Wasabi Dishes"],
//     transportation: "JR Gotemba Line from Tokyo; highway buses available; car rental recommended",
//     accommodation: "Business hotels, resort hotels with onsen, budget accommodation near outlets",
//     tips: [
//       "Visit outlets on weekdays to avoid weekend crowds",
//       "Best Mt. Fuji views in winter mornings when air is clear",
//       "Combine with Hakone visit for hot springs experience"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1583319414569-a8f88a7f35e6?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Gotemba Shopping & Brewery Tour",
//       tripDuration: "1 Day • 5 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Gotemba Premium Outlets", 
//           icon: Store, 
//           color: "text-amber-600", 
//           location: "Gotemba Premium Outlets",
//           time: "10:00 AM",
//           duration: "3-4 hours",
//           description: "Japan's largest outlet mall with Mt. Fuji views. 200+ international and Japanese brands at discounted prices.",
//           activities: ["Brand shopping", "Food court lunch", "Mt. Fuji photography"],
//           cost: "Varies by shopping"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Peace Park", 
//           icon: Trees, 
//           color: "text-green-500", 
//           location: "Peace Park, Gotemba",
//           time: "02:30 PM",
//           duration: "1 hour",
//           description: "Beautiful park with excellent Mt. Fuji viewpoints. Walking paths, monuments, and peaceful atmosphere.",
//           activities: ["Park walk", "Photography", "Relaxation"],
//           cost: "Free"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Gotemba Kogen Brewing", 
//           icon: ShoppingCart, 
//           color: "text-blue-500", 
//           location: "Gotemba Kogen Brewery",
//           time: "04:00 PM",
//           duration: "1.5 hours",
//           description: "Local craft brewery using Mt. Fuji spring water. Tours available with tasting sessions of various beer styles.",
//           activities: ["Brewery tour", "Beer tasting", "Souvenir shopping"],
//           cost: "¥1000-1500"
//         }
//       ]
//     }
//   },
//   {
//     id: 4,
//     name: "Tokyo",
//     subtitle: "Where Tradition Meets Tomorrow",
//     mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
//     description: "Tokyo, Japan's bustling capital, seamlessly blends ultra-modern architecture with historic temples.",
//     longDescription: "Tokyo is a city of contrasts where ancient temples stand beside futuristic skyscrapers. As the world's most populous metropolitan area, it offers endless experiences.",
//     highlights: [
//       "Shibuya Crossing - World's busiest intersection with organized chaos",
//       "Senso-ji Temple - Tokyo's oldest temple dating back to 628 AD",
//       "Tokyo Skytree - 634m tall tower with breathtaking city panoramas",
//       "Harajuku & Takeshita Street - Youth culture and fashion epicenter"
//     ],
//     bestTime: "March-May (Cherry Blossoms) & September-November (Mild Weather)",
//     duration: "4-7 days",
//     rating: 4.9,
//     activities: ["City Tours", "Temple Visits", "Shopping", "Food Tours", "Photography", "Nightlife"],
//     cuisine: ["Sushi", "Ramen", "Tempura", "Yakitori", "Tonkatsu", "Street Food"],
//     transportation: "Extensive subway and JR train network, extremely efficient and punctual",
//     accommodation: "From capsule hotels to luxury ryokans, every budget and style available",
//     tips: [
//       "Get Suica or Pasmo card for seamless public transport",
//       "Visit temples early morning to avoid crowds",
//       "Try standing sushi bars for authentic experience"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Tokyo City Highlights",
//       tripDuration: "2 Days • 10 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Senso-ji Temple", 
//           icon: Church, 
//           color: "text-red-500", 
//           location: "Senso-ji Temple, Asakusa",
//           time: "08:00 AM",
//           duration: "2 hours",
//           description: "Tokyo's oldest temple. Walk through Kaminarimon Gate, shop at Nakamise Street, and explore the main temple.",
//           activities: ["Temple visit", "Nakamise shopping", "Fortune drawing"],
//           cost: "Free"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Tokyo Skytree", 
//           icon: Building, 
//           color: "text-blue-600", 
//           location: "Tokyo Skytree, Sumida",
//           time: "10:30 AM",
//           duration: "2 hours",
//           description: "634m tall broadcasting tower with two observation decks. Panoramic views of Tokyo and Mt. Fuji on clear days.",
//           activities: ["Observation deck", "Shopping", "Sky Restaurant"],
//           cost: "¥2100-3400"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Shibuya Crossing", 
//           icon: MapPin, 
//           color: "text-purple-600", 
//           location: "Shibuya Crossing, Shibuya",
//           time: "02:00 PM",
//           duration: "1.5 hours",
//           description: "World's busiest intersection. Cross with thousands of people, visit Hachiko statue, explore Shibuya 109.",
//           activities: ["Crossing experience", "Hachiko photo", "Shopping"],
//           cost: "Free"
//         },
//         { 
//           id: 4, 
//           day: 1,
//           name: "Harajuku & Takeshita Street", 
//           icon: ShoppingCart, 
//           color: "text-pink-500", 
//           location: "Harajuku, Tokyo",
//           time: "04:00 PM",
//           duration: "2 hours",
//           description: "Youth fashion capital. Colorful street fashion, trendy shops, crepes, and unique boutiques.",
//           activities: ["Street fashion", "Shopping", "Crepe tasting"],
//           cost: "¥1000-3000"
//         },
//         { 
//           id: 5, 
//           day: 1,
//           name: "Meiji Shrine", 
//           icon: Trees, 
//           color: "text-green-600", 
//           location: "Meiji Shrine, Harajuku",
//           time: "06:00 PM",
//           duration: "1 hour",
//           description: "Peaceful Shinto shrine in forested grounds. Traditional weddings often visible. Beautiful at sunset.",
//           activities: ["Shrine visit", "Forest walk", "Traditional ceremony viewing"],
//           cost: "Free"
//         },
//         { 
//           id: 6, 
//           day: 1,
//           name: "Ueno Park",
//           time: "07:30 PM",
//           duration: "1 hour",
//           icon: "🌳",
//         },
//         { 
//           id: 7, 
//           day: 1,
//           name: "Akihabara",
//           time: "08:45 PM",
//           duration: "1 hour",
//           icon: "🎮",
//         },
//         { 
//           id: 8, 
//           day: 1,
//           name: "Tokyo Dome",
//           time: "10:00 PM",
//           duration: "1 hour",
//           icon: "🏟️",
//         },
//         { 
//           id: 9, 
//           day: 1,
//           name: "Roppongi Hills",
//           time: "11:15 PM",
//           duration: "1 hour",
//           icon: "🏙️",
//         },
//         { 
//           id: 10, 
//           day: 1,
//           name: "Tsukiji Outer Market",
//           time: "12:30 AM",
//           duration: "1 hour",
//           icon: "🍣",
//         }
//       ]
//     }
//   },
//   {
//     id: 5,
//     name: "Nikko",
//     subtitle: "Sacred Mountains & UNESCO Treasures",
//     mainImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop",
//     description: "Nikko, a mountain town north of Tokyo, is home to UNESCO World Heritage shrines and temples set among stunning natural scenery.",
//     longDescription: "Nikko has been a center of Shinto and Buddhist mountain worship for over 1,200 years. Famous for ornate Toshogu Shrine and beautiful waterfalls.",
//     highlights: [
//       "Toshogu Shrine - Ornate UNESCO shrine with famous monkey and cat carvings",
//       "Kegon Falls - Spectacular 97-meter waterfall near Lake Chuzenji",
//       "Lake Chuzenji - Beautiful mountain lake formed by volcanic eruption",
//       "Shinkyo Bridge - Sacred vermillion bridge over Daiya River"
//     ],
//     bestTime: "May-June (Fresh Green) & October-November (Autumn Colors)",
//     duration: "1-2 days",
//     rating: 4.8,
//     activities: ["Temple Visits", "Hiking", "Waterfall Viewing", "Hot Springs", "Photography", "Nature Walks"],
//     cuisine: ["Yuba (Tofu Skin)", "Nikko Soba", "Rainbow Trout", "Wild Vegetables", "Sake"],
//     transportation: "Limited Express train from Tokyo (Asakusa) takes 2 hours",
//     accommodation: "Traditional ryokans, onsen hotels, budget guesthouses available",
//     tips: [
//       "Purchase combo ticket for shrines to save money",
//       "Visit shrines before 9am to avoid tour groups",
//       "Autumn colors peak late October to early November"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Nikko UNESCO Heritage Tour",
//       tripDuration: "1 Day • 6 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Shinkyo Bridge", 
//           icon: Building, 
//           color: "text-red-500", 
//           location: "Shinkyo Bridge, Nikko",
//           time: "09:00 AM",
//           duration: "30 minutes",
//           description: "Sacred vermillion bridge entrance to Nikko. One of Japan's three most beautiful bridges.",
//           activities: ["Bridge viewing", "Photography", "River walk"],
//           cost: "¥300 to cross"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Toshogu Shrine", 
//           icon: Church, 
//           color: "text-orange-600", 
//           location: "Toshogu Shrine, Nikko",
//           time: "10:00 AM",
//           duration: "2.5 hours",
//           description: "Ornate UNESCO shrine with Three Wise Monkeys and Sleeping Cat carvings. Tokugawa Ieyasu's mausoleum.",
//           activities: ["Shrine exploration", "Carving viewing", "Five-story pagoda"],
//           cost: "¥1300"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Lake Chuzenji", 
//           icon: Waves, 
//           color: "text-blue-500", 
//           location: "Lake Chuzenji, Nikko",
//           time: "02:00 PM",
//           duration: "1.5 hours",
//           description: "Beautiful mountain lake at 1269m elevation. Cruise available, stunning autumn colors.",
//           activities: ["Lake cruise", "Lakeside walk", "Scenic photography"],
//           cost: "¥1250 cruise"
//         },
//         { 
//           id: 4, 
//           day: 1,
//           name: "Kegon Falls", 
//           icon: Mountain, 
//           color: "text-cyan-500", 
//           location: "Kegon Falls, Nikko",
//           time: "04:00 PM",
//           duration: "1 hour",
//           description: "Spectacular 97-meter waterfall. Elevator to base for close-up views. One of Japan's three most beautiful falls.",
//           activities: ["Waterfall viewing", "Elevator ride", "Nature photography"],
//           cost: "¥570"
//         }
//       ]
//     }
//   },
//   {
//     id: 6,
//     name: "Nagano",
//     subtitle: "Alpine Beauty & Snow Monkeys",
//     mainImage: "https://images.unsplash.com/photo-1560252556-e98b9cd46569?w=1200&h=800&fit=crop",
//     description: "Nagano, nestled in Japan's Northern Alps, offers world-class skiing, the famous Zenko-ji Temple, and wild snow monkeys bathing in hot springs.",
//     longDescription: "Nagano Prefecture is Japan's roof, encompassing much of the Japanese Alps. Famous for 1998 Winter Olympics and snow monkeys.",
//     highlights: [
//       "Zenko-ji Temple - Historic 7th-century temple",
//       "Jigokudani Monkey Park - Wild snow monkeys in hot springs",
//       "Hakuba Valley - World-class ski resort",
//       "Matsumoto Castle - Stunning original black castle"
//     ],
//     bestTime: "December-March (Skiing & Snow Monkeys) & June-October (Hiking)",
//     duration: "2-4 days",
//     rating: 4.7,
//     activities: ["Skiing", "Temple Visits", "Wildlife Watching", "Hiking", "Hot Springs"],
//     cuisine: ["Soba Noodles", "Oyaki", "Shinshu Beef", "Wild Vegetables", "Chestnuts"],
//     transportation: "Shinkansen from Tokyo to Nagano (90 minutes)",
//     accommodation: "Ski resorts, onsen ryokans, city hotels, mountain lodges",
//     tips: [
//       "Visit snow monkeys early morning for best experience",
//       "Try authentic handmade soba at local restaurants",
//       "Book ski accommodations early for winter season"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1583725094311-ee8f5c85d63b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Nagano Snow Monkeys & Temple Tour",
//       tripDuration: "1 Day • 4 Destinations",
//       items: [
//         { 
//           id: 1, 
//           day: 1,
//           name: "Zenko-ji Temple", 
//           icon: Church, 
//           color: "text-red-500", 
//           location: "Zenko-ji Temple, Nagano",
//           time: "08:00 AM",
//           duration: "2 hours",
//           description: "One of Japan's most important Buddhist temples. Founded in 7th century, houses Japan's first Buddhist statue.",
//           activities: ["Temple visit", "Morning prayer", "Nakamise shopping"],
//           cost: "¥500"
//         },
//         { 
//           id: 2, 
//           day: 1,
//           name: "Jigokudani Monkey Park", 
//           icon: Mountain, 
//           color: "text-blue-600", 
//           location: "Jigokudani, Yamanouchi",
//           time: "11:00 AM",
//           duration: "2.5 hours",
//           description: "Famous wild snow monkeys bathing in natural hot springs. Only place in world where monkeys bathe in onsen!",
//           activities: ["Monkey watching", "Forest trail walk", "Photography"],
//           cost: "¥800"
//         },
//         { 
//           id: 3, 
//           day: 1,
//           name: "Shibu Onsen", 
//           icon: Waves, 
//           color: "text-orange-500", 
//           location: "Shibu Onsen, Yamanouchi",
//           time: "02:30 PM",
//           duration: "2 hours",
//           description: "Traditional hot spring town near monkey park. Nine public bathhouses, nostalgic atmosphere.",
//           activities: ["Onsen bathing", "Town walk", "Traditional architecture"],
//           cost: "¥500-1500"
//         }
//       ]
//     }
//   },
//   {
//     id: 7,
//     name: "Kyoto",
//     subtitle: "Ancient Temples & Geisha Districts",
//     mainImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop",
//     description: "Kyoto, the heart of traditional Japan, is famous for its historic temples, shrines, and beautiful gardens.",
//     longDescription: "Kyoto was Japan's capital for over a thousand years. Its streets are lined with wooden houses, and the city is home to hundreds of temples and shrines.",
//     highlights: [
//       "Fushimi Inari Shrine - Thousands of iconic red torii gates",
//       "Kinkaku-ji (Golden Pavilion) - Zen temple covered in gold leaf",
//       "Gion District - Geisha culture and traditional tea houses",
//       "Arashiyama Bamboo Grove - Magical bamboo forest walk"
//     ],
//     bestTime: "March-April (Cherry Blossoms) & November (Autumn Leaves)",
//     duration: "2-4 days",
//     rating: 4.9,
//     activities: ["Temple Visits", "Tea Ceremonies", "Kimono Experience", "Garden Walks", "Bamboo Forest", "Cultural Tours"],
//     cuisine: ["Kaiseki", "Yudofu", "Matcha Sweets", "Kyo Wagashi", "Tofu Dishes"],
//     transportation: "JR Shinkansen from Tokyo (2.5 hours), local buses and subway",
//     accommodation: "Ryokans, machiya townhouses, luxury hotels",
//     tips: [
//       "Book tea ceremony in advance for authentic experience",
//       "Visit Fushimi Inari early morning to avoid crowds",
//       "Rent a kimono for a day to explore historic districts"
//     ],
//     gallery: [
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop"
//     ],
//     itinerary: {
//       tripName: "Kyoto Heritage & Culture Tour",
//       tripDuration: "2 Days • 8 Destinations",
//       items: [
//         {
//           id: 1,
//           day: 1,
//           name: "Fushimi Inari Shrine",
//           icon: Church,
//           color: "text-red-500",
//           location: "Fushimi Inari Taisha, Kyoto",
//           time: "08:00 AM",
//           duration: "2 hours",
//           description: "Walk through thousands of red torii gates up the sacred Mount Inari.",
//           activities: ["Shrine visit", "Torii gate walk", "Photography"],
//           cost: "Free"
//         },
//         {
//           id: 2,
//           day: 1,
//           name: "Kinkaku-ji (Golden Pavilion)",
//           icon: Building,
//           color: "text-yellow-500",
//           location: "Kinkaku-ji, Kyoto",
//           time: "10:30 AM",
//           duration: "1 hour",
//           description: "Zen temple covered in gold leaf, surrounded by beautiful gardens.",
//           activities: ["Temple visit", "Garden walk", "Photography"],
//           cost: "¥400"
//         },
//         {
//           id: 3,
//           day: 1,
//           name: "Gion District",
//           icon: Store,
//           color: "text-pink-500",
//           location: "Gion, Kyoto",
//           time: "01:00 PM",
//           duration: "2 hours",
//           description: "Explore the historic geisha district, tea houses, and traditional streets.",
//           activities: ["Street walk", "Tea ceremony", "Kimono rental"],
//           cost: "Varies"
//         },
//         {
//           id: 4,
//           day: 1,
//           name: "Arashiyama Bamboo Grove",
//           icon: Trees,
//           color: "text-green-500",
//           location: "Arashiyama, Kyoto",
//           time: "04:00 PM",
//           duration: "1 hour",
//           description: "Magical walk through towering bamboo forest.",
//           activities: ["Bamboo walk", "Photography", "Nature experience"],
//           cost: "Free"
//         },
//         {
//           id: 5,
//           day: 2,
//           name: "Kiyomizu-dera Temple",
//           icon: Church,
//           color: "text-orange-500",
//           location: "Kiyomizu-dera, Kyoto",
//           time: "09:00 AM",
//           duration: "1.5 hours",
//           description: "Famous temple with panoramic views of Kyoto.",
//           activities: ["Temple visit", "Viewpoint", "Shopping"],
//           cost: "¥400"
//         },
//         {
//           id: 6,
//           day: 2,
//           name: "Nishiki Market",
//           icon: ShoppingCart,
//           color: "text-blue-500",
//           location: "Nishiki Market, Kyoto",
//           time: "11:00 AM",
//           duration: "1 hour",
//           description: "Traditional food market with local delicacies.",
//           activities: ["Food tasting", "Shopping", "Market walk"],
//           cost: "Varies"
//         },
//         {
//           id: 7,
//           day: 2,
//           name: "Philosopher's Path",
//           icon: Waves,
//           color: "text-cyan-500",
//           location: "Philosopher's Path, Kyoto",
//           time: "01:00 PM",
//           duration: "1 hour",
//           description: "Scenic canal-side walk lined with cherry trees.",
//           activities: ["Walking", "Photography", "Nature"],
//           cost: "Free"
//         },
//         {
//           id: 8,
//           day: 2,
//           name: "Toji Temple",
//           icon: Church,
//           color: "text-purple-600",
//           location: "Toji Temple, Kyoto",
//           time: "03:00 PM",
//           duration: "1 hour",
//           description: "Historic temple with Japan's tallest pagoda.",
//           activities: ["Temple visit", "Pagoda viewing", "Photography"],
//           cost: "¥500"
//         }
//       ]
//     }
//   }
// ];

// const day1LeftLocations = [
//   {
//     id: 1,
//     name: "Senso-ji Temple",
//     images: [
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop"
//     ],
//     description: "Tokyo's oldest temple. Walk through Kaminarimon Gate, shop at Nakamise Street, and explore the main temple."
//   },
//   {
//     id: 2,
//     name: "Tokyo Skytree",
//     images: [
//       "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop"
//     ],
//     description: "634m tall broadcasting tower with two observation decks. Panoramic views of Tokyo and Mt. Fuji on clear days."
//   },
//   {
//     id: 3,
//     name: "Shibuya Crossing",
//     images: [
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop"
//     ],
//     description: "World's busiest intersection. Cross with thousands of people, visit Hachiko statue, explore Shibuya 109."
//   },
//   {
//     id: 4,
//     name: "Harajuku & Takeshita Street",
//     images: [
//       "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop"
//     ],
//     description: "Youth fashion capital. Colorful street fashion, trendy shops, crepes, and unique boutiques."
//   },
//   {
//     id: 5,
//     name: "Meiji Shrine",
//     images: [
//       "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop"
//     ],
//     description: "Peaceful Shinto shrine in forested grounds. Traditional weddings often visible. Beautiful at sunset."
//   }
// ];

// const day1RightLocations = [
//   {
//     id: 6,
//     name: "Ueno Park",
//     time: "07:30 PM",
//     duration: "1 hour",
//     icon: "🌳",
//   },
//   {
//     id: 7,
//     name: "Akihabara",
//     time: "08:45 PM",
//     duration: "1 hour",
//     icon: "🎮",
//   },
//   {
//     id: 8,
//     name: "Tokyo Dome",
//     time: "10:00 PM",
//     duration: "1 hour",
//     icon: "🏟️",
//   },
//   {
//     id: 9,
//     name: "Roppongi Hills",
//     time: "11:15 PM",
//     duration: "1 hour",
//     icon: "🏙️",
//   },
//   {
//     id: 10,
//     name: "Tsukiji Outer Market",
//     time: "12:30 AM",
//     duration: "1 hour",
//     icon: "🍣",
//   },
// ];

// // Combine left and right locations for gallery section
// const day1Locations = [
//   ...day1LeftLocations,
//   ...day1RightLocations.map(loc => ({
//     ...loc,
//     images: [
//       "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8d9?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=800&fit=crop"
//     ],
//     description: loc.name + " description"
//   }))
// ];



// const Gallery = () => {
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [expandedItems, setExpandedItems] = useState({});
//   const [selectedItineraryItem, setSelectedItineraryItem] = useState(null);
//   const [showGallery, setShowGallery] = useState<number | null>(null);

//   const toggleExpand = (id) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
    
//     // Track which itinerary item was clicked
//     if (selectedPlace && selectedPlace.itinerary) {
//       const item = selectedPlace.itinerary.items.find(item => item.id === id);
//       if (item) {
//         setSelectedItineraryItem(item);
//         console.log("Selected Itinerary Item:", {
//           id: item.id,
//           name: item.name,
//           location: item.location,
//           day: item.day,
//           time: item.time,
//           from: selectedPlace.name,
//           to: item.location
//         });
//       }
//     }
//   };

//   const openInGoogleMaps = (location) => {
//     const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
//     window.open(mapsUrl, '_blank');
//   };

//   const renderItineraryColumn = (items) => (
//     <div className="relative">
//       {items.map((item, index) => (
//         <div key={item.id} className="relative">
//           {index < items.length - 1 && (
//             <div className="absolute left-8 top-20 w-px h-20 bg-gradient-to-b from-gray-300 to-gray-200 z-0"></div>
//           )}
          
//           <div className="relative z-10 p-4 hover:bg-gray-50 transition-all rounded-lg mb-2">
//             <div 
//               className="flex items-center gap-4 cursor-pointer"
//               onClick={() => toggleExpand(item.id)}
//             >
//               <div className="flex items-center gap-3">
//                 <div className={`p-2.5 rounded-full bg-gray-100 ${item.color} transition-transform hover:scale-110`}>
//                   <item.icon className="w-5 h-5" />
//                 </div>
//                 <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
//                   {item.id}
//                 </div>
//               </div>
              
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
//                 <p className="text-xs text-gray-500 mt-0.5">{item.time} • {item.duration}</p>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openInGoogleMaps(item.location);
//                   }}
//                   className="p-2 hover:bg-pink-100 rounded-full transition-colors"
//                   title="Open in Google Maps"
//                 >
//                   <Target className="w-4 h-4 text-pink-500" />
//                 </button>
//                 {expandedItems[item.id] ? (
//                   <ChevronUp className="w-5 h-5 text-gray-400" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 )}
//               </div>
//             </div>

//             {expandedItems[item.id] && (
//               <div className="mt-4 ml-14 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-pink-500 shadow-sm">
//                 <div className="mb-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Info className="w-4 h-4 text-pink-500" />
//                     <h4 className="font-semibold text-gray-900">Description</h4>
//                   </div>
//                   <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
//                 </div>

//                 <div className="mb-3">
//                   <h4 className="font-semibold text-gray-900 text-sm mb-2">Activities</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {item.activities.map((activity, idx) => (
//                       <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
//                         {activity}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-semibold text-gray-600">Cost:</span>
//                     <span className="text-sm font-bold text-[#307172]">{item.cost}</span>
//                   </div>
//                   <button
//                     onClick={() => openInGoogleMaps(item.location)}
//                     className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium hover:underline cursor-pointer"
//                   >
//                     <Navigation className="w-3.5 h-3.5" />
//                     <span>Get directions</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="bg-white py-20 px-6 md:px-20">
//       {/* TOP: Photo Gallery */}
      
     

//       {/* ---------- JAPAN DESTINATIONS CARDS ---------- */}
//       <div className="max-w-6xl mx-auto text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Explore Beautiful{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
//             Japan Destinations
//           </span>
//         </h2>
//         <p className="text-gray-700 text-lg md:text-xl mb-12">
//           Discover the most breathtaking places in Japan with Karvaan Tours
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {japanPlaces.map((place) => (
//             <div
//               key={place.id}
//               onClick={() => {
//                 setSelectedPlace(place);
//                 setExpandedItems({});
//                 setSelectedItineraryItem(null);
//               }}
//               className="relative group h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
//             >
//               <img
//                 src={place.mainImage}
//                 alt={place.name}
//                 className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6">
//                 <h3 className="text-2xl font-bold text-white">{place.name}</h3>
//                 <p className="text-white mt-2 italic">{place.subtitle}</p>
//                 <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ---------- MODAL FOR PLACE DETAILS ---------- */}
//       {selectedPlace && (
//         <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
//           <div className="min-h-screen px-4 py-8">
//             <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl relative">
//               <button
//                 onClick={() => {
//                   setSelectedPlace(null);
//                   setExpandedItems({});
//                   setSelectedItineraryItem(null);
//                 }}
//                 className="sticky top-4 float-right mr-4 mt-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10 shadow-lg"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <div className="relative h-96 rounded-t-2xl overflow-hidden">
//                 <img
//                   src={selectedPlace.mainImage}
//                   alt={selectedPlace.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
//                   <div className="p-8 text-white">
//                     <h2 className="text-5xl font-bold mb-2">{selectedPlace.name}</h2>
//                     <p className="text-2xl italic">{selectedPlace.subtitle}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                   <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
//                     <Calendar className="w-6 h-6 text-blue-600" />
//                     <div>
//                       <p className="text-sm text-gray-600 font-medium">Best Time</p>
//                       <p className="font-semibold text-sm text-gray-800">{selectedPlace.bestTime}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
//                     <Clock className="w-6 h-6 text-green-600" />
//                     <div>
//                       <p className="text-sm text-gray-600 font-medium">Duration</p>
//                       <p className="font-semibold text-gray-800">{selectedPlace.duration}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
//                     <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
//                     <div>
//                       <p className="text-sm text-gray-600 font-medium">Rating</p>
//                       <p className="font-semibold text-gray-800">{selectedPlace.rating}/5.0</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-8">
//                   <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 flex items-center gap-2">
//                     <Compass className="w-8 h-8 text-red-600" />
//                     About {selectedPlace.name}
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed text-lg mb-4">{selectedPlace.description}</p>
//                   <p className="text-gray-600 leading-relaxed">{selectedPlace.longDescription}</p>
//                 </div>

//                 {/* Itinerary Section */}
//                 {selectedPlace.itinerary && (
//                   <div className="mb-8">
//                     <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-6 rounded-t-xl text-white">
//                       <div className="flex items-center gap-3 mb-2">
//                         <MapPin className="w-6 h-6" />
//                         <h2 className="text-2xl font-bold">{selectedPlace.itinerary.tripName}</h2>
//                       </div>
//                       <p className="text-pink-100 ml-9">{selectedPlace.itinerary.tripDuration}</p>
//                     </div>

//                     <div className="bg-white border-2 border-[#307172] rounded-b-xl p-6">
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Day 1 */}
//                         <div className="space-y-0">
//                           <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//                             <Calendar className="w-5 h-5 text-pink-500" />
//                             <h3 className="text-lg font-semibold text-gray-800">
//                               Day 1 Locations ({selectedPlace.itinerary.items.filter(i => i.day === 1).length} stops)
//                             </h3>
//                           </div>
//                           {renderItineraryColumn(selectedPlace.itinerary.items.filter(i => i.day === 1))}
//                         </div>

//                         {/* Day 2 (if exists) */}
//                         {selectedPlace.itinerary.items.some(i => i.day === 2) && (
//                           <div className="space-y-0">
//                             <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//                               <Calendar className="w-5 h-5 text-pink-500" />
//                               <h3 className="text-lg font-semibold text-gray-800">
//                                 Day 2 Locations ({selectedPlace.itinerary.items.filter(i => i.day === 2).length} stops)
//                               </h3>
//                             </div>
//                             {renderItineraryColumn(selectedPlace.itinerary.items.filter(i => i.day === 2))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mb-8">
//                   <h3 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
//                     <Camera className="w-8 h-8 text-red-600" />
//                     Top Highlights
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {selectedPlace.highlights.map((highlight, idx) => (
//                       <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
//                         <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
//                         <span className="text-gray-700">{highlight}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
//                       <Users className="w-7 h-7 text-blue-600" />
//                       Activities
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedPlace.activities.map((activity, idx) => (
//                         <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                           {activity}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
//                       <Utensils className="w-7 h-7 text-orange-600" />
//                       Cuisine
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedPlace.cuisine.map((food, idx) => (
//                         <span key={idx} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
//                           {food}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
//                     <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
//                       <Train className="w-6 h-6 text-purple-600" />
//                       Transportation
//                     </h3>
//                     <p className="text-gray-700">{selectedPlace.transportation}</p>
//                   </div>
//                   <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
//                     <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
//                       <Hotel className="w-6 h-6 text-pink-600" />
//                       Accommodation
//                     </h3>
//                     <p className="text-gray-700">{selectedPlace.accommodation}</p>
//                   </div>
//                 </div>

//                 <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
//                   <h3 className="text-2xl font-bold mb-4 text-gray-900">💡 Travel Tips</h3>
//                   <ul className="space-y-2">
//                     {selectedPlace.tips.map((tip, idx) => (
//                       <li key={idx} className="flex items-start gap-3">
//                         <span className="text-indigo-600 font-bold mt-1">•</span>
//                         <span className="text-gray-700">{tip}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
//                     <Camera className="w-8 h-8 text-red-600" />
//                     Photo Gallery
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                     {selectedPlace.gallery.map((img, idx) => (
//                       <div key={idx} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
//                         <img
//                           src={img}
//                           alt={`${selectedPlace.name} ${idx + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

    

//       {/* ---------- BOTTOM: TOKYO TO MOUNT FUJI ADVENTURE SECTION ---------- */}
//       <section className="container mx-auto px-4 py-10">
//         <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-6 rounded-t-xl text-white mb-0">
//           <div className="flex items-center gap-3 mb-2">
//             <MapPin className="w-6 h-6" />
//             <h2 className="text-2xl font-bold">Tokyo to Mount Fuji Adventure</h2>
//           </div>
//           <p className="text-pink-100 ml-9">2 Days • 11 Destinations</p>
//         </div>
//         <div className="bg-white border-2 border-[#307172] rounded-b-xl p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Day 1 */}
//             <div className="space-y-0">
//               <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//                 <Calendar className="w-5 h-5 text-pink-500" />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Day 1 Locations ({japanPlaces[0].itinerary.items.filter(i => i.day === 1).length} stops)
//                 </h3>
//               </div>
//               {japanPlaces[0].itinerary.items.filter(i => i.day === 1).map((item, index) => (
//                 <div key={item.id} className="relative z-10 p-4 hover:bg-gray-50 transition-all rounded-lg mb-2">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-2.5 rounded-full bg-gray-100 ${item.color} transition-transform`}>
//                         <item.icon className="w-5 h-5" />
//                       </div>
//                       <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
//                         {item.id}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
//                       <p className="text-xs text-gray-500 mt-0.5">{item.time} • {item.duration}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* Day 2 */}
//             <div className="space-y-0">
//               <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//                 <Calendar className="w-5 h-5 text-pink-500" />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Day 2 Locations ({japanPlaces[0].itinerary.items.filter(i => i.day === 2).length} stops)
//                 </h3>
//               </div>
//               {japanPlaces[0].itinerary.items.filter(i => i.day === 2).map((item, index) => (
//                 <div key={item.id} className="relative z-10 p-4 hover:bg-gray-50 transition-all rounded-lg mb-2">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-2.5 rounded-full bg-gray-100 ${item.color} transition-transform`}>
//                         <item.icon className="w-5 h-5" />
//                       </div>
//                       <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
//                         {item.id}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
//                       <p className="text-xs text-gray-500 mt-0.5">{item.time} • {item.duration}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Gallery;
// Gallery.jsx - Main Component
"use client";
import React, { useState } from "react";
import MountFujiDetail from "./Gallery-detailpage/MountFujiDetail";
import HakoneDetail from "./Gallery-detailpage/HakoneDetail";
import GotembaDetail from "./Gallery-detailpage/GotembaDetail";
import TokyoDetail from "./Gallery-detailpage/TokyoDetail";
import NikkoDetail from "./Gallery-detailpage/NikkoDetail";
import NaganoDetail from "./Gallery-detailpage/NaganoDetail";
// import KyotoDetail from "./Kyoto";

const Gallery = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Destinations data with their respective components
  const destinations = [
    { 
      id: 1, 
      name: "Mount Fuji", 
      subtitle: "Japan's Sacred Peak", 
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=800&fit=crop", 
      component: MountFujiDetail 
    },
    { 
      id: 2, 
      name: "Hakone", 
      subtitle: "Hot Spring Paradise with Fuji Views", 
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop", 
      component: HakoneDetail 
    },
    { 
      id: 3, 
      name: "Gotemba", 
      subtitle: "Shopping Paradise at Mount Fuji's Base", 
      image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=800&fit=crop", 
      component: GotembaDetail 
    },
    { 
      id: 4, 
      name: "Tokyo", 
      subtitle: "Where Tradition Meets Tomorrow", 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop", 
      component: TokyoDetail 
    },
    { 
      id: 5, 
      name: "Nikko", 
      subtitle: "Sacred Mountains & UNESCO Treasures", 
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop", 
      component: NikkoDetail 
    },
    { 
      id: 6, 
      name: "Nagano", 
      subtitle: "Alpine Beauty & Snow Monkeys", 
      image: "https://images.unsplash.com/photo-1560252556-e98b9cd46569?w=1200&h=800&fit=crop", 
      component: NaganoDetail 
    },
    // { 
    //   id: 7, 
    //   name: "Kyoto", 
    //   subtitle: "Ancient Temples & Geisha Districts", 
    //   image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop", 
    //   component: KyotoDetail 
    // }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Explore Beautiful{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Japan Destinations
          </span>
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-12">
          Discover the most breathtaking places in Japan with Karvaan Tours
        </p>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
              className="relative group h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6">
                <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                <p className="text-white mt-2 italic">{destination.subtitle}</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Selected Destination Modal */}
      {selectedDestination && (
        <selectedDestination.component onClose={() => setSelectedDestination(null)} />
      )}
    </section>
  );
};

export default Gallery;