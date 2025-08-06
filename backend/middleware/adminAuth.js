const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-admin-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No admin token, authorization denied' });
  }

  // Verify token
  try {
    // We can add a specific check in the payload if we want, but for now, just verifying is enough
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin; // Attach admin payload to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Admin token is not valid' });
  }
};