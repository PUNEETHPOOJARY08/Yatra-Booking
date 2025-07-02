import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';

export async function downloadTicket(booking) {
  const doc = new jsPDF();

  // Sidebar (ticket stub)
  doc.setFillColor(236, 72, 153); // pink
  doc.rect(0, 0, 30, 297, 'F');

  // Perforation dots
  for (let y = 40; y < 140; y += 8) {
    doc.setFillColor(255, 255, 255);
    doc.circle(30, y, 1.2, 'F');
  }

  // Header with gradient effect
  for (let i = 0; i < 35; i++) {
    doc.setFillColor(79, 70, 229 - i * 2, 229 - i * 2);
    doc.rect(30, i, 180, 1, 'F');
  }
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('🚌 BusBooking Ticket', 120, 22, { align: 'center' });

  // Watermark
  doc.setFontSize(60);
  doc.setTextColor(240, 240, 255, 0.08);
  doc.text('BusBooking', 120, 160, { align: 'center', angle: 20 });

  // Highlighted ticket info section
  doc.setFillColor(245, 245, 255);
  doc.roundedRect(40, 45, 150, 90, 5, 5, 'F');

  // Main Info
  doc.setFontSize(16);
  doc.setTextColor(79, 70, 229);
  doc.text('Journey', 45, 55);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`From: ${booking.source}`, 45, 65);
  doc.text(`To: ${booking.destination}`, 45, 75);
  doc.text(`Date: ${booking.journeyDate}`, 45, 85);
  doc.text(`Seats: ${booking.seats.join(', ')}`, 45, 95);

  // Fare and status
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129);
  doc.text(`₹${booking.totalFare}`, 160, 65, { align: 'right' });
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229);
  doc.text(`Status: ${booking.payment?.status?.toUpperCase()}`, 160, 75, { align: 'right' });

  // Passenger Info Box
  doc.setFillColor(236, 72, 153, 0.1);
  doc.roundedRect(40, 105, 150, 30, 5, 5, 'F');
  doc.setFontSize(13);
  doc.setTextColor(236, 72, 153);
  doc.text('Passenger', 45, 115);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${booking.passengerName}`, 45, 125);
  doc.text(`Phone: ${booking.passengerPhone}`, 120, 125);

  // QR Code (encodes booking id)
  const qrDataUrl = await QRCode.toDataURL(`Booking:${booking._id}`);
  doc.addImage(qrDataUrl, 'PNG', 160, 105, 25, 25);
  doc.setFontSize(9);
  doc.setTextColor('#4F46E5');
  doc.text('Scan for details', 172, 133, { align: 'center' });

  // Booking meta
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Bus: ${booking.busName} (${booking.busId})`, 45, 145);
  doc.text(`Booking Date: ${booking.bookingDate}`, 45, 152);

  // Footer
  doc.setFontSize(11);
  doc.setTextColor('#888');
  doc.text('Thank you for booking with BusBooking!', 120, 285, { align: 'center' });

  doc.save(`Ticket_${booking.busName}_${booking.journeyDate}.pdf`);
}

// Import the function
import { downloadTicket } from '../components/DownloadTicket';

// Inside your modal JSX
<button
  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
  onClick={() => downloadTicket(selectedBooking)}
>
  Download Ticket (PDF)
</button>