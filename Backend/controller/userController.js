const User = require('../models/userSchema');
const crypto = require('crypto');
const { sendToken } = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

// Register a User
exports.registerUser = (async (req, res, next) => {
  /* Parameters from the form */
  const { firstname, surname, email, mobile, password, confirmPassword } = req.body;
  if (!password) {
    return next(new ErrorHandler("Please enter password", 400));
  } if (!confirmPassword) {
    return next(new ErrorHandler("Please enter confirm-password", 400));
  } if (confirmPassword !== password) {
    return next(new ErrorHandler("Password and confirm-password does't matched", 400));
  }

  if (await User.exists({ email: email }) !== null) {
    return next(new ErrorHandler("Email is alreardy exists", 401));
  }

  try{
  const user = await User.create({
    firstname, surname, mobile, email, password,
  });

  res.status(201).json({
    success: true,
    user,
  });
  }catch(err){
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// Login a User
exports.loginUser = (async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter required fields", 400));
  }

  // Is only one user with entered email is there or not ?
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }
  // Is password matched with encrepted password or not?
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // If valid email and password is there then we send cookie token.
  sendToken(user, 200, res);
});


exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    success: true,
    users
  });
}

exports.getProfile = async (req, res, next) => {
  if(!req.user){
    res.status(401).json({
      success: false,
      message: "Bad request invalid user"
    });
  }
  res.status(201).json({
    success: true,
    user: req.user
  })
}

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(201).json({
        success: true,
        user
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "User not exiests"
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Bad request invalid user id"
    });
  }
}

exports.removeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await DeleteController.createDocument(user, 'users');
      await user.remove();
      return res.status(201).json({
        success: true,
        message: "User has been removed successfully"
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "User not exiests"
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Bad request invalid user id"
    });
  }
}


exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    if (user) {
      return res.status(201).json({
        success: true,
        user
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "User not exiests"
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Bad request invalid user id"
    });
  }
}
