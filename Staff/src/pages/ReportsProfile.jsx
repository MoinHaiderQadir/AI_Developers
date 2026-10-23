// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useStaff } from "../context/StaffContext";

// // Fix Leaflet icon issue
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { Link } from "react-router-dom";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const statusColors = {
//   new: "bg-gray-600/60",
//   verified: "bg-blue-600/60",
//   in_progress: "bg-yellow-500/90",
//   resolved: "bg-green-600/60",
// };

// const ReportsProfile = () => {
//   const { user } = useStaff();
//   const [shifts, setShifts] = useState([]);
//   const [selectedShift, setSelectedShift] = useState(null);

//   useEffect(() => {
//     const fetchShifts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/shift/get");
//         const assignedShifts = res.data.filter(
//           (shift) =>
//             shift.assignedTo?._id === user?._id && shift.status !== "resolved"
//         );
//         setShifts(assignedShifts);
//       } catch (err) {
//         console.error("Error fetching shifts:", err);
//       }
//     };

//     if (user?._id) {
//       fetchShifts();
//     }
//   }, [user]);

//   const handleStatusChange = async (shift) => {
//     let nextStatus = shift.status;

//     if (shift.status === "assigned") {
//       nextStatus = "in_progress";
//     } else if (shift.status === "in_progress") {
//       nextStatus = "resolved";
//     } else {
//       return;
//     }

//     if (!navigator.geolocation) {
//       alert("Geolocation not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           await axios.put(
//             `http://localhost:5000/api/shift/update/${shift._id}`,
//             {
//               status: nextStatus,
//               lat: latitude,
//               lng: longitude,
//             }
//           );

//           const updatedShifts = shifts.map((s) =>
//             s._id === shift._id
//               ? {
//                   ...s,
//                   status: nextStatus,
//                   incident: { ...s.incident, status: nextStatus },
//                 }
//               : s
//           );
//           setShifts(updatedShifts);
//           setSelectedShift((prev) =>
//             prev && prev._id === shift._id
//               ? {
//                   ...prev,
//                   status: nextStatus,
//                   incident: { ...prev.incident, status: nextStatus },
//                 }
//               : prev
//           );
//         } catch (err) {
//           console.error("Failed to update shift:", err);
//           alert("Shift update failed.");
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         alert("Failed to get your location.");
//       }
//     );
//   };

//   if (!user) {
//     return (
//       <div className="text-center py-20 text-lg text-gray-600">
//         🔐 Please log in to view your assigned incidents.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-4 sm:px-8 lg:px-20 py-10 bg-green-50 min-h-screen">
//       {/* Resolved Reports Button */}
//       <Link
//         to="/resolvedreports"
//         className="inline-block mb-8 text-white bg-green-700 hover:bg-green-900 px-5 py-2 rounded-xl shadow-md transition duration-300"
//       >
//         ✅ View Resolved Reports
//       </Link>

//       {!selectedShift ? (
//         <>
//           <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
//             📋 My Assigned Incidents
//           </h2>
//           <div className="grid grid-cols-1 gap-6">
//             {shifts.filter((shift) => shift.incident).length > 0 ? (
//               shifts
//                 .filter((shift) => shift.incident)
//                 .map((shift) => (
//                   <div
//                     key={shift._id}
//                     className="bg-white border-l-4 p-6 rounded-xl shadow-sm hover:shadow-lg border-green-600 transition duration-300"
//                   >
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                       <div className="flex flex-col gap-y-2">
//                         <h3 className="text-xl font-semibold text-green-800 capitalize">
//                           {shift.incident.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 capitalize">
//                           📂 <strong>Category:</strong>{" "}
//                           {shift.incident.category}
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1 capitalize">
//                           🏷 <strong>Status:</strong>{" "}
//                           <span
//                             className={`text-white px-4 py-1 rounded-3xl ${
//                               statusColors[shift.incident.status]
//                             }`}
//                           >
//                             {shift.status.replace("_", " ")}
//                           </span>
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => setSelectedShift(shift)}
//                         className="text-sm bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-md shadow transition"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <div className="text-center text-gray-500 text-md">
//                 No incidents assigned yet.
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
//           <button
//             onClick={() => setSelectedShift(null)}
//             className="mb-4 text-sm text-blue-600 hover:underline"
//           >
//             ← Back to all reports
//           </button>

//           {/* Centered Title */}
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
//             {selectedShift.incident.title}
//           </h2>

//           {/* Side-by-side Data and Image */}
//           <div className="flex flex-col md:flex-row gap-6 mb-6">
//             {/* Left: Data */}
//             <div className="flex-1 space-y-3">
//               <p className="text-md text-gray-700">
//                 📂 <strong>Category:</strong> {selectedShift.incident.category}
//               </p>
//               <p className="text-md text-gray-700">
//                 🏷 <strong>Status:</strong>{" "}
//                 <span
//                   className={`px-2 py-1 rounded text-white text-sm ${
//                     statusColors[selectedShift.incident.status]
//                   }`}
//                 >
//                   {selectedShift.status.replace("_", " ")}
//                 </span>
//               </p>
//               <p className="text-md text-gray-700">
//                 📝 <strong>Description:</strong>{" "}
//                 {selectedShift.incident.description}
//               </p>
//             </div>

//             {/* Right: Image */}
//             {selectedShift.incident.photoUrl && (
//               <div className="flex-1 max-w-md">
//                 <img
//                   src={selectedShift.incident.photoUrl}
//                   alt="Incident"
//                   className="w-full max-h-64 object-cover rounded-md shadow"
//                 />
//                 <a
//                   href={selectedShift.incident.photoUrl}
//                   download={`report_${selectedShift.incident._id}.jpg`}
//                   className="text-sm text-blue-600 hover:underline mt-2 inline-block"
//                 >
//                   ⬇ View Image
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* Map full width below */}
//           <div className="h-64 w-full rounded-lg overflow-hidden">
//             <MapContainer
//               center={[
//                 selectedShift.incident.latitude,
//                 selectedShift.incident.longitude,
//               ]}
//               zoom={16}
//               scrollWheelZoom={false}
//               className="h-full w-full"
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <Marker
//                 position={[
//                   selectedShift.incident.latitude,
//                   selectedShift.incident.longitude,
//                 ]}
//               />

//               {selectedShift.clockInLocation && (
//                 <Marker
//                   position={[
//                     selectedShift.clockInLocation.lat,
//                     selectedShift.clockInLocation.lng,
//                   ]}
//                   icon={L.icon({
//                     iconUrl:
//                       "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
//                     iconSize: [32, 32],
//                   })}
//                 />
//               )}

//               {selectedShift.clockOutLocation && (
//                 <Marker
//                   position={[
//                     selectedShift.clockOutLocation.lat,
//                     selectedShift.clockOutLocation.lng,
//                   ]}
//                   icon={L.icon({
//                     iconUrl:
//                       "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//                     iconSize: [32, 32],
//                   })}
//                 />
//               )}
//             </MapContainer>
//           </div>

//           {/* Shift Action Button */}
//           <div className="mt-6">
//             <button
//               onClick={() => handleStatusChange(selectedShift)}
//               disabled={selectedShift.status === "resolved"}
//               className={`px-6 py-2 rounded-md text-white ${
//                 selectedShift.status === "resolved"
//                   ? "bg-gray-500 cursor-not-allowed"
//                   : selectedShift.status === "in_progress"
//                   ? "bg-green-600 hover:bg-green-800"
//                   : "bg-yellow-500 hover:bg-yellow-700"
//               } transition`}
//             >
//               {selectedShift.status === "resolved"
//                 ? "Resolved (Can't Change)"
//                 : selectedShift.status === "in_progress"
//                 ? "Clock Out"
//                 : "Clock In"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportsProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useStaff } from "../context/StaffContext";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ClipboardList,
  FolderOpen,
  FileText,
  Download,
  Lock,
  Inbox,
  LogIn,
  LogOut,
  ChevronRight,
  MapPin,
} from "lucide-react";

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

// One green family: lighter = earlier in the workflow, darker = further along
const statusColors = {
  new: "bg-green-50 text-green-700 ring-green-200",
  verified: "bg-green-100 text-green-800 ring-green-300",
  in_progress: "bg-green-600 text-white ring-green-600",
  resolved: "bg-green-900 text-white ring-green-900",
};
const defaultStatusColor = "bg-gray-50 text-gray-600 ring-gray-200";

const steps = [
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
];

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

  const cardClass = "rounded-xl border border-gray-200 bg-white shadow-sm";
  const labelClass =
    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500";

  const StatusBadge = ({ incidentStatus, label }) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
        statusColors[incidentStatus] || defaultStatusColor
      }`}
    >
      {label}
    </span>
  );

  // Visual progress: Assigned -> In Progress -> Resolved
  const ProgressSteps = ({ status }) => {
    const found = steps.findIndex((s) => s.key === status);
    const current = found === -1 ? 0 : found;
    return (
      <ol className="flex w-full items-center">
        {steps.map((step, i) => {
          const done = i < current || status === "resolved";
          const active = i === current && status !== "resolved";
          return (
            <li
              key={step.key}
              className={`flex items-center ${
                i < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    done
                      ? "border-green-600 bg-green-600 text-white"
                      : active
                      ? "border-green-600 bg-green-50 text-green-700 ring-4 ring-green-100"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={`text-sm ${
                    done || active
                      ? "font-semibold text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={`mx-3 h-0.5 flex-1 rounded-full ${
                    i < current || status === "resolved"
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div
          className={`${cardClass} flex flex-col items-center px-10 py-8 text-center`}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
            <Lock className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <p className="text-base font-semibold text-gray-900">Please log in</p>
          <p className="mt-1 text-sm text-gray-500">
            Please log in to view your assigned incidents.
          </p>
        </div>
      </div>
    );
  }

  const visibleShifts = shifts.filter((shift) => shift.incident);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {!selectedShift ? (
          <>
            {/* Page header */}
            <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
                  <ClipboardList className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      My Assigned Incidents
                    </h1>
                    <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-800">
                      {visibleShifts.length} open
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Incidents assigned to you that are still open.
                  </p>
                </div>
              </div>

              <Link
                to="/resolvedreports"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
                View Resolved Reports
              </Link>
            </div>

            {/* Incident list */}
            <div className="grid grid-cols-1 gap-4">
              {visibleShifts.length > 0 ? (
                visibleShifts.map((shift) => (
                  <div
                    key={shift._id}
                    className={`${cardClass} group p-5 transition hover:border-green-300 hover:shadow-md`}
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="flex items-start gap-4">
                        <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-green-600" />
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold capitalize text-gray-900">
                            {shift.incident.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                            <p className="flex items-center gap-1.5 capitalize">
                              <FolderOpen
                                className="h-4 w-4 text-gray-400"
                                strokeWidth={1.75}
                              />
                              <span className="font-medium text-gray-700">
                                Category:
                              </span>
                              {shift.incident.category}
                            </p>
                            <StatusBadge
                              incidentStatus={shift.incident.status}
                              label={shift.status.replaceAll("_", " ")}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedShift(shift)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* Progress */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <ProgressSteps status={shift.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={`${cardClass} flex flex-col items-center px-6 py-16 text-center`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400">
                    <Inbox className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    No incidents assigned yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    New assignments will appear here.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Back */}
            <button
              onClick={() => setSelectedShift(null)}
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all reports
            </button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Title card */}
                <div className={`${cardClass} p-6`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-6 w-1 shrink-0 rounded-full bg-green-600" />
                      <h2 className="text-xl font-semibold capitalize text-gray-900 sm:text-2xl">
                        {selectedShift.incident.title}
                      </h2>
                    </div>
                    <StatusBadge
                      incidentStatus={selectedShift.incident.status}
                      label={selectedShift.status.replaceAll("_", " ")}
                    />
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <ProgressSteps status={selectedShift.status} />
                  </div>
                </div>

                {/* Details card */}
                <div className={`${cardClass} p-6`}>
                  <div className="flex flex-col gap-8 md:flex-row">
                    <dl className="flex-1 space-y-5">
                      <div>
                        <dt className={labelClass}>
                          <FolderOpen className="h-4 w-4" strokeWidth={1.75} />
                          Category
                        </dt>
                        <dd className="mt-1.5 text-sm capitalize text-gray-800">
                          {selectedShift.incident.category}
                        </dd>
                      </div>
                      <div>
                        <dt className={labelClass}>
                          <FileText className="h-4 w-4" strokeWidth={1.75} />
                          Description
                        </dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-gray-700">
                          {selectedShift.incident.description}
                        </dd>
                      </div>
                    </dl>

                    {selectedShift.incident.photoUrl && (
                      <div className="w-full md:max-w-xs">
                        <img
                          src={selectedShift.incident.photoUrl}
                          alt="Incident"
                          className="max-h-64 w-full rounded-lg border border-gray-200 object-cover"
                        />
                        <a
                          href={selectedShift.incident.photoUrl}
                          download={`report_${selectedShift.incident._id}.jpg`}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition hover:text-green-900 hover:underline"
                        >
                          <Download className="h-4 w-4" strokeWidth={1.75} />
                          Download image
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map card */}
                <div className={`${cardClass} p-6`}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className={labelClass}>
                      <MapPin className="h-4 w-4" strokeWidth={1.75} />
                      Location
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
                        Incident
                      </span>
                      {selectedShift.clockInLocation && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          Clock in
                        </span>
                      )}
                      {selectedShift.clockOutLocation && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                          Clock out
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-0 h-72 w-full overflow-hidden rounded-lg border border-gray-200">
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
                </div>
              </div>

              {/* Action sidebar */}
              <div className="lg:col-span-1">
                <div className={`${cardClass} p-6 lg:sticky lg:top-6`}>
                  <h3 className="text-base font-semibold text-gray-900">
                    Shift Action
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedShift.status === "resolved"
                      ? "This shift is complete and can no longer be changed."
                      : selectedShift.status === "in_progress"
                      ? "Clock out when you have finished this incident. Your location will be recorded."
                      : "Clock in when you arrive at the incident. Your location will be recorded."}
                  </p>

                  <button
                    onClick={() => handleStatusChange(selectedShift)}
                    disabled={selectedShift.status === "resolved"}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
                      selectedShift.status === "resolved"
                        ? "cursor-not-allowed bg-gray-400"
                        : selectedShift.status === "in_progress"
                        ? "bg-green-800 hover:bg-green-900"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {selectedShift.status === "resolved" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Resolved (Can't Change)
                      </>
                    ) : selectedShift.status === "in_progress" ? (
                      <>
                        <LogOut className="h-4 w-4" />
                        Clock Out
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Clock In
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsProfile;