import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Target, 
  Navigation, 
  Calendar,
  PlayCircle,
  Building,
  Mountain,
  Church,
  ShoppingCart,
  Waves,
  Cable,
  Trees,
  MapPin as LocationPin,
  Store,
  Gamepad2
} from "lucide-react";

const ITINERARY_DATA = [
  { id: 1, name: "Theatre1010", icon: PlayCircle, color: "text-purple-600" },
  { id: 2, name: "Chureito Pagoda", icon: Building, color: "text-red-500" },
  { id: 3, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600" },
  { id: 4, name: "Arakura Fuji Sengen Shrine", icon: Church, color: "text-orange-600" },
  { id: 5, name: "Kawaguchiko Lawson", icon: ShoppingCart, color: "text-blue-500" },
  { id: 6, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500" },
  { id: 7, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600" },
  { id: 8, name: "Oishi Park", icon: Trees, color: "text-green-500" },
  { id: 9, name: "Fuji Honchodori", icon: LocationPin, color: "text-slate-600" },
  { id: 10, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600" },
  { id: 11, name: "Yamanakako Lake Side Bowl", icon: Gamepad2, color: "text-emerald-500" }
];

const VerticalItinerary = () => {
  const [expandedItems, setExpandedItems] = useState({});
  
  const tripName = "Tokyo to Mount Fuji Adventure";
  const tripDuration = "2 Days • 11 Destinations";

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const leftItems = ITINERARY_DATA.slice(0, 6);
  const rightItems = ITINERARY_DATA.slice(6);

  const renderItineraryColumn = (items) => (
    <div className="relative">
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          {/* Connecting line */}
          {index < items.length - 1 && (
            <div className="absolute left-8 top-16 w-px h-16 bg-gray-300 z-0"></div>
          )}
          
          {/* Item */}
          <div className="relative z-10 p-4 hover:bg-gray-50 transition-colors rounded-lg">
            <div 
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              {/* Icon + Number circle */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gray-100 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {item.id}
                </div>
              </div>
              
              {/* Location name */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              </div>
              
              {/* Target icon + Expand icon */}
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-500" />
                {expandedItems[item.id] ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded content placeholder */}
            {expandedItems[item.id] && (
              <div className="mt-4 ml-14 p-4 bg-gray-50 rounded-lg border-l-4 border-pink-500">
                <p className="text-sm text-gray-700">Details for {item.name} will be shown here...</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-pink-600">
                  <Navigation className="w-3 h-3" />
                  <span>Get directions</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with Trip Info */}
      <div className="bg-gradient-to-r from-blue-500 to-red-500 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-3xl font-bold flex items-center gap-3">
              <MapPin className="w-8 h-8" />
              {tripName}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{tripDuration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span className="text-sm">Interactive Map</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive Japan Map with Markers */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="w-full h-80 rounded-lg bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
            {/* Japan Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-50">
              {/* Mount Fuji representation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-6xl">🗻</div>
                <div className="text-xs text-gray-600 text-center mt-1">Mount Fuji</div>
              </div>
              
              {/* Tokyo area */}
              <div className="absolute top-1/4 right-1/4">
                <div className="text-2xl">🏙️</div>
                <div className="text-xs text-gray-600">Tokyo</div>
              </div>
              
              {/* Location markers scattered around */}
              <div className="absolute top-1/3 left-1/3 flex items-center gap-1">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  1
                </div>
                <div className="text-xs bg-white/90 px-2 py-1 rounded shadow">Theatre1010</div>
              </div>
              
              <div className="absolute top-2/3 left-1/2 flex items-center gap-1">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  2
                </div>
                <div className="text-xs bg-white/90 px-2 py-1 rounded shadow">Chureito Pagoda</div>
              </div>
              
              <div className="absolute top-1/2 left-2/3 flex items-center gap-1">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  3
                </div>
                <div className="text-xs bg-white/90 px-2 py-1 rounded shadow">Oshino Hakkai</div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/4 flex items-center gap-1">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  6
                </div>
                <div className="text-xs bg-white/90 px-2 py-1 rounded shadow">Lake Kawaguchi</div>
              </div>
              
              <div className="absolute top-1/4 left-1/2 flex items-center gap-1">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  10
                </div>
                <div className="text-xs bg-white/90 px-2 py-1 rounded shadow">Gotemba Outlets</div>
              </div>
              
              {/* Connecting lines between markers */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <path
                  d="M 120 80 Q 200 120 280 160 Q 320 200 240 240 Q 180 180 160 120"
                  stroke="#497ad4ff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </div>
            
            {/* Map overlay info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-500" />
                Japan Tour Map
              </div>
              <div className="text-xs text-gray-600 mt-1">
                🎯 {ITINERARY_DATA.length} locations marked
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-xs text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <span>Tour Stops</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-pink-400 opacity-60"></div>
                  <span>Route Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Left Column (Items 1-6) */}
        <div className="space-y-0">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
            <Calendar className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-800">Day 1 Locations</h3>
          </div>
          {renderItineraryColumn(leftItems)}
        </div>

        {/* Right Column (Items 7-11) */}
        <div className="space-y-0">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
            <Calendar className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-800">Day 2 Locations</h3>
          </div>
          {renderItineraryColumn(rightItems)}
        </div>
      </div>
    </div>
  );
};

export default VerticalItinerary;