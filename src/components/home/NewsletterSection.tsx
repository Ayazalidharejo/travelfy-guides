import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive exclusive travel deals in your inbox.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                CHOOSE YOUR PATH!
              </h2>
              
              <p className="text-gray-700 text-base mb-6">
                Get exclusive travel deals, destination guides, and insider tips
                delivered straight to your inbox.
              </p>

              <div className="flex gap-3 mb-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="flex-1 px-5 py-3 rounded-full border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                />
                <Button
                  onClick={handleSubscribe}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-sm text-gray-600">
                Join <span className="font-bold">50,000+</span> travelers. Unsubscribe anytime.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300"
                alt="Happy Traveler"
                className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-8 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

