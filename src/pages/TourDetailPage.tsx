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
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchTour();
    }
  }, [id]);

  const fetchTour = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPost(id!);
      if (response.success) {
        setTour(response.data);
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

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/booking/${tour._id}` } } });
      return;
    }
    navigate(`/booking/${tour._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-card">
        <div className="container px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
              <div className="h-64 bg-muted rounded-lg" />
            </div>
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

      {/* Image Gallery */}
      <div className="container px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={tour.title}
                className="w-full h-full object-cover"
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
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.rating.average.toFixed(1)}</span>
                  <span className="text-muted-foreground">({tour.rating.count} reviews)</span>
                </div>
                {tour.prefecture && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.prefecture}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                {tour.groupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{tour.groupSize.min}-{tour.groupSize.max} people</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Free cancellation</span>
                </div>
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
                
                {tour.highlights && tour.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {tour.highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
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
                {tour.itinerary && tour.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {tour.itinerary.map((item: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{item.time}</span>
                              </div>
                              <h4 className="font-semibold mb-1">{item.activity}</h4>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
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
                      <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="includes" className="space-y-6">
                {tour.includes && tour.includes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {tour.includes.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {tour.notSuitableFor && tour.notSuitableFor.length > 0 && (
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
                {tour.reviews && tour.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {tour.reviews.map((review: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {review.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{review.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                    </CardContent>
                  </Card>
                )}
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
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Group Size:</span>
                    <span className="font-medium">
                      {tour.groupSize ? `${tour.groupSize.min}-${tour.groupSize.max}` : 'Small group'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">
                      {tour.languages?.join(', ') || 'English'}
                    </span>
                  </div>
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