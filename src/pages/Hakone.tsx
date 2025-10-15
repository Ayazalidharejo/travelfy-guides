import React from 'react';
import { MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train, ChevronDown, ChevronUp, Navigation, Mountain, Waves, Cable, Trees, Target } from 'lucide-react';

const Hakone = () => {
  const [expandedItems, setExpandedItems] = React.useState({});

  const destination = {
    name: "Hakone",
    subtitle: "Hot Springs & Mountain Resort",
    heroImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop",
    description: "Hakone is a mountainous town in Japan's Fuji-Hakone-Izu National Park, known for its hot springs resorts (onsen) and views of the iconic volcano Mount Fuji.",
    longDescription: "Hakone is one of Japan's most popular weekend destinations, offering a perfect blend of natural beauty, cultural heritage, and modern relaxation. The town is part of Fuji-Hakone-Izu National Park and features volcanic valleys, scenic lakes, historic sites, and world-class hot springs. It's easily accessible from Tokyo, making it an ideal retreat for travelers seeking tranquility and Japanese tradition.",
    gallery: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop"
    ],
    bestTime: "March-May & September-November",
    duration: "1-2 days",
    rating: 4.8,
    highlights: [
      "Lake Ashi - Scenic crater lake with Mt. Fuji views and pirate ship cruises",
      "Hakone Ropeway - Cable car over volcanic valley with sulfur vents",
      "Owakudani Valley - Active volcanic zone with hot springs and black eggs",
      "Open-Air Museum - Japan's first outdoor sculpture museum with 120+ works",
      "Hakone Shrine - Historic shrine with iconic red torii gate on the lake",
      "Traditional Ryokan - Authentic Japanese inns with private onsen baths"
    ],
    activities: ["Hot Spring Bathing", "Lake Cruises", "Cable Car Rides", "Museum Visits", "Hiking", "Traditional Dining", "Photography", "Cultural Tours"],
    cuisine: ["Black Eggs", "Kaiseki Ryori", "Soba Noodles", "Tofu Dishes", "Fresh Fish", "Matcha Sweets", "Sake Tasting"],
    transportation: "Romancecar train from Shinjuku (90 minutes), regular trains to Odawara then switch to Hakone Tozan Railway. Hakone Free Pass covers most transportation and attractions.",
    accommodation: "Traditional ryokans with private onsen, luxury hot spring resorts, budget hotels near Hakone-Yumoto Station, lakeside hotels with Mt. Fuji views.",
    tips: [
      "Purchase Hakone Free Pass for unlimited travel and attraction discounts",
      "Start early to complete the Hakone Loop in one day",
      "Bring towel and modest clothing for onsen visits",
      "Try the famous black eggs at Owakudani (boiled in sulfur springs)",
      "Book ryokan in advance, especially during peak seasons",
      "Weather can be unpredictable - bring layers and rain gear",
      "Mt. Fuji views best in winter mornings with clear skies",
      "Respect onsen etiquette: wash before entering, no swimwear"
    ],
    itinerary: {
      day1: [
        { id: 1, name: "Hakone-Yumoto Station", icon: Train, color: "text-blue-600", time: "09:00 AM", duration: "30 min", location: "Hakone-Yumoto", description: "Gateway to Hakone with shops, restaurants, and foot baths.", activities: ["Station exploration", "Souvenir shopping", "Free foot bath"], cost: "Free" },
        { id: 2, name: "Hakone Open-Air Museum", icon: Camera, color: "text-purple-600", time: "10:00 AM", duration: "2 hours", location: "Hakone Open-Air Museum", description: "Japan's first outdoor sculpture museum with Picasso Pavilion.", activities: ["Art viewing", "Sculpture gardens", "Hot spring foot bath"], cost: "¥1,600" },
        { id: 3, name: "Owakudani Valley", icon: Mountain, color: "text-red-500", time: "01:00 PM", duration: "1.5 hours", location: "Owakudani", description: "Active volcanic valley with sulfur vents and famous black eggs.", activities: ["Volcanic landscape", "Black egg tasting", "Ropeway views"], cost: "Free entry" },
        { id: 4, name: "Lake Ashi Cruise", icon: Waves, color: "text-cyan-500", time: "03:30 PM", duration: "1 hour", location: "Lake Ashi", description: "Scenic pirate ship cruise across the crater lake.", activities: ["Boat cruise", "Mt. Fuji views", "Photography"], cost: "¥1,200" }
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <img src={destination.heroImage} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">{destination.name}</h1>
            <p className="text-3xl text-white/90 italic">{destination.subtitle}</p>
            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span>{destination.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{destination.rating}/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Camera className="w-10 h-10 text-[#307172]" />
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destination.gallery.map((img, idx) => (
            <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img src={img} alt={`${destination.name} ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Compass className="w-10 h-10 text-[#307172]" />
          About {destination.name}
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-4">{destination.description}</p>
        <p className="text-lg text-gray-600 leading-relaxed">{destination.longDescription}</p>
      </section>

      {/* Top Highlights */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <MapPin className="w-10 h-10 text-[#307172]" />
          Top Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#307172]">
              <div className="flex-shrink-0 w-8 h-8 bg-[#307172] text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <p className="text-gray-700 flex-1">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities & Cuisine */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-10 h-10 text-[#307172]" />
              Activities
            </h2>
            <div className="flex flex-wrap gap-3">
              {destination.activities.map((activity, idx) => (
                <span key={idx} className="px-6 py-3 bg-[#5C7AC0]  hover:bg-[#284078] text-blue-800 rounded-full text-base font-medium shadow-sm">
                  {activity}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Utensils className="w-10 h-10 text-[#307172]" />
              Local Cuisine
            </h2>
            <div className="flex flex-wrap gap-3">
              {destination.cuisine.map((food, idx) => (
                <span key={idx} className="px-6 py-3 bg-orange-100 text-orange-800 rounded-full text-base font-medium shadow-sm">
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportation & Accommodation */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-purple-50 p-8 rounded-2xl border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Train className="w-8 h-8 text-purple-600" />
              Transportation
            </h2>
            <p className="text-gray-700 leading-relaxed">{destination.transportation}</p>
          </div>
          <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Hotel className="w-8 h-8 text-pink-600" />
              Accommodation
            </h2>
            <p className="text-gray-700 leading-relaxed">{destination.accommodation}</p>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="container mx-auto px-6 py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">💡 Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <p className="text-gray-700 flex-1">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-8 rounded-t-2xl text-white">
          <h2 className="text-4xl font-bold mb-2">1-Day Itinerary</h2>
          <p className="text-pink-100 text-lg">Perfect day trip exploring {destination.name}</p>
        </div>
        <div className="bg-white border-2 border-[#307172] rounded-b-2xl p-8">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-pink-200">
            <Calendar className="w-6 h-6 text-pink-500" />
            <h3 className="text-2xl font-semibold text-gray-800">Day 1 ({destination.itinerary.day1.length} stops)</h3>
          </div>
          {destination.itinerary.day1.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="p-5 hover:bg-gray-50 transition-all rounded-xl cursor-pointer border-l-4 border-[#307172]" onClick={() => toggleExpand(item.id)}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-gray-100 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-base font-bold shadow-md">
                      {item.id}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.time} • {item.duration}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openInGoogleMaps(item.location); }} className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                    <Target className="w-5 h-5 text-pink-500" />
                  </button>
                  {expandedItems[item.id] ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                </div>
                {expandedItems[item.id] && (
                  <div className="mt-4 ml-16 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-pink-500 shadow-sm">
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 text-sm mb-2">Activities</h5>
                      <div className="flex flex-wrap gap-2">
                        {item.activities.map((activity, idx) => (
                          <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">{activity}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-sm font-bold text-[#307172]">Cost: {item.cost}</span>
                      <button onClick={() => openInGoogleMaps(item.location)} className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium">
                        <Navigation className="w-4 h-4" />
                        Get directions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hakone;
