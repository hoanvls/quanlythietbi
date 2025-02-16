const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Đăng ký User (Chỉ Admin có thể tạo user mới)
router.post('/register', authMiddleware('Admin'), async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Kiểm tra xem user đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Lấy danh sách user (Chỉ Admin)
router.get('/', authMiddleware('Admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Không gửi mật khẩu về
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Cập nhật quyền user (Chỉ Admin)
router.put('/:id/role', authMiddleware('Admin'), async (req, res) => {
    const { role } = req.body;
    
    if (!['User-View', 'User-Edit', 'Admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Xóa user (Chỉ Admin)
router.delete('/:id', authMiddleware('Admin'), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
