const jwt = require('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    if (role && decoded.role !== role && decoded.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
