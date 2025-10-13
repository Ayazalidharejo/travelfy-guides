// import React, { useState } from "react";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   MapPin, 
//   Target, 
//   Navigation, 
//   Calendar,
//   PlayCircle,
//   Building,
//   Mountain,
//   Church,
//   ShoppingCart,
//   Waves,
//   Cable,
//   Trees,
//   MapPin as LocationPin,
//   Store,
//   Gamepad2
// } from "lucide-react";

// const ITINERARY_DATA = [
//   { id: 1, name: "Theatre1010", icon: PlayCircle, color: "text-purple-600" },
//   { id: 2, name: "Chureito Pagoda", icon: Building, color: "text-red-500" },
//   { id: 3, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600" },
//   { id: 4, name: "Arakura Fuji Sengen Shrine", icon: Church, color: "text-orange-600" },
//   { id: 5, name: "Kawaguchiko Lawson", icon: ShoppingCart, color: "text-blue-500" },
//   { id: 6, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500" },
//   { id: 7, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600" },
//   { id: 8, name: "Oishi Park", icon: Trees, color: "text-green-500" },
//   { id: 9, name: "Fuji Honchodori", icon: LocationPin, color: "text-slate-600" },
//   { id: 10, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600" },
//   { id: 11, name: "Yamanakako Lake Side Bowl", icon: Gamepad2, color: "text-emerald-500" }
// ];

// const VerticalItinerary = () => {
//   const [expandedItems, setExpandedItems] = useState({});
  
//   const tripName = "Tokyo to Mount Fuji Adventure";
//   const tripDuration = "2 Days • 11 Destinations";

//   const toggleExpand = (id) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const leftItems = ITINERARY_DATA.slice(0, 6);
//   const rightItems = ITINERARY_DATA.slice(6);

//   const renderItineraryColumn = (items) => (
//     <div className="relative">
//       {items.map((item, index) => (
//         <div key={item.id} className="relative">
//           {/* Connecting line */}
//           {index < items.length - 1 && (
//             <div className="absolute left-8 top-16 w-px h-16 bg-gray-300 z-0"></div>
//           )}
          
//           {/* Item */}
//           <div className="relative z-10 p-4 hover:bg-gray-50 transition-colors rounded-lg">
//             <div 
//               className="flex items-center gap-4 cursor-pointer"
//               onClick={() => toggleExpand(item.id)}
//             >
//               {/* Icon + Number circle */}
//               <div className="flex items-center gap-3">
//                 <div className={`p-2 rounded-full bg-gray-100 ${item.color}`}>
//                   <item.icon className="w-5 h-5" />
//                 </div>
//                 <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
//                   {item.id}
//                 </div>
//               </div>
              
//               {/* Location name */}
//               <div className="flex-1">
//                 <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
//               </div>
              
//               {/* Target icon + Expand icon */}
//               <div className="flex items-center gap-2">
//                 <Target className="w-4 h-4 text-pink-500" />
//                 {expandedItems[item.id] ? (
//                   <ChevronUp className="w-4 h-4 text-gray-400" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 )}
//               </div>
//             </div>

//             {/* Expanded content placeholder */}
//             {expandedItems[item.id] && (
//               <div className="mt-4 ml-14 p-4 bg-gray-50 rounded-lg border-l-4 border-pink-500">
//                 <p className="text-sm text-gray-700">Details for {item.name} will be shown here...</p>
//                 <div className="mt-2 flex items-center gap-2 text-xs text-pink-600">
//                   <Navigation className="w-3 h-3" />
//                   <span>Get directions</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* Header with Trip Info */}
     

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//         {/* Left Column (Items 1-6) */}
//         <div className="space-y-0">
//           <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//             <Calendar className="w-5 h-5 text-pink-500" />
//             <h3 className="text-lg font-semibold text-gray-800">Day 1 Locations</h3>
//           </div>
//           {renderItineraryColumn(leftItems)}
//         </div>

//         {/* Right Column (Items 7-11) */}
//         <div className="space-y-0">
//           <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
//             <Calendar className="w-5 h-5 text-pink-500" />
//             <h3 className="text-lg font-semibold text-gray-800">Day 2 Locations</h3>
//           </div>
//           {renderItineraryColumn(rightItems)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerticalItinerary;

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
  Store,
  Gamepad2
} from "lucide-react";

const ITINERARY_DATA = [
  { id: 1, name: "Theatre1010", icon: PlayCircle, color: "text-purple-600", location: "Theatre1010, Tokyo" },
  { id: 2, name: "Chureito Pagoda", icon: Building, color: "text-red-500", location: "Chureito Pagoda, Fujiyoshida" },
  { id: 3, name: "Oshino Hakkai", icon: Mountain, color: "text-blue-600", location: "Oshino Hakkai, Yamanashi" },
  { id: 4, name: "Arakura Fuji Sengen Shrine", icon: Church, color: "text-orange-600", location: "Arakura Fuji Sengen Shrine, Fujiyoshida" },
  { id: 5, name: "Kawaguchiko Lawson", icon: ShoppingCart, color: "text-blue-500", location: "Lawson Kawaguchiko Station" },
  { id: 6, name: "Lake Kawaguchiko", icon: Waves, color: "text-cyan-500", location: "Lake Kawaguchiko, Yamanashi" },
  { id: 7, name: "Kachi-Kachi Ropeway", icon: Cable, color: "text-gray-600", location: "Kachi Kachi Ropeway, Fujikawaguchiko" },
  { id: 8, name: "Oishi Park", icon: Trees, color: "text-green-500", location: "Oishi Park, Fujikawaguchiko" },
  { id: 9, name: "Fuji Honchodori", icon: MapPin, color: "text-slate-600", location: "Fuji Honchodori, Fujiyoshida" },
  { id: 10, name: "Gotemba Premium Outlets", icon: Store, color: "text-amber-600", location: "Gotemba Premium Outlets" },
  { id: 11, name: "Yamanakako Lake Side Bowl", icon: Gamepad2, color: "text-emerald-500", location: "Yamanakako Lake Side Bowl" }
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

  const openInGoogleMaps = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
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
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#307172] to-[#204f4f]  text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {item.id}
                </div>
              </div>
              
              {/* Location name */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              </div>
              
              {/* Target icon + Expand icon */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openInGoogleMaps(item.location);
                  }}
                  className="p-1 hover:bg-pink-100 rounded-full transition-colors"
                  title="Open in Google Maps"
                >
                  <Target className="w-4 h-4 text-pink-500" />
                </button>
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
                <button
                  onClick={() => openInGoogleMaps(item.location)}
                  className="mt-2 flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 hover:underline cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get directions</span>
                </button>
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
      <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6" />
          <h1 className="text-2xl font-bold">{tripName}</h1>
        </div>
        <p className="text-pink-100 ml-9">{tripDuration}</p>
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