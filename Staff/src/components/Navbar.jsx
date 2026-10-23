import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStaff } from "../context/StaffContext";

const Navbar = () => {
  const { user, setUser } = useStaff();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("staff");
    navigate("/");
  };

  return (
    <nav className="w-full bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Brand */}
        <Link to="/" className="text-xl md:text-2xl font-bold">
          Staff Dashboard
        </Link>

        {/* Right: Auth Buttons */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="bg-white text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
