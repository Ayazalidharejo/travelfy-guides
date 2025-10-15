import React from "react";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  AlertCircle,
  TrendingUp,
  Info,
  Phone,
  Mail,
  FileText,
  Shield
} from "lucide-react";

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#000] to-[#5C7AC0] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
          </div>
          <p className="text-xl text-center text-white/90">
            Transparent refund terms and processing guidelines
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
            At <strong className="text-red-600">Karvaan Tours</strong>, we are committed to providing fair and 
            transparent refund processes. This Refund Policy explains how refunds are calculated, processed, and 
            issued when you cancel a tour booking with us.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            All refunds are subject to our{" "}
            <Link to="/cancellation-policy" className="text-red-600 font-semibold hover:underline">
              Cancellation Policy
            </Link>
            . Please ensure you understand both policies before making a booking.
          </p>
        </section>

        {/* Refund Eligibility */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            Refund Eligibility
          </h2>
          
          <div className="space-y-6">
            {/* Full Refund */}
            <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">100% Full Refund Eligible</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Cancellations made <strong>more than 24 hours</strong> before tour start time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Tour cancellation by Karvaan Tours due to operational reasons</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Severe weather conditions making the tour unsafe or impossible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Force majeure events (natural disasters, pandemics, government restrictions)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Tour not delivered as described or promised</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Partial Refund */}
            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <TrendingUp className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">50% Partial Refund Eligible</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Cancellations made <strong>12-24 hours</strong> before tour start time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Medical emergencies with valid documentation (case-by-case basis)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Special circumstances reviewed by our support team</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* No Refund */}
            <div className="border-l-4 border-red-600 bg-red-50 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Refund</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Cancellations made <strong>less than 12 hours</strong> before tour start time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>No-show or failure to arrive at the meeting point</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Voluntary departure during the tour</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Violation of tour rules or disruptive behavior</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Processing */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Refund Processing Timeline</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Cancellation Request Received</h4>
                  <p className="text-gray-700 mb-2">
                    Once your cancellation request is submitted, we will send you an immediate confirmation email 
                    with a cancellation reference number.
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏱️ <strong>Timeframe:</strong> Instant confirmation
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
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Refund Review & Approval</h4>
                  <p className="text-gray-700 mb-2">
                    Our team reviews your cancellation details and approves the refund amount based on our 
                    cancellation policy terms.
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏱️ <strong>Timeframe:</strong> within 2-3 days
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
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Refund Initiation</h4>
                  <p className="text-gray-700 mb-2">
                    Once approved, we initiate the refund to your original payment method. You will receive an 
                    email notification confirming the refund amount and expected arrival date.
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏱️ <strong>Timeframe:</strong> 5-7 business days from approval
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Bank/Card Processing</h4>
                  <p className="text-gray-700 mb-2">
                    Your bank or credit card company processes the refund. The exact time depends on your financial 
                    institution's processing times.
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏱️ <strong>Timeframe:</strong> 5-10 business days (varies by bank)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Total Expected Time:</strong> Most refunds are completed within 7-15 business days from 
              the cancellation request. International transactions may take slightly longer.
            </p>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-8 h-8 text-red-600 mr-3" />
            Refund Methods
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Credit/Debit Card</h4>
              <p className="text-gray-700 mb-3">
                Refunds are issued to the same card used for the original payment.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Processing time: 5-10 business days</li>
                <li>✓ Appears as credit on your statement</li>
                <li>✓ No additional fees</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Bank Transfer</h4>
              <p className="text-gray-700 mb-3">
                Direct refund to your bank account (if original payment was via bank transfer).
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Processing time: 3-7 business days</li>
                <li>✓ Same account as original payment</li>
                <li>✓ Bank may charge receiving fees</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">PayPal</h4>
              <p className="text-gray-700 mb-3">
                Refunds to PayPal accounts are processed quickly.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Processing time: 3-5 business days</li>
                <li>✓ Instant notification from PayPal</li>
                <li>✓ Same PayPal account used for booking</li>
              </ul>
            </div>


          </div>
        </section>

        {/* Special Cases */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Special Refund Cases</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-2" />
                Group Bookings
              </h4>
              <p className="text-gray-700">
                For group bookings (10+ people), refunds are calculated based on the number of cancellations and 
                timing. Partial group cancellations may affect the per-person rate. Please contact us directly for 
                group refund inquiries.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-2" />
                Multi-Day Tours
              </h4>
              <p className="text-gray-700">
                For multi-day tour packages, refunds are prorated based on the number of days completed. If you need 
                to leave early, unused portions may be eligible for partial refund (minus non-refundable expenses 
                like accommodation deposits).
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-2" />
                Add-on Services
              </h4>
              <p className="text-gray-700">
                Optional add-ons (meals, entrance fees, activities) purchased separately are refundable if canceled 
                24 hours in advance. Some third-party services may have different refund terms.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-6 h-6 text-purple-600 mr-2" />
                Promotional & Discounted Bookings
              </h4>
              <p className="text-gray-700">
                Tours booked with promotional codes or special discounts are subject to the same refund policy. 
                The refund amount will be based on the actual amount paid, not the original price.
              </p>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Currency Exchange Fluctuations</h4>
                <p className="text-gray-700">
                  If currency exchange rates have changed between booking and refund, the refund amount may differ 
                  slightly in your local currency.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Processing Fees</h4>
                <p className="text-gray-700">
                  Karvaan Tours does not charge any refund processing fees. However, your bank or payment provider 
                  may have their own transaction fees.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Refund Tracking</h4>
                <p className="text-gray-700">
                  You can track your refund status in your account dashboard under "My Bookings" or by contacting 
                  our support team with your cancellation reference number.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Dispute Resolution</h4>
                <p className="text-gray-700">
                  If you believe your refund was processed incorrectly, please contact us within 30 days with your 
                  booking details. We will investigate and resolve the issue promptly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-2">When will I receive my refund?</h4>
              <p className="text-gray-700">
                Most refunds are processed within 5-7 business days from approval. Bank processing adds another 
                5-10 days. Total time: 7-15 business days on average.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-2">Can I get a refund to a different payment method?</h4>
              <p className="text-gray-700">
                For security reasons, refunds must be issued to the original payment method used for booking. If 
                your card has expired, contact your bank—they will redirect the refund to your new card.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-2">What if I don't receive my refund?</h4>
              <p className="text-gray-700">
                First, check with your bank as processing times vary. If 15 business days have passed, contact us 
                at info@karvaantours.com with your booking reference, and we'll investigate immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h4 className="font-bold text-gray-900 mb-2">Is travel insurance refundable?</h4>
              <p className="text-gray-700">
                Travel insurance premiums are typically non-refundable once the policy is issued. However, you may 
                be able to claim cancellation costs through your insurance provider.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-[#000] to-[#5C7AC0] rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">Questions About Refunds?</h2>
            <p className="text-xl text-white/90 mb-8">
              Our customer support team is ready to help you with any refund inquiries
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Call Us 24/7</h4>
              <a href="tel:+818074801156" className="text-white hover:underline">
                +81 80-7480-1156
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Email Support</h4>
              <a href="mailto:info@karvaantours.com" className="text-white hover:underline">
                info@karvaantours.com
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Response Time</h4>
              <p className="text-white/90">Within 4-6 Hours</p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Related Policies:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/cancellation-policy" 
              className="text-red-600 font-semibold hover:underline"
            >
              Cancellation Policy
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

export default RefundPolicyPage;
