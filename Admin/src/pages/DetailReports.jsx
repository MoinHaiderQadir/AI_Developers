// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const DetailReports = () => {
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [verifying, setVerifying] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/report/getreport/${id}` // <-- Template literal backticks needed
//       );
//       if (response.status === 200) {
//         setReport(response.data.reports);
//       }
//     } catch (error) {
//       console.error("Error fetching report", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       setVerifying(true);
//       const response = await axios.post(
//         `http://localhost:5000/api/report/change/${id}` // <-- Template literal backticks needed
//       );
//       if (response.status === 200) {
//         fetchData(); // Refresh the report status after verification
//       }
//     } catch (error) {
//       console.error("Error verifying report", error);
//     } finally {
//       setVerifying(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // console.log(report); // Optional: might log null on first render
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-emerald-600 text-xl font-semibold">
//         Loading report details...
//       </div>
//     );
//   }

//   if (!report) {
//     return (
//       <div className="text-center text-red-600 font-semibold mt-10">
//         Failed to load report details.
//       </div>
//     );
//   }

//   const hasValidCoordinates =
//     typeof report.latitude === "number" &&
//     typeof report.longitude === "number" &&
//     !isNaN(report.latitude) &&
//     !isNaN(report.longitude);

//   return (
//     <div className="min-h-screen via-white to-emerald-50 p-6">
//       <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 space-y-6">
//         <h2 className="text-5xl font-bold text-center text-emerald-800 mb-6">
//           {" "}
//           {/* fixed typo: font-=bold → font-bold */}
//           Report Details
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Report Details */}
//           <div className="space-y-5">
//             <h3 className="text-3xl font-semibold text-gray-800">
//               {report.title}
//             </h3>
//             <p className="text-gray-600">
//               <span className="font-semibold">Reporter:</span>{" "}
//               {report.createdBy?.username || "Anonymous"}
//             </p>
//             <p className="text-gray-700">
//               <span className="font-semibold">Description:</span>{" "}
//               {report.description}
//             </p>
//             <p>
//               <span className="font-semibold">Status:</span>{" "}
//               <span
//                 className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium transition ${
//                   report.status?.toLowerCase() === "new"
//                     ? "bg-gray-200 text-gray-800"
//                     : report.status?.toLowerCase() === "verified"
//                     ? "bg-blue-100 text-blue-800"
//                     : "bg-green-100 text-green-800"
//                 }`}
//               >
//                 {report.status}
//               </span>
//             </p>

//             {/* Verify Report button if status is 'new' */}
//             {report.status?.toLowerCase() === "new" && (
//               <button
//                 onClick={handleVerify}
//                 disabled={verifying}
//                 className={`mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition duration-300 ${
//                   verifying ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <FaCheckCircle className="text-lg" />
//                 {verifying ? "Verifying..." : "Verify Report"}
//               </button>
//             )}

//             {/* Create Shift button if status is 'verified' */}
//             {report.status?.toLowerCase() === "verified" && (
//               <button
//                 onClick={() => navigate(`/create-shift/${report._id}`)} // <-- backticks needed here as well
//                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition duration-300"
//               >
//                 Create Shift
//               </button>
//             )}

//             {report.photoUrl ? (
//               <img
//                 src={report.photoUrl}
//                 alt={`Report: ${report.title}`} // <-- backticks for template literal
//                 className="w-full h-64 object-cover rounded-xl shadow-lg border border-gray-200"
//               />
//             ) : (
//               <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl shadow-inner border border-gray-200">
//                 No image provided
//               </div>
//             )}
//           </div>

//           {/* Map Section */}
//           {hasValidCoordinates ? (
//             <div className="h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">
//               <MapContainer
//                 center={[report.latitude, report.longitude]}
//                 zoom={13}
//                 scrollWheelZoom={false}
//                 className="w-full h-full"
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />
//                 <Marker position={[report.latitude, report.longitude]}>
//                   <Popup>{report.title}</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           ) : (
//             <div className="h-80 flex items-center justify-center text-gray-500 border border-gray-200 rounded-xl shadow-inner">
//               Location data not available
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailReports;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegImage, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DetailReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/report/getreport/${id}`
      );
      if (response.status === 200) {
        setReport(response.data.reports);
      }
    } catch (error) {
      console.error("Error fetching report", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const response = await axios.post(
        `http://localhost:5000/api/report/change/${id}`
      );
      if (response.status === 200) {
        fetchData(); // Refresh the report status after verification
      }
    } catch (error) {
      console.error("Error verifying report", error);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
        <span className="text-sm font-medium text-slate-500">
          Loading report details...
        </span>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-xl border border-slate-200 bg-white px-10 py-8 text-center shadow-sm">
          <p className="text-base font-semibold text-slate-800">
            Failed to load report details
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const hasValidCoordinates =
    typeof report.latitude === "number" &&
    typeof report.longitude === "number" &&
    !isNaN(report.latitude) &&
    !isNaN(report.longitude);

  const statusLower = report.status?.toLowerCase();

  const statusClass =
    statusLower === "new"
      ? "bg-slate-100 text-slate-700 ring-slate-200"
      : statusLower === "verified"
      ? "bg-blue-50 text-blue-700 ring-blue-200"
      : statusLower === "in_progress"
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-emerald-50 text-emerald-700 ring-emerald-200";

  const cardClass = "rounded-xl border border-slate-200 bg-white shadow-sm";
  const labelClass =
    "text-xs font-semibold uppercase tracking-wider text-slate-500";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Report Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review, verify and assign this incident.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Verify Report button if status is 'new' */}
            {statusLower === "new" && (
              <button
                onClick={handleVerify}
                disabled={verifying}
                className={`inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
                  verifying ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                <FaCheckCircle />
                {verifying ? "Verifying..." : "Verify Report"}
              </button>
            )}

            {/* Create Shift button if status is 'verified' */}
            {statusLower === "verified" && (
              <button
                onClick={() => navigate(`/create-shift/${report._id}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Create Shift
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Report Details */}
          <div className={`${cardClass} p-6`}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900">
                {report.title}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusClass}`}
              >
                {report.status}
              </span>
            </div>

            <dl className="mt-6 space-y-5 border-t border-slate-100 pt-6">
              <div>
                <dt className={labelClass}>Reporter</dt>
                <dd className="mt-1 text-sm text-slate-800">
                  {report.createdBy?.username || "Anonymous"}
                </dd>
              </div>
              <div>
                <dt className={labelClass}>Description</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                  {report.description}
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className={`${labelClass} mb-3`}>Photo</p>
              {report.photoUrl ? (
                <img
                  src={report.photoUrl}
                  alt={`Report: ${report.title}`}
                  className="h-64 w-full rounded-lg border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400">
                  <FaRegImage className="text-3xl" />
                  <span className="text-sm">No image provided</span>
                </div>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className={`${cardClass} p-6`}>
            <p className={`${labelClass} mb-3`}>Location</p>
            {hasValidCoordinates ? (
              <div className="relative z-0 h-80 overflow-hidden rounded-lg border border-slate-200 lg:h-[30rem]">
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[report.latitude, report.longitude]}>
                    <Popup>{report.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400 lg:h-[30rem]">
                <FaMapMarkerAlt className="text-3xl" />
                <span className="text-sm">Location data not available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReports;