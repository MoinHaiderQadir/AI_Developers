import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        setMessage("✅ Shift created successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error || "❌ Failed to create shift.";
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

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Create New Shift
        </h2>

        {message && (
          <div
            className={`mb-6 p-4 text-sm rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assigned Staff */}
          <div>
            <label className="block text-green-800 font-medium mb-1">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="" disabled>
                Select Staff
              </option>
              {staff.map((person) => (
                <option key={person._id} value={person._id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-green-800 font-medium mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-green-800 font-medium mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
            >
              Create Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
