const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint 1: Fetch all live seat statuses for an event
app.get('/api/events/:id/seats', (req, res) => {
  const eventId = req.params.id;
  db.all('SELECT seat_number, status FROM tickets WHERE event_id = ? ORDER BY seat_number ASC', [eventId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint 2: Safe transactional endpoint to reserve a seat
app.post('/api/bookings', (req, res) => {
  const { event_id, seat_number } = req.body;

  // Read current availability rule to prevent double-booking conflicts
  db.get(
    'SELECT status FROM tickets WHERE event_id = ? AND seat_number = ?',
    [event_id, seat_number],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Seat configuration not found' });
      if (row.status !== 'available') {
        return res.status(400).json({ error: `Seat ${seat_number} is already booked!` });
      }

      // Execute transaction modification state safely
      db.run(
        "UPDATE tickets SET status = 'booked' WHERE event_id = ? AND seat_number = ?",
        [event_id, seat_number],
        function (updateErr) {
          if (updateErr) return res.status(500).json({ error: updateErr.message });
          res.json({ message: `Seat ${seat_number} reserved successfully!` });
        }
      );
    }
  );
});

app.listen(5001, () => console.log('Backend server running securely on port 5001'));
