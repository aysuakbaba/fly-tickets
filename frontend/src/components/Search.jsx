import axios from "axios";
import { Calendar, ArrowUpDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Footer from "./Footer";
import ServicesSection from "./ServicesSection";
import { useState } from "react";
import { useEffect } from "react";
import { formatDateToYYYYMMDD } from "@/utils/formatFlightInfo";

export default function Search() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [date, setDate] = useState("");
  const [toCity, setToCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/city");
        setCities(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getAllCities();
  }, []);

  const handleChooseFromCity = (value) => {
    setFromCity(value);
  };
  const handleChooseToCity = (value) => {
    setToCity(value);
  };

  return (
    <div className="w-screen min-h-screen bg-background">
      <section
        className="relative min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/airplane.jpeg')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center text-white mb-8">
            <p className="text-lg mb-2">HELLO</p>
            <h1 className="text-4xl md:text-5xl font-light">
              Where do you want to explore?
            </h1>
          </div>

          <Card className="w-3xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="flight" className="w-full">
                <TabsContent value="flight" className="space-y-6 mt-6">
                  <div className=" flex justify-between items-center gap-4">
                    <div className="flex justify-between ">
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

                    <div className="space-y-2 min-w-1/6">
                      <Label htmlFor="departure">Departure</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-8"
                          >
                            <Calendar className="w-4 h-4 absolute left-2 text-muted-foreground" />
                            {date ? date.toLocaleDateString() : "Select date"}
                            {/* <span>09 Jun</span> */}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                      onClick={() => navigate("/flights")}
                    >
                      View All Available Flights
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 px-8"
                      onClick={() => {
                        const formattedDate = date
                          ? formatDateToYYYYMMDD(date)
                          : "";
                        navigate(
                          `/flights?from_city=${fromCity}&to_city=${toCity}&departure_time=${formattedDate}`
                        );
                      }}
                      disabled={!fromCity || !toCity || !date}
                    >
                      Search flights →
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <ServicesSection />

      <Footer />
    </div>
  );
}
