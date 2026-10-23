const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("Admin@12345", 10);

    await User.create({
      username: "Admin",
      email: "admin@example.com",
      password: hashed,
      role: "admin",
    });

    console.log("Admin created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();