import React from 'react';

const day1LeftLocations = [
  {
    id: 1,
    name: "Senso-ji Temple",
    time: "08:00 AM",
    duration: "2 hours",
    icon: "🏯",
  },
  {
    id: 2,
    name: "Tokyo Skytree",
    time: "10:30 AM",
    duration: "2 hours",
    icon: "🗼",
  },
  {
    id: 3,
    name: "Shibuya Crossing",
    time: "02:00 PM",
    duration: "1.5 hours",
    icon: "🚦",
  },
  {
    id: 4,
    name: "Harajuku & Takeshita Street",
    time: "04:00 PM",
    duration: "2 hours",
    icon: "🛍️",
  },
  {
    id: 5,
    name: "Meiji Shrine",
    time: "06:00 PM",
    duration: "1 hour",
    icon: "⛩️",
  },
];

const day1RightLocations = [
  {
    id: 6,
    name: "Ueno Park",
    time: "07:30 PM",
    duration: "1 hour",
    icon: "🌳",
  },
  {
    id: 7,
    name: "Akihabara",
    time: "08:45 PM",
    duration: "1 hour",
    icon: "🎮",
  },
  {
    id: 8,
    name: "Tokyo Dome",
    time: "10:00 PM",
    duration: "1 hour",
    icon: "🏟️",
  },
  {
    id: 9,
    name: "Roppongi Hills",
    time: "11:15 PM",
    duration: "1 hour",
    icon: "🏙️",
  },
  {
    id: 10,
    name: "Tsukiji Outer Market",
    time: "12:30 AM",
    duration: "1 hour",
    icon: "🍣",
  },
];

const ItineraryDay1 = () => (
  <div className="flex flex-col md:flex-row gap-8">
    {/* Left Locations */}
    <div className="flex-1">
      <h3 className="font-bold mb-4">Day 1 Locations (5 stops)</h3>
      {day1LeftLocations.map((loc) => (
        <div key={loc.id} className="flex items-center mb-6">
          <span className="mr-3 text-2xl">{loc.icon}</span>
          <div>
            <div className="font-semibold">{loc.name}</div>
            <div className="text-xs text-gray-500">{loc.time} • {loc.duration}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Right Locations */}
    <div className="flex-1">
      <h3 className="font-bold mb-4">Day 1 More Locations (5 stops)</h3>
      {day1RightLocations.map((loc) => (
        <div key={loc.id} className="flex items-center mb-6">
          <span className="mr-3 text-2xl">{loc.icon}</span>
          <div>
            <div className="font-semibold">{loc.name}</div>
            <div className="text-xs text-gray-500">{loc.time} • {loc.duration}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ItineraryDay1;