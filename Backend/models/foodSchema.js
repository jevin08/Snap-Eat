const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    /// Why characters?(Not digit) it might have been fractional so upto two fractional point should allowed. 
    maxLength: [8, "Price can't exceed 8 characters"]
  },
  rating: {
    type: Number,
    default: 0,
    max: 5
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: [true, "Please enter product price"],
  },
  // status: {
  //   availableTiming: {
  //     type: String,
  //     default: "dinner",
  //     required: true,
  //   },
  // },
  numOfRatings: {
    type: Number,
    default: 0,
  },
},
  {
    collection: 'foods',
    timestamps: true,
    strict: false // tells to mongoose that schema may "grow"
  });

module.exports = mongoose.model("Food", foodSchema);