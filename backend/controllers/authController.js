const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
exports.register = async (req, res) => {
  const { name, email, password, phone, role, farmDetails, location, address } = req.body;

  try {
    // Check for duplicate email first with a clear message
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }

    const userData = { name, email, password, phone, role };

    if (location || address) {
      userData.location = location || address;
    }

    if (farmDetails && role === 'farmer') {
      userData.farmDetails = farmDetails;
      if (!userData.location && farmDetails.location) {
        userData.location = farmDetails.location;
      }
    }

    const user = await User.create(userData);
    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Logout / clear cookie
// @route   GET /api/v1/auth/logout
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
};
