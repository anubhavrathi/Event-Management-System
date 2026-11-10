# 🎟️ Event Ticket Booking System

A full-stack Event Ticket Booking System that allows users to view event seat availability, select seats, and book tickets through an interactive web interface. The application uses React for the frontend, Node.js and Express for the backend, and SQLite for database management.

## 🚀 Features

- **Interactive Seat Selection:** View and select available seats.
- **Real-Time Seat Status:** Available seats are displayed in green, while booked seats are displayed in red.
- **Ticket Booking:** Book an available seat with a single click.
- **Database Integration:** Store event details and booking information using SQLite.
- **Booking Persistence:** Booked seats remain reserved even after refreshing the page.
- **REST API:** Connect the frontend and backend through RESTful API endpoints.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server |
| Node.js | Backend runtime |
| Express.js | REST API development |
| SQLite | Database management |
| HTML, CSS, JavaScript | Web interface |

## 📁 Project Structure

```text
Event Management System/
│
├── Backend/
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── tickets.db
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anubhavrathi/Event-Management-System.git
```

### 2. Navigate to the Project Directory

```bash
cd "Event Management System"
```

### 3. Setup the Backend

```bash
cd Backend
npm install
npm start
```

The backend server will run at:

`http://localhost:5001`

### 4. Setup the Frontend

Open another terminal:

```bash
cd "Event Management System/frontend"
npm install
npm run dev
```

The frontend will run at:

`http://localhost:5173`

### 5. Open the Application

Visit `http://localhost:5173` in your browser.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events/1/seats` | Retrieve seat availability |
| POST | `/api/bookings` | Book an available seat |

## 🗄️ Database

The application uses SQLite with two main tables:

**1. Events**
- Event ID
- Event Title
- Event Date
- Total Seats

**2. Tickets**
- Ticket ID
- Event ID
- Seat Number
- Booking Status

The application initializes a sample event called **Rock Concert 2026**, with 40 seats.

## 💻 Requirements

- Node.js and npm
- VS Code or any code editor
- Modern web browser
- macOS, Windows, or Linux

## 🔮 Future Enhancements

- User registration and login
- Multiple events and event categories
- Online payment gateway integration
- Booking confirmation and digital tickets
- User booking history
- Admin dashboard for event management

## 👨‍💻 Author

**Anubhav Rathi**

BCA Graduate

## 📄 License

This project is developed for educational and learning purposes.
