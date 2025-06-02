# ✈️ FlyTicket – Airline Booking Web Application

FlyTicket is a full-stack web app made for an airline company. It lets users search for and book flights easily, and gives admins a simple way to manage flights through their own dashboard.

## 🚀 Features

### ✨ User Features

- View all available flights
- Search for specific flights based on criteria
- Book tickets
- Choose seats for flights

### 🔧 Admin Features

- Create new flights
- View tickets
- Update, create, delete flights

---

## 🛠️ Technologies Used

### Frontend (Vite + React)

- **React** – UI Library
- **Vite** – Lightning-fast development server and bundler
- **ShadCN UI** – UI components built on top of Radix UI
- **Axios** – HTTP client for API communication
- **Tailwind CSS** – Utility-first CSS framework

### Backend (Node.js + Express)

- **Express.js** – Web framework for Node.js
- **MongoDB** – Relational database for storing flight and booking data

---

## 🗂️ Project Structure

/FlyTicket
│
├── frontend # Frontend (Vite + React)
└── backend # Backend (Node.js + Express)

---

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/aysuakbaba/fly-tickets.git
cd fly-tickets
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔑 Admin Login Credentials

```bash
Email: aysuakbaba@gmail.com
Password: 1234
```

## Required environmental variables

### API

```bash
JWT_SECRET=supersecretkey12345

```

### Client

```bash
VITE_API_URL=http://localhost:3000/api
```
