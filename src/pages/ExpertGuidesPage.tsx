import React from "react";
import { MapPin, Award, Users, Globe, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertGuidesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <MapPin className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Expert Guides & Best Drivers
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Experience Japan with professionals who know every corner
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Our Guides & Drivers Are the Best
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Karvaan Tours, we believe that the key to an unforgettable travel
            experience lies in the expertise and passion of our guides and
            drivers. Our team consists of carefully selected professionals who
            not only know Japan's roads and destinations but also understand its
            rich culture, history, and hidden gems.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each member of our team is dedicated to making your journey safe,
            comfortable, and filled with authentic experiences that you'll
            treasure forever.
          </p>
        </section>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Award className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Licensed & Certified Professionals
            </h3>
            <p className="text-gray-700 leading-relaxed">
              All our guides hold official tourism licenses and our drivers
              possess professional driving certifications. They undergo rigorous
              training and regular assessments to maintain the highest standards
              of service.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <BookOpen className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Deep Cultural Knowledge
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our guides are passionate storytellers who bring Japan's history
              and culture to life. From ancient temples to modern innovations,
              they provide insights that transform sightseeing into true
              understanding.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Users className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Multilingual Support
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Communication is key to a great experience. Our team speaks
              multiple languages including English, Japanese, Chinese, and more,
              ensuring clear communication throughout your journey.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Globe className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Local Expertise
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our drivers know every route, shortcut, and scenic path in Japan.
              They ensure smooth navigation while sharing local tips about the
              best restaurants, shops, and hidden spots along the way.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Makes Our Team Different
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Personalized Attention
                </h4>
                <p className="text-gray-700">
                  We match you with guides and drivers who understand your
                  interests and preferences, ensuring a customized experience
                  that exceeds expectations.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Safety First
                </h4>
                <p className="text-gray-700">
                  All our drivers maintain spotless safety records and our
                  vehicles undergo regular maintenance. Your safety is our top
                  priority on every journey.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Passionate About Service
                </h4>
                <p className="text-gray-700">
                  Our team doesn't just work—they love what they do. Their
                  enthusiasm and dedication shine through in every interaction,
                  making your trip truly memorable.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Continuous Training
                </h4>
                <p className="text-gray-700">
                  We invest in ongoing training programs to keep our team
                  updated on new destinations, customer service techniques, and
                  the latest travel trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Travelers Say About Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Our guide Takeshi was incredible! His knowledge of Japanese
                history and culture added so much depth to our tour. The driver
                was professional and made us feel safe throughout."
              </p>
              <p className="font-semibold text-gray-900">- Sarah M., USA</p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Best tour experience ever! Our driver knew all the shortcuts
                and best photo spots. The guide was friendly and answered all
                our questions with patience."
              </p>
              <p className="font-semibold text-gray-900">- Michael K., UK</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Japan with Expert Guidance?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your tour today and experience the difference that professional
            guides and drivers make!
          </p>
          <Link
            to="/tours"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Browse Our Tours
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ExpertGuidesPage;
