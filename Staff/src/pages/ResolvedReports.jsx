// src/pages/ResolvedReports.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaff } from "../context/StaffContext";

const ResolvedReports = () => {
  const { user } = useStaff();
  const [resolvedShifts, setResolvedShifts] = useState([]);

  useEffect(() => {
    const fetchResolvedShifts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shift/get");
        const filtered = res.data.filter(
          (shift) =>
            shift.assignedTo?._id === user?._id && shift.status == "resolved"
        );
        setResolvedShifts(filtered);
      } catch (err) {
        console.error("Error fetching resolved shifts:", err);
      }
    };

    if (user?._id) {
      fetchResolvedShifts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        🔐 Please log in to view your resolved incidents.
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-20 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        ✅ Resolved Incidents
      </h2>
      {resolvedShifts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {resolvedShifts.map((shift) => (
            <div
              key={shift._id}
              className="bg-white border-l-4 p-6 rounded-xl shadow-sm border-green-700"
            >
              <h3 className="text-xl font-semibold text-green-800 capitalize">
                {shift.incident?.title || "No Title"}
              </h3>
              <p className="text-sm text-gray-600 capitalize">
                📂 <strong>Category:</strong> {shift.incident?.category}
              </p>
              <p className="text-sm text-gray-600 mt-1 capitalize">
                🏷 <strong>Status:</strong>{" "}
                <span className="bg-green-600 text-white px-4 py-1 rounded-3xl">
                  Resolved
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-md">
          No resolved incidents found.
        </div>
      )}
    </div>
  );
};

export default ResolvedReports;
