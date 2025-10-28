import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  HeadphonesIcon,
  FileQuestion,
  Send,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpSupportPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
   
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      available: '24/7 Available',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'info@karvaantours.com',
      available: 'Response within 24h',
      color: 'bg-green-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      action: '+81 80-7480-1156',
      available: 'Mon-Fri, 9AM-6PM JST',
      color: 'bg-purple-500'
    },
    {
      icon: FileQuestion,
      title: 'FAQ',
      description: 'Browse our frequently asked questions',
      action: 'View FAQ',
      available: 'Instant Answers',
      color: 'bg-orange-500'
    }
  ];

  const quickLinks = [
    { title: 'How to Book a Tour', link: '/faq' },
    { title: 'Cancellation Policy', link: '/cancellation-policy' },
    { title: 'Refund Policy', link: '/refund-policy' },
    { title: 'Payment Methods', link: '/faq' },
    { title: 'Vehicle Information', link: '/transport' },
    { title: 'Terms of Service', link: '/terms' }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <HeadphonesIcon className="h-16 w-16" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We're here to assist you 24/7. Get in touch through any of our support channels.
            </p>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Support Channel</h2>
            <p className="text-lg text-muted-foreground">
              Select the method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <channel.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{channel.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    {channel.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {channel.available}
                  </div>
                  <Button
                    variant={index === 0 ? 'default' : 'outline'}
                    className="w-full mt-4"
                  >
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">
                        info@karvaantours.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        +81 80-7480-1156
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-sm text-muted-foreground">
                        2nd Floor, Sotoike Shukugo Building, Utsunomiya City, Tochigi, Japan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 9:00 AM - 6:00 PM JST<br />
                        Sat-Sun: 10:00 AM - 4:00 PM JST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.link}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 border-b last:border-0"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our support team is available 24/7 to help you with any questions or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Live Chat
            </Button>
            <Link to="/faq">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 text-lg"
              >
                <FileQuestion className="h-5 w-5 mr-2" />
                Browse FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
