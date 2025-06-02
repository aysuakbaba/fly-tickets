import { Plane, Luggage, Hotel, Car, Shield, Gift } from "lucide-react";

function ServicesSection() {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Seat selection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Luggage className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Extra baggage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Hotel className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Book a hotel</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Rent a car</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Travel insurance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Gift Card</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesSection;
