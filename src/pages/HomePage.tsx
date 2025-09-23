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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 container px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2">
              🌍 Discover Amazing Destinations
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Unforgettable
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Travel Experiences
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Explore breathtaking destinations, immerse in local cultures, and create memories that last a lifetime
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/tours">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Tours
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce delay-1000">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Camera className="h-10 w-10 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-primary text-white mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Perfect Travel Partner
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide exceptional travel experiences with professional guides, 
              authentic local insights, and unforgettable adventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-large transition-smooth bg-white border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Safe & Secure</h3>
                <p className="text-muted-foreground">
                  Professional guides, safety equipment, and comprehensive insurance 
                  for worry-free adventures.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-large transition-smooth bg-white border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Authentic Experiences</h3>
                <p className="text-muted-foreground">
                  Connect with local cultures, taste authentic cuisine, and discover 
                  hidden gems off the beaten path.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-large transition-smooth bg-white border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Guides</h3>
                <p className="text-muted-foreground">
                  Local experts with years of experience sharing stories, history, 
                  and insider knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-hero">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white">2,500+</div>
              <div className="text-white/80">Happy Travelers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white">150+</div>
              <div className="text-white/80">Destinations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white">50+</div>
              <div className="text-white/80">Expert Guides</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-ocean">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Globe className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of travelers who have discovered amazing destinations with us. 
              Book your dream tour today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tours">
                <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                  Browse Tours
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;