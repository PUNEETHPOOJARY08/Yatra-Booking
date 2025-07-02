import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import { useBookingContext } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const BusCard = ({ bus }) => {
  const { selectBus } = useBookingContext();
  const navigate = useNavigate();

  const amenityIcons = {
    'WiFi': '📶',
    'Charging Point': '🔌',
    'Water Bottle': '💧',
    'Snacks': '🍪',
    'Blanket': '🧣',
    'Reading Light': '💡',
    'Meal': '🍱',
    'Entertainment': '📺',
    'Beverage': '☕',
    'TV': '📺',
    'Pillow': '🛏️'
  };
  
  const handleViewSeats = () => {
    selectBus(bus.id); // Set selected bus in context
    navigate('/select-seats'); // Navigate to seat selection page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 p-4">
        <div className="col-span-1 md:col-span-2 mb-4 md:mb-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">{bus.name}</h3>
              <div className="text-sm text-gray-500">{bus.type}</div>
              
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm font-medium ml-1">{bus.rating}</span>
              </div>
            </div>
            
            {bus.availableSeats < 5 && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                Only {bus.availableSeats} seats left!
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {bus.amenities.slice(0, 5).map((amenity, index) => (
                <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs">
                  <span className="mr-1">{amenityIcons[amenity] || '✓'}</span>
                  {amenity}
                </div>
              ))}
              {bus.amenities.length > 5 && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs">
                  +{bus.amenities.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <div className="text-base font-semibold">{bus.departureTime}</div>
            <div className="flex-grow mx-2 border-t border-dashed border-gray-300"></div>
            <div className="text-base font-semibold">{bus.arrivalTime}</div>
          </div>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{bus.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-center md:items-end mt-4 md:mt-0">
          <div className="text-2xl font-bold text-indigo-900 mb-2">₹{bus.fare}</div>
          <div className="text-sm text-gray-500 mb-3">{bus.availableSeats} seats available</div>
          
          <Button 
            onClick={handleViewSeats}
            variant="primary"
          >
            View Seats
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BusCard;