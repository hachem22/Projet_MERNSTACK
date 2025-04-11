const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register a new user
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('Un utilisateur avec cet email existe déjà', 400));
  }

  // Create user with default 'client' role and proper validation
  let user;
  try {
    user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'client'
    });
  } catch (err) {
    console.error('User creation error:', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorResponse('Données invalides: ' + Object.values(err.errors).map(e => e.message).join(', '), 400));
    }
    return next(new ErrorResponse('Erreur lors de la création du compte', 500));
  }

  // Generate token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Login user
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Email et mot de passe requis', 400));
  }

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Email ou mot de passe incorrect', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password).catch(err => {
      console.error('Password match error:', err);
      return false;
    });
    
    if (!isMatch) {
      return next(new ErrorResponse('Email ou mot de passe incorrect', 401));
    }

    // Additional role verification for admin
    if (user.role === 'admin') {
      const adminToken = user.getSignedJwtToken();
      if (!adminToken) {
        console.error('Admin token generation failed');
        return next(new ErrorResponse('Erreur d\'authentification admin', 500));
      }
    }

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirectTo: user.role === 'admin' ? '/admin-dashboard' : '/client-dashboard'
    });

  } catch (err) {
    console.error('Login error:', err);
    return next(new ErrorResponse('Erreur du serveur lors de la connexion', 500));
  }
});
// @desc    Get current logged in user
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Check email availability
// @access  Public
exports.checkEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  try {
    const user = await User.findOne({ email });
    res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? 'Email already exists' : 'Email available'
    });
  } catch (err) {
    console.error('Email check error:', err);
    res.status(500).json({
      success: false,
      message: 'Error checking email availability'
    });
  }
});

// @desc    Verify token validity
// @access  Private
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
