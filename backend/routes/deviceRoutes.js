const express = require('express');
const Device = require('../models/Device');
const router = express.Router();

// Lấy danh sách thiết bị theo trạm hoặc toàn bộ
router.get('/', async (req, res) => {
  const { station } = req.query;
  const devices = station ? await Device.find({ station }) : await Device.find();
  res.json(devices);
});

module.exports = router;
