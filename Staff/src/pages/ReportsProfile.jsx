import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStaff } from "../context/StaffContext";

// Fix Leaflet icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const statusColors = {
  new: "bg-gray-600/60",
  verified: "bg-blue-600/60",
  in_progress: "bg-yellow-500/90",
  resolved: "bg-green-600/60",
};

const ReportsProfile = () => {
  const { user } = useStaff();
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shift/get");
        const assignedShifts = res.data.filter(
          (shift) =>
            shift.assignedTo?._id === user?._id && shift.status !== "resolved"
        );
        setShifts(assignedShifts);
      } catch (err) {
        console.error("Error fetching shifts:", err);
      }
    };

    if (user?._id) {
      fetchShifts();
    }
  }, [user]);

  const handleStatusChange = async (shift) => {
    let nextStatus = shift.status;

    if (shift.status === "assigned") {
      nextStatus = "in_progress";
    } else if (shift.status === "in_progress") {
      nextStatus = "resolved";
    } else {
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await axios.put(
            `http://localhost:5000/api/shift/update/${shift._id}`,
            {
              status: nextStatus,
              lat: latitude,
              lng: longitude,
            }
          );

          const updatedShifts = shifts.map((s) =>
            s._id === shift._id
              ? {
                  ...s,
                  status: nextStatus,
                  incident: { ...s.incident, status: nextStatus },
                }
              : s
          );
          setShifts(updatedShifts);
          setSelectedShift((prev) =>
            prev && prev._id === shift._id
              ? {
                  ...prev,
                  status: nextStatus,
                  incident: { ...prev.incident, status: nextStatus },
                }
              : prev
          );
        } catch (err) {
          console.error("Failed to update shift:", err);
          alert("Shift update failed.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get your location.");
      }
    );
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        🔐 Please log in to view your assigned incidents.
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-20 py-10 bg-green-50 min-h-screen">
      {/* Resolved Reports Button */}
      <Link
        to="/resolvedreports"
        className="inline-block mb-8 text-white bg-green-700 hover:bg-green-900 px-5 py-2 rounded-xl shadow-md transition duration-300"
      >
        ✅ View Resolved Reports
      </Link>

      {!selectedShift ? (
        <>
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
            📋 My Assigned Incidents
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {shifts.filter((shift) => shift.incident).length > 0 ? (
              shifts
                .filter((shift) => shift.incident)
                .map((shift) => (
                  <div
                    key={shift._id}
                    className="bg-white border-l-4 p-6 rounded-xl shadow-sm hover:shadow-lg border-green-600 transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex flex-col gap-y-2">
                        <h3 className="text-xl font-semibold text-green-800 capitalize">
                          {shift.incident.title}
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          📂 <strong>Category:</strong>{" "}
                          {shift.incident.category}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 capitalize">
                          🏷 <strong>Status:</strong>{" "}
                          <span
                            className={`text-white px-4 py-1 rounded-3xl ${
                              statusColors[shift.incident.status]
                            }`}
                          >
                            {shift.status.replace("_", " ")}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedShift(shift)}
                        className="text-sm bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-md shadow transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500 text-md">
                No incidents assigned yet.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedShift(null)}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to all reports
          </button>

          {/* Centered Title */}
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            {selectedShift.incident.title}
          </h2>

          {/* Side-by-side Data and Image */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Left: Data */}
            <div className="flex-1 space-y-3">
              <p className="text-md text-gray-700">
                📂 <strong>Category:</strong> {selectedShift.incident.category}
              </p>
              <p className="text-md text-gray-700">
                🏷 <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    statusColors[selectedShift.incident.status]
                  }`}
                >
                  {selectedShift.status.replace("_", " ")}
                </span>
              </p>
              <p className="text-md text-gray-700">
                📝 <strong>Description:</strong>{" "}
                {selectedShift.incident.description}
              </p>
            </div>

            {/* Right: Image */}
            {selectedShift.incident.photoUrl && (
              <div className="flex-1 max-w-md">
                <img
                  src={selectedShift.incident.photoUrl}
                  alt="Incident"
                  className="w-full max-h-64 object-cover rounded-md shadow"
                />
                <a
                  href={selectedShift.incident.photoUrl}
                  download={`report_${selectedShift.incident._id}.jpg`}
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                >
                  ⬇ View Image
                </a>
              </div>
            )}
          </div>

          {/* Map full width below */}
          <div className="h-64 w-full rounded-lg overflow-hidden">
            <MapContainer
              center={[
                selectedShift.incident.latitude,
                selectedShift.incident.longitude,
              ]}
              zoom={16}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  selectedShift.incident.latitude,
                  selectedShift.incident.longitude,
                ]}
              />

              {selectedShift.clockInLocation && (
                <Marker
                  position={[
                    selectedShift.clockInLocation.lat,
                    selectedShift.clockInLocation.lng,
                  ]}
                  icon={L.icon({
                    iconUrl:
                      "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                    iconSize: [32, 32],
                  })}
                />
              )}

              {selectedShift.clockOutLocation && (
                <Marker
                  position={[
                    selectedShift.clockOutLocation.lat,
                    selectedShift.clockOutLocation.lng,
                  ]}
                  icon={L.icon({
                    iconUrl:
                      "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    iconSize: [32, 32],
                  })}
                />
              )}
            </MapContainer>
          </div>

          {/* Shift Action Button */}
          <div className="mt-6">
            <button
              onClick={() => handleStatusChange(selectedShift)}
              disabled={selectedShift.status === "resolved"}
              className={`px-6 py-2 rounded-md text-white ${
                selectedShift.status === "resolved"
                  ? "bg-gray-500 cursor-not-allowed"
                  : selectedShift.status === "in_progress"
                  ? "bg-green-600 hover:bg-green-800"
                  : "bg-yellow-500 hover:bg-yellow-700"
              } transition`}
            >
              {selectedShift.status === "resolved"
                ? "Resolved (Can't Change)"
                : selectedShift.status === "in_progress"
                ? "Clock Out"
                : "Clock In"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsProfile;
