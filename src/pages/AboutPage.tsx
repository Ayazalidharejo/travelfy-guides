import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Users, 
  Award, 
  Heart, 
  Shield, 
  Globe,
  Camera,
  Compass,
  Star
} from 'lucide-react';
import AboutHero from '@/components/About/AboutHero';
import MissionVision from '@/components/About/MissionVision';
import CoreValues from '@/components/About/CoreValues';
import Achievements from '@/components/About/Achievements';
import AboutCTA from '@/components/About/AboutCTA';

const AboutPage = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '2,500+' },
    { icon: MapPin, label: 'Destinations', value: '150+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
    { icon: Star, label: 'Average Rating', value: '4.9' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passionate Service',
      description: 'We love what we do and it shows in every tour we create. Our passion for travel and cultural exchange drives us to deliver exceptional experiences.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest safety standards with professional guides, quality equipment, and comprehensive insurance.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We believe in responsible travel that benefits local communities and preserves the environment for future generations.'
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Our local guides are not just knowledgeable - they are storytellers who bring destinations to life with authentic insights.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card overflow-x-hidden">
      {/* Hero Section */}
      <AboutHero/>
      <MissionVision/>

      <section className="bg-gradient-hero py-12 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4 sm:mb-6 text-sm sm:text-base">
              🌍 About Travel Tours
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
              Your Journey Starts Here
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed px-4">
              For over a decade, we've been crafting unforgettable travel experiences that connect people 
              with cultures, nature, and themselves. Every tour we create is a story waiting to be lived.
            </p>
          </div>
        </div>
      </section>
      <CoreValues/>
      <Achievements/>
      {/* <AboutCTA/> */}

      {/* Story Section */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Story</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  Travel Tours was born from a simple belief: that travel has the power to transform lives, 
                  build bridges between cultures, and create lasting memories that shape who we are.
                </p>
                <p>
                  Founded in 2014 by a group of passionate travelers and local guides, we started with just 
                  a handful of tours and a big dream. Today, we're proud to be one of the leading tour 
                  operators, but we've never forgotten our roots.
                </p>
                <p>
                  Every destination we visit, every local partner we work with, and every traveler we guide 
                  is part of our extended family. We don't just show you places - we help you discover 
                  yourself through travel.
                </p>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0 px-4 sm:px-8 lg:px-0">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-ocean max-w-md mx-auto lg:max-w-none">
                <img 
                  src="/placeholder.svg" 
                  alt="Our team" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 lg:-bottom-6 lg:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-sunset rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">What Drives Us</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Our core values guide everything we do, from planning your itinerary to the moment you return home with new stories to tell.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-medium transition-smooth">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
                      <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">Meet Our Team</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Behind every great tour is a team of passionate individuals who live and breathe travel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', experience: '15 years guiding' },
              { name: 'Michael Chen', role: 'Head of Operations', experience: '12 years in tourism' },
              { name: 'Emily Rodriguez', role: 'Cultural Experience Director', experience: '10 years local expertise' }
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-smooth">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-primary rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-sunset">
        <div className="container px-4 mx-auto max-w-7xl text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-4">
              Join our community of travelers and discover the world through our eyes. 
              Your next great story is just one booking away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a href="/tours" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-smooth font-semibold text-sm sm:text-base">
                Browse Tours
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-smooth font-semibold text-sm sm:text-base">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;