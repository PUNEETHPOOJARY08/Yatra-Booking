import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';
import { Bus, Calendar, MapPin, Clock, User, Phone, Mail, Download, Share2 } from 'lucide-react';
import Button from '../common/Button';

const TicketDetails = () => {
  const { bookingDetails } = useBookingContext();
  const ticketRef = useRef();


   const handleDownload = () => {
    if (!ticketRef.current) return;
    const printContents = ticketRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Restore the app after print
  };

  const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'My Bus Ticket',
      text: `
        Booking ID: ${bookingDetails.id}
        Bus: ${bookingDetails.busName}
        Date: ${bookingDetails.journeyDate}
        From: ${bookingDetails.source}
        To: ${bookingDetails.destination}
        Seats: ${bookingDetails.seats.join(', ')}
        Passenger: ${bookingDetails.passengerName}
        Total Fare: ₹${bookingDetails.totalFare}
      `,
    })
    .then(() => alert('Ticket shared!'))
    .catch(() => alert('Sharing cancelled or failed.'));
  } else {
    // Fallback: Copy to clipboard
    const ticketText = `
      Booking ID: ${bookingDetails.id}
      Bus: ${bookingDetails.busName}
      Date: ${bookingDetails.journeyDate}
      From: ${bookingDetails.source}
      To: ${bookingDetails.destination}
      Seats: ${bookingDetails.seats.join(', ')}
      Passenger: ${bookingDetails.passengerName}
      Total Fare: ₹${bookingDetails.totalFare}
    `;
    navigator.clipboard.writeText(ticketText)
      .then(() => alert('Ticket details copied to clipboard!'))
      .catch(() => alert('Could not copy ticket details.'));
  }
};

  // Fallback if bookingDetails is missing or incomplete
  if (
    !bookingDetails ||
    !bookingDetails.busName ||
    !bookingDetails.seats ||
    !bookingDetails.passengerName
  ) {
    return (
      <div className="text-center text-red-500 font-semibold my-8">
        No ticket details found. Please complete your booking.
      </div>
    );
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" ref={ticketRef}>
        <div className="bg-indigo-900 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bus className="h-8 w-8 mr-2" />
              <h2 className="text-2xl font-bold">YatraBook</h2>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-200">Booking ID</div>
              <div className="font-mono">{bookingDetails.id}</div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Journey Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Bus</div>
                <div className="font-medium">{bookingDetails.busName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date of Journey</div>
                <div className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.journeyDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.source}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">To</div>
                <div className="font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.destination}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Passenger Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium flex items-center">
                  <User className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.passengerName}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.passengerPhone}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-indigo-700" />
                  {bookingDetails.passengerEmail}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ticket Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Seat Numbers</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {bookingDetails.seats.map((seat, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="font-bold text-lg text-indigo-900">₹{bookingDetails.totalFare}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md">
            <div className="flex">
              <Clock className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800">
                  <strong>Important:</strong> Please arrive at the boarding point at least 30 minutes before the scheduled departure time.
                </p>
                <p className="text-amber-800 text-sm mt-2">
                  Show this ticket on your mobile or carry a printed copy for boarding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          variant="outline"
          onClick={handleDownload}
          icon={<Download size={18} />}
        >
          Download Ticket
        </Button>
        <Button
          variant="primary"
          onClick={handleShare}
          icon={<Share2 size={18} />}
        >
          Share Ticket
        </Button>
      </div>
    </motion.div>
  );
};

export default TicketDetails;