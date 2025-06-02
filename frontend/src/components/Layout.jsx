import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";

function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-slate-900 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Fly Ticket</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-red-400 transition-colors">
              HELP
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
