import React from "react";
import { Clock, Shield, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FreeCancellationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#000] to-[#5C7AC0] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Clock className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            24 Hours Free Cancellation
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Book with confidence—plans change, and we understand
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Travel Without Worry</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We know that travel plans can change unexpectedly. That's why we offer a hassle-free 24-hour 
            cancellation policy on all our tours. Book with confidence knowing that you have the flexibility 
            to adjust your plans if needed.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Karvaan Tours, your peace of mind is our priority. We want you to feel secure in your booking 
            decision, without the stress of being locked into plans that might not work out.
          </p>
        </section>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Refund</h3>
            <p className="text-gray-700">
              Cancel up to 24 hours before your tour and receive a full refund. No hidden fees, no questions asked.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <RefreshCw className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Process</h3>
            <p className="text-gray-700">
              Cancellation is simple—just a few clicks in your account or a quick message to our support team.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Confirmation</h3>
            <p className="text-gray-700">
              Receive immediate confirmation of your cancellation and refund processing.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Cancellation Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start bg-white rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Log Into Your Account
                </h4>
                <p className="text-gray-700">
                  Access your booking dashboard through your Karvaan Tours account.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-white rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Select Your Booking
                </h4>
                <p className="text-gray-700">
                  Find the tour you wish to cancel and click on "Cancel Booking."
                </p>
              </div>
            </div>

            <div className="flex items-start bg-white rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm Cancellation
                </h4>
                <p className="text-gray-700">
                  Review the cancellation details and confirm. You'll receive instant confirmation via email.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-white rounded-lg p-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Receive Your Refund
                </h4>
                <p className="text-gray-700">
                  Your refund will be processed within 3-5 business days to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-start mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Information</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Free cancellation applies up to 24 hours before tour start time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Full refund is issued to the original payment method</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Cancellations within 2-3 days may incur charges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Weather-related cancellations are handled case by case</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>You can also reschedule your tour instead of canceling</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">What if I cancel within 2-3 days of the tour?</h4>
              <p className="text-gray-700">
                Cancellations within 2-3 days of the scheduled tour time may incur a 50% cancellation fee. 
                We recommend canceling as early as possible to receive a full refund.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">Can I reschedule instead of canceling?</h4>
              <p className="text-gray-700">
                Absolutely! You can reschedule your tour to a different date at no additional charge if done 
                at least 24 hours in advance.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">How long does the refund take?</h4>
              <p className="text-gray-700">
                Refunds are typically processed within 3-5 business days. Depending on your bank or credit card 
                company, it may take an additional few days to appear in your account.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">What if there's bad weather?</h4>
              <p className="text-gray-700">
                In case of severe weather conditions that make the tour unsafe, we'll contact you to offer a 
                full refund or reschedule at no charge.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Risk-Free?</h2>
          <p className="text-xl mb-8 text-white/90">
            Book your tour today with confidence knowing you have flexible cancellation options!
          </p>
          <Link
            to="/tours"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Browse Tours
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FreeCancellationPage;
