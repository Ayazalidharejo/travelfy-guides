import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Users, DollarSign, Car, MessageSquare } from 'lucide-react';

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
    [key: string]: any;
  };
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const imageUrl = tour.imageUrl || tour.images?.[0] || '/placeholder.svg';

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
    <Card className="group overflow-hidden hover:shadow-large transition-smooth border-0 bg-gradient-card">
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
            {/* *** FIX: Enhanced Price Display with Better Fallbacks *** */}
            {(() => {
              console.log('💰 TourCard Price Display:', {
                tourId: tour._id,
                title: tour.title,
                priceNumber: tour.priceNumber,
                price: tour.price,
                pricingSchedule: tour.pricingSchedule,
                discountPercentage: tour.discountPercentage
              });

              // Try pricingSchedule first
              if (tour.pricingSchedule && tour.pricingSchedule.length > 0) {
                const schedule = tour.pricingSchedule[0];
                let actualPrice = parseFloat(String(schedule.actualPrice)) || 0;
                let netPrice = parseFloat(String(schedule.netPrice)) || actualPrice;

                console.log('💰 Using PricingSchedule:', {
                  actualPrice,
                  netPrice,
                  currency: schedule.currency
                });

                // *** FIX: If actualPrice === netPrice but discount > 0, reverse calculate actualPrice ***
                if (actualPrice === netPrice && tour.discountPercentage > 0 && actualPrice > 0) {
                  const discountDecimal = tour.discountPercentage / 100;
                  actualPrice = Math.round(netPrice / (1 - discountDecimal));
                  console.log('🔄 Reverse calculated actualPrice:', {
                    netPrice,
                    discountPercentage: tour.discountPercentage,
                    calculatedActualPrice: actualPrice
                  });
                }

                if (actualPrice > 0) {
                  const discount = actualPrice > netPrice ? Math.round(((actualPrice - netPrice) / actualPrice) * 100) : 0;

                  return (
                    <div className="space-y-1">
                      {/* Actual Price (Crossed out if discounted) */}
                      <div className="flex items-center space-x-1">
                        {/* <DollarSign className="h-4 w-4 text-gray-500" /> */}
                        {discount > 0 ? (
                          <span className="text-sm text-gray-500 line-through">
                            ${actualPrice}
                          </span>
                        ) : (
                          <span className="text-xl font-bold text-primary">
                            ${actualPrice}
                          </span>
                        )}
                        {/* Net Price (Highlighted if discounted) */}
                        {discount > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="text-2xl font-extrabold text-green-600">
                              ${netPrice}
                            </span>

                            <span className="text-xs text-muted-foreground block">
                              Per vehicle
                            </span>

                          </div>
                        )}

                      </div>


                      {/* Per Person */}

                    </div>
                  );
                }
              }



              // Default fallback - show default price
              console.log('⚠️ Using default price - no price data found');
              return (
                <div>
                </div>
              );
            })()}
          </div>

          <Link to={`/tours/${tour._id}`}>
            <Button variant="hero" size="sm" className="shadow-medium">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;