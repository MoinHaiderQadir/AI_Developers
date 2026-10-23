import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { admin, logout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-green-700 text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Title */}
        <div className="text-2xl font-bold tracking-wide">EcoTracker</div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {!admin ? (
            <Link to="/admin/login" className="hover:text-green-300">
              Login
            </Link>
          ) : (
            <>
              <span className="text-white/90">
                {admin.name || admin.username || admin.email || "Admin"}
              </span>
              <button
                onClick={logout}
                className="bg-green-300 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 text-sm font-medium space-y-2">
          {!admin ? (
            <Link
              to="/admin/login"
              onClick={toggleMobileMenu}
              className="block hover:text-green-300"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="block text-white/90">
                {admin.name || admin.username || admin.email || "Admin"}
              </span>
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left hover:text-green-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
