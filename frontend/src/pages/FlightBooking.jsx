import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CalendarDays, User, Plane, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import axios from "axios";
import formatFlightInfo from "@/utils/formatFlightInfo";
import SeatLayout from "@/components/SeatLayout";

function FlightBooking() {
  const { id } = useParams();
  const [selectedFlight, setSelectedFlight] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSeat, setTotalSeat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seatNumber, setSeatNumber] = useState("");
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    seatNumber: seatNumber,
  });

  const totalPrice = selectedFlight.price;

  const steps = [
    { id: 1, title: "Passenger Details", icon: User },
    { id: 2, title: "Seat Selection", icon: Plane },
  ];

  const handleBookFlight = async () => {
    try {
      const response = await axios.post("/ticket", {
        passenger_name: formData.firstName,
        passenger_surname: formData.lastName,
        passenger_email: formData.email,
        seat_number: formData.seatNumber,
        flight_id: id,
      });

      if (response.data.ticket_id) {
        navigate(`/confirmation/${response.data.ticket_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/flight/${id}`);
        setSelectedFlight(response.data);
        setTotalSeat(response.data.seats_total);
        setOccupiedSeats(response.data.reservedSeats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, []);

  const formattedDate = formatFlightInfo(
    selectedFlight?.departure_time,
    selectedFlight?.arrival_time
  );

  const selectedFromCity = selectedFlight?.from_city?.city_name;
  const selectedToCity = selectedFlight?.to_city?.city_name;
  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          isActive
                            ? "border-red-600 bg-red-600 text-white"
                            : isCompleted
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-red-600"
                              : isCompleted
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          Step {step.id}
                        </p>
                        <p
                          className={`text-xs ${
                            isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${
                            isCompleted ? "bg-green-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 1: Passenger Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Passenger Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg">Passenger (Adult)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={"firstName"}>First Name</Label>
                        <Input
                          id={"firstName"}
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5" />
                    Seat Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="min-h-screen flex justify-center items-start mt-10">
                    {totalSeat !== null ? (
                      <SeatLayout
                        occupiedSeats={occupiedSeats}
                        totalSeat={totalSeat}
                        seatNumber={formData.seatNumber}
                        onSeatSelect={(seat) => {
                          setFormData({ ...formData, seatNumber: seat });
                        }}
                      />
                    ) : (
                      <p>Loading seat layout...</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 2 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={
                    !formData.email || !formData.firstName || !formData.lastName
                  }
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleBookFlight}
                >
                  Complete Booking
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Flight Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      Flight {selectedFlight?.reference_id}
                    </span>
                    <Badge variant="secondary">Turkish Airlines</Badge>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                      <Plane className="w-4 h-4" />
                      From {selectedFromCity} → To {selectedToCity}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarDays className="w-4 h-4" />
                      {formattedDate.departureDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formattedDate.flightDuration}
                    </div>
                  </div>
                </div>

                <Separator />

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <h4 className="font-medium">Price Breakdown</h4>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base fare 1 passenger</span>
                      <span>${selectedFlight.price}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Taxes & fees</span>
                      <span>$89</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-600">${totalPrice + 89}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightBooking;
