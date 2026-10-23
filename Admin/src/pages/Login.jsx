import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { setAdmin } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email: form.email,
        password: form.password,
      });
      setAdmin(res.data.user); // save admin in context + localStorage
      alert("Logged in successfully!");
      console.log(res.data.user);
      console.log(res.data.user.role);
      navigate("/"); // redirect to dashboard after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-green-200 via-green-300 to-green-500 flex items-center justify-center px-4 ">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl ">
        <div className="hidden md:flex items-center justify-center w-1/2 p-4">
          <img
            src="/Images/AdminLogin[1].png"
            alt="Login Illustration"
            className="max-w-full h-auto"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            EcoTracker Admin Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mb-4 p-3 border rounded-xl focus:outline-green-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-6 p-3 border rounded-xl focus:outline-green-600"
            required
          />
          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl font-semibold transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
