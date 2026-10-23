// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CreateShift() {
//   const [staff, setStaff] = useState([]);
//   const { incidentId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     assignedTo: "",
//     startTime: "",
//     endTime: "",
//   });

//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/staff/get");
//         setStaff(res.data.staff);
//       } catch (error) {
//         console.error("Failed to fetch staff", error.message);
//       }
//     };
//     fetchStaff();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       assignedTo: formData.assignedTo,
//       incident: incidentId,
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/shift/create",
//         payload
//       );
//       if (res.status === 201 || res.status === 200) {
//         setMessage("✅ Shift created successfully!");
//         setMessageType("success");
//         setTimeout(() => navigate("/"), 1500);
//       }
//     } catch (error) {
//       const errMsg =
//         error.response?.data?.error || "❌ Failed to create shift.";
//       setMessage(errMsg);
//       setMessageType("error");
//     }
//   };

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   return (
//     <div className="max-w-2xl mx-auto mt-12 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//         <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
//           Create New Shift
//         </h2>

//         {message && (
//           <div
//             className={`mb-6 p-4 text-sm rounded-lg ${
//               messageType === "success"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Assigned Staff */}
//           <div>
//             <label className="block text-green-800 font-medium mb-1">
//               Assign To
//             </label>
//             <select
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//             >
//               <option value="" disabled>
//                 Select Staff
//               </option>
//               {staff.map((person) => (
//                 <option key={person._id} value={person._id}>
//                   {person.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Start Time */}
//           <div>
//             <label className="block text-green-800 font-medium mb-1">
//               Start Time
//             </label>
//             <input
//               type="datetime-local"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           {/* End Time */}
//           <div>
//             <label className="block text-green-800 font-medium mb-1">
//               End Time
//             </label>
//             <input
//               type="datetime-local"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center pt-4">
//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
//             >
//               Create Shift
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  ChevronDown,
} from "lucide-react";

export default function CreateShift() {
  const [staff, setStaff] = useState([]);
  const { incidentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    assignedTo: "",
    startTime: "",
    endTime: "",
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/staff/get");
        setStaff(res.data.staff);
      } catch (error) {
        console.error("Failed to fetch staff", error.message);
      }
    };
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      assignedTo: formData.assignedTo,
      incident: incidentId,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/shift/create",
        payload
      );
      if (res.status === 201 || res.status === 200) {
        setMessage("Shift created successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Failed to create shift.";
      setMessage(errMsg);
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const inputClass =
    "block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 hover:border-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
            <CalendarClock className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create New Shift
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Assign a staff member and schedule a shift for this incident.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-start gap-3 border-b border-gray-200 px-6 py-4 sm:px-8">
            <span className="mt-1 h-5 w-1 rounded-full bg-green-600" />
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Shift Details
              </h2>
              <p className="text-sm text-gray-500">
                All fields marked with * are required.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8">
            {message && (
              <div
                role="alert"
                className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                )}
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Assigned Staff */}
              <div>
                <label htmlFor="assignedTo" className={labelClass}>
                  Assign To <span className="text-green-700">*</span>
                </label>
                <div className="relative">
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none pr-10 ${
                      formData.assignedTo === "" ? "text-gray-400" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select staff member
                    </option>
                    {staff.map((person) => (
                      <option
                        key={person._id}
                        value={person._id}
                        className="text-gray-900"
                      >
                        {person.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Time fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="startTime" className={labelClass}>
                    Start Time <span className="text-green-700">*</span>
                  </label>
                  <input
                    id="startTime"
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="endTime" className={labelClass}>
                    End Time{" "}
                    <span className="font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="endTime"
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  Create Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}