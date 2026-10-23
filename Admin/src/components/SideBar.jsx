import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Clock,
  Users,
  LogOut,
  BookDashedIcon,
  SquareDashedBottomIcon,
  UserCheck2Icon,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: <UserCheck2Icon size={20} /> },
  { path: "/staff", label: "Staff", icon: <User /> },
  { path: "/shift", label: "Shift", icon: <Clock size={20} /> },
  { path: "/users", label: "Reports", icon: <Users size={20} /> },
];

export default function Sidebar() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile: Icons only */}
      <aside className="flex md:hidden flex-col justify-between w-16 bg-green-700 min-h-screen items-center py-4 shadow-md">
        <div className="space-y-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-center w-10 h-10 rounded-md hover:bg-green-800 ${
                  isActive ? "bg-green-600 text-white" : "text-white"
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
        {admin && (
          <div className="mb-4 flex flex-col items-center space-y-2 text-white text-xs">
            <div className="text-center">{admin.username || "Admin"}</div>
            <button onClick={handleLogout} className="hover:text-red-300">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </aside>

      {/* Tablet: Text only */}
      <aside className="hidden md:flex lg:hidden flex-col justify-between w-1/4 bg-green-700 min-h-screen shadow-md">
        <div>
          <div className="p-6 font-bold text-xl border-b text-white">
            EcoTracker Admin Panel
          </div>
          <nav className="p-3 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-green-800 ${
                    isActive
                      ? "bg-green-600 text-white font-semibold"
                      : "text-white hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {admin && (
          <div className="p-4 border-t text-white text-sm space-y-2">
            <div>{admin.username || "Admin"}</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-200 hover:text-red-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Desktop: Icons + Text */}
      <aside className="hidden lg:flex flex-col justify-between w-1/4 bg-green-700 min-h-screen shadow-md">
        <div>
          <div className="p-6 font-bold text-xl border-b text-white">
            EcoTracker Admin Panel
          </div>
          <nav className="p-3 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-green-800 ${
                    isActive
                      ? "bg-green-600 text-white font-semibold"
                      : "text-white hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {admin && (
          <div className="p-4 border-t text-white text-sm space-y-2">
            <div>{admin.username || "Admin"}</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-200 hover:text-red-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
