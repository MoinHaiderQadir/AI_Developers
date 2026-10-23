import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useAuth } from "../context/UserContext";

// Fix Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons for different statuses
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="${color}" stroke="#fff" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="#fff"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};

const statusColors = {
  new: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300", icon: "🆕", map: "#9CA3AF" },
  verified: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", icon: "✅", map: "#3B82F6" },
  in_progress: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", icon: "🔄", map: "#F59E0B" },
  resolved: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", icon: "✔️", map: "#10B981" },
};

const statusLabels = {
  new: "New Report",
  verified: "Verified",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid"); // 'grid' or 'map'
  const { user } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/report/get/${user.id}`
        );
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [user.id]);

  const filteredReports = filter === "all" 
    ? reports 
    : reports.filter(report => report.status === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!selectedReport ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                My Reported Incidents
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                View and manage all your submitted reports in one place
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all" ? "bg-green-500 text-white shadow-md" : "bg-white text-gray-700 border border-gray-200"}`}
                >
                  All Reports
                </button>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${filter === key ? statusColors[key].bg + " " + statusColors[key].text + " border " + statusColors[key].border + " shadow-md" : "bg-white text-gray-700 border border-gray-200"}`}
                  >
                    <span className="mr-1">{statusColors[key].icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${view === "grid" ? "bg-green-100 text-green-800" : "text-gray-500"}`}
                  aria-label="Grid view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`p-2 rounded-md transition-all ${view === "map" ? "bg-green-100 text-green-800" : "text-gray-500"}`}
                  aria-label="Map view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </button>
              </div>
            </div>

            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {filter === "all" ? "No reports yet" : `No ${statusLabels[filter]} reports`}
                </h3>
                <p className="text-gray-500 mb-6">
                  {filter === "all" 
                    ? "You haven't submitted any incident reports yet." 
                    : `You don't have any ${statusLabels[filter].toLowerCase()} reports.`}
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Report an Issue
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {report.title}
                        </h3>
                        <span
                          className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[report.status].bg} ${statusColors[report.status].text} ${statusColors[report.status].border} border`}
                        >
                          {statusColors[report.status].icon}{" "}
                          <span className="ml-1 capitalize">
                            {report.status.replace("_", " ")}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                        {report.category}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {report.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        {report.photoUrl && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            Has photo
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                      >
                        View Details
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 h-96 sm:h-[500px]">
                <MapContainer
                  center={[reports[0]?.latitude || 0, reports[0]?.longitude || 0]}
                  zoom={12}
                  scrollWheelZoom={true}
                  className="h-full w-full rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredReports.map((report) => (
                    <Marker
                      key={report._id}
                      position={[report.latitude, report.longitude]}
                      icon={createCustomIcon(statusColors[report.status].map)}
                      eventHandlers={{
                        click: () => setSelectedReport(report),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{report.status.replace("_", " ")}</p>
                          <button 
                            className="mt-2 text-sm text-green-600 font-medium"
                            onClick={() => setSelectedReport(report)}
                          >
                            View details →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <button
                onClick={() => setSelectedReport(null)}
                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-200 mb-4"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to all reports
              </button>

              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedReport.title}
                </h1>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Submitted: {new Date(selectedReport.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      Report Details
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500 mb-1">
                          Category
                        </span>
                        <div className="flex items-center text-gray-800">
                          <svg
                            className="w-4 h-4 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            ></path>
                          </svg>
                          {selectedReport.category}
                        </div>
                      </div>

                      <div>
                        <span className="block text-sm font-medium text-gray-500 mb-1">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedReport.status].bg} ${statusColors[selectedReport.status].text} ${statusColors[selectedReport.status].border} border`}
                        >
                          {statusColors[selectedReport.status].icon}{" "}
                          <span className="ml-1 capitalize">
                            {selectedReport.status.replace("_", " ")}
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="block text-sm font-medium text-gray-500 mb-1">
                          Description
                        </span>
                        <p className="text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                          {selectedReport.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Incident Photo
                    </h2>

                    <div className="flex flex-col items-center justify-center">
                      {selectedReport.photoUrl ? (
                        <>
                          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-3">
                            <img
                              src={selectedReport.photoUrl}
                              alt="Incident"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <a
                            href={selectedReport.photoUrl}
                            download={`report_${selectedReport._id}.jpg`}
                            className="inline-flex items-center text-sm text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              ></path>
                            </svg>
                            Download Image
                          </a>
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-300 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <p>No image uploaded for this report</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Incident Location
                </h2>
                <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200">
                  <MapContainer
                    center={[
                      selectedReport.latitude,
                      selectedReport.longitude,
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
                        selectedReport.latitude,
                        selectedReport.longitude,
                      ]}
                      icon={createCustomIcon(statusColors[selectedReport.status].map)}
                    />
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;