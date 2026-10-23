const express = require("express");
const multer = require("multer");
const { uploadIncident, getAllReports, verifyIncidentStatus, getReportByUserId, getReportById, deleteIncident } = require("../controllers/uploadController");

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to detect if request includes a file
const conditionalMulter = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.startsWith('multipart/form-data')) {
    upload.single('photo')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: 'File upload error', details: err.message });
      }
      next();
    });
  } else {
    // If no file is sent, continue without multer
    next();
  }
};

// Route
router.post('/incidentupload', conditionalMulter, uploadIncident);
router.get('/getall',getAllReports );
router.get('/get/:id',getReportByUserId );
router.get('/getreport/:id',getReportById );
router.post('/change/:incidentId',verifyIncidentStatus);
router.delete('/deleteincident/:id',deleteIncident);


module.exports = router;
