import React, { useState } from "react";

const Seat = ({ label, isSelected, onClick, isOccupied }) => {
  let seatStyle = "bg-gray-200 hover:bg-gray-300 text-gray-700";

  if (isOccupied) {
    seatStyle = "bg-gray-400 text-gray-600 cursor-not-allowed opacity-70";
  } else if (isSelected) {
    seatStyle = "bg-blue-500 text-white shadow-lg transform scale-105";
  }

  return (
    <button
      onClick={() => !isOccupied && onClick(label)}
      disabled={isOccupied}
      className={`w-12 h-12 m-1 rounded-lg text-xs font-bold transition-all duration-200 hover:shadow-md border-2 border-transparent ${seatStyle} ${
        !isOccupied && !isSelected ? "hover:border-gray-400" : ""
      }`}
      title={`Seat ${label} ${isOccupied ? "(Occupied)" : "(Available)"}`}
    >
      {label}
    </button>
  );
};

const SeatLayout = ({ totalSeat, seatNumber, onSeatSelect, occupiedSeats }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (label) => {
    setSelectedSeat((prev) => (prev === label ? null : label));
  };

  const renderSeats = () => {
    const seats = [];
    const seatsPerRow = 6;
    const rows = Math.ceil(totalSeat / seatsPerRow);

    for (let i = 0; i < rows; i++) {
      const rowLabel = String.fromCharCode(65 + i);
      const rowSeats = [];

      // Row number indicator
      rowSeats.push(
        <div
          key={`row-number-${i}`}
          className="w-8 flex items-center justify-center text-sm font-semibold text-gray-600"
        >
          {i + 1}
        </div>
      );

      for (let j = 1; j <= seatsPerRow; j++) {
        const seatIndex = i * seatsPerRow + j;
        if (seatIndex > totalSeat) break;

        const label = `${rowLabel}${j}`;
        const isOccupied = occupiedSeats.includes(label);

        rowSeats.push(
          <Seat
            key={label}
            label={label}
            isSelected={selectedSeat === label}
            isOccupied={isOccupied}
            onClick={() => {
              handleSeatClick(label);
              onSeatSelect(label);
            }}
          />
        );

        // Insert an aisle after three seats
        if (j === 3) {
          rowSeats.push(
            <div
              key={`aisle-${i}-${j}`}
              className="w-12 flex items-center justify-center"
            >
              <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
            </div>
          );
        }
      }

      seats.push(
        <div key={`row-${i}`} className="flex justify-center items-center mb-3">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Your Seat
        </h2>
        <p className="text-gray-600">
          Choose your preferred seat for your flight
        </p>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
          Seat Legend
        </h3>
        <div className="flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded border"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Aircraft visualization */}
      <div className="bg-gradient-to-b from-blue-50 to-gray-50 p-6 rounded-xl border-2 border-gray-200">
        {/* Front of aircraft */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-6 py-2 rounded-t-full text-sm font-semibold shadow-md">
            ✈️ FRONT
          </div>
        </div>

        {/* Seat map */}
        <div className="space-y-1">{renderSeats()}</div>

        {/* Rear of aircraft */}
        <div className="flex justify-center mt-6">
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-6 py-2 rounded-b-full text-sm font-semibold shadow-md">
            REAR
          </div>
        </div>
      </div>

      {/* Selection summary */}
      {selectedSeat && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Selected Seat:{" "}
              <span className="text-blue-600">{selectedSeat}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You can change your selection by clicking another available seat
            </p>
          </div>
        </div>
      )}

      {!selectedSeat && (
        <div className="mt-6 text-center text-gray-500">
          <p>Click on any available seat to select it</p>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
