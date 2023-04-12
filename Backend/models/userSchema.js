const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        maxLength: [10, "First name cannot exceed 16 characters"],
        minLength: [3, "First name should have more than 3 characters"],
        required: [true, "Please enter your first name"],
    },
    surname: {
        type: String,
        maxLength: [10, "Surname cannot exceed 16 characters"],
        minLength: [3, "Surname should have more than 3 characters"],
        required: [true, "Please enter your surname"],
    },
    mobile: {
        type: String,
        maxLength: [10, "Invalid mobile number!"],
        minLength: [10, "Invalid mobile number!"],
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 7 characters"],
        maxLength: [12, "Password should be lesser than 13 characters"],
        select: false,
    },
    orders:[{
        id:{
            type: mongoose.Schema.ObjectId,
            ref: "orders",
            required: true
        },
    }],
    role: {
        type: String,
        default: "user"
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
}

// Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+process.env.RESET_PASSWORD_EXPIRE_MINUTE*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);