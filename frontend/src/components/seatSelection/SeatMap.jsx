import React from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import clsx from 'clsx';

const SeatMap = () => {
  const { seats, selectedSeats, toggleSeatSelection } = useBookingContext();
  
  const lowerDeckSeats = seats.filter(seat => seat.deck === 'lower');
  const upperDeckSeats = seats.filter(seat => seat.deck === 'upper');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Select Seats</h2>
      
      <div className="mb-4 flex items-center justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-gray-200 border border-gray-300"></div>
          <span className="ml-2 text-sm text-gray-600">Available</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-red-100 border border-red-300"></div>
          <span className="ml-2 text-sm text-gray-600">Booked</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-indigo-500 border border-indigo-600"></div>
          <span className="ml-2 text-sm text-gray-600">Selected</span>
        </div>
      </div>
      
      <div className="relative mb-6 pb-6 border-b border-gray-200">
        <div className="font-medium text-indigo-900 mb-3">Upper Deck</div>
        
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-5 mb-2 flex justify-end">
            <div className="bg-gray-600 text-white text-xs font-bold w-16 py-1 text-center rounded-sm">
              FRONT
            </div>
          </div>
          
          {renderSeatGrid(upperDeckSeats)}
        </div>
      </div>
      
      <div className="relative">
        <div className="font-medium text-indigo-900 mb-3">Lower Deck</div>
        
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-5 mb-2 flex justify-end">
            <div className="bg-gray-600 text-white text-xs font-bold w-16 py-1 text-center rounded-sm">
              FRONT
            </div>
          </div>
          
          {renderSeatGrid(lowerDeckSeats)}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-amber-50 rounded-md">
        <p className="text-amber-800 text-sm">
          <strong>Note:</strong> Window seats are priced ₹100 higher and upper deck seats are priced ₹50 higher than the base fare.
        </p>
      </div>
    </div>
  );
  
  function renderSeatGrid(deckSeats) {
    // Group seats by row
    const seatsByRow = {};
    deckSeats.forEach(seat => {
      const rowNum = Math.ceil(parseInt(seat.number) / 5);
      if (!seatsByRow[rowNum]) {
        seatsByRow[rowNum] = [];
      }
      seatsByRow[rowNum].push(seat);
    });
    
    // Sort rows
    const sortedRows = Object.keys(seatsByRow).sort((a, b) => parseInt(a) - parseInt(b));
    
    return sortedRows.map(rowNum => (
      <React.Fragment key={rowNum}>
        {seatsByRow[rowNum].map(seat => {
          const isSelected = selectedSeats.some(s => s.id === seat.id);
          
          return (
            <motion.div
              key={seat.id}
              whileHover={seat.isAvailable ? { scale: 1.05 } : {}}
              whileTap={seat.isAvailable ? { scale: 0.95 } : {}}
              onClick={() => seat.isAvailable && toggleSeatSelection(seat.id)}
              className={clsx(
                "relative cursor-pointer select-none flex flex-col items-center justify-center w-10 h-10 rounded-sm border",
                seat.isAvailable && !isSelected && "bg-gray-200 border-gray-300 hover:bg-gray-300",
                !seat.isAvailable && "bg-red-100 border-red-300 cursor-not-allowed",
                isSelected && "bg-indigo-500 border-indigo-600 text-white"
              )}
            >
              <span className="text-xs font-medium">{seat.number}</span>
              {seat.type === 'window' && (
                <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-blue-500" title="Window Seat"></span>
              )}
            </motion.div>
          );
        })}
      </React.Fragment>
    ));
  }
};

export default SeatMap;