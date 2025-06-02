import {
  Plane,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

function Footer() {
  return (
    <>
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FLYTICKET</span>
              </div>
              <p className="text-sm text-gray-400">
                Your journey, our passion. Flying to more countries than any
                other airline.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book Flight
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Check-in
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Flight Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Manage Booking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Miles & Smiles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> contact@turkishairlines.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +90 212 444 0849
                </li>
                <li>
                  <div className="flex space-x-3 mt-4">
                    <a href="#" className="hover:text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} FlyTicket. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
