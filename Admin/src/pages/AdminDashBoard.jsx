// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
// } from "chart.js";
// import { Pie, Bar } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// export default function AdminDashboard() {
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/admin/summary");
//         if (res.data.success) {
//           setSummary(res.data.data);
//         }
//       } catch (error) {
//         alert("Failed to fetch dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-8 flex justify-center items-center h-screen">
//         <span className="text-lg text-gray-600 animate-pulse">Loading...</span>
//       </div>
//     );
//   }

//   if (!summary) {
//     return (
//       <div className="p-8 text-center text-red-500 font-semibold">
//         No data available.
//       </div>
//     );
//   }

//   // Define colors for incident statuses
//   // Make sure colors match the order of the labels!
//   const statusColorsMap = {
//     new: "#9ca3af", // gray
//     verified: "#3b82f6", // blue
//     in_progress: "#facc15", // yellow
//     resolved: "#22c55e", // green
//   };

//   // Get statuses and colors in the order they appear
//   const statusLabels = Object.keys(summary.incidentsByStatus).map((key) =>
//     key.replaceAll("_", " ")
//   );
//   const statusRawKeys = Object.keys(summary.incidentsByStatus);

//   // Prepare colors in same order as data
//   const statusColors = statusRawKeys.map(
//     (key) => statusColorsMap[key] || "#d1d5db" // fallback gray
//   );

//   const incidentStatusData = {
//     labels: statusLabels,
//     datasets: [
//       {
//         label: "Incidents by Status",
//         data: Object.values(summary.incidentsByStatus),
//         backgroundColor: statusColors,
//         borderWidth: 1,
//       },
//     ],
//   };

//   const incidentCategoryData = {
//     labels: Object.keys(summary.incidentsByCategory),
//     datasets: [
//       {
//         label: "Incidents by Category",
//         data: Object.values(summary.incidentsByCategory),
//         backgroundColor: [
//           "#f97316",
//           "#0ea5e9",
//           "#8b5cf6",
//           "#10b981",
//           "#64748b",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const overviewData = {
//     labels: ["Total Staff", "Total Users", "Active Shifts"],
//     datasets: [
//       {
//         label: "Count",
//         data: [summary.totalStaff, summary.totalUsers, summary.activeShifts],
//         backgroundColor: ["#22d3ee", "#3b82f6", "#6366f1"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className="p-6 sm:p-10 max-w-7xl mx-auto">
//       <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-green-800">
//         Admin Dashboard
//       </h1>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold text-green-700 mb-4">
//             Incident Distribution
//           </h2>
//           <Pie data={incidentStatusData} options={chartOptions} />
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold text-green-700 mb-4">
//             System Overview
//           </h2>
//           <Bar data={overviewData} options={chartOptions} />
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow col-span-full">
//           <h2 className="text-xl font-semibold text-green-700 mb-4">
//             Incident Categories
//           </h2>
//           <Bar data={incidentCategoryData} options={chartOptions} />
//         </div>
//       </div>

//       {/* Recent Incidents Table */}
//       <div className="bg-white p-6 rounded-2xl shadow overflow-auto">
//         <h2 className="text-2xl font-semibold text-green-800 mb-6">
//           Recent Incidents
//         </h2>
//         <table className="w-full text-sm md:text-base text-left">
//           <thead>
//             <tr className="border-b border-green-300 text-gray-600">
//               <th className="py-3 px-2">Title</th>
//               <th className="py-3 px-2">Status</th>
//               <th className="py-3 px-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {summary.recentIncidents.map((incident) => (
//               <tr
//                 key={incident._id}
//                 className="border-b hover:bg-green-50 transition"
//               >
//                 <td className="py-3 px-2">{incident.title}</td>
//                 <td className="py-3 px-2">
//                   <span
//                     className={`capitalize font-medium px-3 py-1 rounded-full text-sm`}
//                     style={{
//                       backgroundColor:
//                         statusColorsMap[incident.status] || "#f3f4f6",
//                       color:
//                         incident.status === "in_progress"
//                           ? "#92400e"
//                           : incident.status === "new"
//                           ? "#374151"
//                           : incident.status === "verified"
//                           ? "#1e40af"
//                           : incident.status === "resolved"
//                           ? "#166534"
//                           : "#6b7280",
//                     }}
//                   >
//                     {incident.status.replaceAll("_", " ")}
//                   </span>
//                 </td>
//                 <td className="py-3 px-2 text-gray-600">
//                   {new Date(incident.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { UserCog, Users, CalendarClock } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

ChartJS.defaults.font.family = "inherit";
ChartJS.defaults.color = "#6b7280";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/summary");
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (error) {
        alert("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
        <span className="text-sm font-medium text-gray-500">
          Loading dashboard...
        </span>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-xl border border-gray-200 bg-white px-10 py-8 text-center shadow-sm">
          <p className="text-base font-semibold text-gray-900">
            No data available
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Dashboard data could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // One green, five shades: lighter = earlier in the workflow, darker = further along
  const statusColorsMap = {
    new: "#86efac",
    verified: "#22c55e",
    in_progress: "#15803d",
    resolved: "#14532d",
  };

  const greenShades = ["#14532d", "#166534", "#15803d", "#16a34a", "#4ade80"];

  const statusLabels = Object.keys(summary.incidentsByStatus).map((key) =>
    key.replaceAll("_", " ")
  );
  const statusRawKeys = Object.keys(summary.incidentsByStatus);

  const statusColors = statusRawKeys.map(
    (key) => statusColorsMap[key] || "#dcfce7"
  );

  const incidentStatusData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Incidents by Status",
        data: Object.values(summary.incidentsByStatus),
        backgroundColor: statusColors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const incidentCategoryData = {
    labels: Object.keys(summary.incidentsByCategory),
    datasets: [
      {
        label: "Incidents by Category",
        data: Object.values(summary.incidentsByCategory),
        backgroundColor: greenShades,
        borderRadius: 6,
        borderWidth: 0,
        maxBarThickness: 56,
      },
    ],
  };

  const overviewData = {
    labels: ["Total Staff", "Total Users", "Active Shifts"],
    datasets: [
      {
        label: "Count",
        data: [summary.totalStaff, summary.totalUsers, summary.activeShifts],
        backgroundColor: ["#166534", "#16a34a", "#4ade80"],
        borderRadius: 6,
        borderWidth: 0,
        maxBarThickness: 56,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 8,
        },
      },
      title: { display: false },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: "#f3f4f6" },
        ticks: { precision: 0 },
      },
    },
  };

  const stats = [
    { label: "Total Staff", value: summary.totalStaff, icon: UserCog },
    { label: "Total Users", value: summary.totalUsers, icon: Users },
    {
      label: "Active Shifts",
      value: summary.activeShifts,
      icon: CalendarClock,
    },
  ];

  // All badges use the same green family; the dot color shows the stage
  const statusBadge = (status) => {
    switch (status) {
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

  const dotColor = (status) =>
    status === "in_progress" || status === "resolved"
      ? "#ffffff"
      : statusColorsMap[status] || "#86efac";

  const cardClass = "rounded-xl border border-gray-200 bg-white shadow-sm";

  const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-5 flex items-start gap-3">
      <span className="mt-1 h-5 w-1 rounded-full bg-green-600" />
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of incidents, staff and system activity.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`${cardClass} flex items-center justify-between p-5`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {s.label}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {s.value}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={`${cardClass} p-6`}>
            <SectionTitle
              title="Incident Distribution"
              subtitle="Breakdown by status"
            />
            <div className="mx-auto max-w-xs">
              <Pie data={incidentStatusData} options={pieOptions} />
            </div>
          </div>

          <div className={`${cardClass} p-6`}>
            <SectionTitle
              title="System Overview"
              subtitle="Staff, users and active shifts"
            />
            <Bar data={overviewData} options={barOptions} />
          </div>

          <div className={`${cardClass} p-6 lg:col-span-2`}>
            <SectionTitle
              title="Incident Categories"
              subtitle="Number of incidents per category"
            />
            <Bar data={incidentCategoryData} options={barOptions} />
          </div>
        </div>

        {/* Recent Incidents Table */}
        <div className={`${cardClass} overflow-hidden`}>
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Incidents
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-green-50 text-xs uppercase tracking-wider text-green-800">
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {summary.recentIncidents.map((incident) => (
                  <tr
                    key={incident._id}
                    className="transition-colors hover:bg-green-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {incident.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusBadge(
                          incident.status
                        )}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: dotColor(incident.status) }}
                        />
                        {incident.status.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(incident.createdAt).toLocaleString()}
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
}