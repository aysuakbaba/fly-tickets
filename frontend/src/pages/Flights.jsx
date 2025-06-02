import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Plane, Calendar, ArrowUpDown, Clock, Armchair } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import formatFlightInfo from "@/utils/formatFlightInfo";

function FlightsPage() {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const from_city = searchParams.get("from_city");
  const to_city = searchParams.get("to_city");
  const departure_time = searchParams.get("departure_time");

  useEffect(() => {
    const getFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/flight", {
          params: { from_city, to_city, departure_time },
        });
        console.log(response);
        setFlights(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getFlights();
  }, []);

  return (
    <>
      {/* Available Flights Section */}
      <section className="w-screen py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Available Flights
          </h2>
          <div className="space-y-4">
            {loading && <p>Loading..</p>}
            {!loading && flights.length === 0 && <p>There are no flights</p>}
            {flights &&
              flights.length > 0 &&
              flights.map((flight) => {
                const timeInfo = formatFlightInfo(
                  flight.departure_time,
                  flight.arrival_time
                );
                return (
                  <Card
                    key={flight._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex flex-col text-lg font-semibold">
                              <span className="font-light italic">From</span>
                              {flight.from_city.city_name}
                            </div>
                            <ArrowUpDown className="w-4 h-4 text-muted-foreground rotate-90" />
                            <div className="flex flex-col text-lg font-semibold">
                              <span className="font-light italic">To</span>
                              {flight.to_city.city_name}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {timeInfo.departureDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {timeInfo.arrivalTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Plane className="w-4 h-4" />
                              {timeInfo.flightDuration}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="mt-2">
                              Turkish Airline
                            </Badge>
                            <Badge variant="secondary" className="mt-2">
                              <Armchair className="w-4 h-4" />
                              {flight.seats_available} seats available
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-500">
                            ₺{flight.price}
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            per person
                          </div>
                          <Button
                            className="bg-green-600 hover:bg-red-700"
                            onClick={() => navigate(`/flight/${flight._id}`)}
                          >
                            Select Flight
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default FlightsPage;
