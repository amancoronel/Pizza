const mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

const dbUrl = "mongodb+srv://amancoronel:Aman040397@coronelcluster.pzawr.mongodb.net/pizza?retryWrites=true&w=majority"

const connection = mongoose.createConnection(dbUrl, {
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