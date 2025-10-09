

import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TourCard from '@/components/tour/TourCard';
import { postsAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import RatingComponent from '@/components/RatingComponent';
import { TrendingUp } from 'lucide-react';

import Hero from './HeroSection';
import IntroductionSection from '@/components/IntroductionSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import VerticalItinerary from '@/components/VerticalItinerary';
import HappyTravelers from '@/components/HappyTravelers';

const HomePage = () => {
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);
  const [popularTours, setPopularTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching Featured Tours...");
        const featuredResponse = await postsAPI.getPosts({ 
          featured: true, 
          limit: 6,
          status: 'published' 
        });
        console.log("✅ Featured Tours Data:", featuredResponse.data);
        
        // Convert backend mainImage to frontend imageUrl
        const featuredData = (featuredResponse.data || []).map((tour: any) => ({
          ...tour,
          imageUrl: tour.mainImage 
            ? (typeof tour.mainImage === 'string' ? tour.mainImage : tour.mainImage.url)
            : tour.mainImageUrl || tour.imageUrl,
          images: tour.additionalImages 
            ? (Array.isArray(tour.additionalImages) 
                ? tour.additionalImages.map((img: any) => typeof img === 'string' ? img : img.url)
                : []
              )
            : (tour.additionalImageUrls || tour.images || []),
          // *** FIX: Enhanced price mapping - prioritize priceNumber from backend ***
          priceNumber: tour.priceNumber || 
                       (tour.pricingSchedule?.[0]?.netPrice ? parseFloat(String(tour.pricingSchedule[0].netPrice)) : 0) ||
                       (tour.pricingSchedule?.[0]?.actualPrice ? parseFloat(String(tour.pricingSchedule[0].actualPrice)) : 0) ||
                       100,
          // Keep price for backward compatibility (construct from priceNumber if missing)
          price: tour.priceNumber 
                 ? `$${tour.priceNumber}` 
                 : (tour.pricingSchedule?.[0]?.netPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].netPrice}` : '') ||
                   (tour.pricingSchedule?.[0]?.actualPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].actualPrice}` : '') ||
                   'USD 100',
          discountPercentage: tour.discountPercentage || tour.discount?.percentage || 0,
          // *** FIX: Ensure pricingSchedule is properly formatted with numbers ***
          pricingSchedule: tour.pricingSchedule ? tour.pricingSchedule.map((schedule: any) => ({
            ...schedule,
            actualPrice: parseFloat(String(schedule.actualPrice)) || 0,
            netPrice: parseFloat(String(schedule.netPrice)) || 0,
            currency: schedule.currency || 'USD'
          })) : [],
          // Pass all other fields from backend
          duration: tour.duration || '',
          durationHours: tour.durationHours || 0,
          city: tour.city || '',
          tourType: tour.tourType || '',
          capacity: tour.capacity || 0,
          minGroup: tour.minGroup || 0,
          maxGroup: tour.maxGroup || 0
        }));
        
        console.log("✅ Featured Tours with images:", featuredData);
        console.log("💰 First Featured Tour - Price:", featuredData[0]?.price);
        console.log("💰 First Featured Tour - PriceNumber:", featuredData[0]?.priceNumber);
        console.log("🔥 First Featured Tour - Discount:", featuredData[0]?.discountPercentage);
        setFeaturedTours(featuredData);

        console.log("📡 Fetching Popular Tours...");
        const popularResponse = await postsAPI.getPosts({ 
          sort: '-views',
          limit: 8,
          status: 'published'
        });
        console.log("✅ Popular Tours Data:", popularResponse.data);
        
        // Convert backend mainImage to frontend imageUrl
        const popularData = (popularResponse.data || []).map((tour: any) => ({
          ...tour,
          imageUrl: tour.mainImage 
            ? (typeof tour.mainImage === 'string' ? tour.mainImage : tour.mainImage.url)
            : tour.mainImageUrl || tour.imageUrl,
          images: tour.additionalImages 
            ? (Array.isArray(tour.additionalImages) 
                ? tour.additionalImages.map((img: any) => typeof img === 'string' ? img : img.url)
                : []
              )
            : (tour.additionalImageUrls || tour.images || []),
          // *** FIX: Enhanced price mapping - prioritize priceNumber from backend ***
          priceNumber: tour.priceNumber || 
                       (tour.pricingSchedule?.[0]?.netPrice ? parseFloat(String(tour.pricingSchedule[0].netPrice)) : 0) ||
                       (tour.pricingSchedule?.[0]?.actualPrice ? parseFloat(String(tour.pricingSchedule[0].actualPrice)) : 0) ||
                       100,
          // Keep price for backward compatibility (construct from priceNumber if missing)
          price: tour.priceNumber 
                 ? `$${tour.priceNumber}` 
                 : (tour.pricingSchedule?.[0]?.netPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].netPrice}` : '') ||
                   (tour.pricingSchedule?.[0]?.actualPrice ? `${tour.pricingSchedule[0].currency || 'USD'} ${tour.pricingSchedule[0].actualPrice}` : '') ||
                   'USD 100',
          discountPercentage: tour.discountPercentage || tour.discount?.percentage || 0,
          // *** FIX: Ensure pricingSchedule is properly formatted with numbers ***
          pricingSchedule: tour.pricingSchedule ? tour.pricingSchedule.map((schedule: any) => ({
            ...schedule,
            actualPrice: parseFloat(String(schedule.actualPrice)) || 0,
            netPrice: parseFloat(String(schedule.netPrice)) || 0,
            currency: schedule.currency || 'USD'
          })) : [],
          // Pass all other fields from backend
          duration: tour.duration || '',
          durationHours: tour.durationHours || 0,
          city: tour.city || '',
          tourType: tour.tourType || '',
          capacity: tour.capacity || 0,
          minGroup: tour.minGroup || 0,
          maxGroup: tour.maxGroup || 0
        }));
        
        setPopularTours(popularData);

      } catch (error) {
        console.error('❌ Error fetching tours:', error);
        toast({
          title: "Error",
          description: "Failed to load tours. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toast]);

  return (
    <div className="min-h-screen">
      <Hero/>
      <IntroductionSection/>
      <HappyTravelers/>

      {/* Featured Tours */}
      {featuredTours.length > 0 && (
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-sunset text-white mb-4">
                ⭐ Featured Tours
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Handpicked Adventures
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular and carefully curated travel experiences 
                that promise unforgettable memories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour: any) => {
                console.log('Featured Tour Data:', tour);
                return (
                <Link to={`/tours/${tour._id}`} key={tour._id} className="block">
                  <TourCard tour={tour} />
                </Link>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/tours">
                <Button variant="hero" size="lg">
                  View All Tours
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Popular Tours */}
      {popularTours.length > 0 && (
        <section className="py-20 bg-gradient-card">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-primary text-white mb-4 flex items-center justify-center gap-1 w-fit mx-auto">
                <TrendingUp className="h-4 w-4" />
                Popular Tours
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trending Destinations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the most sought-after destinations chosen by fellow travelers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTours.slice(0, 4).map((tour: any) => (
                <Link to={`/tours/${tour._id}`} key={tour._id} className="block">
                  <TourCard tour={tour} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhyChooseUs/>
      <Testimonials/>
      <Gallery/>
      <VerticalItinerary/>
      <FAQ/>

      {/* Recent Reviews Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from our amazing community of travelers around the world
            </p>
          </div>
          
          {/* Featured Tour for Reviews */}
          {featuredTours.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Reviews for: {featuredTours[0]?.title}
                </h3>
                <p className="text-gray-600">
                  Share your experience or read what others have to say
                </p>
              </div>
              
              <RatingComponent 
                tourId={featuredTours[0]._id} 
                tourTitle={featuredTours[0].title}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
