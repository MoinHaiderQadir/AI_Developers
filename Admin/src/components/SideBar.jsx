import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  Clock,
  FileText,
  LogOut,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/staff", label: "Staff", icon: UserCog },
  { path: "/shift", label: "Shift", icon: Clock },
  { path: "/users", label: "Reports", icon: FileText },
];

const COLLAPSE_STORAGE_KEY = "ecotracker:sidebarCollapsed";

export default function Sidebar() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem(COLLAPSE_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(COLLAPSE_STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const adminName = admin?.username || "Admin";
  const initials = adminName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Below md the sidebar is always an icon rail.
  // From md up it follows the collapsed toggle.
  const widthClass = collapsed ? "w-[72px]" : "w-[72px] md:w-64";
  const labelClass = collapsed ? "hidden" : "hidden md:inline";
  const rowAlign = collapsed
    ? "justify-center"
    : "justify-center md:justify-start";

  return (
    <aside
      className={`relative sticky top-0 flex h-screen shrink-0 flex-col border-r border-green-200 bg-green-50 transition-[width] duration-200 ${widthClass}`}
    >
      {/* Collapse toggle (tablet and desktop) */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className="absolute -right-3 top-7 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-green-200 bg-white text-green-700 shadow-sm transition hover:bg-green-100 md:flex"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Brand */}
      <div
        className={`flex items-center gap-3 border-b border-green-200 px-4 py-5 ${rowAlign}`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm">
          <Leaf className="h-5 w-5" />
        </div>
        <div className={`min-w-0 ${labelClass}`}>
          <p className="truncate text-sm font-bold text-green-900">
            EcoTracker
          </p>
          <p className="truncate text-[10px] font-medium uppercase tracking-wide text-green-700/70">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Admin card */}
      {admin && (
        <div className="px-3 pt-4">
          <div
            className={`flex items-center gap-3 rounded-xl border border-green-200 bg-white p-2 ${rowAlign}`}
            title={adminName}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xs font-semibold text-green-800">
              {initials}
            </div>
            <div className={`min-w-0 ${labelClass}`}>
              <p className="truncate text-xs font-semibold text-slate-900">
                {adminName}
              </p>
              <p className="truncate text-[10px] uppercase tracking-wide text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-4">
        {navItems.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-l-4 px-3 py-2.5 text-sm transition-colors ${rowAlign} ${
                isActive
                  ? "border-green-600 bg-green-100 font-medium text-green-800"
                  : "border-transparent text-slate-600 hover:bg-green-100/70 hover:text-green-800"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className={labelClass}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      {admin && (
        <div className="border-t border-green-200 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 ${rowAlign}`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className={labelClass}>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}