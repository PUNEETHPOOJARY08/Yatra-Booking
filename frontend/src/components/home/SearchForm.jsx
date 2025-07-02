import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import AutoComplete from '../common/AutoComplete';
import Button from '../common/Button';
import { today } from '../../data/mockData';

const SearchForm = () => {
  const { searchParams, setSearchParams } = useBookingContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!searchParams.source) {
      newErrors.source = 'Please enter a source city';
    }
    
    if (!searchParams.destination) {
      newErrors.destination = 'Please enter a destination city';
    }
    
    if (searchParams.source && searchParams.destination && 
        searchParams.source.toLowerCase() === searchParams.destination.toLowerCase()) {
      newErrors.destination = 'Source and destination cannot be the same';
    }
    
    if (!searchParams.date) {
      newErrors.date = 'Please select a journey date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/buses');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Book Bus Tickets</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AutoComplete
            label="From"
            placeholder="Enter source city"
            value={searchParams.source}
            onChange={handleChange}
            fieldName="source"
            required
            error={errors.source}
          />
          
          <div className="hidden md:flex items-center justify-center pt-6">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-gray-100 rounded-full p-2"
            >
              <ArrowRight className="text-indigo-900" size={20} />
            </motion.div>
          </div>
          
          <AutoComplete
            label="To"
            placeholder="Enter destination city"
            value={searchParams.destination}
            onChange={handleChange}
            fieldName="destination"
            required
            error={errors.destination}
          />
          
          <div className="md:col-span-3">
            <label className="block font-medium text-gray-700 mb-1">
              Journey Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Calendar size={18} />
              </div>
              <input
                type="date"
                name="date"
                className={`block w-full pl-10 pr-3 py-2 rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                min={today}
                value={searchParams.date}
                onChange={handleChange}
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth
            icon={<Search size={18} />}
          >
            Search Buses
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm;