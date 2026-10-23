const incidents = require("../models/incidents");
const Shift = require("../models/Shift");
const staff = require("../models/staff");
const User = require("../models/User");

exports.getAdminDashboardSummary = async (req, res) => {
  try {
    // Total incidents by status
    const incidentCounts = await incidents.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    const incidentsByStatus = incidentCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Incidents by category
    const categoryCounts = await incidents.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    const incidentsByCategory = categoryCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const totalStaff = await staff.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeShifts = await Shift.countDocuments({
      status: { $in: ['assigned', 'in_progress'] }
    });

    const recentIncidents = await incidents.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt')
      .lean();

    res.json({
      success: true,
      data: {
        incidentsByStatus,
        incidentsByCategory, // Include this in the response
        totalStaff,
        totalUsers,
        activeShifts,
        recentIncidents,
      },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
