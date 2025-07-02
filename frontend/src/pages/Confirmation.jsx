import React from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../context/BookingContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TicketDetails from '../components/confirmation/TicketDetails';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const { bookingDetails } = useBookingContext();

  // Debug: log bookingDetails to help diagnose issues
  console.log('Confirmation bookingDetails:', bookingDetails);

  const { setCurrentStep } = useBookingContext();
  React.useEffect(() => {
  setCurrentStep(5); // For Confirmation step
}, [setCurrentStep]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6 
            }}
            className="flex justify-center mb-8"
          >
            <div className="flex flex-col items-center">
              <CheckCircle className="w-20 h-20 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900 mt-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mt-2 text-center">
                Your bus tickets have been booked successfully. See your ticket details below.
              </p>
            </div>
          </motion.div>
          {bookingDetails ? (
            <TicketDetails />
          ) : (
            <div className="text-center text-red-500 font-semibold">
              No booking details found. Please make a booking first.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;