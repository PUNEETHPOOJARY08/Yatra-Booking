import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBookingContext } from '../context/BookingContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BusCard from '../components/buses/BusCard';
import Filters from '../components/buses/Filters';
import { ArrowLeftCircle, CalendarDays, MapPin } from 'lucide-react';

const BusList = () => {
  const { searchParams, selectBus, searchBuses, nextStep } = useBookingContext();
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!searchParams.source || !searchParams.destination || !searchParams.date) {
      navigate('/');
      return;
    }
    
    const fetchedBuses = searchBuses();
    setBuses(fetchedBuses);
    setFilteredBuses(fetchedBuses);
  }, [searchParams, navigate, searchBuses]);
  
  const handleSelectBus = (busId) => {
    selectBus(busId);
    nextStep();
    navigate('/select-seats');
  };
  
  const handleApplyFilters = (filters) => {
    let filtered = [...buses];
    
    // Filter by bus type
    if (filters.busType.length > 0) {
      filtered = filtered.filter(bus => {
        // Handle partial matches (e.g., "AC" should match "AC Sleeper")
        return filters.busType.some(type => bus.type.includes(type));
      });
    }
    
    // Filter by departure time
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter(bus => {
        const hour = parseInt(bus.departureTime.split(':')[0]);
        
        if (filters.departureTime.includes('morning') && hour >= 6 && hour < 12) {
          return true;
        }
        
        if (filters.departureTime.includes('afternoon') && hour >= 12 && hour < 16) {
          return true;
        }
        
        if (filters.departureTime.includes('evening') && hour >= 16 && hour < 20) {
          return true;
        }
        
        if (filters.departureTime.includes('night') && (hour >= 20 || hour < 6)) {
          return true;
        }
        
        return false;
      });
    }
    
    // Filter by price range
    if (filters.priceRange[1] < 2000) {
      filtered = filtered.filter(bus => bus.fare <= filters.priceRange[1]);
    }
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(bus => 
        filters.amenities.every(amenity => bus.amenities.includes(amenity))
      );
    }
    
    setFilteredBuses(filtered);
  };
  
  const goBack = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <button 
              onClick={goBack}
              className="flex items-center text-indigo-900 hover:text-indigo-700"
            >
              <ArrowLeftCircle className="mr-2" size={20} />
              <span>Back to search</span>
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center">
                <MapPin size={20} className="text-indigo-900 mr-2" />
                <div>
                  <strong className="text-lg">{searchParams.source}</strong>
                  <span className="mx-2 text-gray-400">to</span>
                  <strong className="text-lg">{searchParams.destination}</strong>
                </div>
              </div>
              
              <div className="flex items-center">
                <CalendarDays size={20} className="text-indigo-900 mr-2" />
                <div>
                  <span className="text-gray-600 mr-2">Date:</span>
                  <strong>{searchParams.date}</strong>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Filters onApplyFilters={handleApplyFilters} />
            </div>
            
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {filteredBuses.length} {filteredBuses.length === 1 ? 'Bus' : 'Buses'} found
                  </h2>
                </div>
                
                {filteredBuses.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-xl font-medium text-gray-600 mb-2">No buses found</div>
                    <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                  </div>
                ) : (
                  <div>
                    {filteredBuses.map(bus => (
                      <BusCard 
                        key={bus.id} 
                        bus={bus} 
                        onSelect={handleSelectBus}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusList;