import formatFlightInfo from "@/utils/formatFlightInfo";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState({});
  const from = ticketInfo?.flight_id?.from_city?.city_name;
  const to = ticketInfo?.flight_id?.to_city?.city_name;
  const timeInfo = formatFlightInfo(
    ticketInfo?.flight_id?.departure_time,
    ticketInfo?.flight_id?.arrival_time
  );

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/ticket/${id}`);
        console.log(response.data);
        setTicketInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTicket();
  }, []);

  return (
    <div className="w-screen mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">✈️</span>
            </div>
            <span className="text-lg font-bold">TURKISH AIRLINES</span>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">BOARDING PASS</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Passenger Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {ticketInfo.passenger_name} {ticketInfo.passenger_surname}
          </h2>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Ticket ID</span>
            <span className="font-mono font-semibold">
              {ticketInfo.ticket_id}
            </span>
          </div>
        </div>

        {/* Flight Route */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{from}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{to}</p>
            </div>
          </div>
        </div>

        {/* Flight Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Flight
            </p>
            <p className="text-lg font-bold text-gray-800">
              {ticketInfo?.flight_id?.reference_id}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Seat
            </p>
            <p className="text-lg font-bold text-gray-800">
              {ticketInfo.seat_number}
            </p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-blue-600 uppercase tracking-wide">
                  Departure
                </p>
                <p className="text-lg font-bold text-blue-800">
                  {timeInfo.departureTime}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600 uppercase tracking-wide">
                  Date
                </p>
                <p className="text-sm font-semibold text-blue-800">
                  {timeInfo.departureDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t">
        <p className="text-xs text-gray-500 text-center">
          Please arrive at the gate 30 minutes before departure
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
