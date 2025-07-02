import React, { useEffect, useState } from 'react';
import { Bus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';

const Header = () => {
  const { currentStep } = useBookingContext();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const steps = [
    { number: 1, label: 'Search' },
    { number: 2, label: 'Select Bus' },
    { number: 3, label: 'Select Seats' },
    { number: 4, label: 'Passenger Details' },
    { number: 5, label: 'Confirmation' }
  ];
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <Bus className="h-8 w-8 text-indigo-900" />
            </motion.div>
            <span className="text-xl font-bold text-indigo-900">YatraBook</span>
          </Link>
          

<div className="hidden md:flex items-center space-x-4">
  <Link to="/" className="text-gray-700 hover:text-indigo-900">Home</Link>
  <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-900">My Bookings</Link>
  <Link to="#" className="text-gray-700 hover:text-indigo-900">Help</Link>
  {!user ? (
    <>
      <Link to="/login" className="text-gray-700 hover:text-indigo-900">Login</Link>
      <Link to="/register" className="text-gray-700 hover:text-indigo-900">Register</Link>
    </>
  ) : (
    <>
      <span className="text-indigo-900 font-semibold">Hi, {user.name}</span>
      <button
        onClick={handleLogout}
        className="text-gray-700 hover:text-red-600 border px-3 py-1 rounded"
      >
        Logout
      </button>
    </>
  )}
</div>

        </div>
        
        {currentStep > 0 && (
          <div className="mt-4 mb-2">
            <div className="hidden md:flex justify-between items-center w-full">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className={`flex flex-col items-center ${
                    currentStep === step.number 
                      ? 'text-indigo-900' 
                      : currentStep > step.number 
                      ? 'text-teal-700' 
                      : 'text-gray-400'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-white mb-1 ${
                    currentStep === step.number 
                      ? 'bg-indigo-900' 
                      : currentStep > step.number 
                      ? 'bg-teal-700' 
                      : 'bg-gray-300'
                  }`}>
                    {step.number}
                  </div>
                  <span className="text-sm">{step.label}</span>
                </div>
              ))}
            </div>
            
            {/* Mobile step indicator */}
            <div className="flex md:hidden justify-between items-center">
              <span className="text-sm text-gray-600">Step {currentStep} of 5: {steps.find(s => s.number === currentStep)?.label}</span>
              <div className="w-1/2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-900 rounded-full" 
                  style={{ width: `${(currentStep / steps.length) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;