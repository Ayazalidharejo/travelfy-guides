import React from "react";
import { Star, Award, Users, Heart, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const TrustedTravelersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#000] to-[#5C7AC0] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Star className="w-20 h-20 mx-auto mb-6 fill-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by 1000+ Travelers
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Join thousands of satisfied travelers who chose Karvaan Tours
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            A Track Record You Can Trust
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Since our founding, Karvaan Tours has welcomed over 1,000 travelers from around the world to experience 
            the beauty and wonder of Japan. Our commitment to excellence, authenticity, and customer satisfaction 
            has earned us a reputation as one of the most trusted tour providers in Japan.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Don't just take our word for it—our travelers' reviews, repeat bookings, and recommendations speak 
            volumes about the unforgettable experiences we create.
          </p>
        </section>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-10 h-10 mx-auto mb-3" />
            <p className="text-4xl font-bold mb-2">1000+</p>
            <p className="text-white/90">Happy Travelers</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-lg p-6 text-center">
            <Star className="w-10 h-10 mx-auto mb-3 fill-white" />
            <p className="text-4xl font-bold mb-2">4.9/5</p>
            <p className="text-white/90">Average Rating</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-6 text-center">
            <Heart className="w-10 h-10 mx-auto mb-3 fill-white" />
            <p className="text-4xl font-bold mb-2">98%</p>
            <p className="text-white/90">Satisfaction Rate</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-6 text-center">
            <Globe className="w-10 h-10 mx-auto mb-3" />
            <p className="text-4xl font-bold mb-2">45+</p>
            <p className="text-white/90">Countries Served</p>
          </div>
        </div>

        {/* Why Travelers Trust Us */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Travelers Trust Us
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow flex items-start">
              <Award className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Proven Track Record
                </h4>
                <p className="text-gray-700">
                  Years of experience delivering exceptional tours with consistently high ratings. Our success 
                  stories span from solo adventurers to large family groups.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-start">
              <Heart className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Genuine Care
                </h4>
                <p className="text-gray-700">
                  We treat every traveler like family. Your happiness and safety are our top priorities, and 
                  we go the extra mile to ensure your journey exceeds expectations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-start">
              <Star className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Transparent Operations
                </h4>
                <p className="text-gray-700">
                  No hidden fees, no surprises. We believe in honest communication and clear pricing from 
                  booking to tour completion.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex items-start">
              <TrendingUp className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Continuous Improvement
                </h4>
                <p className="text-gray-700">
                  We actively seek feedback and constantly refine our services to better serve you. Your 
                  suggestions help us grow and improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Travelers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Absolutely amazing experience! The guide was knowledgeable, the driver was professional, and 
                everything was perfectly organized. Karvaan Tours made our Japan trip unforgettable!"
              </p>
              <p className="font-semibold text-gray-900">- Emily Johnson, USA</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Best tour company we've used! From booking to the final drop-off, everything was seamless. 
                The customized itinerary perfectly matched our interests. Highly recommend!"
              </p>
              <p className="font-semibold text-gray-900">- David Chen, Canada</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I've traveled with many tour companies, but Karvaan Tours stands out. The attention to detail, 
                the genuine hospitality, and the deep cultural insights made this more than just a tour."
              </p>
              <p className="font-semibold text-gray-900">- Sophie Martin, France</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Traveling with my elderly parents, I was worried about accessibility. Karvaan Tours handled 
                everything beautifully. They were patient, accommodating, and made sure everyone was comfortable."
              </p>
              <p className="font-semibold text-gray-900">- Raj Patel, India</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Worth every penny! The private tour was exactly what we wanted. No rushing, no crowds, just 
                an authentic Japanese experience with expert guidance. Already planning our next trip!"
              </p>
              <p className="font-semibold text-gray-900">- Maria Rodriguez, Spain</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The 24/7 support was a lifesaver when we needed to make last-minute changes. Quick responses, 
                helpful staff, and everything worked out perfectly. True professionals!"
              </p>
              <p className="font-semibold text-gray-900">- James Wilson, UK</p>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Awards & Recognition
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block bg-yellow-100 rounded-full p-6 mb-4">
                <Award className="w-12 h-12 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">TripAdvisor Certificate of Excellence</h4>
              <p className="text-gray-600">2023, 2024</p>
            </div>

            <div className="text-center">
              <div className="inline-block bg-red-100 rounded-full p-6 mb-4">
                <Star className="w-12 h-12 text-red-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Best Tour Operator Japan</h4>
              <p className="text-gray-600">Travel Awards 2024</p>
            </div>

            <div className="text-center">
              <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
                <Users className="w-12 h-12 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Choice Award</h4>
              <p className="text-gray-600">2024</p>
            </div>
          </div>
        </section>

        {/* Join Our Community */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Join Our Community of Happy Travelers
          </h2>
          <p className="text-center text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
            When you book with Karvaan Tours, you're not just booking a tour—you're joining a community of 
            travelers who have discovered the magic of Japan through our authentic, personalized experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📸</div>
              <h4 className="font-bold text-gray-900 mb-2">Share Your Stories</h4>
              <p className="text-gray-600 text-sm">
                Tag us on social media and become part of our traveler gallery
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-3">🎁</div>
              <h4 className="font-bold text-gray-900 mb-2">Loyalty Rewards</h4>
              <p className="text-gray-600 text-sm">
                Return travelers enjoy special discounts and exclusive benefits
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-bold text-gray-900 mb-2">Refer Friends</h4>
              <p className="text-gray-600 text-sm">
                Get rewards when you refer friends and family to Karvaan Tours
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Become Our Next Success Story?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied travelers and book your unforgettable Japanese adventure today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
            >
              Browse Tours
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrustedTravelersPage;
