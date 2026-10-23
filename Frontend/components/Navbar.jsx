import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../src/context/UserContext";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-900 to-green-700 text-white shadow-lg border-b border-emerald-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Brand with Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center duration-300">
            <img 
              src="/Images/logocivictrack.png" 
              alt="Civic Track Logo" 
              className="h-16 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1 text-sm font-medium items-center">
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 flex items-center`}
            >
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/report" 
              className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 flex items-center`}
            >
              <span>Report Issue</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard" 
              className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 flex items-center`}>
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          {!user ? (
            <div className="flex space-x-2 ml-4">
              <li>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg border border-emerald-500 hover:bg-emerald-500/20 transition-all duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 shadow-md shadow-emerald-600/30"
                >
                  Register
                </Link>
              </li>
            </div>
          ) : (
            <li className="relative ml-4" ref={dropdownRef}>
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white font-bold flex items-center justify-center hover:from-emerald-300 hover:to-green-500 transition-all duration-200 shadow-md shadow-emerald-700/30 border border-emerald-400/30"
                onClick={toggleDropdown}
                title={user.username || "Profile"}
                aria-label="User menu"
              >
                {(user.username || "U").charAt(0).toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-10 border border-emerald-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-emerald-100 bg-emerald-50">
                    <p className="text-sm font-medium">Hello, {user.username}</p>
                    <p className="text-xs text-emerald-600">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 hover:bg-emerald-50 text-sm border-t border-emerald-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-green-900 to-green-800 px-6 py-4 space-y-4 shadow-inner">
          <NavLink
            to="/"
            className={({isActive}) => `block py-3 px-4 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 font-medium`}
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/report"
            className={({isActive}) => `block py-3 px-4 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 font-medium`}
            onClick={toggleMobileMenu}
          >
            Report Issue
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({isActive}) => `block py-3 px-4 rounded-lg ${isActive ? "bg-white/10" : ""} hover:bg-white/10 transition-all duration-200 font-medium`}
            onClick={toggleMobileMenu}
          >
            Dashboard
          </NavLink>

          {!user ? (
            <div className="pt-4 border-t border-emerald-600/50 space-y-3">
              <Link
                to="/login"
                className="block py-3 text-center rounded-lg border border-green-500 hover:bg-emerald-500/20 transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-green-500 block py-3 text-center rounded-lg bg-green-800 hover:bg-green-700 transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-emerald-600/50">
              <div className="px-4 py-3 rounded-lg bg-white/10 mb-3">
                <p className="text-sm font-medium">Signed in as</p>
                <p className="text-sm font-bold">{user.username}</p>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}