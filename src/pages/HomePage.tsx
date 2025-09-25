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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Fetch featured tours
        const featuredResponse = await postsAPI.getPosts({ 
          featured: true, 
          limit: 6,
          status: 'published' 
        });
        setFeaturedTours(featuredResponse.data || []);

        // Fetch popular tours (by views)
        const popularResponse = await postsAPI.getPosts({ 
          sort: '-views',
          limit: 8,
          status: 'published'
        });
        setPopularTours(popularResponse.data || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
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
      {/* Hero Section */}
     <Hero/>
     <IntroductionSection/>
    <HappyTravelers/>
     <WhyChooseUs/>
     <FeaturedTours/>
     <Testimonials/>
     
    
     <Gallery/>
     
<VerticalItinerary/>
 <FAQ/>
 <CallToAction/>
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
              {featuredTours.map((tour: any) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
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

      {/* Stats Section */}
     

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
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
     
    </div>
  );
};

export default HomePage;