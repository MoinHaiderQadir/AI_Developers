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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
      <div className="p-8 flex justify-center items-center h-screen">
        <span className="text-lg text-gray-600 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        No data available.
      </div>
    );
  }

  // Define colors for incident statuses
  // Make sure colors match the order of the labels!
  const statusColorsMap = {
    new: "#9ca3af", // gray
    verified: "#3b82f6", // blue
    in_progress: "#facc15", // yellow
    resolved: "#22c55e", // green
  };

  // Get statuses and colors in the order they appear
  const statusLabels = Object.keys(summary.incidentsByStatus).map((key) =>
    key.replaceAll("_", " ")
  );
  const statusRawKeys = Object.keys(summary.incidentsByStatus);

  // Prepare colors in same order as data
  const statusColors = statusRawKeys.map(
    (key) => statusColorsMap[key] || "#d1d5db" // fallback gray
  );

  const incidentStatusData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Incidents by Status",
        data: Object.values(summary.incidentsByStatus),
        backgroundColor: statusColors,
        borderWidth: 1,
      },
    ],
  };

  const incidentCategoryData = {
    labels: Object.keys(summary.incidentsByCategory),
    datasets: [
      {
        label: "Incidents by Category",
        data: Object.values(summary.incidentsByCategory),
        backgroundColor: [
          "#f97316",
          "#0ea5e9",
          "#8b5cf6",
          "#10b981",
          "#64748b",
        ],
        borderWidth: 1,
      },
    ],
  };

  const overviewData = {
    labels: ["Total Staff", "Total Users", "Active Shifts"],
    datasets: [
      {
        label: "Count",
        data: [summary.totalStaff, summary.totalUsers, summary.activeShifts],
        backgroundColor: ["#22d3ee", "#3b82f6", "#6366f1"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-green-800">
        Admin Dashboard
      </h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Incident Distribution
          </h2>
          <Pie data={incidentStatusData} options={chartOptions} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            System Overview
          </h2>
          <Bar data={overviewData} options={chartOptions} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow col-span-full">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Incident Categories
          </h2>
          <Bar data={incidentCategoryData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">
          Recent Incidents
        </h2>
        <table className="w-full text-sm md:text-base text-left">
          <thead>
            <tr className="border-b border-green-300 text-gray-600">
              <th className="py-3 px-2">Title</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {summary.recentIncidents.map((incident) => (
              <tr
                key={incident._id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="py-3 px-2">{incident.title}</td>
                <td className="py-3 px-2">
                  <span
                    className={`capitalize font-medium px-3 py-1 rounded-full text-sm`}
                    style={{
                      backgroundColor:
                        statusColorsMap[incident.status] || "#f3f4f6",
                      color:
                        incident.status === "in_progress"
                          ? "#92400e"
                          : incident.status === "new"
                          ? "#374151"
                          : incident.status === "verified"
                          ? "#1e40af"
                          : incident.status === "resolved"
                          ? "#166534"
                          : "#6b7280",
                    }}
                  >
                    {incident.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {new Date(incident.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
