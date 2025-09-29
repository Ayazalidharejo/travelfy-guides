// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { postsAPI } from '@/lib/api';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import {
//   Clock,
//   MapPin,
//   Star,
//   Users,
//   DollarSign,
//   Calendar,
//   Shield,
//   Heart,
//   Camera,
//   MessageSquare,
//   Share2,
//   BookOpen,
//   CheckCircle,
//   AlertCircle,
//   Info,
//   ArrowLeft
// } from 'lucide-react';

// const TourDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { toast } = useToast();
//   const [tour, setTour] = useState<any>(null);
//   console.log(tour);
  
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     if (id) {
//       fetchTour();
//     }
//   }, [id]);

//   const fetchTour = async () => {
//     try {
//       setLoading(true);
//       const response = await postsAPI.getPost(id!);
//       if (response.success) {
//         setTour(response.data);
//       } else {
//         navigate('/tours');
//         toast({
//           title: "Tour not found",
//           description: "The tour you're looking for doesn't exist.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching tour:', error);
//       navigate('/tours');
//       toast({
//         title: "Error",
//         description: "Failed to load tour details.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: { pathname: `/booking/${tour._id}` } } });
//       return;
//     }
//     navigate(`/booking/${tour._id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-card">
//         <div className="container px-4 py-8">
//           <div className="animate-pulse space-y-8">
//             <div className="h-96 bg-muted rounded-lg" />
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-4">
//                 <div className="h-8 bg-muted rounded" />
//                 <div className="h-4 bg-muted rounded w-3/4" />
//                 <div className="h-4 bg-muted rounded w-1/2" />
//               </div>
//               <div className="h-64 bg-muted rounded-lg" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!tour) return null;

//   const images = tour.images?.length > 0 ? tour.images : [tour.imageUrl || '/placeholder.svg'];
//   const price = tour.priceNumber ? `$${tour.priceNumber}` : tour.price;

//   return (
//     <div className="min-h-screen bg-gradient-card">
//       {/* Back Button */}
//       <div className="container px-4 py-4">
//         <Button variant="ghost" onClick={() => navigate('/tours')} className="gap-2">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Tours
//         </Button>
//       </div>

//       {/* Image Gallery */}
//       <div className="container px-4 mb-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
//           <div className="lg:col-span-3">
//             <div className="relative aspect-video rounded-lg overflow-hidden">
//               <img
//                 src={images[activeImageIndex]}
//                 alt={tour.title}
//                 className="w-full h-full object-cover"
//               />
//               {tour.featured && (
//                 <Badge className="absolute top-4 left-4 bg-gradient-sunset text-white">
//                   Featured
//                 </Badge>
//               )}
//               <Badge className="absolute top-4 right-4 bg-gradient-primary text-white">
//                 {tour.category}
//               </Badge>
//             </div>
//           </div>
          
//           {images.length > 1 && (
//             <div className="space-y-2">
//               {images.slice(0, 4).map((image: string, index: number) => (
//                 <div
//                   key={index}
//                   className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
//                     activeImageIndex === index ? 'border-primary' : 'border-transparent'
//                   }`}
//                   onClick={() => setActiveImageIndex(index)}
//                 >
//                   <img
//                     src={image}
//                     alt={`${tour.title} ${index + 1}`}
//                     className="w-full h-full object-cover hover:scale-105 transition-smooth"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="container px-4 pb-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Header */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold">{tour.rating.average.toFixed(1)}</span>
//                   <span className="text-muted-foreground">({tour.rating.count} reviews)</span>
//                 </div>
//                 {tour.prefecture && (
//                   <div className="flex items-center gap-1">
//                     <MapPin className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">{tour.prefecture}</span>
//                   </div>
//                 )}
//               </div>
              
//               <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
              
//               <div className="flex items-center gap-6 text-sm text-muted-foreground">
//                 <div className="flex items-center gap-1">
//                   <Clock className="h-4 w-4" />
//                   <span>{tour.duration}</span>
//                 </div>
//                 {tour.groupSize && (
//                   <div className="flex items-center gap-1">
//                     <Users className="h-4 w-4" />
//                     <span>{tour.groupSize.min}-{tour.groupSize.max} people</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-1">
//                   <Shield className="h-4 w-4 text-success" />
//                   <span>Free cancellation</span>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <Tabs defaultValue="overview" className="w-full">
//               <TabsList className="grid w-full grid-cols-4">
//                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                 <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
//                 <TabsTrigger value="includes">What's Included</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="overview" className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3">About This Tour</h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     {tour.description || tour.content}
//                   </p>
//                 </div>
                
//                 {tour.highlights && tour.highlights.length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold mb-3">Highlights</h3>
//                     <ul className="space-y-2">
//                       {tour.highlights.map((highlight: string, index: number) => (
//                         <li key={index} className="flex items-start gap-2">
//                           <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
//                           <span>{highlight}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
                
//                 {tour.importantInformation && tour.importantInformation.length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold mb-3">Important Information</h3>
//                     <ul className="space-y-2">
//                       {tour.importantInformation.map((info: string, index: number) => (
//                         <li key={index} className="flex items-start gap-2">
//                           <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
//                           <span>{info}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="itinerary" className="space-y-4">
//                 {tour.itinerary && tour.itinerary.length > 0 ? (
//                   <div className="space-y-4">
//                     {tour.itinerary.map((item: any, index: number) => (
//                       <Card key={index}>
//                         <CardContent className="p-4">
//                           <div className="flex gap-4">
//                             <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold shrink-0">
//                               {index + 1}
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <Clock className="h-4 w-4 text-muted-foreground" />
//                                 <span className="font-semibold">{item.time}</span>
//                               </div>
//                               <h4 className="font-semibold mb-1">{item.activity}</h4>
//                               <p className="text-muted-foreground text-sm">{item.description}</p>
//                               {item.location && (
//                                 <div className="flex items-center gap-1 mt-2">
//                                   <MapPin className="h-3 w-3" />
//                                   <span className="text-xs">{item.location}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <Card>
//                     <CardContent className="p-6 text-center">
//                       <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                       <p className="text-muted-foreground">Detailed itinerary coming soon...</p>
//                     </CardContent>
//                   </Card>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="includes" className="space-y-6">
//                 {tour.includes && tour.includes.length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold mb-3">What's Included</h3>
//                     <ul className="space-y-2">
//                       {tour.includes.map((item: string, index: number) => (
//                         <li key={index} className="flex items-start gap-2">
//                           <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
                
//                 {tour.notSuitableFor && tour.notSuitableFor.length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold mb-3">Not Suitable For</h3>
//                     <ul className="space-y-2">
//                       {tour.notSuitableFor.map((item: string, index: number) => (
//                         <li key={index} className="flex items-start gap-2">
//                           <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="reviews" className="space-y-6">
//                 {tour.reviews && tour.reviews.length > 0 ? (
//                   <div className="space-y-4">
//                     {tour.reviews.map((review: any, index: number) => (
//                       <Card key={index}>
//                         <CardContent className="p-4">
//                           <div className="flex gap-4">
//                             <Avatar>
//                               <AvatarFallback className="bg-gradient-primary text-white">
//                                 {review.name?.charAt(0).toUpperCase()}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <span className="font-semibold">{review.name}</span>
//                                 <div className="flex items-center gap-1">
//                                   {[...Array(5)].map((_, i) => (
//                                     <Star
//                                       key={i}
//                                       className={`h-4 w-4 ${
//                                         i < review.rating
//                                           ? 'fill-yellow-400 text-yellow-400'
//                                           : 'text-muted-foreground'
//                                       }`}
//                                     />
//                                   ))}
//                                 </div>
//                               </div>
//                               <p className="text-muted-foreground">{review.comment}</p>
//                               <p className="text-xs text-muted-foreground mt-2">
//                                 {new Date(review.createdAt).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <Card>
//                     <CardContent className="p-6 text-center">
//                       <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                       <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
//                     </CardContent>
//                   </Card>
//                 )}
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* Booking Sidebar */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-24 shadow-large">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="flex items-center gap-1">
//                       <DollarSign className="h-6 w-6 text-primary" />
//                       <span className="text-3xl font-bold text-primary">{price}</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">per person</p>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <Heart className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </CardHeader>
              
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Duration:</span>
//                     <span className="font-medium">{tour.duration}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Group Size:</span>
//                     <span className="font-medium">
//                       {tour.groupSize ? `${tour.groupSize.min}-${tour.groupSize.max}` : 'Small group'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Languages:</span>
//                     <span className="font-medium">
//                       {tour.languages?.join(', ') || 'English'}
//                     </span>
//                   </div>
//                 </div>
                
//                 <Separator />
                
//                 <div className="space-y-2">
//                   <Button onClick={handleBookNow} className="w-full" variant="hero" size="lg">
//                     <Calendar className="mr-2 h-5 w-5" />
//                     Book Now
//                   </Button>
//                   <Button variant="outline" className="w-full">
//                     <Share2 className="mr-2 h-4 w-4" />
//                     Share Tour
//                   </Button>
//                 </div>
                
//                 <div className="pt-2 space-y-2 text-xs text-muted-foreground">
//                   <div className="flex items-center gap-2">
//                     <Shield className="h-4 w-4 text-success" />
//                     <span>Free cancellation up to 24 hours</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-success" />
//                     <span>Instant confirmation</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Camera className="h-4 w-4 text-primary" />
//                     <span>Photos included</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourDetailPage;









import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  ArrowLeft,
  Send,
  Edit,
  Trash2
} from 'lucide-react';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Review form states
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);

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

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (reviewRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a comment.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmittingReview(true);
      
      const reviewData = {
        rating: reviewRating,
        comment: reviewComment.trim(),
        name: user?.name || user?.email || 'Anonymous',
      };

      let response;
      if (editingReview) {
        response = await postsAPI.updateReview(tour._id, editingReview._id, reviewData);
      } else {
        response = await postsAPI.addReview(tour._id, reviewData);
      }

      if (response.success) {
        toast({
          title: "Success",
          description: editingReview ? "Review updated successfully!" : "Review submitted successfully!",
        });
        
        // Reset form
        setReviewRating(0);
        setReviewComment('');
        setEditingReview(null);
        
        // Refresh tour data
        fetchTour();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to submit review.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review.",
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setReviewRating(review.rating);
    setReviewComment(review.comment);
    
    // Scroll to review form
    const reviewSection = document.getElementById('review-form');
    reviewSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await postsAPI.deleteReview(tour._id, reviewId);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Review deleted successfully!",
        });
        
        // Refresh tour data
        fetchTour();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete review.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setReviewRating(0);
    setReviewComment('');
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
  const userReview = tour.reviews?.find((r: any) => r.userId === user?._id);

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
                  <span className="font-semibold">{tour.rating?.average?.toFixed(1) || '0.0'}</span>
                  <span className="text-muted-foreground">({tour.rating?.count || 0} reviews)</span>
                </div>
                {tour.prefecture && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.prefecture}</span>
                  </div>
                )}
                {tour.location && typeof tour.location === 'string' && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.location}</span>
                  </div>
                )}
                {tour.location && typeof tour.location === 'object' && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {[tour.location.city, tour.location.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
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
                {tour.maxGroupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Max {tour.maxGroupSize} people</span>
                  </div>
                )}
                {tour.freeCancellation !== false && (
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Free cancellation</span>
                  </div>
                )}
                {tour.instantConfirmation && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Instant confirmation</span>
                  </div>
                )}
              </div>

              {tour.tags && tour.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {tour.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="includes">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({tour.rating?.count || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Summary */}
                {tour.summary && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-primary">{tour.summary}</p>
                    </CardContent>
                  </Card>
                )}

                {/* About */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Tour</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {tour.fullDescription || tour.description || tour.content || tour.about}
                  </p>
                </div>

                {/* Details */}
                {tour.details && tour.details !== tour.description && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Details</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {tour.details}
                    </p>
                  </div>
                )}

                {/* Quick Facts */}
                {tour.quickFacts && tour.quickFacts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Facts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tour.quickFacts.map((fact: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {tour.keyFeatures && tour.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {tour.keyFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Highlights */}
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
                
                {/* Important Information */}
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

                {/* Difficulty & Physical Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.difficulty && (
                    <div>
                      <h4 className="font-semibold mb-2">Difficulty Level</h4>
                      <Badge variant="outline" className="text-base py-1 px-3">
                        {tour.difficulty}
                      </Badge>
                    </div>
                  )}
                  {tour.fitnessLevel && (
                    <div>
                      <h4 className="font-semibold mb-2">Fitness Level Required</h4>
                      <Badge variant="outline" className="text-base py-1 px-3">
                        {tour.fitnessLevel}
                      </Badge>
                    </div>
                  )}
                </div>

                {tour.physicalRequirements && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Physical Requirements</h3>
                    <p className="text-muted-foreground">{tour.physicalRequirements}</p>
                  </div>
                )}

                {/* Meeting Point */}
                {tour.meetingPoint && typeof tour.meetingPoint === 'string' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Meeting Point</h3>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>{tour.meetingPoint}</span>
                    </div>
                  </div>
                )}

                {tour.location && typeof tour.location === 'object' && tour.location.meetingPoint && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Meeting Point</h3>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p>{tour.location.meetingPoint}</p>
                        {tour.location.address && (
                          <p className="text-sm text-muted-foreground mt-1">{tour.location.address}</p>
                        )}
                        {tour.location.area && (
                          <p className="text-sm text-muted-foreground">{tour.location.area}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Preparation Tips */}
                {tour.preparationTips && tour.preparationTips.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Preparation Tips</h3>
                    <ul className="space-y-2">
                      {tour.preparationTips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                {tour.tips && tour.tips.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Travel Tips</h3>
                    <ul className="space-y-2">
                      {tour.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accessibility */}
                {tour.accessibility && typeof tour.accessibility === 'object' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                    <div className="space-y-2">
                      {tour.accessibility.wheelchair && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Wheelchair accessible</span>
                        </div>
                      )}
                      {tour.accessibility.visuallyImpaired && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Accessible for visually impaired</span>
                        </div>
                      )}
                      {tour.accessibility.hearingImpaired && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Accessible for hearing impaired</span>
                        </div>
                      )}
                      {tour.accessibility.notes && (
                        <p className="text-sm text-muted-foreground mt-2">{tour.accessibility.notes}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Best Time to Visit */}
                {(tour.bestTime || tour.bestTimeToVisit) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                    <p className="text-muted-foreground">{tour.bestTime || tour.bestTimeToVisit}</p>
                  </div>
                )}

                {/* Weather Considerations */}
                {tour.weatherConsiderations && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Weather Considerations</h3>
                    <p className="text-muted-foreground">{tour.weatherConsiderations}</p>
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
                {/* What's Included */}
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

                {/* What's Excluded */}
                {tour.excludes && tour.excludes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What's Not Included</h3>
                    <ul className="space-y-2">
                      {tour.excludes.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Not Suitable For */}
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

                {/* Requirements */}
                {tour.requirements && tour.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {tour.requirements.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What to Bring */}
                {tour.whatToBring && tour.whatToBring.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">What to Bring</h3>
                    <ul className="space-y-2">
                      {tour.whatToBring.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Equipment Provided */}
                {tour.equipmentProvided && tour.equipmentProvided.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Equipment Provided</h3>
                    <ul className="space-y-2">
                      {tour.equipmentProvided.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Equipment Required */}
                {tour.equipmentRequired && tour.equipmentRequired.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Equipment Required (Bring Your Own)</h3>
                    <ul className="space-y-2">
                      {tour.equipmentRequired.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rules */}
                {tour.rules && tour.rules.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Rules & Guidelines</h3>
                    <ul className="space-y-2">
                      {tour.rules.map((rule: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features */}
                {tour.features && Object.keys(tour.features).some(key => tour.features[key]) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Tour Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tour.features.comfortableTransport && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Comfortable Transport</span>
                        </div>
                      )}
                      {tour.features.authenticMeals && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Authentic Meals</span>
                        </div>
                      )}
                      {tour.features.expertGuides && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Expert Guides</span>
                        </div>
                      )}
                      {tour.features.photoOpportunities && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Photo Opportunities</span>
                        </div>
                      )}
                      {tour.features.culturalExperience && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Cultural Experience</span>
                        </div>
                      )}
                      {tour.features.wifi && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>WiFi Available</span>
                        </div>
                      )}
                      {tour.features.mealsIncluded && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Meals Included</span>
                        </div>
                      )}
                      {tour.features.hotelPickup && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Hotel Pickup</span>
                        </div>
                      )}
                      {tour.features.insuranceIncluded && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Insurance Included</span>
                        </div>
                      )}
                      {tour.features.equipmentProvided && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Equipment Provided</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Age Restrictions */}
                {(tour.minAge || tour.maxAge) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Age Restrictions</h3>
                    <p className="text-muted-foreground">
                      Suitable for ages {tour.minAge || 0} to {tour.maxAge || 99}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                {/* Review Form */}
                {isAuthenticated && !userReview && (
                  <Card id="review-form">
                    <CardHeader>
                      <CardTitle>
                        {editingReview ? 'Edit Your Review' : 'Write a Review'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Rating</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 cursor-pointer transition-colors ${
                                  star <= reviewRating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground hover:text-yellow-400'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="review-comment">Your Review</Label>
                        <Textarea
                          id="review-comment"
                          placeholder="Share your experience with this tour..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSubmitReview}
                          disabled={submittingReview || reviewRating === 0 || !reviewComment.trim()}
                          className="flex-1"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {submittingReview ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
                        </Button>
                        {editingReview && (
                          <Button
                            variant="outline"
                            onClick={handleCancelEdit}
                            disabled={submittingReview}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Reviews List */}
                {tour.reviews && tour.reviews.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        Customer Reviews ({tour.reviews.length})
                      </h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">
                          {tour.rating?.average?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                    
                    {tour.reviews.map((review: any, index: number) => (
                      <Card key={review._id || index}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <Avatar>
                              <AvatarImage src={review.userAvatar} />
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {review.name?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{review.name || 'Anonymous'}</span>
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
                                {isAuthenticated && review.userId === user?._id && (
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditReview(review)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteReview(review._id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <p className="text-muted-foreground mb-2">{review.comment}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.createdAt || review.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
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
                      <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review!</p>
                      {!isAuthenticated && (
                        <Button onClick={() => navigate('/login')}>
                          Login to Review
                        </Button>
                      )}
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
                  {tour.groupSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Group Size:</span>
                      <span className="font-medium">
                        {tour.groupSize.min}-{tour.groupSize.max}
                      </span>
                    </div>
                  )}
                  {tour.maxGroupSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max Group:</span>
                      <span className="font-medium">{tour.maxGroupSize} people</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">
                      {tour.languages?.join(', ') || 'English'}
                    </span>
                  </div>
                  {tour.difficulty && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="font-medium">{tour.difficulty}</span>
                    </div>
                  )}
                  {tour.season && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Best Season:</span>
                      <span className="font-medium">{tour.season}</span>
                    </div>
                  )}
                  {tour.availability?.days && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{tour.availability.days.join(', ')}</span>
                    </div>
                  )}
                  {tour.ageRestriction && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Age Restriction:</span>
                      <span className="font-medium">{tour.ageRestriction}</span>
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
                  {tour.freeCancellation !== false && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>Free cancellation up to 24 hours</span>
                    </div>
                  )}
                  {tour.instantConfirmation && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Instant confirmation</span>
                    </div>
                  )}
                  {tour.photosIncluded && (
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      <span>Photos included</span>
                    </div>
                  )}
                  {tour.guide && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Professional guide</span>
                    </div>
                  )}
                  {tour.transportation && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Transportation included</span>
                    </div>
                  )}
                </div>

                {tour.guideInfo && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Your Guide</h4>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tour.guideInfo.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {tour.guideInfo.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{tour.guideInfo.name}</p>
                          <p className="text-xs text-muted-foreground">{tour.guideInfo.experience}</p>
                        </div>
                      </div>
                      {tour.guideInfo.languages && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Speaks: {tour.guideInfo.languages.join(', ')}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {tour.cancellationPolicy && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                      <p className="text-xs text-muted-foreground">{tour.cancellationPolicy}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;