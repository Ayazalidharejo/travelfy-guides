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
  Trash2,
  Utensils,
  Home,
  Activity,
  ShoppingBag,
  Leaf,
  Car,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  
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
        
        setReviewRating(0);
        setReviewComment('');
        setEditingReview(null);
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
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
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

  // Image handling
  const allImages = [
    ...(tour.images || []),
    ...(tour.gallery?.map((item: any) => item.url) || []),
    tour.coverImage,
    tour.imageUrl
  ].filter(Boolean);
  
  const images = allImages.length > 0 ? allImages : ['/placeholder.svg'];
  const mainImages = images.slice(0, 4);
  const remainingImages = images.slice(4);
  const price = tour.priceNumber ? `$${tour.priceNumber}` : tour.price || 'Price not available';

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

    
      <div className="container px-4 mb-8">
      <div className="max-w-6xl mx-auto">
  {/* First Row - 3 Images in 3 Columns */}
  <div className="grid grid-cols-3 gap-4 mb-4">
    {mainImages.slice(0, 3).map((image: string, index: number) => (
      <div
        key={index}
        className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setActiveImageIndex(index)}
      >
        <img
          src={image}
          alt={`${tour.title} ${index + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {index === 0 && tour.featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-sunset text-white">
            Featured
          </Badge>
        )}
        {index === 0 && (
          <Badge className="absolute top-4 right-4 bg-gradient-primary text-white">
            {tour.category}
          </Badge>
        )}
      </div>
    ))}
  </div>

  {/* Second Row - 1 Image (Full Width) */}
  {mainImages[3] && (
    <div className="grid grid-cols-1 gap-4 mb-8">
      <div
        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setActiveImageIndex(3)}
      >
        <img
          src={mainImages[3]}
          alt={`${tour.title} 4`}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
      </div>
    </div>
  )}

  {/* Gallery Section for Remaining Images */}
  {remainingImages.length > 0 && (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Gallery ({images.length} photos)</h3>
        {!showAllImages && remainingImages.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setShowAllImages(true)}
            className="gap-2"
          >
            <Camera className="h-4 w-4" />
            View All Photos
          </Button>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className={`grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 ${showAllImages ? '' : 'max-h-32 overflow-hidden'}`}>
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
              activeImageIndex === index ? 'border-primary' : 'border-transparent'
            } group`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={image}
              alt={`${tour.title} ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
            />
          </div>
        ))}
      </div>

      {showAllImages && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllImages(false)}
          >
            Show Less
          </Button>
        </div>
      )}
    </div>
  )}

  {/* Main Featured Image Display */}
  <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
    <img
      src={images[activeImageIndex]}
      alt={tour.title}
      className="w-full h-full object-cover"
    />
    
    {/* Image Navigation */}
    {images.length > 1 && (
      <>
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
          onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
          onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {activeImageIndex + 1} / {images.length}
        </div>
      </>
    )}
  </div>
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
                  <span className="font-semibold">{tour.rating?.average?.toFixed(1) || tour.averageRating?.toFixed(1) || '0.0'}</span>
                  <span className="text-muted-foreground">({tour.rating?.count || tour.reviewCount || tour.totalReviews || 0} reviews)</span>
                </div>
                {tour.prefecture && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tour.prefecture}</span>
                  </div>
                )}
                {tour.location && typeof tour.location === 'object' && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {[tour.location.city, tour.location.country, tour.location.area].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
              <h2 className="text-xl text-muted-foreground">{tour.nameJp}</h2>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                {tour.durationHours && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{tour.durationHours} hours</span>
                  </div>
                )}
                {tour.groupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{tour.groupSize.min}-{tour.groupSize.max} people</span>
                  </div>
                )}
                {tour.capacity && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Capacity: {tour.capacity}</span>
                  </div>
                )}
                {tour.freeCancellation && tour.freeCancellation.available && (
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

            {/* Discount Banner */}
            {tour.discount && tour.discount.percentage > 0 && (
              <Card className="bg-gradient-sunset text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Special Discount!</h3>
                      <p>{tour.discount.percentage}% OFF - {tour.discount.description}</p>
                      {tour.discount.validUntil && (
                        <p className="text-sm opacity-90">
                          Valid until: {new Date(tour.discount.validUntil).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      Save {tour.discount.percentage}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="includes">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({tour.rating?.count || tour.reviewCount || 0})</TabsTrigger>
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
                    {tour.about || tour.fullDescription || tour.description || tour.content}
                  </p>
                </div>

                {/* Details */}
                {tour.details && (
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
                {tour.meetingPoint && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Meeting Point</h3>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>{tour.meetingPoint}</span>
                    </div>
                  </div>
                )}

                {tour.location && typeof tour.location === 'object' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Location Details</h3>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        {tour.location.address && <p>{tour.location.address}</p>}
                        {tour.location.area && <p className="text-sm text-muted-foreground">{tour.location.area}</p>}
                        {tour.location.city && <p className="text-sm text-muted-foreground">{tour.location.city}</p>}
                        {tour.location.country && <p className="text-sm text-muted-foreground">{tour.location.country}</p>}
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
                      {tour.accessibility.visuallyImpaired !== undefined && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${tour.accessibility.visuallyImpaired ? 'text-success' : 'text-muted-foreground'}`} />
                          <span>Accessible for visually impaired: {tour.accessibility.visuallyImpaired ? 'Yes' : 'No'}</span>
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

                {/* Sustainability */}
                {tour.sustainability && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                    <div className="space-y-2">
                      {tour.sustainability.carbonNeutral && (
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          <span>Carbon Neutral</span>
                        </div>
                      )}
                      {tour.sustainability.ecoFriendly && (
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          <span>Eco Friendly</span>
                        </div>
                      )}
                      {tour.sustainability.localCommunitySupport !== undefined && (
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          <span>Local Community Support: {tour.sustainability.localCommunitySupport ? 'Yes' : 'No'}</span>
                        </div>
                      )}
                      {tour.sustainability.practices && tour.sustainability.practices.length > 0 && (
                        <div>
                          <h4 className="font-semibold mt-3 mb-2">Sustainable Practices</h4>
                          <ul className="space-y-1">
                            {tour.sustainability.practices.map((practice: string, index: number) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                {tour.emergencyContact && (tour.emergencyContact.phone || tour.emergencyContact.email) && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Emergency Contact</h3>
                    <div className="space-y-2">
                      {tour.emergencyContact.name && <p><strong>Name:</strong> {tour.emergencyContact.name}</p>}
                      {tour.emergencyContact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{tour.emergencyContact.phone}</span>
                        </div>
                      )}
                      {tour.emergencyContact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{tour.emergencyContact.email}</span>
                        </div>
                      )}
                    </div>
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
                                {item.duration && <span className="text-sm text-muted-foreground">({item.duration})</span>}
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

                {/* Activities */}
                {tour.activities && tour.activities.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.activities.map((activity: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {activity.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{activity.duration}</span>
                                </div>
                              )}
                              {activity.category && (
                                <Badge variant="outline">{activity.category}</Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events */}
                {tour.events && tour.events.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Special Events</h3>
                    <div className="space-y-4">
                      {tour.events.map((event: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{event.title}</h4>
                              {event.date && (
                                <Badge variant="secondary">
                                  {new Date(event.date).toLocaleDateString()}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.duration}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
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

                {/* Accommodation */}
                {tour.accommodation && tour.accommodation.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Accommodation</h3>
                    <ul className="space-y-2">
                      {tour.accommodation.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Home className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dining */}
                {tour.dining && tour.dining.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Dining Options</h3>
                    <ul className="space-y-2">
                      {tour.dining.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Utensils className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Foods */}
                {tour.foods && tour.foods.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Food Experiences</h3>
                    <div className="space-y-4">
                      {tour.foods.map((food: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{food.name}</h4>
                              <div className="flex gap-2">
                                {food.isVeg && <Badge variant="outline" className="bg-green-50">Vegetarian</Badge>}
                                {food.recommended && <Badge variant="outline" className="bg-yellow-50">Recommended</Badge>}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{food.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Services */}
                {tour.emergencyServices && tour.emergencyServices.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Emergency Services</h3>
                    <ul className="space-y-2">
                      {tour.emergencyServices.map((service: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Shopping Areas */}
                {tour.shoppingAreas && tour.shoppingAreas.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Shopping Areas</h3>
                    <ul className="space-y-2">
                      {tour.shoppingAreas.map((area: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <ShoppingBag className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nearby Attractions */}
                {tour.nearbyAttractions && tour.nearbyAttractions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Nearby Attractions</h3>
                    <ul className="space-y-2">
                      {tour.nearbyAttractions.map((attraction: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          <span>{attraction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exploration Ways */}
                {tour.explorationWays && tour.explorationWays.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Ways to Explore</h3>
                    <ul className="space-y-2">
                      {tour.explorationWays.map((way: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Activity className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          <span>{way}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Guides */}
                {tour.guides && tour.guides.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Guides</h3>
                    <ul className="space-y-2">
                      {tour.guides.map((guide: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Users className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages Detailed */}
                {tour.languagesDetailed && tour.languagesDetailed.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Available Languages</h3>
                    <div className="space-y-3">
                      {tour.languagesDetailed.map((lang: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{lang.name}</p>
                            <p className="text-sm text-muted-foreground">Level: {lang.level}</p>
                            {lang.guides && <p className="text-sm text-muted-foreground">Guides: {lang.guides}</p>}
                          </div>
                          {lang.certification && (
                            <Badge variant="outline">Certified</Badge>
                          )}
                        </div>
                      ))}
                    </div>
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
                          {tour.rating?.average?.toFixed(1) || tour.averageRating?.toFixed(1) || '0.0'}
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

                {/* FAQs */}
                {tour.faqs && tour.faqs.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {tour.faqs.map((faq: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{faq.question}</h4>
                            <p className="text-muted-foreground">{faq.answer}</p>
                            {faq.category && (
                              <Badge variant="outline" className="mt-2">
                                {faq.category}
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
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
                      {tour.discount && tour.discount.percentage > 0 && (
                        <span className="text-lg line-through text-muted-foreground ml-2">
                          ${(tour.priceNumber / (1 - tour.discount.percentage / 100)).toFixed(0)}
                        </span>
                      )}
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
                  {tour.durationHours && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hours:</span>
                      <span className="font-medium">{tour.durationHours} hours</span>
                    </div>
                  )}
                  {tour.groupSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Group Size:</span>
                      <span className="font-medium">
                        {tour.groupSize.min}-{tour.groupSize.max}
                      </span>
                    </div>
                  )}
                  {tour.capacity && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{tour.capacity} people</span>
                    </div>
                  )}
                  {tour.remainingSpots && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Remaining Spots:</span>
                      <span className="font-medium">{tour.remainingSpots}</span>
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
                  {tour.tourType && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tour Type:</span>
                      <span className="font-medium">{tour.tourType}</span>
                    </div>
                  )}
                  {(tour.minAge || tour.maxAge) && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Age Range:</span>
                      <span className="font-medium">
                        {tour.minAge || 0}-{tour.maxAge || 99}
                      </span>
                    </div>
                  )}
                  {tour.startTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Start Time:</span>
                      <span className="font-medium">{tour.startTime}</span>
                    </div>
                  )}
                  {tour.endTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">End Time:</span>
                      <span className="font-medium">{tour.endTime}</span>
                    </div>
                  )}
                  {tour.operatingHours && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Operating Hours:</span>
                      <span className="font-medium">{tour.operatingHours}</span>
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
                  {tour.freeCancellation && tour.freeCancellation.available && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>Free cancellation up to {tour.freeCancellation.deadlineHours || 24} hours</span>
                    </div>
                  )}
                  {tour.reserveNowPayLater && tour.reserveNowPayLater.available && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Reserve now & pay later</span>
                    </div>
                  )}
                  {tour.instantConfirmation && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Instant confirmation</span>
                    </div>
                  )}
                  {tour.liveTourGuide && tour.liveTourGuide.available && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Live tour guide</span>
                    </div>
                  )}
                  {tour.features?.photoOpportunities && (
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      <span>Photos included</span>
                    </div>
                  )}
                  {tour.features?.comfortableTransport && (
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-primary" />
                      <span>Transportation included</span>
                    </div>
                  )}
                </div>

                {tour.bookingDeadline && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Booking Information</h4>
                      <p className="text-xs text-muted-foreground">
                        Book at least {tour.bookingDeadline} hours in advance
                      </p>
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

                {tour.refundPolicy && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Refund Policy</h4>
                      <p className="text-xs text-muted-foreground">{tour.refundPolicy}</p>
                    </div>
                  </>
                )}

                {tour.paymentMethods && tour.paymentMethods.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Payment Methods</h4>
                      <p className="text-xs text-muted-foreground">
                        {tour.paymentMethods.join(', ')}
                      </p>
                    </div>
                  </>
                )}

                {tour.depositRequired && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Deposit</h4>
                      <p className="text-xs text-muted-foreground">
                        ${tour.depositAmount || 0} deposit required
                      </p>
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