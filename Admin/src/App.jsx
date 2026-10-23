import { Routes, Route, Navigate } from "react-router-dom";

import Staff from "./pages/Staff";
import Shift from "./pages/Shift";
import Sidebar from "./components/SideBar";
import AdminDashboard from "./pages/AdminDashBoard";
import Reports from "./pages/Reports";
import DetailReports from "./pages/DetailReports";
import CreateStaff from "./pages/CreateShift";
import Login from "./pages/Login";

import { useAdmin } from "./context/AdminContext";
import StaffDetail from "./pages/StaffDetail";
import Navbar from "./components/Navbar";
import CreateShift from "./pages/CreateShift";

const App = () => {
  const { admin, isLoggedIn } = useAdmin();

  // Helper: only allow access if logged in and admin role === 'admin'
  const RequireAuth = ({ children }) => {
    if (!isLoggedIn || admin.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="flex min-h-screen">
      {/* Show Sidebar only if logged in admin */}
      {isLoggedIn && admin.role === "admin" && <Sidebar />}

      <main
        className={`flex-1 bg-gray-100 p-6 overflow-y-auto ${
          isLoggedIn && admin.role === "admin" ? "" : "w-full"
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/staff"
            element={
              <RequireAuth>
                <Staff />
              </RequireAuth>
            }
          />
          <Route
            path="/shift"
            element={
              <RequireAuth>
                <Shift />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Reports />
              </RequireAuth>
            }
          />
          <Route
            path="/report/:id"
            element={
              <RequireAuth>
                <DetailReports />
              </RequireAuth>
            }
          />
          <Route
            path="/create-shift/:incidentId"
            element={
              <RequireAuth>
                <CreateShift />
              </RequireAuth>
            }
          />
          <Route
            path="/staff/:id"
            element={
              <RequireAuth>
                <StaffDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
