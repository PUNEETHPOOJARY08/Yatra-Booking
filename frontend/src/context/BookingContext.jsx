import React, { createContext, useContext, useState, useEffect } from 'react';
import { popularLocations, mockBuses, generateSeats } from '../data/mockData';

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    date: ''
  });

  const [selectedBus, setSelectedBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Persist bookingDetails in localStorage
  const [bookingDetails, setBookingDetailsState] = useState(() => {
    const stored = localStorage.getItem('bookingDetails');
    return stored ? JSON.parse(stored) : null;
  });

  // Save bookingDetails to localStorage whenever it changes
  useEffect(() => {
    if (bookingDetails) {
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    } else {
      localStorage.removeItem('bookingDetails');
    }
  }, [bookingDetails]);

  const setBookingDetails = (details) => {
    setBookingDetailsState(details);
  };

  const [currentStep, setCurrentStep] = useState(1);

  // Search for buses
  const searchBuses = () => mockBuses;

  // Select a bus
  const selectBus = (busId) => {
    const bus = mockBuses.find(bus => bus.id === busId);
    setSelectedBus(bus);
    const generatedSeats = generateSeats(busId);
    setSeats(generatedSeats);
    setSelectedSeats([]);
  };

  // Toggle seat selection
  const toggleSeatSelection = (seatId) => {
    const seat = seats.find(seat => seat.id === seatId);
    if (!seat || !seat.isAvailable) return;
    if (selectedSeats.some(s => s.id === seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Calculate total fare
  const calculateTotalFare = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  // Complete booking
  const completeBooking = () => {
    const bookingId = Math.random().toString(36).substr(2, 9);
    const booking = {
      id: bookingId,
      busId: selectedBus.id,
      busName: selectedBus.name,
      seats: selectedSeats.map(seat => seat.number),
      totalFare: calculateTotalFare(),
      passengerName: passengerDetails.name,
      passengerEmail: passengerDetails.email,
      passengerPhone: passengerDetails.phone,
      passengerAddress: passengerDetails.address,
      bookingDate: new Date().toISOString(),
      journeyDate: searchParams.date,
      source: searchParams.source,
      destination: searchParams.destination
    };
    setBookingDetails(booking);
    return booking;
  };

  // Handle next/previous step
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  // Filter locations based on input
  const filterLocations = (input) => {
    if (!input) return [];
    return popularLocations.filter(location =>
      location.name.toLowerCase().includes(input.toLowerCase()) ||
      location.state.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Clear booking details after confirmation
  const clearBookingDetails = () => {
    setBookingDetailsState(null);
    localStorage.removeItem('bookingDetails');
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        selectedBus,
        setSelectedBus,
        seats,
        setSeats,
        selectedSeats,
        setSelectedSeats,
        toggleSeatSelection,
        passengerDetails,
        setPassengerDetails,
        calculateTotalFare,
        completeBooking,
        bookingDetails,
        setBookingDetails,
        clearBookingDetails,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        searchBuses,
        filterLocations,
        selectBus
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};