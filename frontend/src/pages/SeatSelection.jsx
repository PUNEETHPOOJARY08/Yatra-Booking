import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../context/BookingContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SeatMap from '../components/seatSelection/SeatMap';
import SeatDetails from '../components/seatSelection/SeatDetails';

const SeatSelection = () => {
  const { selectedBus, nextStep } = useBookingContext();
  const navigate = useNavigate();
  
  // Redirect if no bus is selected
  React.useEffect(() => {
    if (!selectedBus) {
      navigate('/buses');
    }
  }, [selectedBus, navigate]);
  
  const handleProceed = () => {
    nextStep();
    navigate('/passenger-details');
  };
  const { setCurrentStep } = useBookingContext();

      React.useEffect(() => {
        setCurrentStep(3); // For Select Seats step
      }, [setCurrentStep]);
  if (!selectedBus) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SeatMap />
            </div>
            
            <div className="md:col-span-1">
              <SeatDetails onProceed={handleProceed} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeatSelection;