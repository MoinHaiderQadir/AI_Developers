import { Routes, Route } from "react-router-dom";
import ReportsProfile from "./pages/ReportsProfile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ResolvedReports from "./pages/ResolvedReports";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reportsprofile" element={<ReportsProfile />} />
        <Route path="/resolvedreports" element={<ResolvedReports />} />
      </Routes>
    </div>
  );
};

export default App;
