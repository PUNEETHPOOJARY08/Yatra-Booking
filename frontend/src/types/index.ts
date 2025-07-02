export interface Bus {
  id: string;
  name: string;
  type: 'AC' | 'Non-AC' | 'Sleeper' | 'Luxury';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  availableSeats: number;
  totalSeats: number;
  rating: number;
  amenities: string[];
}

export interface Location {
  id: string;
  name: string;
  state: string;
}

export interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  type: 'window' | 'aisle' | 'middle';
  price: number;
  deck: 'lower' | 'upper';
}

export interface Booking {
  id: string;
  busId: string;
  seats: string[];
  totalFare: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  bookingDate: string;
  journeyDate: string;
  source: string;
  destination: string;
}

export interface SearchParams {
  source: string;
  destination: string;
  date: string;
}