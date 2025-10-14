import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Users, DollarSign, Car, MessageSquare } from 'lucide-react';
import { getDisplayPrice } from '../../lib/priceUtils';

// Move interface outside the component
interface TourCardProps {
  tour: {
    _id: string;
    title: string;
    imageUrl?: string;
    images?: string[];
    price?: string;
    priceNumber?: number;
    duration?: string;
    durationHours?: number;
    category: string;
    rating?: {
      average?: number;
      count?: number;
    };
    prefecture?: string;
    city?: string;
    featured?: boolean;
    description?: string;
    groupSize?: {
      min: number;
      max: number;
    };
    capacity?: number;
    maxGroup?: number;
    minGroup?: number;
    taglinesList?: string[];
    themesList?: string[];
    selectedSellingPoints?: string[];
    pricingSchedule?: Array<{
      actualPrice: string | number;
      netPrice: string | number;
      currency?: string;
      days?: string[];
      timeSlots?: string[];
      duration?: string;
    }>;
    discountPercentage?: number;
    discount?: {
      percentage?: number;
      validUntil?: string;
    };
    transportVehicles?: Array<{
      price: number | string;
      transportType: string;
      makeVariant: string;
      capacity: string;
    }>;
    [key: string]: any;
  };
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();
  const imageUrl = tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

  const handleCardClick = () => {
    navigate(`/tours/${tour._id}`);
  };

  const categoryColors = {
    adventure: 'bg-gradient-sunset',
    cultural: 'bg-gradient-primary',
    nature: 'bg-gradient-ocean',
    food: 'bg-gradient-secondary',
    historical: 'bg-accent',
    spiritual: 'bg-primary',
  };

  // Safe rating values
  const ratingAverage = tour.rating?.average ?? 0;
  const ratingCount = tour.rating?.count ?? 0;

  return (
    <Card
      className="group overflow-hidden hover:shadow-large transition-smooth border-0 bg-gradient-card cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

        {/* Discount Badge (Priority) */}
        {(tour.discountPercentage || tour.discount?.percentage) ? (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 font-bold shadow-lg">
            🔥 {tour.discountPercentage || tour.discount?.percentage}% OFF
          </Badge>
        ) : tour.featured ? (
          <Badge className="absolute top-3 left-3 bg-gradient-sunset text-white border-0">
            ⭐ Featured
          </Badge>
        ) : null}

        {/* Category Badge */}
        <Badge
          className={`absolute top-3 right-3 text-white border-0 ${categoryColors[tour.category as keyof typeof categoryColors] || 'bg-primary'
            }`}
        >
          {tour.category}
        </Badge>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
         <span className="text-xs font-medium">
  {ratingAverage === 0 ? '4.5' : ratingAverage.toFixed(1)} 
</span>

        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-smooth">
            {tour.title}
          </h3>

          {/* Selling Points */}
          {tour.selectedSellingPoints && tour.selectedSellingPoints.length > 0 && (
            <div >
              <div className="flex flex-wrap gap-2">
                {tour.selectedSellingPoints.map((point: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm shadow-sm"
                  >
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div><span className="text-xs text-green-600">Free Cancelation & Pickup Available </span></div>


          {tour.bookingType && (
            <div className="flex items-center gap-3 text-gray-700">
              <Car className="h-5 w-5 text-gray-500" />
              <p className="text-gray-600">{tour.bookingType}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>
              {(() => {
                // Check pricingSchedule first (most reliable)
                if (tour.pricingSchedule && tour.pricingSchedule.length > 0 && tour.pricingSchedule[0].duration) {
                  return tour.pricingSchedule[0].duration;
                }
                // Check direct duration field
                if (tour.duration && tour.duration !== '') {
                  return tour.duration;
                }
                // Check durationHours
                if (tour.durationHours && tour.durationHours > 0) {
                  return `${tour.durationHours}h`;
                }
                // Default fallback
                return 'N/A';
              })()}
            </span>
          </div>

          {(tour.prefecture || tour.city) && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{tour.prefecture || tour.city}</span>
            </div>
          )}

          {/* {tour.groupSize && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{tour.groupSize.min}-{tour.groupSize.max}</span>
            </div>
          )} */}

        </div>

        {/* Themes/Selling Points */}
        {(tour.themesList || tour.selectedSellingPoints) && (
          <div className="flex flex-wrap gap-1">
            {(tour.themesList || tour.selectedSellingPoints)?.slice(0, 3).map((theme: string, idx: number) => (
              <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                {theme}
              </span>
            ))}
          </div>
        )}
        {tour.languages && (
          <div className="flex items-center gap-3 text-gray-700">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            {/* <span className="font-bold">Languages:</span> */}
            <span>{Array.isArray(tour.languages) ? tour.languages.join(', ') : tour.languages}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex-1">
            {/* Enhanced Price Display with Minimum Vehicle Price */}
            {(() => {
              const priceInfo = getDisplayPrice(tour);
              
              return (
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    {priceInfo.hasDiscount && priceInfo.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${priceInfo.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-green-600">
                      ${priceInfo.price.toFixed(2)}
                    </span>
                    {/* {priceInfo.hasDiscount && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        {tour.discountPercentage}% OFF
                      </Badge>
                    )} */}
                  </div>
                  <div className="text-xs text-gray-500">
                    {priceInfo.isStartingFrom ? 'Starting from / vehicle' : 'From / person'}
                  </div>
                </div>
              );
            })()}
          </div>

          <Button
            // variant=""
            size="sm"
            className="shadow-medium"
            onClick={e => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;