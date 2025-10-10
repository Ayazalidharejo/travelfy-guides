import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { postsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import RatingComponent from '@/components/RatingComponent';
import {
  Clock,
  MapPin,
  Star,
  Users,
  DollarSign,
  Calendar,
  Shield,
  Heart,
  Camera,
  MessageSquare,
  Share2,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [tour, setTour] = useState<any>(null);
  console.log(tour,"tour");
  
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

  const fetchTour = async () => {
    try {
      setLoading(true);
        const response = await postsAPI.getPost(id);
      if (response.success) {
        setTour(response.data);
          setImageLoading(false);
      } else {
        navigate('/tours');
        toast({
          title: "Tour not found",
          description: "The tour you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      navigate('/tours');
      toast({
        title: "Error",
        description: "Failed to load tour details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
    
    fetchTour();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/booking/${tour?._id}` } } });
      return;
    }
    navigate(`/booking/${tour?._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-card">
        {/* Back Button Skeleton */}
        <div className="container px-4 py-4">
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
              </div>
        
        {/* Image Gallery Skeleton */}
        <div className="container px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
              <div className="aspect-video bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-8">
              {/* Header Skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-12 bg-muted rounded w-1/2 animate-pulse" />
                <div className="flex gap-6">
                  <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-32 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-28 animate-pulse" />
                </div>
              </div>
              
              {/* Tabs Skeleton */}
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded animate-pulse" />
                <div className="h-64 bg-muted rounded animate-pulse" />
              </div>
            </div>
            
            {/* Sidebar Skeleton */}
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  const images = tour.images?.length > 0 ? tour.images : [tour.imageUrl || '/placeholder.svg'];
  const price = tour.priceNumber ? `$${tour.priceNumber}` : tour.price;

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Back Button */}
      <div className="container px-4 py-4">
        <Button variant="ghost" onClick={() => navigate('/tours')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tours
        </Button>
      </div>
  <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
   <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.7</span>
                  <span className="text-muted-foreground">(127 reviews)</span>
      </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {tour.pricingSchedule?.[0]?.duration || 
                     (tour.duration && tour.duration.trim()) || 
                     (tour.durationHours ? `${tour.durationHours} hours` : null) || 
                     'Duration not specified'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {(tour.minGroup && tour.maxGroup) 
                      ? `${tour.minGroup}-${tour.maxGroup} people`
                      : (tour.groupSize?.min && tour.groupSize?.max)
                        ? `${tour.groupSize.min}-${tour.groupSize.max} people`
                        : (tour.groupSize && typeof tour.groupSize === 'number')
                          ? `${tour.groupSize} people`
                          : tour.groupSize || tour.groupType || 'Small group'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Free cancellation</span>
                </div>
                {(tour.pricingSchedule?.[0]?.transportType || tour.transportType) && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>
                      {tour.pricingSchedule?.[0]?.transportType || tour.transportType}
                      {tour.pricingSchedule?.[0]?.transportModal && ` (${tour.pricingSchedule[0].transportModal})`}
                      {tour.pricingSchedule?.[0]?.makeVariant && ` - ${tour.pricingSchedule[0].makeVariant}`}
                    </span>
                  </div>
                )}
              </div>
      {/* Image Gallery */}
      <div className="container px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
              )}
              <img
                src={images[activeImageIndex]}
                alt={tour.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              {tour.featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-sunset text-white">
            Featured
          </Badge>
        )}
          <Badge className="absolute top-4 right-4 bg-gradient-primary text-white">
            {tour.category}
          </Badge>
      </div>
  </div>

          {images.length > 1 && (
            <div className="space-y-2">
              {images.slice(0, 4).map((image: string, index: number) => (
          <div
            key={index}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
              activeImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={image}
              alt={`${tour.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
            />
          </div>
        ))}
        </div>
      )}
</div>
      </div>

      <div className="container px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
               
                {tour.prefecture && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.prefecture}</span>
                  </div>
                )}
              </div>
              
            
              
      
                    </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="includes">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Tour</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tour.description || tour.content}
                  </p>
                </div>

                {/* Highlights */}
                {(tour.highlightsList?.length > 0 || tour.highlights?.length > 0 || tour.selectedSellingPoints?.length > 0) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {(tour.highlightsList || tour.highlights || tour.selectedSellingPoints || []).map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Taglines */}
                {tour.taglinesList && tour.taglinesList.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Why Choose This Tour</h3>
                    <ul className="space-y-2">
                      {tour.taglinesList.map((tagline: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                          <span>{tagline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Things to Bring */}
                {tour.thingsToBring && tour.thingsToBring.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What to Bring</h3>
                    <ul className="space-y-2">
                      {tour.thingsToBring.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cancellation & Reserve Info */}
                {(tour.cancellationNote || tour.reserveNote) && (
                    <div>
                    <h3 className="text-xl font-semibold mb-3">Know Before You Go</h3>
                    <div className="space-y-3">
                      {tour.cancellationNote && (
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium">Cancellation Policy</p>
                            <p className="text-sm text-muted-foreground">{tour.cancellationNote}</p>
                          </div>
                    </div>
                  )}
                      {tour.reserveNote && (
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                            <p className="font-medium">Booking Information</p>
                            <p className="text-sm text-muted-foreground">{tour.reserveNote}</p>
                          </div>
                    </div>
                  )}
                </div>
                  </div>
                )}

                {/* Pickup & Drop-off Info */}
                {(tour.pickupLocation || tour.dropLocation || tour.locationDetails) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Meeting & Pickup</h3>
                    <div className="space-y-3">
                      {tour.pickupLocation && (
                    <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium">Pickup Location</p>
                            <p className="text-sm text-muted-foreground">{tour.pickupLocation}</p>
                    </div>
                  </div>
                )}
                      {tour.dropLocation && (
                    <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      <div>
                            <p className="font-medium">Drop-off Location</p>
                            <p className="text-sm text-muted-foreground">{tour.dropLocation}</p>
                            {tour.dropPoint && <p className="text-sm text-muted-foreground mt-1">{tour.dropPoint}</p>}
                            {tour.dropDetails && <p className="text-sm text-muted-foreground mt-1">{tour.dropDetails}</p>}
                    </div>
                  </div>
                )}
                      {tour.locationDetails && (
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium">Location Details</p>
                            <p className="text-sm text-muted-foreground">{tour.locationDetails}</p>
                          </div>
                  </div>
                )}
                    </div>
                  </div>
                )}

                {/* Accessibility */}
                {(tour.wheelchairAccessible || tour.strollerAccessible || tour.infantSeats || tour.serviceAnimals || tour.accessibilityNotes) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                    <div className="space-y-2">
                      {tour.wheelchairAccessible && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Wheelchair accessible</span>
                        </div>
                      )}
                      {tour.strollerAccessible && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Stroller accessible</span>
                        </div>
                      )}
                      {tour.infantSeats && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Infant seats available</span>
                        </div>
                      )}
                      {tour.serviceAnimals && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Service animals allowed</span>
                        </div>
                      )}
                      {tour.accessibilityNotes && (
                        <p className="text-sm text-muted-foreground mt-2">{tour.accessibilityNotes}</p>
                      )}
                    </div>
                  </div>
                )}

                {tour.importantInformation && tour.importantInformation.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Important Information</h3>
                    <ul className="space-y-2">
                      {tour.importantInformation.map((info: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-4">
                {(tour.itinerary && tour.itinerary.length > 0) || (tour.itineraryItems && tour.itineraryItems.length > 0) ? (
                  <div className="space-y-4">
                    {(tour.itineraryItems || tour.itinerary || []).map((item: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2 flex-wrap">
                                {item.time && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-semibold">{item.time}</span>
                                  </div>
                                )}
                                {item.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm text-blue-600 font-medium">{item.duration}</span>
                                  </div>
                                )}
                              </div>
                              <h4 className="font-semibold mb-1">{item.activity}</h4>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                              
                              {/* Additional Cost & Included Status */}
                              <div className="flex items-center gap-4 mt-2">
                                {item.additionalCost && parseFloat(item.additionalCost) > 0 && (
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm text-orange-600 font-medium">
                                      +${item.additionalCost} additional cost
                                    </span>
                                  </div>
                                )}
                                {item.included !== undefined && (
                                  <div className="flex items-center gap-1">
                                    {item.included ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-sm text-green-600 font-medium">Included</span>
                                      </>
                                    ) : (
                                      <>
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm text-red-600 font-medium">Not Included</span>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                              {item.image && (
                                <div className="mt-3 rounded-lg overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.activity || 'Itinerary item'} 
                                    className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-smooth cursor-pointer"
                                    onClick={() => window.open(item.image, '_blank')}
                                  />
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center gap-1 mt-2">
                                  <MapPin className="h-3 w-3" />
                                  <span className="text-xs">{item.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No itinerary available for this tour.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="includes" className="space-y-6">
                {tour.includes && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {(Array.isArray(tour.includes) 
                        ? tour.includes 
                        : typeof tour.includes === 'string' 
                          ? tour.includes.split('\n').filter((item: string) => item.trim())
                          : []
                      ).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.excludes && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What's Not Included</h3>
                    <ul className="space-y-2">
                      {(Array.isArray(tour.excludes) 
                        ? tour.excludes 
                        : typeof tour.excludes === 'string' 
                          ? tour.excludes.split('\n').filter((item: string) => item.trim())
                          : []
                      ).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {tour.notSuitableFor && Array.isArray(tour.notSuitableFor) && tour.notSuitableFor.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Not Suitable For</h3>
                    <ul className="space-y-2">
                      {tour.notSuitableFor.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <RatingComponent 
                  tourId={tour._id} 
                  tourTitle={tour.title}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-large">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <span className="text-3xl font-bold text-primary">{price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">
                      {tour.pricingSchedule?.[0]?.duration || 
                       (tour.duration && tour.duration.trim()) || 
                       (tour.durationHours ? `${tour.durationHours} hours` : null) || 
                       'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Group Size:</span>
                    <span className="font-medium">
                      {(tour.minGroup && tour.maxGroup) 
                        ? `${tour.minGroup}-${tour.maxGroup} people`
                        : (tour.groupSize?.min && tour.groupSize?.max)
                          ? `${tour.groupSize.min}-${tour.groupSize.max} people`
                          : (tour.groupSize && typeof tour.groupSize === 'number')
                            ? `${tour.groupSize} people`
                            : tour.groupSize || tour.groupType || 'Small group'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">
                      {tour.languages 
                        ? (Array.isArray(tour.languages) 
                            ? tour.languages.join(', ') 
                            : tour.languages
                          )
                        : 'English'}
                    </span>
                  </div>
                  
                  {/* Transport Details from Pricing Schedule */}
                  {tour.pricingSchedule?.[0]?.transportType && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transport:</span>
                      <span className="font-medium">
                        {tour.pricingSchedule[0].transportType}
                        {tour.pricingSchedule[0].transportModal && ` (${tour.pricingSchedule[0].transportModal})`}
                        {tour.pricingSchedule[0].makeVariant && ` - ${tour.pricingSchedule[0].makeVariant}`}
                      </span>
                    </div>
                  )}
                  
                  {/* Fallback to main transport fields */}
                  {!tour.pricingSchedule?.[0]?.transportType && (tour.transportType || tour.transportModal || tour.makeVariant) && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transport:</span>
                      <span className="font-medium">
                        {tour.transportType}
                        {tour.transportModal && ` (${tour.transportModal})`}
                        {tour.makeVariant && ` - ${tour.makeVariant}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button onClick={handleBookNow} className="w-full" variant="hero" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Tour
                  </Button>
                </div>
                
                <div className="pt-2 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                    <span>Free cancellation up to 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      <span>Photos included</span>
                    </div>
                    </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
