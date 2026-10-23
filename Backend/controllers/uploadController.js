const cloudinary = require("../config/cloudinary");
const Incident = require("../models/incidents");
const streamifier = require("streamifier");
const mongoose = require('mongoose');  
const incidents = require("../models/incidents");
const Shift = require("../models/Shift");


const uploadIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      latitude,
      longitude,
      createdBy,
    } = req.body;

    if (!title || !description || !category || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let photoUrl = "";

    const saveIncident = async () => {
  const newIncident = new Incident({
    title,
    description,
    category,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    photoUrl,
    createdBy: createdBy
  });
      await newIncident.save();

      res.status(201).json({
        success: true,
        message: "Incident reported successfully",
        incident: newIncident,
      });
    };

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "incidents",
          public_id: `${Date.now()}-${req.file.originalname}`,
        },
        async (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Cloudinary upload failed", details: error.message });
          }
          photoUrl = result.secure_url;
          await saveIncident();
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      await saveIncident();
    }
  } catch (error) {
    console.error("Error uploading incident:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Incident.find().populate('createdBy', 'username');;
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error });
  }
};

// Get report by ID
// Get all reports by user ID
const getReportByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch reports only created by this user
    const reports = await Incident.find({ createdBy: id });

    // Check if any reports exist
    if (reports.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user reports", error });
  }
};

// Get report by report ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    const report = await Incident.findById(id).populate('createdBy', 'username');

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ reports: report }); // ✅ matches frontend expectation
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report", error });
  }
};

const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete all related shifts
    await Shift.deleteMany({ incident: id });

    // Then delete the incident
    const deletedIncident = await incidents.findByIdAndDelete(id);

    if (!deletedIncident) {
      return res.status(404).json({ success: false, message: "Incident not found" });
    }

    res.status(200).json({
      success: true,
      message: "Incident and related shifts deleted successfully",
      deletedIncident
    });
  } catch (error) {
    console.error("Error deleting incident and shifts:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};








// Controller to update incident status from 'new' to 'verified'
async function verifyIncidentStatus(req, res) {
  try {
    const { incidentId } = req.params;

    // Find the incident by ID
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Check current status, only allow change if status is 'new'
    if (incident.status !== 'new') {
      return res.status(400).json({ message: 'Status can only be updated from "new"' });
    }

    // Update the status to 'verified'
    incident.status = 'verified';
    await incident.save();

    return res.status(200).json({ message: 'Incident status updated to verified', incident });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}









module.exports = { uploadIncident , getAllReports,
  verifyIncidentStatus,getReportByUserId ,getReportById,deleteIncident };
