import React from 'react';
import { Crown, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold">Royal Banquet</span>
            </div>
            <p className="text-blue-200 mb-4">
              Creating unforgettable moments for your special occasions. Our elegant banquet hall 
              provides the perfect setting for weddings, celebrations, and corporate events.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-400" />
                <span>info@royalbanquet.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span>123 Grand Avenue, City, State 12345</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-200 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="/services" className="text-blue-200 hover:text-yellow-400 transition-colors">Services</a></li>
              <li><a href="/pricing" className="text-blue-200 hover:text-yellow-400 transition-colors">Pricing</a></li>
              <li><a href="/booking" className="text-blue-200 hover:text-yellow-400 transition-colors">Book Now</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-blue-200">Weddings</span></li>
              <li><span className="text-blue-200">Corporate Events</span></li>
              <li><span className="text-blue-200">Birthday Parties</span></li>
              <li><span className="text-blue-200">Anniversaries</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200">© 2024 Royal Banquet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;