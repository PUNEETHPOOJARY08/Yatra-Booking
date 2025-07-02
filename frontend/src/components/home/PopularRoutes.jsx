import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import { today } from '../../data/mockData';

const popularRoutes = [
  { from: 'Mumbai', to: 'Pune' },
  { from: 'Delhi', to: 'Jaipur' },
  { from: 'Bangalore', to: 'Chennai' },
  { from: 'Hyderabad', to: 'Bangalore' },
  { from: 'Ahmedabad', to: 'Mumbai' },
  { from: 'Kolkata', to: 'Patna' }
];

const PopularRoutes = () => {
  const { setSearchParams } = useBookingContext();
  const navigate = useNavigate();
  
  const handleSelectRoute = (from, to) => {
    setSearchParams({
      source: from,
      destination: to,
      date: today
    });
    
    navigate('/buses');
  };
  
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Popular Routes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularRoutes.map((route, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSelectRoute(route.from, route.to)}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-lg">{route.from}</div>
              <ArrowRight className="text-indigo-600 mx-2" size={18} />
              <div className="font-medium text-lg">{route.to}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">Starting from ₹499</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;