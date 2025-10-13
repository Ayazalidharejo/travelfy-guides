import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Users,
      content: [
        'Personal information you provide when booking tours (name, email, phone, address)',
        'Payment information processed securely through our payment partners',
        'Communication preferences and special requirements',
        'Photos and testimonials with your explicit consent',
        'Website usage data through cookies and analytics'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To process and manage your tour bookings',
        'To communicate with you about your tours and travel updates',
        'To improve our services and website functionality',
        'To send promotional content (only with your consent)',
        'To comply with legal requirements and protect our business'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We never sell your personal information to third parties',
        'We share necessary details with tour operators and local guides',
        'Payment information is processed by secure payment processors',
        'We may share data when required by law or to protect safety',
        'Anonymous analytics data may be used for business insights'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'All data is encrypted in transit and at rest',
        'We use industry-standard security measures',
        'Regular security audits and vulnerability assessments',
        'Staff access is limited and monitored',
        'Secure backup and disaster recovery procedures'
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
              🔒 Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-white/90">
              We're committed to protecting your personal information and being transparent about how we use it.
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
            <CardTitle className="text-2xl">Privacy Policy Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              At Travel Tours, we respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website, book our tours, or interact with our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              We will not use or share your information with anyone except as described in this Privacy Policy.
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

        {/* Your Rights */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              You have the right to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Access the personal information we hold about you',
                'Request correction of any inaccurate information',
                'Request deletion of your personal information',
                'Object to processing of your personal information',
                'Request restriction of processing your information',
                'Data portability - receive your data in a structured format',
                'Withdraw consent at any time where we rely on consent',
                'Lodge a complaint with a supervisory authority'
              ].map((right, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{right}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to improve your browsing experience, 
              analyze website traffic, and understand where our visitors are coming from.
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function properly, including security and authentication.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website to improve user experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements and track campaign effectiveness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-ocean text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="text-white/90 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>privacy@traveltours.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+81 80-7480-1156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;