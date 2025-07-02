import React, { useEffect, useState } from 'react';
import { Ticket, Bus, Calendar, MapPin, User, CheckCircle, XCircle } from 'lucide-react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // For modal
  
  const [editMode, setEditMode] = useState(false);
      const [editDestination, setEditDestination] = useState('');
      const [editDate, setEditDate] = useState('');
      const [editBusName, setEditBusName] = useState('');
const [editPassengerName, setEditPassengerName] = useState('');
const [editPassengerPhone, setEditPassengerPhone] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/bookings?passengerEmail=${user.email}`)
        .then(res => res.json())
        .then(data => setBookings(data));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 flex items-center gap-2">
          <Ticket className="w-8 h-8 text-indigo-700" /> My Bookings
        </h2>
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 text-lg">
            <XCircle className="mx-auto mb-2 w-10 h-10 text-gray-300" />
            No bookings found.
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map(b => (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-start gap-6 border-l-8 border-indigo-600 hover:shadow-2xl transition cursor-pointer"
                onClick={() => setSelectedBooking(b)}
                title="Click to view ticket"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full md:w-40">
                  <Bus className="w-10 h-10 text-indigo-700" />
                  <span className="font-bold text-indigo-900 text-center break-words">{b.busName}</span>
                  <span className="text-xs text-gray-500 break-all">{b.busId}</span>
                </div>
                <div className="flex-1 grid grid-cols-1 gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-gray-700">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Journey:</span>
                      <span>{b.journeyDate}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-gray-700 mt-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">From:</span>
                      <span>{b.source}</span>
                      <span className="mx-1 text-gray-400">→</span>
                      <span className="font-medium">To:</span>
                      <span>{b.destination}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-gray-700 mt-2">
                      <User className="w-5 h-5" />
                      <span className="font-medium">Passenger:</span>
                      <span>{b.passengerName}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-gray-700">
                      <span className="font-medium">Seats:</span>
                      <span className="text-indigo-700 font-bold">{b.seats.join(', ')}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-gray-700 mt-2">
                      <span className="font-medium">Total Fare:</span>
                      <span className="text-green-700 font-bold text-lg">₹{b.totalFare}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {b.payment?.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`font-semibold ${b.payment?.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {b.payment?.status === 'success' ? 'Paid' : 'Failed'}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">{b.payment?.type?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for ticket */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => setSelectedBooking(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
                <Ticket className="w-7 h-7 text-indigo-700" /> Ticket Details
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-indigo-700" />
                  <span className="font-semibold">{selectedBooking.busName}</span>
                  <span className="text-xs text-gray-400">({selectedBooking.busId})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span>Journey Date:</span>
                  <span className="font-semibold">{selectedBooking.journeyDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>From:</span>
                  <span className="font-semibold">{selectedBooking.source}</span>
                  <span className="mx-1 text-gray-400">→</span>
                  <span>To:</span>
                  <span className="font-semibold">{selectedBooking.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span>Passenger:</span>
                  <span className="font-semibold">{selectedBooking.passengerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Seats:</span>
                  <span className="font-semibold text-indigo-700">{selectedBooking.seats.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Total Fare:</span>
                  <span className="font-bold text-green-700 text-lg">₹{selectedBooking.totalFare}</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedBooking.payment?.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${selectedBooking.payment?.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {selectedBooking.payment?.status === 'success' ? 'Paid' : 'Failed'}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">{selectedBooking.payment?.type?.toUpperCase()}</span>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Booking Date: {selectedBooking.bookingDate}
                </div>
                <div className="text-xs text-gray-400 mt-2">
  Booking Date: {selectedBooking.bookingDate}
</div>

{/* Cancel Booking Button and Status */}
{selectedBooking.payment?.status === 'success' && (
  <button
    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
    onClick={async () => {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${selectedBooking._id}/cancel`,
        { method: 'PATCH' }
      );
      const data = await res.json();
      if (res.ok) {
        alert('Booking cancelled. Amount will be refunded.');
        setSelectedBooking({
          ...selectedBooking,
          payment: { ...selectedBooking.payment, status: 'cancelled' }
        });
        setBookings(bookings =>
          bookings.map(b =>
            b._id === selectedBooking._id
              ? { ...b, payment: { ...b.payment, status: 'cancelled' } }
              : b
          )
        );
      } else {
        alert(data.message || 'Cancellation failed');
      }
            }}
            >
            Cancel Booking
            </button>
            )}
            {selectedBooking.payment?.status === 'cancelled' && (
            <div className="mt-4 text-yellow-700 font-semibold">
            Booking cancelled. Amount will be refunded.
            </div>
            
            
            )}
            </div>
            {selectedBooking.payment?.status === 'success' && (
  <button
    className="mt-4 ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
    onClick={() => {
      setEditDestination(selectedBooking.destination || '');
      setEditDate(selectedBooking.journeyDate || '');
      setEditBusName(selectedBooking.busName || '');
      setEditPassengerName(selectedBooking.passengerName || '');
      setEditPassengerPhone(selectedBooking.passengerPhone || '');
      setEditMode(true);
    }}
  >
    Edit Booking
  </button>
)}
            </div>
          </div>
        )}
      </div>
      {editMode && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
        onClick={() => setEditMode(false)}
        aria-label="Close"
      >
        ×
      </button>
      <h3 className="text-xl font-bold text-indigo-800 mb-4">Edit Booking</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log('Submitting edit:', {
    destination: editDestination,
    journeyDate: editDate,
    busName: editBusName,
    passengerName: editPassengerName,
    passengerPhone: editPassengerPhone,
  });
  const res = await fetch(
    `http://localhost:5000/api/bookings/${selectedBooking._id}/edit`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: editDestination,
        journeyDate: editDate,
        busName: editBusName,
        passengerName: editPassengerName,
        passengerPhone: editPassengerPhone,
      }),
    }
  );
  const data = await res.json();
  console.log('Edit response:', data);
  if (res.ok) {
    alert('Booking updated!');
    setSelectedBooking({
      ...selectedBooking,
      destination: editDestination,
      journeyDate: editDate,
      busName: editBusName,
      passengerName: editPassengerName,
      passengerPhone: editPassengerPhone,
    });
    setBookings(bookings =>
      bookings.map(b =>
        b._id === selectedBooking._id
          ? {
              ...b,
              destination: editDestination,
              journeyDate: editDate,
              busName: editBusName,
              passengerName: editPassengerName,
              passengerPhone: editPassengerPhone,
            }
          : b
      )
    );
    setEditMode(false);
  } else {
    alert(data.message || 'Update failed');
  }
}}
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Bus Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={editBusName}
            onChange={e => setEditBusName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Destination</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={editDestination}
            onChange={e => setEditDestination(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Journey Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={editDate}
            onChange={e => setEditDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Passenger Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={editPassengerName}
            onChange={e => setEditPassengerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Passenger Phone</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={editPassengerPhone}
            onChange={e => setEditPassengerPhone(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
}

export default MyBookings;