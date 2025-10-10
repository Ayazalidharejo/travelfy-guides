

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { postsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Clock,
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Map as MapIcon,
  Check,
  ArrowLeft,
  Calendar,
  Users,
  CalendarClock,
  Tag,
  FileText,
  Package,
  Globe,
  DollarSign,
  
  Info,
  Percent,
  Map,
  
  Timer,
  Clock as ClockIcon,
  Slash,
  CheckCircle,
  XCircle,
  User,
 
  Languages,
  Home,
  
  
} from 'lucide-react';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [tour, setTour] = useState(null);
  console.log('Tour ID:', tour);
  
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getPost(id);
        if (response.success) {
          setTour(response.data);
          console.log('Tour data:', response.data);
        } else {
          navigate('/tours');
          toast({
            title: "Tour not found",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error:', error);
        navigate('/tours');
        toast({
          title: "Error",
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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  // Images
  const allImages = [
    tour.mainImageUrl,
    tour.mainImage?.url,
    ...(tour.additionalImageUrls || []),
    ...(tour.additionalImages?.map(img => img.url) || []),
  ].filter(Boolean);

  const mainImage = allImages[activeImageIndex] || tour.mainImageUrl;
  const thumbnailImages = allImages.slice(0, 3);

  // Price
  const originalPrice = tour.priceNumber || 0;
  const discountPercent = tour.discount?.percentage || tour.discountPercentage || 0;
  const discountedPrice = originalPrice - (originalPrice * discountPercent / 100);

  // Parse arrays
  const includesArray = tour.includes 
    ? (Array.isArray(tour.includes) ? tour.includes : tour.includes.split('\n').filter(item => item.trim()))
    : [];
    
  const excludesArray = tour.excludes 
    ? (Array.isArray(tour.excludes) ? tour.excludes : tour.excludes.split('\n').filter(item => item.trim()))
    : [];

  const highlightsArray = tour.highlightsList || tour.highlights || tour.selectedSellingPoints || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" className="gap-2" onClick={() => navigate('/tours')}>
            <ArrowLeft className="h-4 w-4" />
            Back to Tours
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* TOP SECTION - Image + Info Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 mb-8">
          {/* LEFT - IMAGE GALLERY */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200">
              <img 
                src={mainImage}
                alt={tour.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=No+Image'}
              />
              {tour.featured && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">
                  Best Seller
                </Badge>
              )}
            </div>

            {/* Thumbnail Images - HORIZONTAL */}
            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {thumbnailImages.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all ${
                      activeImageIndex === idx ? 'ring-2 ring-green-500' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img}
                      alt={`${tour.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - TOUR INFO */}
          <div className="space-y-4">
            {/* Product ID & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Product ID: {tour._id?.slice(-6)}</span>
              {tour.featured && (
                <Badge className="bg-red-500 text-white">Best Seller</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {tour.title}
            </h1>

            {/* Tagline */}
            {tour.tagline && (
              <p className="text-gray-600 text-lg">{tour.tagline}</p>
            )}

            {/* Rating */}
            {/* <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="font-semibold">4.8</span>
              <span className="text-gray-500">(342 reviews)</span>
            </div> */}

            {/* Details with Icons */}
            <div className="space-y-3">
              {tour.languages && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Languages:</span>
                  <span>{Array.isArray(tour.languages) ? tour.languages.join(', ') : tour.languages}</span>
                </div>
              )}
              {tour.pickupLocation && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Pickup:</span>
                  <span>{tour.pickupLocation}</span>
                </div>
              )}
              {(tour.duration || tour.durationHours || tour.pricingSchedule?.[0]?.duration) && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Duration:</span>
                  <span>
                    {tour.pricingSchedule?.[0]?.duration || 
                     (tour.duration && tour.duration.trim()) || 
                     `${tour.durationHours} hours`}
                  </span>
                </div>
              )}
              {tour.city && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Drop-Off:</span>
                  <span>Return to {tour.city}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Availability:</span>
                <span>Daily</span>
              </div>
            </div>

            {/* See all visiting places */}
            <div className="pt-4">
              <p className="text-sm text-gray-600">See all the visiting places in {tour.city || 'Tokyo'}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`rounded-lg ${isFavorite ? 'text-red-500 border-red-500' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <MapIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            {(tour.description || tour.content) && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About this Experience</h3>
                <p className="text-gray-700 leading-relaxed">
                  {tour.description || tour.content}
                </p>
              </div>
            )}

            {/* What's Included/Excluded - BORDERED BOX */}
            {(includesArray.length > 0 || excludesArray.length > 0) && (
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* What's Exclude */}
                  {excludesArray.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What's exclude</h3>
                      <ul className="space-y-3">
                        {excludesArray.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What's Included */}
                  {includesArray.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {includesArray.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trip Highlights - BORDERED BOX */}
            {highlightsArray.length > 0 && (
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Highlights</h3>
                <ul className="space-y-3">
                  {highlightsArray.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Things to Bring */}
            {tour.thingsToBring && tour.thingsToBring.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What to Bring</h3>
                <ul className="space-y-2">
                  {tour.thingsToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive FAQs */}
            {tour.faqs && tour.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-blue-600">❓</span>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {tour.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group"
                        onClick={() => {
                          const element = document.getElementById(`faq-${idx}`);
                          if (element) {
                            element.classList.toggle('hidden');
                            const icon = document.getElementById(`faq-icon-${idx}`);
                            if (icon) {
                              icon.classList.toggle('rotate-180');
                            }
                          }
                        }}
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </h4>
                        <svg 
                          id={`faq-icon-${idx}`}
                          className="w-5 h-5 text-gray-500 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div id={`faq-${idx}`} className="hidden px-6 py-4 bg-white border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

































            {/* Tour Details Section - Organized and Styled */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.bestTime && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                      <span className="font-semibold text-gray-800">Best Time:</span>
                      <p className="text-gray-600">{tour.bestTime}</p>
                    </div>
                  </div>
                )}

                {tour.bookingType && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
      <div>
                      <span className="font-semibold text-gray-800">Booking Type:</span>
                      <p className="text-gray-600">{tour.bookingType}</p>
                    </div>
                  </div>
                )}

                {tour.category && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">Category:</span>
                      <p className="text-gray-600">{tour.category}</p>
                    </div>
                </div>
              )}

                {tour.city && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">City:</span>
                      <p className="text-gray-600">{tour.city}</p>
              </div>
                  </div>
                )}

                {tour.duration && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                      <span className="font-semibold text-gray-800">Duration:</span>
                      <p className="text-gray-600">{tour.duration}</p>
                    </div>
                  </div>
                )}

                {tour.languages && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">Languages:</span>
                      <p className="text-gray-600">{tour.languages}</p>
                    </div>
                </div>
              )}
              </div>

              {/* Pricing Information */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Pricing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.currency && (
                    <div>
                      <span className="font-semibold text-gray-700">Currency:</span>
                      <span className="ml-2 text-gray-600">{tour.currency}</span>
                </div>
              )}
                  {tour.priceNumber && (
                <div>
                      <span className="font-semibold text-gray-700">Price:</span>
                      <span className="ml-2 text-gray-600">{tour.priceNumber}</span>
                </div>
              )}
                  {tour.discountPercentage && (
                    <div>
                      <span className="font-semibold text-gray-700">Discount:</span>
                      <span className="ml-2 text-green-600 font-semibold">{tour.discountPercentage}% OFF</span>
              </div>
                  )}
                  {tour.discount && (
                <div>
                      <span className="font-semibold text-gray-700">Discount Percentage:</span>
                      <span className="ml-2 text-green-600">{tour.discount.percentage}%</span>
                </div>
              )}
              </div>
              </div>

              {/* Pricing Schedule */}
              {tour.pricingSchedule && tour.pricingSchedule.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Pricing Schedule
                  </h3>
                  <div className="space-y-4">
                    {tour.pricingSchedule.map((item: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                        <p className="mb-1">
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="ml-2 text-gray-600">{item.duration}</span>
                        </p>
                        <p className="mb-1">
                          <span className="font-semibold text-gray-700">Actual Price:</span>
                          <span className="ml-2 text-gray-600">${item.actualPrice}</span>
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold text-gray-700">Net Price:</span>
                          <span className="ml-2 text-green-600 font-semibold">${item.netPrice}</span>
                        </p>
                        
                        {item.days && item.days.length > 0 && (
                          <div className="mb-2">
                            <p className="font-semibold text-gray-700 mb-1">Days:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.days.map((day: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                  {day}
                                </span>
                              ))}
                </div>
              </div>
                        )}

                        {item.timeSlots && item.timeSlots.length > 0 && (
                <div>
                            <p className="font-semibold text-gray-700 mb-1">Time Slots:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.timeSlots.map((slot: string, i: number) => (
                                <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                                  {slot}
                                </span>
                              ))}
                            </div>
                </div>
              )}
              </div>
                    ))}
                </div>
              </div>
              )}

              {/* Location Details */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Location Details</h3>
                <div className="space-y-3">
                  {tour.pickupLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700">Pickup Location:</span>
                        <p className="text-gray-600">{tour.pickupLocation}</p>
                      </div>
                </div>
              )}
                  {tour.dropLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700">Drop Location:</span>
                        <p className="text-gray-600">{tour.dropLocation}</p>
              </div>
                    </div>
                  )}
                  {tour.dropArea && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                        <span className="font-semibold text-gray-700">Drop Area:</span>
                        <p className="text-gray-600">{tour.dropArea}</p>
                      </div>
                </div>
              )}
                  {tour.dropPoint && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700">Drop Point:</span>
                        <p className="text-gray-600">{tour.dropPoint}</p>
              </div>
                    </div>
                  )}
                  {tour.dropDetails && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                        <span className="font-semibold text-gray-700">Drop Details:</span>
                        <p className="text-gray-600">{tour.dropDetails}</p>
                      </div>
                </div>
              )}
                  {tour.locationDetails && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700">Location Details:</span>
                        <p className="text-gray-600">{tour.locationDetails}</p>
              </div>
                    </div>
                  )}
                  {tour.nearbyAttractions && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                        <span className="font-semibold text-gray-700">Nearby Attractions:</span>
                        <p className="text-gray-600">{tour.nearbyAttractions}</p>
                      </div>
                </div>
              )}
                  {tour.sameDropOff !== undefined && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">Same Drop Off:</span>
                      <span className="text-gray-600">{tour.sameDropOff ? "✅ Yes" : "❌ No"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Time Details */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Time Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.startTime && (
                <div>
                      <span className="font-semibold text-gray-700">Start Time:</span>
                      <span className="ml-2 text-gray-600">{tour.startTime}</span>
                </div>
              )}
                  {tour.endTime && (
                    <div>
                      <span className="font-semibold text-gray-700">End Time:</span>
                      <span className="ml-2 text-gray-600">{tour.endTime}</span>
              </div>
                  )}
                  {tour.deadlineHours && (
                <div>
                      <span className="font-semibold text-gray-700">Deadline Hours:</span>
                      <span className="ml-2 text-gray-600">{tour.deadlineHours}</span>
                </div>
              )}
              </div>
              </div>

              {/* Highlights */}
              {tour.highlightsList && tour.highlightsList.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-yellow-600" />
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {tour.highlightsList.map((highlight: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">★</span>
                        <p className="text-gray-600">{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected Selling Points */}
              {tour.selectedSellingPoints && tour.selectedSellingPoints.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Selected Selling Points
                  </h3>
                  <ul className="space-y-2">
                    {tour.selectedSellingPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <p className="text-gray-600">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.includes && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">✓ Includes</h4>
                    <p className="text-gray-700">{tour.includes}</p>
                </div>
              )}
                {tour.excludes && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-800 mb-2">✗ Excludes</h4>
                    <p className="text-gray-700">{tour.excludes}</p>
              </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Cancellation Policy</h3>
                <div className="space-y-2">
                  {tour.freeCancellation !== undefined && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Free Cancellation:</span>
                      <span className={`${tour.freeCancellation ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                        {tour.freeCancellation ? "✅ Yes" : "❌ No"}
                      </span>
                </div>
              )}
                  {tour.cancellationNote && (
                <div>
                      <span className="font-semibold text-gray-700">Cancellation Note:</span>
                      <p className="text-gray-600 mt-1">{tour.cancellationNote}</p>
                </div>
              )}
                  {tour.reserveNowPayLater !== undefined && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Reserve Now, Pay Later:</span>
                      <span className={`${tour.reserveNowPayLater ? 'text-green-600' : 'text-gray-600'} font-semibold`}>
                        {tour.reserveNowPayLater ? "✅ Yes" : "❌ No"}
                      </span>
              </div>
                  )}
                  {tour.reserveNote && (
                <div>
                      <span className="font-semibold text-gray-700">Reserve Note:</span>
                      <p className="text-gray-600 mt-1">{tour.reserveNote}</p>
                </div>
              )}
                </div>
              </div>
  
              {/* Group Information */}
              {(tour.groupName || tour.groupLeaderName || tour.groupType || tour.groupSpecialRequests) && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Group Information</h3>
                  <div className="space-y-2">
                    {tour.groupName && (
                      <div>
                        <span className="font-semibold text-gray-700">Group Name:</span>
                        <span className="ml-2 text-gray-600">{tour.groupName}</span>
                </div>
              )}
              {tour.groupLeaderName && (
                      <div>
                        <span className="font-semibold text-gray-700">Group Leader Name:</span>
                        <span className="ml-2 text-gray-600">{tour.groupLeaderName}</span>
                </div>
                    )}
                    {tour.groupType && (
                      <div>
                        <span className="font-semibold text-gray-700">Group Type:</span>
                        <span className="ml-2 text-gray-600">{tour.groupType}</span>
                </div>
)}
              {tour.groupSpecialRequests && (
                      <div>
                        <span className="font-semibold text-gray-700">Special Requests:</span>
                        <p className="text-gray-600 mt-1">{tour.groupSpecialRequests}</p>
                </div>
)}
                </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Additional Information</h3>
                <div className="space-y-3">
                  {tour.description && (
                    <div>
                      <span className="font-semibold text-gray-700">Description:</span>
                      <p className="text-gray-600 mt-1">{tour.description}</p>
  </div>
)}
 {tour.hotel && (
                    <div>
                      <span className="font-semibold text-gray-700">Hotel:</span>
                      <span className="ml-2 text-gray-600">{tour.hotel}</span>
                </div>
                  )}
                  {tour.makeVariant && (
                    <div>
                      <span className="font-semibold text-gray-700">Make Variant:</span>
                      <span className="ml-2 text-gray-600">{tour.makeVariant}</span>
                </div>
                  )}
                  {tour.transportType && (
                    <div>
                      <span className="font-semibold text-gray-700">Transport Type:</span>
                      <span className="ml-2 text-gray-600">{tour.transportType}</span>
                </div>
                  )}
                  {tour.transportModal && (
                    <div>
                      <span className="font-semibold text-gray-700">Transport Model:</span>
                      <span className="ml-2 text-gray-600">{tour.transportModal}</span>
                </div>
)}
                </div>
                </div>

              {/* Accessibility */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Accessibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tour.wheelchairAccessible !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className={`${tour.wheelchairAccessible ? 'text-green-600' : 'text-gray-400'}`}>
                        {tour.wheelchairAccessible ? "✅" : "❌"}
                      </span>
                      <span className="font-semibold text-gray-700">Wheelchair Accessible</span>
                    </div>
                  )}
                  {tour.strollerAccessible !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className={`${tour.strollerAccessible ? 'text-green-600' : 'text-gray-400'}`}>
                        {tour.strollerAccessible ? "✅" : "❌"}
                      </span>
                      <span className="font-semibold text-gray-700">Stroller Accessible</span>
                </div>
                  )}
                  {tour.serviceAnimals !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className={`${tour.serviceAnimals ? 'text-green-600' : 'text-gray-400'}`}>
                        {tour.serviceAnimals ? "✅" : "❌"}
                      </span>
                      <span className="font-semibold text-gray-700">Service Animals</span>
                </div>
                  )}
                </div>
    </div>

              {/* Single Person Details */}
              {(tour.singlePersonName || tour.singlePersonAge || tour.singlePersonNationality || tour.singlePersonPreferences) && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Single Person Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tour.singlePersonName && (
                      <div>
                        <span className="font-semibold text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-600">{tour.singlePersonName}</span>
        </div>
                    )}
                    {tour.singlePersonAge && (
                      <div>
                        <span className="font-semibold text-gray-700">Age:</span>
                        <span className="ml-2 text-gray-600">{tour.singlePersonAge}</span>
    </div>
                    )}
                    {tour.singlePersonNationality && (
                      <div>
                        <span className="font-semibold text-gray-700">Nationality:</span>
                        <span className="ml-2 text-gray-600">{tour.singlePersonNationality}</span>
  </div>
)}
                    {tour.singlePersonPreferences && (
                      <div>
                        <span className="font-semibold text-gray-700">Preferences:</span>
                        <span className="ml-2 text-gray-600">{tour.singlePersonPreferences}</span>
                </div>
                    )}
                  </div>
  </div>
)}

              {/* Lists Information */}
              {(tour.taglinesList || tour.themesList || tour.thingsToBring) && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Additional Lists</h3>
                  
                  {tour.taglinesList && tour.taglinesList.length > 0 && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700 block mb-2">Taglines:</span>
                      <div className="flex flex-wrap gap-2">
                        {tour.taglinesList.map((tag: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
    </div>
                    </div>
                  )}

                  {tour.themesList && tour.themesList.length > 0 && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700 block mb-2">Themes:</span>
                      <div className="flex flex-wrap gap-2">
                        {tour.themesList.map((theme: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {theme}
                          </span>
                        ))}
    </div>
  </div>
)}

                  {tour.thingsToBring && tour.thingsToBring.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-700 block mb-2">Things To Bring:</span>
                      <ul className="list-disc ml-5 space-y-1">
                        {tour.thingsToBring.map((item: string, i: number) => (
                          <li key={i} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
    </div>
                  )}
  </div>
)}

              {/* Tour Metadata */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Tour Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.title && (
                    <div>
                      <span className="font-semibold text-gray-700">Title:</span>
                      <span className="ml-2 text-gray-600">{tour.title}</span>
                    </div>
                  )}
                  {tour.slug && (
                    <div>
                      <span className="font-semibold text-gray-700">Slug:</span>
                      <span className="ml-2 text-gray-600">{tour.slug}</span>
  </div>
)}
                  {tour.tourType && (
                    <div>
                      <span className="font-semibold text-gray-700">Tour Type:</span>
                      <span className="ml-2 text-gray-600">{tour.tourType}</span>
                    </div>
                  )}
  {tour.tagline && (
                    <div>
                      <span className="font-semibold text-gray-700">Tagline:</span>
                      <span className="ml-2 text-gray-600">{tour.tagline}</span>
                    </div>
                  )}
                  {tour.totalDestinations && (
    <div>
                      <span className="font-semibold text-gray-700">Total Destinations:</span>
                      <span className="ml-2 text-gray-600">{tour.totalDestinations}</span>
    </div>
  )}
                  {tour.totalItineraryItems && (
    <div>
                      <span className="font-semibold text-gray-700">Total Itinerary Items:</span>
                      <span className="ml-2 text-gray-600">{tour.totalItineraryItems}</span>
    </div>
  )}
                  {tour.status && (
    <div>
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span className="ml-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          tour.status === 'active' ? 'bg-green-100 text-green-700' : 
                          tour.status === 'inactive' ? 'bg-red-100 text-red-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {tour.status}
                        </span>
                      </span>
    </div>
  )}
                  {tour.views !== undefined && (
  <div>
                      <span className="font-semibold text-gray-700">Views:</span>
                      <span className="ml-2 text-gray-600">{tour.views}</span>
  </div>
                  )}
                  {tour.validUntil && (
  <div>
                      <span className="font-semibold text-gray-700">Valid Until:</span>
                      <span className="ml-2 text-gray-600">{new Date(tour.validUntil).toLocaleDateString()}</span>
  </div>
                  )}
                  {tour.updatedAt && (
                    <div>
                      <span className="font-semibold text-gray-700">Last Updated:</span>
                      <span className="ml-2 text-gray-600">{new Date(tour.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

          
        </div>



        
          </div>

          {/* RIGHT - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border sticky top-24">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg text-gray-600">Total</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-green-600">
                        ${discountedPrice.toFixed(0)}
                      </span>
                      <span className="text-sm text-gray-500">Per Person</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mb-6">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg rounded-xl font-semibold"
                  onClick={handleBookNow}
                >
                  Check Availability
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-6 text-lg rounded-xl font-semibold border-2"
                  onClick={handleBookNow}
                >
                  Add to Cart
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Quick Detail */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Quick Detail</h4>
                <ul className="space-y-3">
                  {tour.freeCancellation && (
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Free cancellation up to {tour.deadlineHours || 24} hours</span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Instant confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Mobile ticket accepted</span>
                  </li>
                </ul>
                
<div>


</div>
      
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;