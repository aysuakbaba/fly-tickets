import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightBooking from "./pages/FlightBooking";
import Dashboard from "./pages/admin/Dashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/admin/Login";
import Flights from "./pages/Flights";
import Layout from "./components/Layout";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/flight/:id" element={<FlightBooking />} />
          <Route path="/confirmation/:id" element={<BookingConfirmation />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
