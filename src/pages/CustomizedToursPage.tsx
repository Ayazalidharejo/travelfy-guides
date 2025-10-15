import React from "react";
import { UserCheck, Heart, MapPinned, Calendar, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CustomizedToursPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#000] to-[#5C7AC0] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <UserCheck className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customized & Private Tours
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Your journey, your way—tailored to your dreams
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Experience Japan Your Way
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We understand that every traveler is unique, with different
            interests, preferences, and dreams. That's why we specialize in
            creating fully customized and private tours that are designed around
            YOU—not the other way around.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a history buff, a foodie, an adventure seeker, or
            someone looking for a peaceful retreat, we'll craft the perfect
            itinerary that matches your vision of the ideal Japanese experience.
          </p>
        </section>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              100% Personalized
            </h3>
            <p className="text-gray-700">
              Every detail is customized to match your interests, pace, and
              preferences. No cookie-cutter experiences here.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <UserCheck className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Private Experience
            </h3>
            <p className="text-gray-700">
              Enjoy your tour with just your group—no strangers, no waiting, no
              compromises. Just pure, intimate exploration.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Flexible Schedule
            </h3>
            <p className="text-gray-700">
              Start when you want, spend more time at your favorite spots, and
              adjust the plan on the go. Total flexibility.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Our Customization Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                  Tell Us Your Dreams
                </h4>
                <p className="text-gray-700 text-lg">
                  Share your interests, must-see destinations, preferred pace,
                  and any special requirements. The more we know, the better we
                  can design your perfect tour.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                  We Design Your Itinerary
                </h4>
                <p className="text-gray-700 text-lg">
                  Our expert team crafts a detailed, personalized itinerary
                  based on your preferences. We'll include insider tips and
                  hidden gems you won't find in guidebooks.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                  Review & Refine
                </h4>
                <p className="text-gray-700 text-lg">
                  We'll present your custom itinerary and work with you to make
                  any adjustments. Your feedback ensures everything is exactly
                  how you want it.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                  Enjoy Your Journey
                </h4>
                <p className="text-gray-700 text-lg">
                  Travel in comfort with your private guide and driver, knowing
                  that every moment has been designed just for you. Even during
                  the tour, we can adapt based on your preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Options */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What You Can Customize
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPinned className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Destinations & Attractions
                  </h4>
                  <p className="text-gray-700">
                    Choose your must-see spots and let us recommend hidden gems
                    based on your interests.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Duration & Timing
                  </h4>
                  <p className="text-gray-700">
                    From half-day tours to multi-day adventures, we accommodate
                    your schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Heart className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Activity Types
                  </h4>
                  <p className="text-gray-700">
                    Cultural experiences, outdoor adventures, culinary tours,
                    shopping—you name it!
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Pace & Style
                  </h4>
                  <p className="text-gray-700">
                    Prefer a relaxed pace or action-packed days? We match your
                    travel style perfectly.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Special Experiences
                  </h4>
                  <p className="text-gray-700">
                    Tea ceremonies, sake tasting, samurai experiences, or
                    traditional crafts.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <UserCheck className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Group Size & Composition
                  </h4>
                  <p className="text-gray-700">
                    Solo travelers, couples, families, or groups—we cater to
                    all.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPinned className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Accommodation & Meals
                  </h4>
                  <p className="text-gray-700">
                    We can arrange hotels, ryokans, and recommend restaurants
                    based on your taste.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Heart className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Special Requirements
                  </h4>
                  <p className="text-gray-700">
                    Accessibility needs, dietary restrictions, child-friendly
                    activities—all covered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Custom Tour Ideas */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Custom Tour Ideas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🍜 Culinary Adventure Tour
              </h4>
              <p className="text-gray-700">
                Explore Japan's food scene with visits to local markets, ramen
                workshops, sushi-making classes, and Michelin-starred
                restaurants.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                ⛩️ Cultural Heritage Tour
              </h4>
              <p className="text-gray-700">
                Dive deep into Japanese history with temple visits, traditional
                tea ceremonies, calligraphy sessions, and geisha districts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🏔️ Nature & Adventure Tour
              </h4>
              <p className="text-gray-700">
                Hike Mount Fuji, explore national parks, relax in hot springs,
                and experience Japan's stunning natural landscapes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                👨‍👩‍👧‍👦 Family-Friendly Tour
              </h4>
              <p className="text-gray-700">
                Kid-friendly activities, theme parks, interactive museums, and
                experiences that the whole family will love.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Design Your Perfect Japanese Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today and let's create a tour that's uniquely yours!
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
              View Sample Tours
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomizedToursPage;
