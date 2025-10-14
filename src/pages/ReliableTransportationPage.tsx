import React from "react";
import { Truck, Shield, CheckCircle, Car, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ReliableTransportationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Truck className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reliable Transportation
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Comfortable, safe rides throughout your Japanese adventure
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Travel in Comfort and Safety
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Karvaan Tours, we understand that transportation is more than just getting from point A to point B—
            it's an integral part of your travel experience. That's why we maintain a premium fleet of well-maintained, 
            comfortable vehicles and employ only the most professional drivers.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're traveling solo, with family, or in a group, we have the perfect vehicle to ensure your 
            journey is smooth, safe, and enjoyable. Sit back, relax, and let us handle the roads while you focus on 
            making memories.
          </p>
        </section>

        {/* Vehicle Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
            <p className="text-gray-700">
              All vehicles undergo regular maintenance and safety inspections. Equipped with modern safety features 
              for your protection.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Sparkles className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Comfort</h3>
            <p className="text-gray-700">
              Air-conditioned vehicles with comfortable seating, ample legroom, and storage space for your luggage.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Always Clean</h3>
            <p className="text-gray-700">
              Every vehicle is thoroughly cleaned and sanitized before each tour. We maintain the highest standards 
              of cleanliness.
            </p>
          </div>
        </div>

        {/* Our Fleet */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Premium Fleet</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow">
              <Car className="w-10 h-10 text-red-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sedans & SUVs</h4>
              <p className="text-gray-700 mb-4">
                Perfect for individuals, couples, or small families (1-4 passengers). Ideal for city tours and 
                day trips with comfortable seating and ample trunk space.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Toyota Camry, Honda Accord</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Lexus RX, Toyota Highlander</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Premium leather seats</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <Users className="w-10 h-10 text-red-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Vans & Minibuses</h4>
              <p className="text-gray-700 mb-4">
                Great for larger families and groups (5-15 passengers). Spacious interiors with extra storage for 
                luggage and equipment.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Toyota Hiace, Nissan Caravan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Mercedes-Benz Sprinter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Reclining seats, USB charging</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <Truck className="w-10 h-10 text-red-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Luxury Coaches</h4>
              <p className="text-gray-700 mb-4">
                For large groups and special events (16-45 passengers). Maximum comfort with premium amenities 
                for long journeys.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Modern tour buses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Onboard restroom (select models)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>WiFi, entertainment systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <Sparkles className="w-10 h-10 text-red-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Special Vehicles</h4>
              <p className="text-gray-700 mb-4">
                Unique transportation options for memorable experiences—including luxury cars and traditional 
                vehicles for special occasions.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Luxury sedans (BMW, Audi)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Accessible vehicles available</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Custom requests welcome</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vehicle Amenities */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Standard Amenities in All Vehicles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Air Conditioning</h4>
                <p className="text-gray-600 text-sm">Climate control for year-round comfort</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">GPS Navigation</h4>
                <p className="text-gray-600 text-sm">Always on the best route</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">WiFi Hotspot</h4>
                <p className="text-gray-600 text-sm">Stay connected on the go</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Bottled Water</h4>
                <p className="text-gray-600 text-sm">Complimentary refreshments</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">USB Charging Ports</h4>
                <p className="text-gray-600 text-sm">Keep devices powered</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Child Safety Seats</h4>
                <p className="text-gray-600 text-sm">Available upon request</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Safety Standards</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 flex items-start">
              <Shield className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Regular Maintenance</h4>
                <p className="text-gray-700">
                  All vehicles undergo scheduled maintenance checks and are inspected before every tour to ensure 
                  optimal performance and safety.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 flex items-start">
              <Shield className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Licensed & Insured</h4>
                <p className="text-gray-700">
                  All our vehicles are fully licensed, registered, and insured with comprehensive coverage for 
                  passengers and property.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 flex items-start">
              <Shield className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Professional Drivers</h4>
                <p className="text-gray-700">
                  Our drivers are experienced professionals with clean driving records and extensive knowledge of 
                  Japan's roads and traffic regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Travel in Comfort?</h2>
          <p className="text-xl mb-8 text-white/90">
            Book your tour today and experience the difference of reliable, comfortable transportation!
          </p>
          <Link
            to="/tours"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            View Available Tours
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ReliableTransportationPage;
