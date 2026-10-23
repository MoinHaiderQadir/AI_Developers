import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStaff } from "../context/StaffContext";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ staffId: "", email: "" });
  const [error, setError] = useState("");

  const { user, setUser } = useStaff();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/reportsprofile");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/staff/stafflogin",
        form
      );

      if (response.data.success) {
        alert("✅ Login successful!");
        setUser(response.data.staff);
        localStorage.setItem("staff", JSON.stringify(response.data.staff));
        navigate("/reportsprofile");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "❌ Login failed. Please check your credentials.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-300 to-green-500 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl">
        <div className="hidden sm:flex sm:w-[30%] items-center justify-center p-4">
          <img
            src="/UserLogin[1].png"
            alt="Login Illustration"
            className="max-w-full h-auto"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[70%] flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Staff Login
          </h2>

          <input
            type="text"
            name="staffId"
            placeholder="Enter your Staff ID"
            value={form.staffId}
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-6 p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105 active:scale-95"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-green-900">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-800 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
