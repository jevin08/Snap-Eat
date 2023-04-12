const express = require('express');
const router = express.Router();

const { getAllFoods, createFoodItem, getFoodByID, deleteFoodItem, updateFood } = require("../controller/foodController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/foods").get(getAllFoods);
router.route("/food/add").post(isAuthenticatedUser, authorizeRoles("admin"), createFoodItem);
router.route("/food/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteFoodItem);
router.route("/food/:id").get(getFoodByID);
router.route("/food/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateFood);

module.exports = router;