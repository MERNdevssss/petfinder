import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `text-sm font-medium px-3 py-1 rounded-md transition ${
      location.pathname === path
        ? "bg-teal-100 text-teal-700"
        : "text-gray-700 hover:text-red-500 hover:bg-red-50"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-200 flex items-center gap-2">
          🐾 <span className="text-gray-800">Pet Marketplace Platform</span>
        </Link>

        <div className="flex gap-3">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/suggest" className={linkClasses("/suggest")}>
            AI Suggestion
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
