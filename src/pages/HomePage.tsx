// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import TourCard from '@/components/tour/TourCard';
// import { postsAPI } from '@/lib/api';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Search, 
//   MapPin, 
//   Clock, 
//   Star, 
//   Users, 
//   Shield, 
//   Heart,
//   Mountain,
//   Camera,
//   Compass,
//   Globe,
//   Award,
//   TrendingUp
// } from 'lucide-react';
// import Hero from './HeroSection';
// import IntroductionSection from '@/components/IntroductionSection';
// import WhyChooseUs from '@/components/WhyChooseUs';
// import FeaturedTours from '@/components/FeaturedTours';
// import Testimonials from '@/components/Testimonials';
// import CallToAction from '@/components/CallToAction';
// import FAQ from '@/components/FAQ';
// import Gallery from '@/components/Gallery';
// import VerticalItinerary from '@/components/VerticalItinerary';
// import HappyTravelers from '@/components/HappyTravelers';

// const HomePage = () => {
//   const [featuredTours, setFeaturedTours] = useState([]);
//   const [popularTours, setPopularTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         // Fetch featured tours
//         const featuredResponse = await postsAPI.getPosts({ 
//           featured: true, 
//           limit: 6,
//           status: 'published' 
//         });
//         setFeaturedTours(featuredResponse.data || []);

//         // Fetch popular tours (by views)
//         const popularResponse = await postsAPI.getPosts({ 
//           sort: '-views',
//           limit: 8,
//           status: 'published'
//         });
//         setPopularTours(popularResponse.data || []);
//       } catch (error) {
//         console.error('Error fetching tours:', error);
//         toast({
//           title: "Error",
//           description: "Failed to load tours. Please try again later.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, [toast]);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//      <Hero/>
//      <IntroductionSection/>
//     <HappyTravelers/>
//      <WhyChooseUs/>
//      <FeaturedTours/>
//      <Testimonials/>
     
    
//      <Gallery/>
     
// <VerticalItinerary/>
//  <FAQ/>
//  <CallToAction/>
//       {/* Featured Tours */}
//       {featuredTours.length > 0 && (
//         <section className="py-20">
//           <div className="container px-4">
//             <div className="text-center mb-16">
//               <Badge className="bg-gradient-sunset text-white mb-4">
//                 ⭐ Featured Tours
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Handpicked Adventures
//               </h2>
//               <p className="text-muted-foreground max-w-2xl mx-auto">
//                 Discover our most popular and carefully curated travel experiences 
//                 that promise unforgettable memories.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredTours.map((tour: any) => (
//                 <TourCard key={tour._id} tour={tour} />
//               ))}
//             </div>
            
//             <div className="text-center mt-12">
//               <Link to="/tours">
//                 <Button variant="hero" size="lg">
//                   View All Tours
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Stats Section */}
     

//       {/* Popular Tours */}
//       {popularTours.length > 0 && (
//         <section className="py-20 bg-gradient-card">
//           <div className="container px-4">
//             <div className="text-center mb-16">
//               <Badge className="bg-gradient-primary text-white mb-4 flex items-center justify-center gap-1 w-fit mx-auto">
//                 <TrendingUp className="h-4 w-4" />
//                 Popular Tours
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Trending Destinations
//               </h2>
//               <p className="text-muted-foreground max-w-2xl mx-auto">
//                 Explore the most sought-after destinations chosen by fellow travelers.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {popularTours.slice(0, 4).map((tour: any) => (
//                 <TourCard key={tour._id} tour={tour} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA Section */}
     
//     </div>
//   );
// };

// export default HomePage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TourCard from '@/components/tour/TourCard';
import { postsAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Shield, 
  Heart,
  Mountain,
  Camera,
  Compass,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';
import Hero from './HeroSection';
import IntroductionSection from '@/components/IntroductionSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedTours from '@/components/FeaturedTours';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import VerticalItinerary from '@/components/VerticalItinerary';
import HappyTravelers from '@/components/HappyTravelers';

const HomePage = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [popularTours, setPopularTours] = useState([]);
  const [stats, setStats] = useState({
    totalTours: 0,
    happyTravelers: 0,
    countries: 0,
    experienceYears: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured tours
        const featuredResponse = await postsAPI.getPosts({ 
          featured: true, 
          limit: 6,
          status: 'published' 
        });
        
        // Fetch popular tours (by views and rating)
        const popularResponse = await postsAPI.getPosts({ 
          sort: '-views,-rating.average',
          limit: 8,
          status: 'published'
        });

        // Set tours data
        if (featuredResponse?.success) {
          setFeaturedTours(featuredResponse.data || []);
        } else {
          console.warn('Featured tours response format unexpected:', featuredResponse);
          setFeaturedTours([]);
        }

        if (popularResponse?.success) {
          setPopularTours(popularResponse.data || []);
        } else {
          console.warn('Popular tours response format unexpected:', popularResponse);
          setPopularTours([]);
        }

        // Calculate stats from tours data
        const allTours = [...(featuredResponse?.data || []), ...(popularResponse?.data || [])];
        const uniqueTours = allTours.filter((tour, index, self) => 
          index === self.findIndex(t => t._id === tour._id)
        );

        setStats({
          totalTours: uniqueTours.length,
          happyTravelers: uniqueTours.reduce((sum, tour) => sum + (tour.currentBookings || 0), 0),
          countries: new Set(uniqueTours.map(tour => tour.location?.country).filter(Boolean)).size,
          experienceYears: 5 // Default value or calculate from tour data
        });

      } catch (error) {
        console.error('Error fetching home page data:', error);
        toast({
          title: "Error",
          description: "Failed to load tours. Please try again later.",
          variant: "destructive",
        });
        
        // Set empty arrays on error
        setFeaturedTours([]);
        setPopularTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [toast]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading amazing tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Introduction Section */}
      <IntroductionSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <div className="container px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTours}+</h3>
              <p className="text-muted-foreground">Curated Tours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-sunset text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.happyTravelers}+</h3>
              <p className="text-muted-foreground">Happy Travelers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-ocean text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.countries}+</h3>
              <p className="text-muted-foreground">Countries</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-forest text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.experienceYears}+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Travelers */}
      <HappyTravelers />
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Featured Tours */}
      {featuredTours.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-sunset text-white mb-4 px-4 py-1 text-sm">
                ⭐ Featured Tours
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Handpicked Adventures
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Discover our most popular and carefully curated travel experiences 
                that promise unforgettable memories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/tours">
                <Button variant="hero" size="lg" className="px-8 py-3 text-lg">
                  View All Tours
                  <Compass className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />
      
      {/* Popular Tours */}
      {popularTours.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-primary text-white mb-4 px-4 py-1 text-sm flex items-center justify-center gap-1 w-fit mx-auto">
                <TrendingUp className="h-4 w-4" />
                Popular Tours
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Trending Destinations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore the most sought-after destinations chosen by fellow travelers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTours.slice(0, 4).map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
            
            {popularTours.length > 4 && (
              <div className="text-center mt-12">
                <Link to="/tours?sort=popular">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                    See More Popular Tours
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      <Gallery />
      
      {/* Vertical Itinerary */}
      <VerticalItinerary />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default HomePage;