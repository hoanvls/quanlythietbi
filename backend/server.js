const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import kết nối MongoDB

// Load biến môi trường từ .env
dotenv.config();

// Kết nối MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Xử lý dữ liệu JSON
app.use(cors()); // Cho phép truy cập từ frontend

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api/devices', deviceRoutes);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
