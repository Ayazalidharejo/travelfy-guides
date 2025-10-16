"use client";
import React from "react";
import { Trophy, Users, Globe, Calendar } from "lucide-react";

const achievements = [
  {
    icon: <Trophy className="w-10 h-10 text-yellow-500" />,
    number: "50+",
    label: "Award-Winning Tours",
  },
  {
    icon: <Users className="w-10 h-10 text-red-500" />,
    number: "10,000+",
    label: "Happy Travelers",
  },
  {
    icon: <Globe className="w-10 h-10 text-green-500" />,
    number: "30+",
    label: "Destinations Covered",
  },
  {
    icon: <Calendar className="w-10 h-10 text-blue-500" />,
    number: "15 Years",
    label: "Experience",
  },
];

const Achievements: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
           <span className="text-transparent bg-clip-text icons me green text-transparent bg-clip-text bg-[#5C7AC0]">Our Achievements</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-lg">
          We’re proud of what we’ve accomplished together with our amazing travelers.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
        {achievements.map(({ icon, number, label }, idx) => (
          <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition">
            {icon}
            <span className="mt-4 text-4xl font-extrabold text-[#5C7AC0]  hover:text-[#284078]" >{number}</span>
            <span className="mt-2 text-lg font-medium text-gray-800">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
