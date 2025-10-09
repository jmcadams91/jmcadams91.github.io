// Enhancement: JWT authentication middleware for protected routes
const jwt = require('jsonwebtoken');

// Enhancement: Middleware to verify JWT and attach user info to request
const requireAuth = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  // Reject request if token is missing
  if (!token) return res.status(401).json({ message: 'Auth token missing' });

  try {
    // Verify token using JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    // Reject request if token is invalid or expired
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Export middleware for use in route protection
module.exports = { requireAuth };
