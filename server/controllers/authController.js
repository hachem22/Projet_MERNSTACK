const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse'); // Créez ce fichier (voir ci-dessous)
const asyncHandler = require('../middleware/async');

// @desc    Register user
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('Un utilisateur avec cet email existe déjà', 400));
  }

  const user = await User.create({ 
    name, 
    email, 
    password, 
    role: role || 'user' // Ensure role is set or defaults to 'user'
  });
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation basique
  if (!email || !password) {
    return next(new ErrorResponse('Email et mot de passe requis', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse('Identifiants invalides', 401));
  }

  // Réponse standardisée
  res.status(200).json({
    success: true,
    token: user.getSignedJwtToken(),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    redirectTo: user.role === 'admin' ? '/admin-dashboard' : '/client-dashboard'
  });
});
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});
// @desc    Get current user
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});
exports.verifyToken = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Helper function
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  
  res.status(statusCode).json({
    success: true,
    token
  });
};