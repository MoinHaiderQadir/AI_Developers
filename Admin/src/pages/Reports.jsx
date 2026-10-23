// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const Reports = () => {
//   const [reports, setReports] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/report/getall" // URL must be a string with quotes
//       );
//       if (response.status === 200) {
//         setReports(response.data);
//       }
//     } catch (error) {
//       console.log("Error fetching reports", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/report/deleteincident/${id}`
//       );
//       if (res.data.success) {
//         alert("Incident Deleted Successfully");
//         setReports(reports.filter((report) => report._id !== id));
//       }
//     } catch (error) {
//       console.error("Failed to delete Incident", error.message);
//       alert("Error deleting Incident");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // No need to console.log(reports) here because fetchData is async
//   }, []);

//   const getStatusBadgeClass = (status) => {
//     switch (status.toLowerCase()) {
//       case "new":
//         return "bg-gray-200 text-gray-800";
//       case "in_progress":
//         return "bg-yellow-100 text-yellow-800";
//       case "verified":
//         return "bg-blue-100 text-blue-800";
//       case "resolved":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-50 px-4 py-8 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-emerald-900 mb-6 text-center sm:text-left">
//         Submitted Reports
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-emerald-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-emerald-900 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-emerald-900 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {reports.map((report) => (
//               <tr
//                 key={report._id}
//                 className="hover:bg-gray-50 transition duration-200"
//               >
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {report.createdBy?.username || "Anonymous"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700">
//                   {report.title}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700">
//                   {report.category}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
//                       report.status
//                     )}`}
//                   >
//                     {report.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-center space-x-6">
//                   <Link
//                     to={`/report/${report._id}`} // Link path must be string literal with backticks
//                     title="View"
//                     className="text-emerald-600 hover:text-emerald-900"
//                   >
//                     <FaEye className="inline h-5 w-5" />
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(report._id)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Delete"
//                   >
//                     <FaTrash className="inline h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, FileText } from "lucide-react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/report/getall"
      );
      if (response.status === 200) {
        setReports(response.data);
      }
    } catch (error) {
      console.log("Error fetching reports", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/report/deleteincident/${id}`
      );
      if (res.data.success) {
        alert("Incident Deleted Successfully");
        setReports(reports.filter((report) => report._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete Incident", error.message);
      alert("Error deleting Incident");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // One green family: lighter = earlier in the workflow, darker = further along
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-green-50 text-green-700 ring-green-200";
      case "verified":
        return "bg-green-100 text-green-800 ring-green-300";
      case "in_progress":
        return "bg-green-600 text-white ring-green-600";
      case "resolved":
        return "bg-green-900 text-white ring-green-900";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-200";
    }
  };

  const thClass =
    "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-green-800";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
            <FileText className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Submitted Reports
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Review, verify and manage incidents reported by users.
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-green-600" />
              <h2 className="text-base font-semibold text-gray-900">
                All Reports
              </h2>
            </div>
            <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-800">
              {reports.length} total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Title</th>
                  <th className={thClass}>Category</th>
                  <th className={thClass}>Status</th>
                  <th className={`${thClass} text-center`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-gray-400"
                    >
                      No reports found.
                    </td>
                  </tr>
                )}

                {reports.map((report) => (
                  <tr
                    key={report._id}
                    className="transition-colors hover:bg-green-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {report.createdBy?.username || "Anonymous"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{report.title}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {report.category}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${getStatusBadgeClass(
                          report.status
                        )}`}
                      >
                        {report.status.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/report/${report._id}`}
                          title="View"
                          aria-label="View report"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                        >
                          <Eye className="h-4 w-4" strokeWidth={1.75} />
                        </Link>
                        <button
                          onClick={() => handleDelete(report._id)}
                          title="Delete"
                          aria-label="Delete report"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;