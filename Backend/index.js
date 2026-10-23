require('dotenv').config(); // At the very top
const express = require('express');


const mongoose = require('mongoose');
const cors = require('cors');

const UserRoutes=require('./routes/UserRoutes');
const IncidentRoutes=require('./routes/FileRoutes')
const StaffRoutes=require('./routes/StaffRoutes');
const ShiftRoutes=require('./routes/ShiftRoutes');
const AdminSummaryRoute=require('./routes/AdminSummaryRoute');
const app=express();
app.use(express.json());
app.use(cors())


app.use('/api/user',UserRoutes);
app.use('/api/report',IncidentRoutes);
app.use('/api/staff',StaffRoutes);
app.use('/api/shift',ShiftRoutes);
app.use('/api/admin',AdminSummaryRoute)


//Connect To MongoDB

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });

  app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend server is running on port ${process.env.PORT || 3000}`);
     console.log('Cloudinary Credentials:', {
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
});
});