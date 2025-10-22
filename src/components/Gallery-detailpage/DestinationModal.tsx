// DestinationModal.jsx
import React from "react";
import { 
  X, MapPin, Clock, Calendar, Star, Users, Compass, Camera, Utensils, Hotel, Train,
  ChevronDown, ChevronUp, Navigation, Info, Target
} from "lucide-react";

const DestinationModal = ({ data, onClose, expandedItems, toggleExpand, openInGoogleMaps }) => {
  
  const renderItineraryColumn = (items) => (
    <div className="relative">
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          {index < items.length - 1 && (
            <div className="absolute left-8 top-20 w-px h-20 bg-gradient-to-b from-gray-300 to-gray-200 z-0"></div>
          )}
          
          <div className="relative z-10 p-4 hover:bg-gray-50 transition-all rounded-lg mb-2">
            <div 
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-full bg-gray-100 ${item.color} transition-transform hover:scale-110`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-[#307172] to-[#204f4f] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {item.id}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.time} </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openInGoogleMaps(item.location);
                  }}
                  className="p-2 hover:bg-pink-100 rounded-full transition-colors"
                  title="Open in Google Maps"
                >
                  <Target className="w-4 h-4 text-pink-500" />
                </button>
                {expandedItems[item.id] ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedItems[item.id] && (
              <div className="mt-4 ml-14 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-pink-500 shadow-sm">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-pink-500" />
                    <h4 className="font-semibold text-gray-900">Description</h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.activities.map((activity, idx) => (
                      <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600">Cost:</span>
                    <span className="text-sm font-bold text-[#307172]">{item.cost}</span>
                  </div>
                  <button
                    onClick={() => openInGoogleMaps(item.location)}
                    className="flex items-center gap-2 text-xs text-pink-600 hover:text-pink-700 font-medium hover:underline cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get directions</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-96 rounded-t-2xl overflow-hidden">
            <img
              src={data.mainImage}
              alt={data.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-5xl font-bold mb-2">{data.name}</h2>
                <p className="text-2xl italic">{data.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Best Time</p>
                  <p className="font-semibold text-sm text-gray-800">{data.bestTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Duration</p>
                  <p className="font-semibold text-gray-800">{data.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Rating</p>
                  <p className="font-semibold text-gray-800">{data.rating}/5.0</p>
                </div>
              </div>
            </div>

            {/* Photo Gallery - TOP SECTION */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Photo Gallery</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={img}
                      alt={`${data.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Compass className="w-8 h-8 text-red-600" />
                About {data.name}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{data.description}</p>
              <p className="text-gray-600 leading-relaxed">{data.longDescription}</p>
            </div>

            {/* Highlights Section */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Camera className="w-8 h-8 text-red-600" />
                Top Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                    <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities & Cuisine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Users className="w-7 h-7 text-blue-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.activities.map((activity, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#5C7AC0] text-white  hover:bg-[#284078] text-blue-800 rounded-full text-sm font-medium">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

            
            </div>

           

            {/* Travel Tips */}
            <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">💡 Travel Tips</h3>
              <ul className="space-y-2">
                {data.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary Section - BOTTOM */}
            {data.itinerary && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-[#307172] to-[#204f4f] p-6 rounded-t-xl text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">{data.itinerary.tripName}</h2>
                  </div>
                  <p className="text-pink-100 ml-9">{data.itinerary.tripDuration}</p>
                </div>

                <div className="bg-white border-2 border-[#307172] rounded-b-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Day 1 */}
                    <div className="space-y-0">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
                        
                        <h3 className="text-lg font-semibold text-gray-800 flex hidden">
                           ({data.itinerary.items.filter(i => i.day === 1).length} )
                        </h3>
                      </div>
                      {renderItineraryColumn(data.itinerary.items.filter(i => i.day === 1))}
                    </div>

                    {/* Day 2 (if exists) */}
                    {data.itinerary.items.some(i => i.day === 2) && (
                      <div className="space-y-0">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-pink-200">
                         
                          <h3 className="text-lg font-semibold text-gray-800 flex hidden">
                             ({data.itinerary.items.filter(i => i.day === 2).length} )
                          </h3>
                        </div>
                        {renderItineraryColumn(data.itinerary.items.filter(i => i.day === 2))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;