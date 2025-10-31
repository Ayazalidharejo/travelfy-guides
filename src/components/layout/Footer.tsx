import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Linkedin } from "lucide-react";  
import { FaTiktok } from "react-icons/fa";  
const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
<div className="space-y-4">
      <Link to="/" className="flex items-center space-x-2">
        <MapPin className="h-8 w-8 text-[#307172]" />
        <span className="text-2xl font-bold bg-gradient-to-r from-[#307172] to-[#204f4f] bg-clip-text text-transparent">
          Karvaan Tours
        </span>
      </Link>

      <p className="text-muted-foreground">
        Discover amazing destinations and create unforgettable memories with our curated travel experiences.
      </p>

      <div className="flex space-x-4">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61582604152338"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <Facebook className="h-5 w-5" />
        </a>

        {/* Twitter */}
        <a
          href="https://x.com/karvaan_tours"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <Twitter className="h-5 w-5" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/karvaantours/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <Instagram className="h-5 w-5" />
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/channel/UC1SNJP176cWvb2ac38fnpPg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <Youtube className="h-5 w-5" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/karvaan-tours-japan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <Linkedin className="h-5 w-5" />
        </a>

        {/* TikTok (Fixed SVG) */}
        <a
          href="https://www.tiktok.com/@karvaan_tours?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4C9684] hover:text-[#166955] transition-smooth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M224 80a48 48 0 0 1-48-48h-32v136a40 40 0 1 1-40-40v-32a72 72 0 1 0 72 72V93.25A79.45 79.45 0 0 0 224 96Z" />
          </svg>
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
  <Mail className="h-5 w-5 text-[#4C9684] hover:text-[#166955]" />
  <a 
    href="mailto:info@karvaantours.com"
    className="text-muted-foreground hover:text-[#166955] hover:underline cursor-pointer"
  >
    info@karvaantours.com
  </a>
</div>
<div className="flex items-center space-x-3">
  <Phone className="h-5 w-5 text-[#4C9684] hover:text-[#166955]" />
  <a 
    href="https://wa.me/818074801156"
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-[#166955] hover:underline cursor-pointer"
  >
    +81 80-7480-1156
  </a>
</div>
            <div className="flex items-center space-x-3">
  {/* Direct SVG use karein */}
  <svg 
    className="h-5 w-6 text-[#4C9684] hover:text-[#166955] flex-shrink-0"
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
  <a 
    href="https://www.google.com/maps/search/?api=1&query=2nd+Floor,+Sotoike+Shukugo+Building,+Utsunomiya+City,+Tochigi"
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-[#166955] hover:underline cursor-pointer"
  >
    2nd Floor, Sotoike Shukugo Building, Utsunomiya City, Tochigi.
  </a>
</div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
         <p> ©  2025 Karvaan Tours Powered by <b>Ebadah Group Co. Ltd</b>  Japan
           

          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;