const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Saves the database file locally inside the backend folder
const dbPath = path.join(__dirname, 'tickets.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // 1. Events Table
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    total_seats INTEGER
  )`);

  // 2. Tickets/Seats Table
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    seat_number INTEGER,
    status TEXT DEFAULT 'available',
    FOREIGN KEY(event_id) REFERENCES events(id),
    UNIQUE(event_id, seat_number)
  )`);

  // Seed initial concert and seats if they don't exist yet
  db.run(`INSERT OR IGNORE INTO events (id, title, date, total_seats) VALUES (1, 'Rock Concert 2026', '2026-12-25', 40)`, function(err) {
    if (!err) {
      // Generate 40 structural seats automatically
      const stmt = db.prepare(`INSERT OR IGNORE INTO tickets (event_id, seat_number, status) VALUES (1, ?, 'available')`);
      for (let i = 1; i <= 40; i++) {
        stmt.run(i);
      }
      stmt.finalize();
    }
  });
});

module.exports = db;
