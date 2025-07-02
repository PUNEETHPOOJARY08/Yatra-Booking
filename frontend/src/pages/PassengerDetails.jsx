import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../context/BookingContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PassengerForm from '../components/passengerDetails/PassengerForm';
import SeatDetails from '../components/seatSelection/SeatDetails';

const PassengerDetails = () => {
  const { selectedBus, selectedSeats } = useBookingContext();
  const navigate = useNavigate();
  
  // Redirect if no bus or seats are selected
  React.useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      navigate('/buses');
    }
  }, [selectedBus, selectedSeats, navigate]);
  
  const handleProceed = () => {
    // Go to payment page before confirmation
    navigate('/payment');
  };
  const { setCurrentStep } = useBookingContext();
  React.useEffect(() => {
  setCurrentStep(4); 
}, [setCurrentStep]);
  if (!selectedBus || selectedSeats.length === 0) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PassengerForm onProceed={handleProceed} />
            </div>
            
            <div className="md:col-span-1">
              <SeatDetails />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PassengerDetails;