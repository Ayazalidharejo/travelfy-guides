import React from "react";
import { Link } from "react-router-dom";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar, 
  Phone,
  Mail,
  FileText,
  Info
} from "lucide-react";

const CancellationPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Cancellation Policy</h1>
          </div>
          <p className="text-xl text-center text-white/90">
            Clear and transparent cancellation terms for your peace of mind
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Last Updated */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
          <div className="flex items-center">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-sm text-blue-900">
              <strong>Last Updated:</strong> January 2025 | 
              <strong className="ml-2">Effective Date:</strong> January 1, 2025
            </p>
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At <strong className="text-red-600">Karvaan Tours</strong>, we understand that travel plans can change 
            unexpectedly. This Cancellation Policy outlines the terms and conditions for canceling your tour booking 
            with us. We strive to be fair and transparent while balancing the needs of our travelers and tour operations.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Please read this policy carefully before making a booking. By confirming your reservation, you agree to 
            these cancellation terms.
          </p>
        </section>

        {/* Cancellation Time Frames */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-8 h-8 text-red-600 mr-3" />
            Cancellation Time Frames & Charges
          </h2>
          
          <div className="space-y-6">
            {/* Free Cancellation */}
            <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    More than 24 Hours Before Tour Start Time
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong className="text-green-700">100% Refund</strong> - Full refund of your booking amount
                  </p>
                  <p className="text-gray-600">
                    Cancel free of charge with no questions asked. You will receive a full refund to your original 
                    payment method within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Partial Refund */}
            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    12-24 Hours Before Tour Start Time
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong className="text-yellow-700">50% Refund</strong> - Half of your booking amount will be refunded
                  </p>
                  <p className="text-gray-600">
                    Cancellations within this window incur a 50% cancellation fee to cover operational costs and 
                    commitments made to guides and drivers.
                  </p>
                </div>
              </div>
            </div>

            {/* No Refund */}
            <div className="border-l-4 border-red-600 bg-red-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Less than 12 Hours or No-Show
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong className="text-red-700">No Refund</strong> - Full payment is non-refundable
                  </p>
                  <p className="text-gray-600">
                    Last-minute cancellations or no-shows result in no refund as guides, drivers, and resources have 
                    already been allocated for your tour. We strongly encourage canceling as early as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Cancel */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Cancel Your Booking</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Online Cancellation</h4>
                  <p className="text-gray-700 mb-2">
                    Log into your <strong>Karvaan Tours</strong> account, navigate to "My Bookings," select the tour 
                    you wish to cancel, and click "Cancel Booking."
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Instant confirmation | ✓ Automatic refund processing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Email Cancellation</h4>
                  <p className="text-gray-700 mb-2">
                    Send a cancellation request to{" "}
                    <a href="mailto:info@karvaantours.com" className="text-red-600 font-semibold hover:underline">
                      info@karvaantours.com
                    </a>{" "}
                    with your booking reference number and reason for cancellation.
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Response Within 4-6 Hours | ✓ Confirmation email sent
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Phone Cancellation</h4>
                  <p className="text-gray-700 mb-2">
                    Call our customer support at{" "}
                    <a href="tel:+818074801156" className="text-red-600 font-semibold hover:underline">
                      +81 80-7480-1156
                    </a>{" "}
                    and speak with a representative (available 24/7).
                  </p>
                  <p className="text-sm text-gray-600">
                    ✓ Immediate assistance | ✓ Instant cancellation confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Circumstances */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Special Circumstances</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Weather-Related Cancellations</h4>
              <p className="text-gray-700">
                In case of severe weather conditions (typhoons, heavy snow, etc.) that make the tour unsafe or impossible, 
                we will offer you:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>Option 1:</strong> Full refund (100%)</li>
                <li><strong>Option 2:</strong> Reschedule to another date at no extra charge</li>
                <li><strong>Option 3:</strong> Tour credit valid for 12 months</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Medical Emergencies</h4>
              <p className="text-gray-700">
                If you need to cancel due to a medical emergency (with valid documentation), we will work with you 
                on a case-by-case basis to provide:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Flexible rescheduling options</li>
                <li>Partial or full refund consideration</li>
                <li>Extended tour credit validity</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                * Medical certificate or documentation may be required
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Force Majeure Events</h4>
              <p className="text-gray-700">
                In cases of natural disasters, pandemics, government restrictions, or other unforeseen events beyond 
                our control, we will provide full refunds or rescheduling options at no additional cost.
              </p>
            </div>
          </div>
        </section>

        {/* Rescheduling vs Cancellation */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Consider Rescheduling Instead</h2>
          <p className="text-lg text-gray-700 mb-6">
            Instead of canceling, you can reschedule your tour to a different date at no extra charge if done at 
            least 24 hours in advance. This allows you to keep your plans while avoiding cancellation fees.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-2" />
                Benefits of Rescheduling
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>No cancellation fees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Keep your original booking price</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Flexible date selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Subject to availability</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-3">How to Reschedule</h4>
              <p className="text-gray-700 mb-3">
                Contact us via email, phone, or through your account dashboard at least 24 hours before your 
                scheduled tour.
              </p>
              <p className="text-sm text-gray-600">
                Subject to tour availability. Peak season rescheduling may have limited dates.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Notes</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                <strong>Booking Reference Required:</strong> Always have your booking reference number ready when 
                contacting us for cancellations.
              </p>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                <strong>Group Bookings:</strong> For group bookings (10+ people), different cancellation terms may 
                apply. Please contact us directly.
              </p>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                <strong>Refund Processing Time:</strong> All approved refunds are processed within 3-5 business days. 
                Bank processing may take additional time.
              </p>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                <strong>Third-Party Bookings:</strong> If you booked through a third-party agency, please contact 
                them directly for cancellations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">Need Help with Cancellation?</h2>
            <p className="text-xl text-white/90 mb-8">
              Our customer support team is here to assist you 24/7
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Call Us</h4>
              <a href="tel:+818074801156" className="text-white hover:underline">
                +81 80-7480-1156
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Email Us</h4>
              <a href="mailto:info@karvaantours.com" className="text-white hover:underline">
                info@karvaantours.com
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Manage Booking</h4>
              <Link to="/bookings" className="text-white hover:underline">
                View My Bookings
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Related Policies:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/refund-policy" 
              className="text-red-600 font-semibold hover:underline"
            >
              Refund Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              to="/terms" 
              className="text-red-600 font-semibold hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              to="/privacy" 
              className="text-red-600 font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
