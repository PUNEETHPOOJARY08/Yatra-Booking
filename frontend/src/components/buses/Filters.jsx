import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../common/Button';

const Filters = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    busType: [],
    departureTime: [],
    priceRange: [0, 2000],
    amenities: []
  });
  
  const busTypes = ['AC', 'Non-AC', 'Sleeper', 'Luxury'];
  const departureTimeRanges = [
    { label: 'Morning (6 AM - 12 PM)', value: 'morning' },
    { label: 'Afternoon (12 PM - 4 PM)', value: 'afternoon' },
    { label: 'Evening (4 PM - 8 PM)', value: 'evening' },
    { label: 'Night (8 PM - 6 AM)', value: 'night' }
  ];
  const amenitiesList = ['WiFi', 'Charging Point', 'Water Bottle', 'Snacks', 'Blanket', 'TV'];
  
  const handleBusTypeChange = (type) => {
    setFilters(prev => {
      const updatedTypes = prev.busType.includes(type)
        ? prev.busType.filter(t => t !== type)
        : [...prev.busType, type];
      
      return { ...prev, busType: updatedTypes };
    });
  };
  
  const handleDepartureTimeChange = (time) => {
    setFilters(prev => {
      const updatedTimes = prev.departureTime.includes(time)
        ? prev.departureTime.filter(t => t !== time)
        : [...prev.departureTime, time];
      
      return { ...prev, departureTime: updatedTimes };
    });
  };
  
  const handleAmenityChange = (amenity) => {
    setFilters(prev => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return { ...prev, amenities: updatedAmenities };
    });
  };
  
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [0, value]
    }));
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  
  const clearFilters = () => {
    setFilters({
      busType: [],
      departureTime: [],
      priceRange: [0, 2000],
      amenities: []
    });
    onApplyFilters({
      busType: [],
      departureTime: [],
      priceRange: [0, 2000],
      amenities: []
    });
  };
  
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => setIsOpen(true)}
          icon={<Filter size={18} />}
        >
          Filters
        </Button>
      </div>
      
      {/* Mobile Filter Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-50 md:hidden overflow-auto"
        >
          <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Filter content */}
            {renderFilterContent()}
          </div>
          
          <div className="p-4 border-t sticky bottom-0 bg-white z-10 flex space-x-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear All
            </Button>
            <Button variant="primary" onClick={handleApplyFilters} fullWidth>
              Apply Filters
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Desktop Filter Panel */}
      <div className="hidden md:block sticky top-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Clear All
            </button>
          </div>
          
          {renderFilterContent()}
          
          <div className="mt-6">
            <Button
              variant="primary"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
  
  function renderFilterContent() {
    return (
      <>
        <FilterSection title="Bus Type">
          <div className="space-y-2">
            {busTypes.map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  checked={filters.busType.includes(type)}
                  onChange={() => handleBusTypeChange(type)}
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        <FilterSection title="Departure Time">
          <div className="space-y-2">
            {departureTimeRanges.map((time) => (
              <label key={time.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  checked={filters.departureTime.includes(time.value)}
                  onChange={() => handleDepartureTimeChange(time.value)}
                />
                <span className="ml-2 text-gray-700">{time.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
        
        <FilterSection title={`Price Range (₹0 - ₹${filters.priceRange[1]})`}>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹0</span>
            <span>₹500</span>
            <span>₹1000</span>
            <span>₹1500</span>
            <span>₹2000</span>
          </div>
        </FilterSection>
        
        <FilterSection title="Amenities">
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                />
                <span className="ml-2 text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </>
    );
  }
};

const FilterSection = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full text-left font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        {isExpanded ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </button>
      
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default Filters;