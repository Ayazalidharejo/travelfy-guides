import React, { useState } from "react";
import { Headset, Clock, MessageCircle, Phone, Mail, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import UserChat from "@/pages/UserChat";

const CustomerSupportPage: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const handleChatClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isAdmin) return;
    setChatOpen(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#000] to-[#5C7AC0] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Headset className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            24/7 Customer Support
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            We're always here for you, anytime you need us
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Travel Partner, Around the Clock
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Karvaan Tours, we believe exceptional customer service doesn't stop when you book your tour. Our 
            dedicated support team is available 24 hours a day, 7 days a week to assist you with any questions, 
            concerns, or emergencies that may arise before, during, or after your journey.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're planning your trip from home or already exploring Japan, we're just a call, message, 
            or email away. Your peace of mind is our commitment.
          </p>
        </section>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Phone Support</h3>
            <p className="text-gray-700 mb-4">
              Speak directly with our support team for immediate assistance with any urgent matters.
            </p>
            <a href="tel:+81-XXX-XXXX" className="text-red-600 font-semibold hover:underline">
              +81 80-7480-1156
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <MessageCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-700 mb-4">
              Get instant responses through our live chat feature on our website or mobile app.
            </p>
            <button 
              className="text-red-600 font-semibold hover:underline"
              onClick={handleChatClick}
            >
              Start Chat Now
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email Support</h3>
            <p className="text-gray-700 mb-4">
              Send us detailed inquiries and receive comprehensive responses within hours.
            </p>
            <a href="mailto:support@karvaantours.com" className="text-red-600 font-semibold hover:underline">
              support@karvaantours.com
            </a>
          </div>
        </div>

        {/* What We Help With */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How We Can Help You
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Clock className="w-6 h-6 text-red-600 mr-2" />
                Before Your Tour
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Tour recommendations and itinerary planning</li>
                <li>• Booking assistance and payment questions</li>
                <li>• Customization requests</li>
                <li>• Travel documentation guidance</li>
                <li>• Special requirements coordination</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Globe className="w-6 h-6 text-red-600 mr-2" />
                During Your Tour
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Real-time assistance and emergency support</li>
                <li>• Last-minute changes or adjustments</li>
                <li>• Additional bookings or upgrades</li>
                <li>• Local recommendations</li>
                <li>• Problem resolution</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <MessageCircle className="w-6 h-6 text-red-600 mr-2" />
                After Your Tour
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Feedback and reviews</li>
                <li>• Future booking assistance</li>
                <li>• Lost and found inquiries</li>
                <li>• Invoice and receipt requests</li>
                <li>• Loyalty program benefits</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Headset className="w-6 h-6 text-red-600 mr-2" />
                Technical Support
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Website and app navigation</li>
                <li>• Account management</li>
                <li>• Payment processing issues</li>
                <li>• Booking confirmation problems</li>
                <li>• Mobile app troubleshooting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Response Times */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Response Times
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block bg-red-100 rounded-full p-6 mb-4">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Phone</h4>
              <p className="text-3xl font-bold text-red-600 mb-2">Instant</p>
              <p className="text-gray-600">Immediate connection to support agent</p>
            </div>

            <div className="text-center">
              <div className="inline-block bg-red-100 rounded-full p-6 mb-4">
                <MessageCircle className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-3xl font-bold text-red-600 mb-2">&lt; 2 min</p>
              <p className="text-gray-600">Average response time</p>
            </div>

            <div className="text-center">
              <div className="inline-block bg-red-100 rounded-full p-6 mb-4">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Email</h4>
              <p className="text-3xl font-bold text-red-600 mb-2">&lt; 2 hours</p>
              <p className="text-gray-600">Detailed responses guaranteed</p>
            </div>
          </div>
        </section>

        
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
    Multilingual Support
  </h2>
  <p className="text-center text-gray-700 text-lg mb-8">
    Our support team speaks your language! We offer assistance in:
  </p>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
    <div className="bg-white rounded-lg p-4 text-center shadow">
      <p className="font-semibold text-gray-900">🇬🇧 English</p>
    </div>
    <div className="bg-white rounded-lg p-4 text-center shadow">
      <p className="font-semibold text-gray-900">🇮🇳 Hindi</p>
    </div>
    <div className="bg-white rounded-lg p-4 text-center shadow">
      <p className="font-semibold text-gray-900">🇯🇵 Japanese</p>
    </div>
    <div className="bg-white rounded-lg p-4 text-center shadow">
      <p className="font-semibold text-gray-900">🇷🇺 Russian</p>
    </div>
    <div className="bg-white rounded-lg p-4 text-center shadow">
      <p className="font-semibold text-gray-900">🇸🇦 Arabic</p>
    </div>
  </div>
</section>


        {/* Emergency Support */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-red-600">
          <div className="text-center mb-6">
            <div className="inline-block bg-red-600 text-white rounded-full p-4 mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Hotline</h2>
            <p className="text-lg text-gray-700 mb-4">
              For urgent matters during your tour, contact our emergency line:
            </p>
            <a 
              href="tel:+81 80-7480-1156" 
              className="inline-block bg-red-600 text-white text-2xl font-bold px-8 py-4 rounded-full hover:bg-red-700 transition"
            >
              +81 80-7480-1156
            </a>
            <p className="text-gray-600 mt-4">Available 24/7 for tour participants</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Have Questions? We're Here to Help!</h2>
          <p className="text-xl mb-8 text-white/90">
            Don't hesitate to reach out—our friendly support team is ready to assist you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/tours"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition"
            >
              Browse Tours
            </Link>
          </div>
        </section>
      </div>

      {/* Live Chat Modal */}
      {isAuthenticated && !isAdmin && (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-lg h-[650px] p-0 overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Live Chat Support
              </DialogTitle>
            </DialogHeader>
            <div className="h-full">
              <UserChat
                token={localStorage.getItem('token') || ''}
                currentUser={{
                  id: (user as any)?._id || (user as any)?.id || '',
                  name: (user as any)?.name || '',
                  email: (user as any)?.email || '',
                  avatar: (user as any)?.photoURL || (user as any)?.avatar || undefined
                }}
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerSupportPage;
