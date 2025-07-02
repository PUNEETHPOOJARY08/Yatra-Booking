import React from 'react';
import { Bus, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Bus className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">YatraBook</span>
            </div>
            <p className="text-indigo-200 mb-4">
              India's most trusted bus booking platform with the widest network coverage and best prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-amber-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Routes</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><Link to="#" className="hover:text-white">Mumbai to Pune</Link></li>
              <li><Link to="#" className="hover:text-white">Delhi to Jaipur</Link></li>
              <li><Link to="#" className="hover:text-white">Bangalore to Chennai</Link></li>
              <li><Link to="#" className="hover:text-white">Hyderabad to Bangalore</Link></li>
              <li><Link to="#" className="hover:text-white">Ahmedabad to Mumbai</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><Link to="#" className="hover:text-white">About Us</Link></li>
              <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-indigo-200">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>support@yatrabook.in</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>123, Tech Park, Electronic City<br />Bangalore, Karnataka 560100</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} YatraBook. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="Visa" className="h-6" />
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c533.png" alt="Mastercard" className="h-6" />
            <img src="https://logowik.com/content/uploads/images/upi-unified-payments-interface6241.jpg" alt="UPI" className="h-6" />
            <img src="https://logodownload.org/wp-content/uploads/2019/06/paytm-logo.png" alt="Paytm" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;