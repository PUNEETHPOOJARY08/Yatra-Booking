import React from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import Button from '../common/Button';

const SeatDetails = ({ onProceed }) => {
  const { selectedBus, selectedSeats, calculateTotalFare } = useBookingContext();
  
  if (!selectedBus) return null;
  
  const totalFare = calculateTotalFare();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <h2 className="text-lg font-bold mb-4">Booking Details</h2>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600">Bus Name</div>
        <div className="font-medium">{selectedBus.name}</div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600">Bus Type</div>
        <div className="font-medium">{selectedBus.type}</div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600">Journey Time</div>
        <div className="font-medium">{selectedBus.departureTime} - {selectedBus.arrivalTime}</div>
        <div className="text-sm text-gray-500">Duration: {selectedBus.duration}</div>
      </div>
      
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="text-sm text-gray-600">Selected Seats</div>
        {selectedSeats.length === 0 ? (
          <div className="text-amber-600 italic">No seats selected</div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedSeats.map(seat => (
              <div 
                key={seat.id} 
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm"
              >
                Seat {seat.number}
                <span className="text-xs text-gray-600 ml-1">
                  ({seat.deck === 'upper' ? 'U' : 'L'})
                </span>
                <span className="ml-1 font-medium">₹{seat.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Base Fare</div>
          <div className="text-sm">₹{selectedBus.fare}</div>
        </div>
        
        {selectedSeats.some(seat => seat.type === 'window') && (
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm">Window Seat Charge</div>
            <div className="text-sm">₹100 per seat</div>
          </div>
        )}
        
        {selectedSeats.some(seat => seat.deck === 'upper') && (
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm">Upper Deck Charge</div>
            <div className="text-sm">₹50 per seat</div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">GST (5%)</div>
          <div className="text-sm">₹{Math.round(totalFare * 0.05)}</div>
        </div>
        
        <div className="flex justify-between items-center font-bold text-indigo-900 mt-4 pt-4 border-t border-gray-200">
          <div>Total Amount</div>
          <div>₹{totalFare + Math.round(totalFare * 0.05)}</div>
        </div>
      </div>
      
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onProceed}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Passenger Details
      </Button>
    </motion.div>
  );
};

export default SeatDetails;