const express = require('express');
const router = express.Router();

const { getOrderbyID, getAllOrders, createOrder, UpdateStatus, deleteOrderItem, getUserOrders } = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/order/add").post(isAuthenticatedUser, createOrder);
router.route("/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/order").get(isAuthenticatedUser, getUserOrders);
router.route("/order/status/:id").post(isAuthenticatedUser, authorizeRoles("admin"), UpdateStatus);
router.route("/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getOrderbyID)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrderItem);



module.exports = router;
