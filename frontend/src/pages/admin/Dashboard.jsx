import formatFlightInfo from "@/utils/formatFlightInfo";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [activeTab, setActiveTab] = useState("flights");
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/flight");
        console.log(response.data);
        setFlights(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getAllCities = async () => {
      try {
        const response = await axios.get("/city");
        setCities(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllCities();
    fetchFlights();
  }, []);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketId: "TK2024061501",
      flightNumber: "TK1980",
      passengerName: "John Doe",
      seatNumber: "12A",
      bookingDate: "2024-06-01",
      status: "Confirmed",
      price: 299,
    },
    {
      id: 2,
      ticketId: "TK2024061502",
      flightNumber: "TK1980",
      passengerName: "Jane Smith",
      seatNumber: "12B",
      bookingDate: "2024-06-02",
      status: "Confirmed",
      price: 299,
    },
    {
      id: 3,
      ticketId: "TK2024061503",
      flightNumber: "TK1985",
      passengerName: "Mike Johnson",
      seatNumber: "15C",
      bookingDate: "2024-06-03",
      status: "Confirmed",
      price: 320,
    },
  ]);

  const [showFlightModal, setShowFlightModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [flightForm, setFlightForm] = useState({
    fromCity: "",
    to: "",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    price: "",
    seats_total: "",
    seats_available: "",
  });

  const resetFlightForm = () => {
    setFlightForm({
      fromCity: "",
      to: "",
      departure_date: "",
      departure_time: "",
      arrival_date: "",
      arrival_time: "",
      price: "",
      seats_total: "",
      seats_available: "",
    });
  };

  const handleCreateFlight = () => {
    setEditingFlight(null);
    resetFlightForm();
    setShowFlightModal(true);
  };
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  const handleChooseFromCity = (value) => {
    setFromCity(value);
  };
  const handleChooseToCity = (value) => {
    setToCity(value);
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    setFlightForm({ ...flight });
    setShowFlightModal(true);
  };

  const handleDeleteFlight = (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      setFlights(flights.filter((flight) => flight.id !== flightId));
    }
  };

  const submitFlightCreation = async () => {
    const {
      departure_date,
      departure_time,
      arrival_date,
      arrival_time,
      price,
      seats_total,
      seats_available,
    } = flightForm;

    const departureDateTime = new Date(`${departure_date}T${departure_time}`);
    const arrivalDateTime = new Date(`${arrival_date}T${arrival_time}`);

    const payload = {
      from_city: fromCity,
      to_city: toCity,
      departure_time: departureDateTime.toISOString(),
      arrival_time: arrivalDateTime.toISOString(),
      price: Number(price),
      seats_total: Number(seats_total),
      seats_available: Number(seats_available),
    };

    try {
      const response = await axios.post("/flight", payload);
      console.log(response.data);

      if (!response.data)
        throw new Error(response.error || "Something went wrong");
      resetFlightForm();
      setShowFlightModal(false);
      setFlights((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to create flight:", error.message);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✈️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Turkish Airlines Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("flights")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "flights"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Flight Management
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "tickets"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Ticket Management
            </button>
          </nav>
        </div>

        {/* Flight Management Tab */}
        {activeTab === "flights" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Flight Management
              </h2>
              <button
                onClick={handleCreateFlight}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Flight
              </button>
            </div>

            {/* Flights Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {flights.map((flight) => {
                    const timeInfo = formatFlightInfo(
                      flight?.departure_time,
                      flight?.arrival_time
                    );
                    const bookedSeats =
                      flight?.seats_total - flight?.seats_available;
                    return (
                      <tr key={flight._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {flight?.reference_id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {timeInfo?.flightDuration}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {flight?.from_city?.city_name} →{" "}
                            {flight?.to_city?.city_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {timeInfo?.departureDate}
                          </div>
                          <div className="text-sm text-gray-500">
                            {timeInfo?.departureTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {bookedSeats}/{flight?.seats_total}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (bookedSeats / flight?.seats_total) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${flight?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditFlight(flight)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFlight(flight.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ticket Management Tab */}
        {activeTab === "tickets" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Ticket Management
              </h2>
              <div className="flex gap-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">All Flights</option>
                  {flights.map((flight) => (
                    <option key={flight.id} value={flight.flightNumber}>
                      {flight.flightNumber}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passenger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono text-sm text-gray-900">
                          {ticket.ticketId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {ticket.flightNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.passengerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.seatNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.bookingDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${ticket.price}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Flight Modal */}
      {showFlightModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingFlight ? "Edit Flight" : "Add New Flight"}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4"></div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <Select
                      value={
                        cities.find((value) => {
                          value._id === fromCity;
                        })?.city_name
                      }
                      className="p-3.5"
                      onValueChange={(value) => handleChooseFromCity(value)}
                    >
                      <SelectTrigger
                        id="from"
                        className="min-w-56 pl-8 relative flex justify-start"
                      >
                        <div className="pointer-events-none">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <SelectValue placeholder="Select departure city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => {
                          return (
                            <SelectItem key={city._id} value={city._id}>
                              {city.city_name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-center px-2 mt-5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label htmlFor="to">To</Label>
                    <Select
                      value={
                        cities.find((value) => {
                          value._id === toCity;
                        })?.city_name
                      }
                      onValueChange={(value) => handleChooseToCity(value)}
                    >
                      <SelectTrigger
                        id="to"
                        className="min-w-56 pl-8 relative flex justify-start"
                      >
                        <div className="pointer-events-none">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <SelectValue placeholder="Select destination city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => {
                          return (
                            <SelectItem key={city._id} value={city._id}>
                              {city.city_name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={flightForm.departure_date}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          departure_date: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departure Time
                    </label>
                    <input
                      type="time"
                      value={flightForm.departure_time}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          departure_time: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      value={flightForm.arrival_date}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          arrival_date: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arrival Time
                    </label>
                    <input
                      type="time"
                      value={flightForm.arrival_time}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          arrival_time: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₺)
                    </label>
                    <input
                      type="number"
                      value={flightForm.price}
                      onChange={(e) =>
                        setFlightForm({ ...flightForm, price: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="299"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={flightForm.seats_total}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          seats_total: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="180"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Seats
                    </label>
                    <input
                      type="number"
                      value={flightForm.seats_available}
                      onChange={(e) =>
                        setFlightForm({
                          ...flightForm,
                          seats_available: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="180"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowFlightModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    editingFlight ? handleEditFlight : submitFlightCreation
                  }
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  {editingFlight ? "Update" : "Create"} Flight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
