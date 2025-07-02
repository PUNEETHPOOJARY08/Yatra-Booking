import { format, addDays } from 'date-fns';

export const popularLocations = [
  { id: '1', name: 'Mumbai', state: 'Maharashtra' },
  { id: '2', name: 'Delhi', state: 'Delhi' },
  { id: '3', name: 'Bangalore', state: 'Karnataka' },
  { id: '4', name: 'Hyderabad', state: 'Telangana' },
  { id: '5', name: 'Chennai', state: 'Tamil Nadu' },
  { id: '6', name: 'Kolkata', state: 'West Bengal' },
  { id: '7', name: 'Jaipur', state: 'Rajasthan' },
  { id: '8', name: 'Ahmedabad', state: 'Gujarat' },
  { id: '9', name: 'Pune', state: 'Maharashtra' },
  { id: '10', name: 'Surat', state: 'Gujarat' },
  { id: '11', name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: '12', name: 'Kanpur', state: 'Uttar Pradesh' },
  { id: '13', name: 'Nagpur', state: 'Maharashtra' },
  { id: '14', name: 'Indore', state: 'Madhya Pradesh' },
  { id: '15', name: 'Thane', state: 'Maharashtra' },
  { id: '16', name: 'Bhopal', state: 'Madhya Pradesh' },
  { id: '17', name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { id: '18', name: 'Patna', state: 'Bihar' },
  { id: '19', name: 'Vadodara', state: 'Gujarat' },
  { id: '20', name: 'Goa', state: 'Goa' }
];

export const mockBuses = [
  {
    id: '1',
    name: 'IndiGo Travels',
    type: 'AC Sleeper',
    departureTime: '21:00',
    arrivalTime: '06:30',
    duration: '9h 30m',
    fare: 1200,
    availableSeats: 23,
    totalSeats: 36,
    rating: 4.7,
    amenities: ['WiFi', 'Charging Point', 'Snacks', 'Water Bottle', 'Blanket', 'Reading Light']
  },
  {
    id: '2',
    name: 'Sharma Volvo Services',
    type: 'AC Seater',
    departureTime: '08:00',
    arrivalTime: '14:30',
    duration: '6h 30m',
    fare: 850,
    availableSeats: 18,
    totalSeats: 40,
    rating: 4.2,
    amenities: ['Charging Point', 'Water Bottle', 'TV']
  },
  {
    id: '3',
    name: 'Rajdhani Express',
    type: 'Non-AC',
    departureTime: '10:15',
    arrivalTime: '15:45',
    duration: '5h 30m',
    fare: 450,
    availableSeats: 32,
    totalSeats: 44,
    rating: 3.8,
    amenities: ['Water Bottle']
  },
  {
    id: '4',
    name: 'Royal Cruiser',
    type: 'Luxury AC',
    departureTime: '14:00',
    arrivalTime: '19:00',
    duration: '5h 00m',
    fare: 1800,
    availableSeats: 12,
    totalSeats: 22,
    rating: 4.9,
    amenities: ['WiFi', 'Charging Point', 'Snacks', 'Meal', 'Beverage', 'Entertainment', 'Blanket']
  },
  {
    id: '5',
    name: 'Himalayan Travels',
    type: 'AC Sleeper',
    departureTime: '23:00',
    arrivalTime: '06:00',
    duration: '7h 00m',
    fare: 1100,
    availableSeats: 18,
    totalSeats: 30,
    rating: 4.3,
    amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Reading Light']
  }
];

export const generateSeats = (busId) => {
  const seats = [];
  const bus = mockBuses.find(b => b.id === busId);
  
  if (!bus) return seats;
  
  const totalSeats = bus.totalSeats;
  const availableSeats = bus.availableSeats;
  
  // Generate unavailable seats randomly
  const unavailableSeats = new Set();
  while (unavailableSeats.size < (totalSeats - availableSeats)) {
    const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
    unavailableSeats.add(randomSeat);
  }
  
  // Determine seat type and deck
  for (let i = 1; i <= totalSeats; i++) {
    const seatNumber = i.toString().padStart(2, '0');
    const isAvailable = !unavailableSeats.has(i);
    
    let type;
    if (i % 3 === 1) type = 'window';
    else if (i % 3 === 0) type = 'aisle';
    else type = 'middle';
    
    const deck = i <= totalSeats / 2 ? 'lower' : 'upper';
    
    const baseFare = bus.fare;
    // Window seats and upper deck are slightly more expensive
    let price = baseFare;
    if (type === 'window') price += 100;
    if (deck === 'upper') price += 50;
    
    seats.push({
      id: `${busId}-${seatNumber}`,
      number: seatNumber,
      isAvailable,
      isSelected: false,
      type,
      price,
      deck
    });
  }
  
  return seats;
};

export const today = format(new Date(), 'yyyy-MM-dd');
export const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
export const dayAfterTomorrow = format(addDays(new Date(), 2), 'yyyy-MM-dd');