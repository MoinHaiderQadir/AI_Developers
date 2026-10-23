import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";
import UserDashboard from "./pages/UserDashboard";
import { useAuth } from "./context/UserContext";

const App = () => {
  const { user } = useAuth(); // ✅ Use context instead of localStorage

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/report"
            element={user ? <Report /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/dashboard"
            element={
              user ? <UserDashboard /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
