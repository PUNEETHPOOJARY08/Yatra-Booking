import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBookingContext } from '../context/BookingContext';

const paymentTypes = [
  { label: 'Credit/Debit Card', value: 'card', icon: '💳' },
  { label: 'UPI', value: 'upi', icon: '📱' },
  { label: 'Net Banking', value: 'netbanking', icon: '🏦' },
];

function Payment() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentType, setPaymentType] = useState('card');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  const { setBookingDetails, selectedBus, selectedSeats, passengerDetails, searchParams } = useBookingContext();

  const totalFare = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const handlePayment = (e) => {
  e.preventDefault();
  setProcessing(true);
  setError('');
  setTimeout(() => {
    setProcessing(false);
    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
    const bookingData = {
      id: Math.random().toString(36).substr(2, 9),
      busId: selectedBus?.id,
      busName: selectedBus?.name,
      seats: selectedSeats.map(seat => seat.number),
      totalFare,
      passengerName: passengerDetails.name,
      passengerEmail: user?.email, // <-- Use logged-in user's email here!
      passengerPhone: passengerDetails.phone,
      passengerAddress: passengerDetails.address,
      bookingDate: new Date().toISOString(),
      journeyDate: searchParams.date,
      source: searchParams.source,
      destination: searchParams.destination,
      payment: { status: 'success', type: paymentType, time: new Date().toLocaleString() }
    };

    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(data => {
        setBookingDetails(bookingData);
        navigate('/confirmation');
      })
      .catch(() => {
        setError('Booking failed. Please try again.');
      });
  }, 1500);
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
          {/* Payment Form */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-900">Payment</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <div className="flex gap-4">
                  {paymentTypes.map(type => (
                    <button
                      type="button"
                      key={type.value}
                      className={`flex items-center px-4 py-2 rounded-lg border transition ${
                        paymentType === type.value
                          ? 'border-indigo-700 bg-indigo-50 text-indigo-900 font-semibold'
                          : 'border-gray-300 bg-white text-gray-700'
                      }`}
                      onClick={() => setPaymentType(type.value)}
                    >
                      <span className="mr-2 text-xl">{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Payment */}
              {paymentType === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 mb-1">CVV</label>
                      <input
                        type="password"
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="CVV"
                        required
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Cardholder Name"
                      required
                    />
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentType === 'upi' && (
  <div>
    <label className="block text-gray-700 mb-1">UPI ID</label>
    <input
      type="text"
      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="example@upi"
      value={upiId}
      onChange={e => setUpiId(e.target.value)}
      required
    />
    <div className="text-xs text-gray-500 mt-1">
      You will receive a payment request on your UPI app or scan the QR below.
    </div>
    <div className="flex flex-col items-center mt-4">
      <QRCode value={`upi://pay?pa=merchant@upi&pn=YatraBook&am=${totalFare}&cu=INR&tn=Bus%20Ticket%20Payment`} size={140} />
      <div className="text-xs text-gray-500 mt-2">Scan to pay via UPI</div>
    </div>
  </div>
)}

              {/* Net Banking */}
              {paymentType === 'netbanking' && (
                <div>
                  <label className="block text-gray-700 mb-1">Select Bank</label>
                  <select
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Bank</option>
                  </select>
                  <div className="text-xs text-gray-500 mt-1">You will be redirected to your bank's secure page.</div>
                </div>
              )}

              {error && <div className="text-red-600">{error}</div>}
              <button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 rounded transition text-lg"
                disabled={processing}
              >
                {processing ? 'Processing Payment...' : 'Pay & Continue'}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="w-full md:w-1/3 bg-indigo-50 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Booking Summary</h3>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">Bus</span>
                <span className="font-medium">{selectedBus?.name}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">Date</span>
                <span>{searchParams.date}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">From</span>
                <span>{searchParams.source}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">To</span>
                <span>{searchParams.destination}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">Seats</span>
                <span>{selectedSeats.map(seat => seat.number).join(', ')}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-700">Passenger</span>
                <span>{passengerDetails.name}</span>
              </div>
              <div className="border-t border-indigo-200 my-4"></div>
              <div className="mb-2 flex justify-between font-bold text-indigo-900">
                <span>Total Fare</span>
                <span>₹{totalFare}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-8">
              Payments are 100% secure and encrypted.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;