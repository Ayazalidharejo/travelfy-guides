import React from 'react';
import { MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train, ChevronDown, ChevronUp, Navigation, PlayCircle, Building, Mountain, Church, ShoppingCart, Waves, Cable, Trees, Store, Target, Info } from 'lucide-react';

const MountFuji = () => {
  const [expandedItems, setExpandedItems] = React.useState({});

  const destination = {
    name: "Mount Fuji",
    subtitle: "Japan's Sacred Peak",
    heroImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920&h=1080&fit=crop",
    description: "Mount Fuji, standing at 3,776 meters, is Japan's highest and most iconic mountain. This perfectly symmetrical volcanic cone has inspired artists for centuries.",
    longDescription: "Mount Fuji is more than just Japan's tallest peak - it's a sacred symbol deeply embedded in Japanese culture and spirituality. This active stratovolcano last erupted in 1707 and is now a UNESCO World Heritage Site. The mountain has been a pilgrimage site for centuries and continues to attract climbers and visitors from around the world.",
    gallery: [
      "https://images.unsplash.com/photo-1570145820259-a25a6a5d6f41?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=800&fit=crop"
    ],
    bestTime: "July-September (Climbing) & October-February (Clear Views)",
    duration: "2-3 days",
    rating: 4.9,
    highlights: [
      "Summit Climb - Challenging 6-8 hour trek to watch sunrise from 3,776m peak",
      "Lake Kawaguchi - Most accessible of Five Lakes with perfect Fuji reflections",
      "Chureito Pagoda - Iconic five-story pagoda with cherry blossoms and Fuji view",
      "Fuji Five Lakes - Kawaguchi, Yamanaka, Sai, Shoji, and Motosu lakes",
      "Arakura Sengen Shrine - Historic shrine with stunning mountain views",
      "Oshino Hakkai - Eight sacred ponds with crystal-clear spring water"
    ],
    activities: ["Mountain Climbing", "Lake Cruises", "Photography", "Hiking Trails", "Shrine Visits", "Cable Car Rides", "Scenic Drives", "Hot Springs"],
    cuisine: ["Hoto Noodles", "Fujinomiya Yakisoba", "Lake Fish", "Mountain Vegetables", "Fuji Tofu", "Miso Soup", "Soba Noodles"],
    transportation: "Train to Kawaguchiko Station from Tokyo (2 hours), then local buses. Express buses available directly from Tokyo Station and Shinjuku. Car rental recommended for exploring the Five Lakes area.",
    accommodation: "Lakeside hotels with Mt. Fuji views, traditional ryokans with onsen, mountain huts for climbers (booking required months in advance), camping sites near lakes.",
    tips: [
      "Book mountain huts months in advance for overnight climbing during peak season",
      "Official climbing season is July-September; outside this period trails are dangerous",
      "Start afternoon climb, rest at 7th/8th station, summit for sunrise around 4:30 AM",
      "Bring warm clothes even in summer - summit temperatures near freezing",
      "Weather changes rapidly; check forecasts and prepare for rain",
      "Respect the sacred mountain - follow Leave No Trace principles",
      "Best views from north side on clear winter mornings",
      "Consider purchasing climbing insurance"
    ],
    itinerary: {
      day1: [
        { id: 1, name: "Chureito Pagoda", icon: Building, color: "text-red-500", time: "09:00 AM", duration: "2 hours", location: "Chureito Pagoda, Fujiyoshida", description: "The iconic five-story pagoda with Mt. Fuji backdrop. Climb 400 steps for breathtaking views.", activities: ["Photography", "Hiking 400 steps", "Scenic views"], cost: "Free entry" },
        { id: 2, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600", time: "12:00 PM", duration: "1.5 hours", location: "Oshino Hakkai, Yamanashi", description: "Eight sacred ponds with crystal-clear spring water fed by Mt. Fuji's snowmelt.", activities: ["Pond viewing", "Traditional village walk", "Local snacks"], cost: "¥300" },
        { id: 3, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500", time: "03:00 PM", duration: "2 hours", location: "Lake Kawaguchiko", description: "Most accessible of the Fuji Five Lakes with perfect reflections and recreational activities.", activities: ["Lake walk", "Boat cruise", "Photography"], cost: "Free" },
        { id: 4, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600", time: "05:30 PM", duration: "1 hour", location: "Mt. Tenjo", description: "Cable car ride to observation deck with panoramic Fuji views.", activities: ["Ropeway ride", "Sunset viewing", "Observation deck"], cost: "¥900" }
      ],
      day2: [
        { id: 5, name: "Mount Fuji 5th Station", icon: Mountain, color: "text-orange-600", time: "08:00 AM", duration: "3 hours", location: "Fuji Subaru Line 5th Station", description: "Starting point for climbers at 2,300m elevation with shops and stunning views.", activities: ["Mountain exploration", "Souvenir shopping", "Hiking"], cost: "Free" },
        { id: 6, name: "Oishi Park", icon: Trees, color: "text-green-500", time: "01:00 PM", duration: "1.5 hours", location: "Oishi Park, Fujikawaguchiko", description: "Beautiful flower gardens with seasonal blooms and Mt. Fuji backdrop.", activities: ["Flower viewing", "Photography", "Picnic"], cost: "Free" },
        { id: 7, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", time: "04:00 PM", duration: "2 hours", location: "Gotemba Premium Outlets", description: "Japan's largest outlet mall with Mt. Fuji views and 200+ international brands.", activities: ["Shopping", "Dining", "Brand outlets"], cost: "Varies" }
      ]
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openInGoogleMaps = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
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
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                <span>{destination.bestTime}</span>
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
              <img
                src={img}
                alt={`${destination.name} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
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
          {/* Activities */}
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

          {/* Cuisine */}
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
          <h2 className="text-4xl font-bold mb-2">2-Day Itinerary</h2>
          <p className="text-pink-100 text-lg">Explore {destination.name} with our carefully planned route</p>
        </div>
        <div className="bg-white border-2 border-[#307172] rounded-b-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day 1 */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-pink-200">
                <Calendar className="w-6 h-6 text-pink-500" />
                <h3 className="text-2xl font-semibold text-gray-800">Day 1 ({destination.itinerary.day1.length} stops)</h3>
              </div>
              {destination.itinerary.day1.map((item) => (
                <div key={item.id} className="mb-4">
                  <div 
                    className="p-5 hover:bg-gray-50 transition-all rounded-xl cursor-pointer border-l-4 border-[#307172]"
                    onClick={() => toggleExpand(item.id)}
                  >
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInGoogleMaps(item.location);
                        }}
                        className="p-2 hover:bg-pink-100 rounded-full transition-colors"
                      >
                        <Target className="w-5 h-5 text-pink-500" />
                      </button>
                      {expandedItems[item.id] ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    {expandedItems[item.id] && (
                      <div className="mt-4 ml-16 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-pink-500 shadow-sm">
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 text-sm mb-2">Activities</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.activities.map((activity, idx) => (
                              <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-sm font-bold text-[#307172]">Cost: {item.cost}</span>
                          <button
                            onClick={() => openInGoogleMaps(item.location)}
                            className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium"
                          >
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

            {/* Day 2 */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-pink-200">
                <Calendar className="w-6 h-6 text-pink-500" />
                <h3 className="text-2xl font-semibold text-gray-800">Day 2 ({destination.itinerary.day2.length} stops)</h3>
              </div>
              {destination.itinerary.day2.map((item) => (
                <div key={item.id} className="mb-4">
                  <div 
                    className="p-5 hover:bg-gray-50 transition-all rounded-xl cursor-pointer border-l-4 border-[#307172]"
                    onClick={() => toggleExpand(item.id)}
                  >
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInGoogleMaps(item.location);
                        }}
                        className="p-2 hover:bg-pink-100 rounded-full transition-colors"
                      >
                        <Target className="w-5 h-5 text-pink-500" />
                      </button>
                      {expandedItems[item.id] ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    {expandedItems[item.id] && (
                      <div className="mt-4 ml-16 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-pink-500 shadow-sm">
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 text-sm mb-2">Activities</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.activities.map((activity, idx) => (
                              <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-sm font-bold text-[#307172]">Cost: {item.cost}</span>
                          <button
                            onClick={() => openInGoogleMaps(item.location)}
                            className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium"
                          >
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountFuji;
