import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Users, Shield, Clock, CheckCircle, Star } from 'lucide-react';

const TransportPage = () => {
  const vehicles = [
    {
      id: 1,
      name: 'Alphard',
      capacity: 6,
      description: 'Luxury MPV with premium comfort and spacious interior. Perfect for family trips and business travel.',
      features: ['Leather Seats', 'Climate Control', 'Entertainment System', 'USB Charging'],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80',
      popular: true
    },
    {
      id: 2,
      name: 'Vellfire',
      capacity: 5,
      description: 'Executive class MPV offering supreme luxury and advanced features for a premium travel experience.',
      features: ['Executive Seats', 'Massage Function', 'Premium Audio', 'Ambient Lighting'],
      image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&auto=format&fit=crop&q=80',
      popular: true
    },
    {
      id: 3,
      name: 'Mercedes Benz',
      capacity: 3,
      description: 'Luxury sedan combining elegance, performance, and cutting-edge technology for VIP transportation.',
      features: ['Luxury Interior', 'Premium Sound', 'Advanced Safety', 'Sport Mode'],
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
      popular: false
    },
    {
      id: 4,
      name: 'Luxury Land Cruiser Prado',
      capacity: 4,
      description: 'Premium SUV built for both city drives and adventurous terrain with unmatched comfort.',
      features: ['4WD System', 'Leather Interior', 'Safety Features', 'Hill Assist'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
      popular: false
    },
    {
      id: 5,
      name: 'Toyota Crown',
      capacity: 3,
      description: 'Elegant luxury sedan offering sophisticated comfort and advanced technology.',
      features: ['Premium Comfort', 'Hybrid Engine', 'Smart Features', 'Quiet Cabin'],
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80',
      popular: false
    },
    {
      id: 6,
      name: 'Commuter Van',
      capacity: 9,
      description: 'Spacious van perfect for group travel, offering comfort and reliability for larger parties.',
      features: ['Spacious Interior', 'Air Conditioning', 'Multiple Rows', 'Luggage Space'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      popular: false
    },
    {
      id: 7,
      name: 'Commuter Van (Large)',
      capacity: 13,
      description: 'Extra large van ideal for big groups and tour parties, ensuring everyone travels together.',
      features: ['Maximum Capacity', 'Comfortable Seats', 'Climate Control', 'Extra Luggage'],
      image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&auto=format&fit=crop&q=80',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All vehicles are comprehensively insured for your safety and peace of mind.'
    },
    {
      icon: Users,
      title: 'Professional Drivers',
      description: 'Experienced and courteous drivers who know the best routes and attractions.'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock availability to accommodate your travel schedule.'
    },
    {
      icon: CheckCircle,
      title: 'Well Maintained',
      description: 'Regular maintenance and cleaning ensure a comfortable journey every time.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-12 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Car className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Premium Transport Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-4">
              Travel in comfort and style with our fleet of luxury vehicles. From intimate rides to large group tours, 
              we have the perfect vehicle for your journey.
            </p>
            <Link to="/tours">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8">
                Book Your Tour Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Why Choose Our Transport</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We pride ourselves on providing top-quality transportation services with a focus on safety, comfort, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4">
                  <benefit.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground px-2">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Fleet */}
      <div className="py-12 sm:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Our Premium Fleet</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Choose from our diverse range of vehicles, each maintained to the highest standards and equipped for your comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-large transition-all duration-300 group">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {vehicle.popular && (
                    <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white text-xs sm:text-sm">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-semibold text-sm sm:text-base md:text-lg">Up to {vehicle.capacity} Travelers</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl">{vehicle.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground">{vehicle.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* <Link to="/tours" className="block">
                    <Button className="w-full mt-3 sm:mt-4 text-sm sm:text-base" variant="hero">
                      Book a Tour
                    </Button>
                  </Link> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-hero text-white py-12 sm:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Ready to Experience Premium Travel?</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-4">
              Book your tour today and enjoy a comfortable, safe journey in one of our premium vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/tours" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                  Browse Tours
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
