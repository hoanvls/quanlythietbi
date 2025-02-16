const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: String,
  specs: String,
  status: String,
  dateAdded: Date,
  station: String, // Trạm quản lý thiết bị
  history: [{ type: String, date: Date, note: String }] // Lịch sử sửa chữa
});

module.exports = mongoose.model('Device', deviceSchema);
