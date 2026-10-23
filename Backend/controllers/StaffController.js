const Staff = require("../models/staff");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary config (uses the names in your .env)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload a file buffer to Cloudinary and return the secure URL
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "staff_photos",
        public_id: `${Date.now()}-${file.originalname}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

const createStaff = async (req, res) => {
  try {
    const { name, email, staffId, phone, address } = req.body;

    if (!name || !email || !staffId || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let photoUrl = "";

    if (req.file) {
      try {
        photoUrl = await uploadToCloudinary(req.file);
      } catch (uploadError) {
        console.error("Cloudinary error:", uploadError.message);
        return res.status(500).json({
          error: "Cloudinary upload failed",
          details: uploadError.message,
        });
      }
    }

    const newStaff = new Staff({
      name,
      email,
      staffId,
      phone,
      address,
      photo: photoUrl,
    });

    await newStaff.save();

    return res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: newStaff,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email or Staff ID already exists" });
    }
    console.error("Error creating staff:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json({ success: true, staff: staffList });
  } catch (error) {
    console.error("Error fetching staff:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getStaffByStaffId = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    res.status(200).json({ success: true, staff });
  } catch (error) {
    console.error("Error fetching staff by ID:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { staffId, email } = req.body;

    if (!staffId || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Staff ID and email are required" });
    }

    const staff = await Staff.findOne({
      staffId,
      email: email.toLowerCase(),
    });

    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid staff ID or email" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      staff,
    });
  } catch (error) {
    console.error("Error during staff login:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      deletedStaff: staff,
    });
  } catch (error) {
    console.error("Error deleting staff:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffByStaffId,
  staffLogin,
  deleteStaff,
};