import React from 'react';
import { motion } from 'framer-motion';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className="relative bg-indigo-900 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/68289/road-travel-distance-landscape-68289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
        }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Travel with comfort & reliability
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Find and book bus tickets for your journey across India. Comfortable rides, affordable prices.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-indigo-100">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                  <span className="font-bold text-white">10K+</span>
                </div>
                <span>Daily Trips</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center mr-2">
                  <span className="font-bold text-white">2M+</span>
                </div>
                <span>Happy Customers</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
                  <span className="font-bold text-white">500+</span>
                </div>
                <span>Bus Partners</span>
              </div>
            </div>
          </motion.div>
          
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;