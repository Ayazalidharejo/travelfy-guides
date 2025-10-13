import React from 'react';
import { Button } from '@/components/ui/button';
// import image from "@/../public/images"
import { CheckCircle, Phone, Calendar, MessageCircle } from 'lucide-react';

const ConsultationSection = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <div 
          className="bg-gradient-to-r from-[#307172] to-[#204f4f] rounded-3xl overflow-hidden shadow-xl relative "
          style={{
            background: ')',
            minHeight: '300px'
          }}
        >
          <div className=" grid md:grid-cols-[1fr,auto] gap-8 items-center p-8 md:p-12">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#fff' }}>
                Get Free Travel Consultation
              </h2>
              
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#fff' }}>
                Our expert travel consultants are here to help you plan the perfect trip. From
                destination selection to customized itineraries, we've got you covered.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>Personalized recommendations</p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>Flexible scheduling</p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#fff' }} />
                  <p className="text-sm" style={{ color: '#fff' }}>24/7 support available</p>
                </div>
              </div>

              <Button 
                className="text-sm px-6 py-2 rounded-lg font-medium"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: 'none'
                }}
              >
                Book Free Consultation
              </Button>
            </div>

            {/* Right Content - Contact Cards & Image */}
            <div className="flex items-center gap-6">
              {/* Contact Cards */}
              <div className="space-y-3">
                {/* Live Chat */}
                <div className="bg-white rounded-xl p-3 shadow-sm" style={{ minWidth: '200px' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Live Chat</h3>
                      <p className="text-[10px] text-gray-600">Available now</p>
                    </div>
                  </div>
                </div>

                {/* Call Us */}
                <div className="bg-white rounded-xl p-3 shadow-sm" style={{ minWidth: '200px' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Phone className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Call Us</h3>
                      <p className="text-[10px] text-gray-600">Pick your time</p>
                    </div>
                  </div>
                </div>

                {/* Schedule a Call */}
                <div className="bg-white rounded-xl p-3 shadow-sm" style={{ minWidth: '200px' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs">Schedule a Call</h3>
                      <p className="text-[10px] text-gray-600">+81 80-7480-1156</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traveler Image - Girl with backpack */}
              <div className="hidden lg:block relative" style={{ width: '250px', height: '280px' }}>
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"
                  alt="Travel Consultant"
                  className="object-cover object-center"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectPosition: 'center top'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;

