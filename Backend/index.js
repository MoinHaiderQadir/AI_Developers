require('dotenv').config(); // At the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRoutes = require('./routes/UserRoutes');
const IncidentRoutes = require('./routes/FileRoutes');
const StaffRoutes = require('./routes/StaffRoutes');
const ShiftRoutes = require('./routes/ShiftRoutes');
const AdminSummaryRoute = require('./routes/AdminSummaryRoute');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', UserRoutes);
app.use('/api/report', IncidentRoutes);
app.use('/api/staff', StaffRoutes);
app.use('/api/shift', ShiftRoutes);
app.use('/api/admin', AdminSummaryRoute);

// Health check (open your backend URL in the browser to test)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Connect To MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });

// Export for Vercel
module.exports = app;

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}