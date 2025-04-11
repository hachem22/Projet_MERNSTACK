const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Non autorisé', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Token invalide', 401));
  }
});
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ErrorResponse('Accès non autorisé - Rôle manquant', 403));
    }
    
    // Convertir en string et normaliser la casse
    const userRole = String(req.user.role).toLowerCase().trim();
    const allowedRoles = roles.map(role => 
      String(role).toLowerCase().trim()
    );
    
    console.log('[AUTH] Checking authorization for role:', userRole);
    console.log('[AUTH] Allowed roles:', allowedRoles);
    
    if (!allowedRoles.includes(userRole)) {
      console.log('[AUTH] Access denied for role:', userRole);
      return next(new ErrorResponse(`Rôle ${req.user.role} non autorisé`, 403));
    }
    
    console.log('[AUTH] Access granted for role:', userRole);
    next();
  };
};
// Middleware pour les rôles admin
exports.admin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Admin access required', 403));
  }
  next();
});
