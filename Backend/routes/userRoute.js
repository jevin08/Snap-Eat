const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUsers, getUser, removeUser, updateUser, getProfile } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/profile").get(isAuthenticatedUser, getProfile);
router.route("/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeUser);

module.exports = router;
