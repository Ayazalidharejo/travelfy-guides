import React from 'react';
import { MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train, ChevronDown, ChevronUp, Navigation, Store, Mountain, ShoppingCart, Target } from 'lucide-react';

const Gotemba = () => {
  const [expandedItems, setExpandedItems] = React.useState({});

  const destination = {
    name: "Gotemba",
    subtitle: "Premium Outlets & Mt. Fuji Views",
    heroImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1920&h=1080&fit=crop",
    description: "Gotemba is a city located on the southeastern flank of Mount Fuji in Shizuoka Prefecture, famous for its massive premium outlet mall and stunning mountain views.",
    longDescription: "Gotemba offers the perfect blend of shopping, nature, and Mt. Fuji views. Home to Japan's largest outlet mall with over 200 stores, it's a shopper's paradise with discounts on international and Japanese brands. The city also serves as a gateway to Mt. Fuji climbing and outdoor activities in the surrounding national park.",
    gallery: [
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop"
    ],
    bestTime: "Year-round, especially October-February for Mt. Fuji views",
    duration: "1 day",
    rating: 4.7,
    highlights: [
      "Gotemba Premium Outlets - Japan's largest outlet mall with 200+ stores",
      "Mt. Fuji views - Clear sightlines to the iconic mountain",
      "Chichibunomiya Memorial Park - Beautiful gardens and sports facilities",
      "Gotemba Kogen Brewery - Local craft beer tasting",
      "Peace Park - Scenic park with Mt. Fuji backdrop",
      "Outlet food court - International and Japanese cuisine options"
    ],
    activities: ["Shopping", "Outlet Deals", "Mt. Fuji Viewing", "Photography", "Dining", "Brewery Tours", "Park Walks", "Brand Shopping"],
    cuisine: ["Food Court Variety", "Ramen", "Sushi", "Italian Cuisine", "Steak Houses", "Craft Beer", "Japanese Sweets"],
    transportation: "JR Gotemba Line from Tokyo (2 hours), direct buses from Tokyo Station, Shinjuku, and Haneda Airport. Free shuttle from Gotemba Station to Premium Outlets.",
    accommodation: "Business hotels near station, outlet-adjacent hotels, resort hotels with Mt. Fuji views, budget guesthouses.",
    tips: [
      "Visit on weekdays to avoid weekend crowds",
      "Download the outlet app for additional coupons",
      "Best Mt. Fuji views in winter mornings",
      "Bring comfortable walking shoes for outlet shopping",
      "Tax-free shopping available for tourists",
      "Food court gets crowded at lunch - eat early or late",
      "Check weather forecast for clear Fuji views",
      "Luggage storage available at the outlet"
    ],
    itinerary: {
      day1: [
        { id: 1, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", time: "10:00 AM", duration: "4 hours", location: "Gotemba Premium Outlets", description: "Japan's largest outlet mall with Mt. Fuji views.", activities: ["Shopping", "Dining", "Brand outlets"], cost: "Varies" },
        { id: 2, name: "Mt. Fuji Viewing Spot", icon: Mountain, color: "text-blue-600", time: "02:30 PM", duration: "30 min", location: "Outlet observation deck", description: "Perfect photo spot with unobstructed Fuji views.", activities: ["Photography", "Viewing", "Relaxation"], cost: "Free" },
        { id: 3, name: "Gotemba Kogen Brewery", icon: ShoppingCart, color: "text-orange-600", time: "04:00 PM", duration: "1 hour", location: "Gotemba Kogen", description: "Local craft brewery with tasting room.", activities: ["Beer tasting", "Brewery tour", "Souvenir shopping"], cost: "¥1,000" }
      ]
    }
  };

  const toggleExpand = (id) => { setExpandedItems(prev => ({ ...prev, [id]: !prev[id] })); };
  const openInGoogleMaps = (location) => { window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank'); };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[600px] w-full overflow-hidden">
        <img src={destination.heroImage} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">{destination.name}</h1>
            <p className="text-3xl text-white/90 italic">{destination.subtitle}</p>
            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2 text-white"><Clock className="w-5 h-5" /><span>{destination.duration}</span></div>
              <div className="flex items-center gap-2 text-white"><Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /><span>{destination.rating}/5.0</span></div>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3"><Camera className="w-10 h-10 text-[#307172]" />Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destination.gallery.map((img, idx) => (
            <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img src={img} alt={`${destination.name} ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Compass className="w-10 h-10 text-[#307172]" />About {destination.name}</h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-4">{destination.description}</p>
        <p className="text-lg text-gray-600 leading-relaxed">{destination.longDescription}</p>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3"><MapPin className="w-10 h-10 text-[#307172]" />Top Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#307172]">
              <div className="flex-shrink-0 w-8 h-8 bg-[#307172] text-white rounded-full flex items-center justify-center font-bold">{idx + 1}</div>
              <p className="text-gray-700 flex-1">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Users className="w-10 h-10 text-[#307172]" />Activities</h2>
            <div className="flex flex-wrap gap-3">
              {destination.activities.map((activity, idx) => (
                <span key={idx} className="px-6 py-3 bg-[#5C7AC0]  hover:bg-[#284078] text-blue-800 rounded-full text-base font-medium shadow-sm">{activity}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Utensils className="w-10 h-10 text-[#307172]" />Local Cuisine</h2>
            <div className="flex flex-wrap gap-3">
              {destination.cuisine.map((food, idx) => (
                <span key={idx} className="px-6 py-3 bg-orange-100 text-orange-800 rounded-full text-base font-medium shadow-sm">{food}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-purple-50 p-8 rounded-2xl border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3"><Train className="w-8 h-8 text-purple-600" />Transportation</h2>
            <p className="text-gray-700 leading-relaxed">{destination.transportation}</p>
          </div>
          <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3"><Hotel className="w-8 h-8 text-pink-600" />Accommodation</h2>
            <p className="text-gray-700 leading-relaxed">{destination.accommodation}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">💡 Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{idx + 1}</span>
              <p className="text-gray-700 flex-1">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-8 rounded-t-2xl text-white">
          <h2 className="text-4xl font-bold mb-2">1-Day Itinerary</h2>
          <p className="text-pink-100 text-lg">Perfect shopping & sightseeing day</p>
        </div>
        <div className="bg-white border-2 border-[#307172] rounded-b-2xl p-8">
          {destination.itinerary.day1.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="p-5 hover:bg-gray-50 transition-all rounded-xl cursor-pointer border-l-4 border-[#307172]" onClick={() => toggleExpand(item.id)}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-gray-100 ${item.color}`}><item.icon className="w-6 h-6" /></div>
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-base font-bold shadow-md">{item.id}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.time} • {item.duration}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openInGoogleMaps(item.location); }} className="p-2 hover:bg-pink-100 rounded-full transition-colors"><Target className="w-5 h-5 text-pink-500" /></button>
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
                      <button onClick={() => openInGoogleMaps(item.location)} className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium"><Navigation className="w-4 h-4" />Get directions</button>
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

export default Gotemba;
