import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star, Users, DollarSign } from 'lucide-react';

interface TourCardProps {
  tour: {
    _id: string;
    title: string;
    imageUrl?: string;
    images?: string[];
    price: string;
    priceNumber?: number;
    duration: string;
    category: string;
    rating: {
      average: number;
      count: number;
    };
    prefecture?: string;
    featured?: boolean;
    description?: string;
    groupSize?: {
      min: number;
      max: number;
    };
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

  return (
    <Card className="group overflow-hidden hover:shadow-large transition-smooth border-0 bg-gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Featured Badge */}
        {tour.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-sunset text-white border-0">
            Featured
          </Badge>
        )}
        
        {/* Category Badge */}
        <Badge 
          className={`absolute top-3 right-3 text-white border-0 ${
            categoryColors[tour.category as keyof typeof categoryColors] || 'bg-primary'
          }`}
        >
          {tour.category}
        </Badge>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">
            {tour.rating.average.toFixed(1)} ({tour.rating.count})
          </span>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-smooth">
            {tour.title}
          </h3>
          
          {tour.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tour.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{tour.duration}</span>
          </div>
          
          {tour.prefecture && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{tour.prefecture}</span>
            </div>
          )}
          
          {tour.groupSize && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{tour.groupSize.min}-{tour.groupSize.max}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold text-primary">
              {tour.priceNumber ? `$${tour.priceNumber}` : tour.price}
            </span>
            <span className="text-sm text-muted-foreground">per person</span>
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