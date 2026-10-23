const Shift = require('../models/Shift');
const Incident = require('../models/incidents');

// Create a new shift
exports.createShift = async (req, res) => {
  try {
    const { assignedTo, incident, startTime, endTime } = req.body;

    if (startTime && endTime && new Date(endTime) < new Date(startTime)) {
      return res
        .status(400)
        .json({ error: 'End time cannot be before start time.' });
    }

    const shift = new Shift({ assignedTo, incident, startTime, endTime });
    await shift.save();

    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all shifts
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate('assignedTo', 'name email')
      .populate('incident', 'title category description status latitude longitude photoUrl  ');
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateShiftStatus = async (req, res) => {
  try {
    const { id } = req.params; // shift id
    const { status, lat, lng } = req.body;

    if (!['assigned', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });

    // Update status
    shift.status = status;

    // Set time and location
    if (status === 'in_progress') {
      shift.startTime = new Date();
      shift.clockInLocation = { lat, lng };
    }

    if (status === 'resolved') {
      shift.endTime = new Date();
      shift.clockOutLocation = { lat, lng };
    }

    await shift.save();

    // Sync incident status
    const incidentStatus = status === 'in_progress' ? 'in_progress'
                        : status === 'resolved' ? 'resolved'
                        : null;

    if (incidentStatus) {
      await Incident.findByIdAndUpdate(shift.incident, { status: incidentStatus });
    }

    res.json({ message: `Shift status updated to ${status}`, shift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


