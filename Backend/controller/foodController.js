const Food = require("../models/foodSchema");
const ErrorHandler = require("../utils/errorHandler");
const DeleteController = require('../controller/deleteController');


// Get All foods
exports.getAllFoods = async (req, res, next) => {
  const foods = await Food.find();
  res.status(201).json({
    //success: true,
    foods,
  });
}

// Get food
exports.getFoodByID = async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }
  res.status(201).json({
    success: true,
    food,
  })
}

// Create food item
exports.createFoodItem = async (req, res, next) => {
  const food = await Food.create(req.body);
  res.status(201).json({
    success: true,
    food,
  });
}


//delete by id
exports.deleteFoodItem = async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }
  await DeleteController.createDocument(food, 'foods');
  await food.remove();
  res.status(200).json({
    success: true,
    message: "Food Delete Successfully"
  });
}

//update item details by id
exports.updateFood = async (req, res, next) => {
  try {
    const { id: itemID } = req.params;
    const food = await Food.findOneAndUpdate({ _id: itemID }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    if (!food) {
      return next(new ErrorHandler("Food not found", 404));
    }
    res.status(200).json({
      success: true,
      food,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error
    });
  }
}