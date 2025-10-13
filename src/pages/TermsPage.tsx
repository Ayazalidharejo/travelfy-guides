import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, CreditCard, Shield, Users, MapPin } from 'lucide-react';

const TermsPage = () => {
  const sections = [
    {
      title: 'Booking and Payment',
      icon: CreditCard,
      content: [
        'All bookings must be paid in full at the time of reservation',
        'Prices are subject to change until booking is confirmed',
        'We accept major credit cards and secure online payments',
        'Group bookings may require a deposit with balance due before tour date',
        'Currency exchange rates may affect final pricing for international bookings'
      ]
    },
    {
      title: 'Cancellation Policy',
      icon: AlertTriangle,
      content: [
        'Free cancellation up to 24 hours before tour start time',
        'Cancellations within 24 hours are subject to full charge',
        'No-shows will be charged the full amount',
        'Weather-related cancellations by us result in full refund or rescheduling',
        'Refunds are processed within 5-10 business days to original payment method'
      ]
    },
    {
      title: 'Tour Participation',
      icon: Users,
      content: [
        'Participants must meet age and fitness requirements as specified',
        'We reserve the right to refuse service to intoxicated individuals',
        'Follow all safety instructions provided by tour guides',
        'Respect local customs, laws, and other participants',
        'Arrive at designated meeting points on time - late arrivals may forfeit tour'
      ]
    },
    {
      title: 'Liability and Insurance',
      icon: Shield,
      content: [
        'Travel insurance is strongly recommended for all participants',
        'We are not liable for personal injury, illness, or loss of personal items',
        'Participants travel at their own risk and expense',
        'Medical conditions must be disclosed that may affect tour participation',
        'Our liability is limited to the cost of the tour booking'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
              📋 Terms of Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/90">
              Please read these terms carefully before booking your adventure with us.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        {/* Last Updated */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground">
            Last updated: September 23, 2024
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-12 shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Terms of Service Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Travel Tours! These Terms of Service ("Terms") govern your use of our website, 
              services, and tour bookings. By accessing our website or booking a tour, you agree to be 
              bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting on our website. Your continued use of our services after changes are posted 
              constitutes acceptance of the modified Terms.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-medium transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-white" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Force Majeure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We are not liable for any failure to perform our obligations due to circumstances beyond our 
                reasonable control, including but not limited to: natural disasters, extreme weather, government 
                restrictions, pandemics, terrorist activities, civil unrest, or other acts of God.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In such cases, we will work with you to reschedule your tour or provide a full refund, 
                subject to our standard policies and any applicable supplier terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                All content on our website, including text, images, logos, and tour descriptions, is protected 
                by copyright and other intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without our written permission.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Photos and videos taken during tours may be used by Travel Tours for marketing purposes unless 
                you specifically opt out. We respect your privacy and will not use images in which you are 
                prominently featured without your consent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these Terms or your use of our services will be resolved through 
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the State where Travel Tours is incorporated, 
                without regard to conflict of law principles.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <Card className="mt-12 bg-gradient-sunset text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-white/90 mb-6">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>legal@traveltours.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>+81 80-7480-1156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;