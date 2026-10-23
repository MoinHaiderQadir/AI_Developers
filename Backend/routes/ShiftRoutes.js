const express = require("express");
const { createShift, getAllShifts, updateShiftStatus } = require("../controllers/ShiftController");


const router = express.Router();

router.post('/create',createShift);
router.get('/get',getAllShifts);
router.put('/update/:id',updateShiftStatus);



module.exports = router;
