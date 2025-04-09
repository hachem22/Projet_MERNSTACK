const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Récupération du token depuis le header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Récupération depuis les cookies si utilisé
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    console.log('Verifying token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    req.user = await User.findById(decoded.id);
    console.log('Found user:', req.user);
    
    if (!req.user) {
      console.error('User not found in database');
      return next(new ErrorResponse('No user found with this id', 404));
    }
    
    next();
  } catch (err) {
    console.error('JWT Verification Error:', {
      message: err.message,
      stack: err.stack,
      token: token
    });
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Middleware pour les rôles admin
exports.admin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Admin access required', 403));
  }
  next();
});
