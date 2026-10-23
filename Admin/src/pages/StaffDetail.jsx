import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StaffDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/staff/getstaff/${id}`
        );
        setStaff(res.data.staff);
      } catch (err) {
        console.error("Error fetching staff details", err.message);
      }
    };
    fetchStaff();
  }, [id]);

  if (!staff)
    return <div className="text-center py-20 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full text-center">
        <img
          src={staff.photo || "https://via.placeholder.com/150"}
          alt="Staff"
          className="w-28 h-28 rounded-full object-cover border-2 border-emerald-600 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-emerald-800">{staff.name}</h2>
        <p className="text-gray-700 mt-2">{staff.email}</p>
        <p className="text-gray-700">{staff.phone}</p>
        <p className="text-gray-600 text-sm mt-4">
          <strong>Staff ID:</strong> {staff.staffId}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Address:</strong> {staff.address}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default StaffDetail;
