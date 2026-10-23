const express = require("express");
const { createStaff, getAllStaff, getStaffByStaffId, staffLogin, deleteStaff } = require("../controllers/StaffController");
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create',upload.single('photo'),createStaff);
router.get('/get',getAllStaff);
router.get('/getstaff/:id',getStaffByStaffId);
router.post('/stafflogin',staffLogin)
router.delete('/staffdelete/:id',deleteStaff);



module.exports = router;
