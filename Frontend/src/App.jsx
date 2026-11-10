import { useEffect, useState } from 'react';

const API_URL = "https://event-management-system-backend-ud2l.onrender.com";

export default function App() {
  const [seats, setSeats] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch seat array metrics from backend architecture API
  const syncSeatingData = () => {
    fetch(`${API_URL}/api/events/1/seats`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error('Data pipeline error:', err));
  };

  useEffect(() => {
    syncSeatingData();
  }, []);

  // Post booking update request on button click interactions
  const triggerSeatReservation = (seatNumber) => {
    fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: 1, seat_number: seatNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatusMessage(data.error);
        } else {
          setStatusMessage(data.message);
          syncSeatingData(); // Pull fresh database snapshot to update colors instantly
        }
      })
      .catch((err) => console.error('Booking operational failure:', err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 font-sans">
      <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Rock Concert 2026</h1>
      <p className="text-gray-400 mb-6 text-sm">Interactive Live Ticketing Dashboard</p>

      {statusMessage && (
        <div className="mb-6 px-4 py-2 bg-indigo-600 text-sm font-semibold rounded shadow-md transition-all">
          {statusMessage}
        </div>
      )}

      {/* Stage visual alignment guide */}
      <div className="w-72 h-8 bg-gray-700 rounded-b-xl mb-12 text-center text-xs pt-2 font-bold tracking-widest text-gray-400 shadow-inner">
        STAGE AREA
      </div>

      {/* Responsive interactive layout grid display map */}
      <div className="grid grid-cols-8 gap-3 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        {seats.map((seat) => (
          <button
            key={seat.seat_number}
            onClick={() => triggerSeatReservation(seat.seat_number)}
            className={`w-11 h-11 rounded-lg font-bold text-xs transition-all transform active:scale-95 ${
              seat.status === 'booked'
                ? 'bg-red-500 text-white cursor-not-allowed opacity-90'
                : 'bg-emerald-500 text-gray-900 hover:bg-emerald-400 hover:text-black shadow-md'
            }`}
            disabled={seat.status === 'booked'}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      {/* Legend identifiers */}
      <div className="flex gap-6 mt-8 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-sm"></span> Booked
        </div>
      </div>
    </div>
  );
}
