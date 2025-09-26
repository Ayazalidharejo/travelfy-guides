import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  HeadphonesIcon,
  Globe
} from 'lucide-react';
import ContactHero from '@/components/Contact/ContactHero';
import Testimonials from '@/components/Contact/Testimonials';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Travel Street', 'Adventure City, AC 12345', 'United States'],
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri: 9AM-6PM'],
      color: 'text-success'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@traveltours.com', 'support@traveltours.com', 'booking@traveltours.com'],
      color: 'text-secondary'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'text-warning'
    }
  ];

  const quickContacts = [
    {
      icon: MessageSquare,
      title: 'General Inquiry',
      description: 'Questions about our tours and services',
      action: 'Send Message'
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Support',
      description: 'Help with bookings and technical issues',
      action: 'Get Support'
    },
    {
      icon: Globe,
      title: 'Travel Consultation',
      description: 'Personalized travel planning advice',
      action: 'Book Consultation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <ContactHero/>
      <Testimonials/>
      <section className="bg-gradient-hero py-20">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
              📞 Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Have questions about our tours? Need help planning your adventure? 
              We're here to help make your travel dreams come true.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry, travel plans, or questions..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="hero" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Options */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Contact Options</h2>
              <div className="space-y-4">
                {quickContacts.map((contact, index) => (
                  <Card key={index} className="hover:shadow-medium transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <contact.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{contact.title}</h3>
                          <p className="text-muted-foreground text-sm">{contact.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {contact.action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-medium transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 ${info.color}`}>
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <Card className="bg-gradient-sunset text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">24/7 Emergency Support</h3>
                <p className="text-white/90 mb-4">
                  For travelers currently on tour who need immediate assistance:
                </p>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 911-HELP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 2-4 weeks in advance for popular tours, especially during peak seasons."
              },
              {
                question: "What's your cancellation policy?",
                answer: "Free cancellation up to 24 hours before your tour start time. Some tours may have different policies."
              },
              {
                question: "Do you offer group discounts?",
                answer: "Yes! We offer special rates for groups of 8 or more. Contact us for a custom quote."
              },
              {
                question: "What should I bring on tours?",
                answer: "Each tour has specific recommendations, but generally: comfortable shoes, weather-appropriate clothing, and a camera!"
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;