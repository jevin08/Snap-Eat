const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const DeleteController = require('../controller/deleteController');

// get all orders of an user -- USER
exports.getUserOrders = async (req, res, next) => {
  if(!req.user){
    return next(ErrorHandler("User not exist", 401));  
  }
    const orders = await Order.find({'_id' : {$in : req.user.orders}}).exec();
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      orders,
      totalAmount
    });
}


// get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
    totalAmount
  });
}

// get order by id
exports.getOrderbyID = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'No order found' })
    }
    res.status(200).json({
      sucess: true,
      order,
    });
  }
  catch {
    res.status(500).json({ msg: error })
  }
}


// Update Order by Id
exports.updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(ErrorHandler("Order not found", 404));
  }

  order.orderStatus = status;
  order.save({
    validateBeforeSave: true,
  });

  res.status(201).json({
    succss: true,
    order,
  });
}

// create order 
exports.createOrder = async (req, res, next) => {
  const order = await Order.create(req.body);

  const user = await User.findById(req.body.userId);
  user.orders = [...user.orders, {order}];
  await user.save({ validateBeforeSave: false });

  let totalAmount = 0;

  order.orderItems.forEach((items) => {
    totalAmount += items.price * items.quantity;
  });

  order.totalPrice = totalAmount;

  order.save({
    validateBeforeSave: true,
  });

  res.status(201).json({
    success: true,
    order,
  });
}

// update status
exports.UpdateStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  // if (order.orderStatus === "Served") {
  //   return next(new ErrorHandler("You have already ", 400));
  // }
  order.orderStatus = status;
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order
  });
}

//delete by id
exports.deleteOrderItem = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  await DeleteController.createDocument(order, 'orders');
  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order Delete Successfully"
  });
}