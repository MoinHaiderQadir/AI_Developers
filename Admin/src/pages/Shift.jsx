import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Shift = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shift/get");
      setShifts(res.data);
    } catch (err) {
      console.error("Failed to fetch shifts", err);
    }
  };

  const renderMap = (coords, label) =>
    coords?.lat && coords?.lng ? (
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={15}
        style={{ height: "200px", borderRadius: "0.5rem" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>{label} Location</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <p className="text-sm text-gray-500 italic">
        No {label} location recorded.
      </p>
    );

  if (selectedShift) {
    return (
      <div className="min-h-screen bg-green-50 px-4 py-8">
        <button
          onClick={() => setSelectedShift(null)}
          className="mb-6 flex items-center text-emerald-700 hover:text-emerald-900"
        >
          <FaArrowLeft className="mr-2" /> Back to Shifts
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            Shift Details
          </h2>
          <div className="space-y-8">
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <p>
                <strong>Employee:</strong> {selectedShift.assignedTo?.name}
              </p>
              <p>
                <strong>Incident:</strong> {selectedShift.incident?.title}
              </p>
              <p>
                <strong>Status:</strong> {selectedShift.status}
              </p>
              <p>
                <strong>Start:</strong> {selectedShift.startTime?.slice(0, 16)}
              </p>
              <p>
                <strong>End:</strong> {selectedShift.endTime?.slice(0, 16)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Clock-In Location
                </h4>
                {renderMap(selectedShift.clockInLocation, "Clock-In")}
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Clock-Out Location
                </h4>
                {renderMap(selectedShift.clockOutLocation, "Clock-Out")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-emerald-900 mb-6">
        Assigned Shifts
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <thead className="bg-emerald-100 text-emerald-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Incident
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Start</th>
              <th className="px-6 py-3 text-left text-sm font-medium">End</th>
              <th className="px-6 py-3 text-center text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {shifts.map((shift) => (
              <tr key={shift._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900">
                  {shift.assignedTo?.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {shift.incident?.title}
                </td>
                <td className="px-6 py-4 capitalize text-gray-700">
                  {shift.status}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {shift.startTime?.slice(0, 16)}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {shift.endTime?.slice(0, 16)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedShift(shift)}
                    title="View"
                    className="text-emerald-600 hover:text-emerald-900"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
            {shifts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No shifts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shift;
