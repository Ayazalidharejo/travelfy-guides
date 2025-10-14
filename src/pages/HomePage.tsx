import React, { useEffect, useState } from 'react';
import { postsAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Exact Design Components
import HeroFinal from '@/components/home/HeroFinal';
import ToursSectionExact from '@/components/home/ToursSectionExact';
import StatsSectionExact from '@/components/home/StatsSectionExact';
import ConsultationSection from '@/components/home/ConsultationSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import FooterSection from '@/components/home/FooterSection';

// Existing Components
import IntroductionSection from '@/components/IntroductionSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import VerticalItinerary from '@/components/VerticalItinerary';
import HappyTravelers from '@/components/HappyTravelers';
import RatingComponent from '@/components/RatingComponent';
import TourCard from '@/components/tour/TourCard';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - EXACT Design */}
      <HeroFinal />
      <IntroductionSection/>
<WhyChooseUs />
      {/* Explore Our Tours - Cards Design like ToursPage */}
      {featuredTours.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore our tours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour: any) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed - Cards Design like ToursPage */}
      {popularTours.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularTours.map((tour: any) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </section>
      )}
   
      {/* Stats Section - EXACT Design */}
      

      {/* Consultation Section */}
      <ConsultationSection />

      {/* Why Choose Us */}
   

      {/* Testimonials */}
     

      {/* Gallery */}
      <Gallery />

      {/* Itinerary */}
      {/* <VerticalItinerary /> */}
      
<StatsSectionExact />
      {/* FAQ */}
       <Testimonials />
      <FAQ />

      {/* Reviews */}
      {featuredTours.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Travelers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from our amazing community of travelers
              </p>
            </div>
            
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
          </div>
        </section>
      )}

      {/* Newsletter */}
      {/* <NewsletterSection /> */}

      {/* Footer */}
      {/* <FooterSection /> */}
    </div>
  );
};

export default HomePage;
