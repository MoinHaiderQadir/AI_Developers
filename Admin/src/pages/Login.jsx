// import { useState } from "react";
// import { useAdmin } from "../context/AdminContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const { setAdmin } = useAdmin();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/user/login", {
//         email: form.email,
//         password: form.password,
//       });
//       setAdmin(res.data.user); // save admin in context + localStorage
//       alert("Logged in successfully!");
//       console.log(res.data.user);
//       console.log(res.data.user.role);
//       navigate("/"); // redirect to dashboard after login
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="h-full w-full bg-gradient-to-br from-green-200 via-green-300 to-green-500 flex items-center justify-center px-4 ">
//       <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl ">
//         <div className="hidden md:flex items-center justify-center w-1/2 p-4">
//           <img
//             src="/Images/AdminLogin[1].png"
//             alt="Login Illustration"
//             className="max-w-full h-auto"
//           />
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="w-full md:w-1/2 flex flex-col justify-center"
//         >
//           <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//             EcoTracker Admin Login
//           </h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full mb-4 p-3 border rounded-xl focus:outline-green-600"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full mb-6 p-3 border rounded-xl focus:outline-green-600"
//             required
//           />
//           <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl font-semibold transition">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Leaf, Mail, Lock } from "lucide-react";

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

  const inputClass =
    "block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 hover:border-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-10">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:flex-row">
        {/* Illustration panel */}
        <div className="hidden w-1/2 flex-col items-center justify-center border-r border-green-100 bg-green-50 p-10 md:flex">
          <img
            src="/Images/AdminLogin[1].png"
            alt="Login Illustration"
            className="h-auto max-w-full"
          />
          <p className="mt-6 max-w-xs text-center text-sm text-green-800/80">
            Manage incidents, staff and shifts from one place.
          </p>
        </div>

        {/* Form panel */}
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-12 md:w-1/2">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {/* Brand */}
            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm">
                <Leaf className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                EcoTracker Admin Login
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign in to your account to continue.
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <button className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}