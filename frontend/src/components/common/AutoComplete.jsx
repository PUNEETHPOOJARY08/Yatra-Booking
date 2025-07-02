import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import clsx from 'clsx';

const AutoComplete = ({
  label,
  placeholder,
  value,
  onChange,
  fieldName,
  required = false,
  error = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const { filterLocations } = useBookingContext();
  const wrapperRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length > 1) {
      const filteredLocations = filterLocations(value);
      setSuggestions(filteredLocations);
      setIsOpen(filteredLocations.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };
  
  const handleSelectLocation = (location) => {
    setInputValue(location.name);
    onChange({ target: { name: fieldName, value: location.name } });
    setIsOpen(false);
  };
  
  return (
    <div className="mb-4" ref={wrapperRef}>
      {label && (
        <label className="block font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <MapPin size={18} />
        </div>
        <input
          type="text"
          className={clsx(
            "block w-full pl-10 pr-3 py-2 rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            error ? "border-red-500" : "border-gray-300"
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue.length > 1 && setSuggestions(filterLocations(inputValue)) && setIsOpen(true)}
        />
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md max-h-60 overflow-auto"
          >
            <ul className="py-1">
              {suggestions.map((location) => (
                <motion.li
                  key={location.id}
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectLocation(location)}
                >
                  <div className="flex items-start">
                    <MapPin size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.state}</div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoComplete;