import React from 'react';
import { Link } from 'react-router-dom';
import { getDisplayPrice } from '../../lib/priceUtils';

interface TourCardExactProps {
  tour: {
    _id: string;
    title: string;
    imageUrl?: string;
    images?: string[];
    priceNumber?: number;
    duration?: string;
    city?: string;
    rating?: {
      average?: number;
      count?: number;
    };
    discountPercentage?: number;
    transportVehicles?: Array<{
      price: number | string;
      transportType: string;
      makeVariant: string;
      capacity: string;
    }>;
    [key: string]: any;
  };
}

const TourCardExact: React.FC<TourCardExactProps> = ({ tour }) => {
  const imageUrl = tour.imageUrl || tour.images?.[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400';
  const duration = tour.duration || 'Full day';
  const city = tour.city || 'Location';
  const rating = tour.rating?.average?.toFixed(1) || '4.5';
  const reviewCount = tour.rating?.count || 0;
  
  // Get display price information
  const priceInfo = getDisplayPrice(tour);

  return (
    <Link to={`/tours/${tour._id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400';
            }}
          />
          
          {/* Discount Badge - Top Left */}
          {priceInfo.hasDiscount && (
            <div className="absolute top-3 left-3">
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {tour.discountPercentage}% OFF
              </div>
            </div>
          )}

          {/* Favorite Icon - Top Right */}
          <button 
            className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Rating Badge - Bottom Right */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-gray-900">{rating}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-bold text-base text-gray-900 mb-3 line-clamp-2" style={{ minHeight: '48px' }}>
            {tour.title}
          </h3>

          {/* Duration & Location */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{duration}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate font-medium">{city}</span>
            </div>
          </div>

          {/* Reviews Count */}
          <div className="text-xs text-gray-500 mb-4">
            {reviewCount} reviews
          </div>

          {/* Price Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  {priceInfo.isStartingFrom ? 'Starting from' : 'From'}
                </div>
                <div className="flex items-baseline gap-1">
                  {priceInfo.hasDiscount && priceInfo.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${priceInfo.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    ${priceInfo.price.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {priceInfo.isStartingFrom ? '/ vehicle' : '/ person'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCardExact;

