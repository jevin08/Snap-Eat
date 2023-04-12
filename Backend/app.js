const express = require('express');
const cors = require('cors')
const app = express();

const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cors());
// Route imports
const user = require("./routes/userRoute");
const food = require("./routes/foodRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", user);
app.use("/api/v1", food);
app.use("/api/v1", order);

// Middleware for errors(R)
app.use(errorMiddleware);

module.exports = app;