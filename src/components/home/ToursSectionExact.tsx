import React from 'react';
import { Link } from 'react-router-dom';
import TourCardExact from './TourCardExact';

interface ToursSectionExactProps {
  title: string;
  tours: any[];
}

const ToursSectionExact: React.FC<ToursSectionExactProps> = ({ title, tours }) => {
  if (!tours || tours.length === 0) return null;

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Link 
            to="/tours" 
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
          >
            See more
          </Link>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.slice(0, 4).map((tour) => (
            <TourCardExact key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSectionExact;

