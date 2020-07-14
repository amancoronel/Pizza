const mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

const connection = mongoose.createConnection("mongodb://localhost/pizza_order", {
    "useNewUrlParser": true,
    "useCreateIndex": true,
    // "useUnifiedTopology": false,
    // "user" : "",
    // "pass" : ""
})

connection.on("connected", () => {
    console.log("Databse connected");
})

exports.orders = require("./model-orders.js")(mongoose, connection);