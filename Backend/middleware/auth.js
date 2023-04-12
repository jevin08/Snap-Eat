// This file tell about some functionality only available with login user.
// so authentication is done or not is checked here

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next)=>{
    const token=req.headers.authorization;
    if(!token){
        return next(new ErrorHandler("Please login first!", 401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed this resource`, 403));
        }
        next();
    } 
}