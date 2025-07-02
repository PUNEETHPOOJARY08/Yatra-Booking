import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const PassengerForm = ({ onProceed }) => {
  const { passengerDetails, setPassengerDetails } = useBookingContext();
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!passengerDetails.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!passengerDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(passengerDetails.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!passengerDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(passengerDetails.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    
    if (!passengerDetails.address) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onProceed();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-4 md:p-6"
    >
      <h2 className="text-lg font-bold mb-6">Passenger Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={passengerDetails.name}
            onChange={handleChange}
            required
            error={errors.name}
            icon={<User size={18} />}
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={passengerDetails.email}
            onChange={handleChange}
            required
            error={errors.email}
            icon={<Mail size={18} />}
          />
          
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="Enter your 10-digit phone number"
            value={passengerDetails.phone}
            onChange={handleChange}
            required
            error={errors.phone}
            icon={<Phone size={18} />}
          />
          
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-500">
                <MapPin size={18} />
              </div>
              <textarea
                name="address"
                rows="3"
                className={`block w-full pl-10 pr-3 py-2 rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your address"
                value={passengerDetails.address}
                onChange={handleChange}
              />
            </div>
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
        </div>
        
        <div className="mt-8">
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Continue to Payment
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PassengerForm;