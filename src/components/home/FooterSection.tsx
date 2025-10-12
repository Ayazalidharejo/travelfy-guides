import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  Clock,
  Headphones
} from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1E3A8A' }} className="text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-5">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors text-sm">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-5">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/help" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner With Us */}
          <div>
            <h3 className="text-lg font-bold mb-5">Partner With Us</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/partner/become" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link to="/partner/join" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Join as a Guide
                </Link>
              </li>
              <li>
                <Link to="/partner/login" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Partner Login
                </Link>
              </li>
              <li>
                <Link to="/partner/guidelines" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Get Listed - Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-bold mb-5">Explore</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/tours" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Product Features
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Class Stories
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/customer-reviews" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 pt-6">
          {/* Follow Us - Social Media Icons */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Follow us</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-2.5 rounded-lg transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Row - Copyright, Links, Language */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Left - Copyright */}
            <div className="text-blue-200">
              © {currentYear} TripAdora. All rights reserved.
            </div>

            {/* Middle - Quick Links with Icons */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link to="/secure-booking" className="text-blue-200 hover:text-white flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Secure Booking
              </Link>
              <Link to="/awards" className="text-blue-200 hover:text-white flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                Your Travels
              </Link>
              <Link to="/support" className="text-blue-200 hover:text-white flex items-center gap-1.5">
                <Headphones className="h-3.5 w-3.5" />
                +1-800-Travel
              </Link>
              <Link to="/support-hours" className="text-blue-200 hover:text-white flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                24/7 Support
              </Link>
            </div>

            {/* Right - Language Selector */}
            <div>
              <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <span>🌐</span>
                <span>English</span>
              </button>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
              <span>💵</span>
              <span>USD - US Dollar</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

