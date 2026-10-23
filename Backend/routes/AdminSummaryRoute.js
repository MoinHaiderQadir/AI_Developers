const express = require('express');
const router = express.Router();
const { getAdminDashboardSummary } = require('../controllers/AdminSummary');

router.get('/summary', getAdminDashboardSummary);

module.exports = router;
