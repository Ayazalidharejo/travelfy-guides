import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-[#307172]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#307172] to-[#204f4f]  bg-clip-text text-transparent">
                Karvaan Tours
              </span>
            </Link>
            <p className="text-muted-foreground">
              Discover amazing destinations and create unforgettable memories with our curated travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/tours" className="block text-muted-foreground hover:text-primary transition-smooth">
                Tours
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-smooth">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-smooth">
                Contact
              </Link>
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-smooth">
                Help and Support
              </Link>
             
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </Link>
              <Link to="/cancellation-policy" className="block text-muted-foreground hover:text-primary transition-smooth">
                Cancellation Policy
              </Link>
              <Link to="/refund-policy" className="block text-muted-foreground hover:text-primary transition-smooth">
                Refund Policy
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-smooth">
                FAQ
              </Link>
              
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@karvaantours.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+81 80-7480-1156</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">2nd Floor, Sotoike Shukugo Building, Utsunomiya City, Tochigi.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Karvaan Tours. All rights reserved. | 
            {/* <Link to="/privacy" className="hover:text-primary transition-smooth ml-1">Privacy Policy</Link> |  */}
            {/* <Link to="/terms" className="hover:text-primary transition-smooth ml-1">Terms of Service</Link> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;