const express = require('express');
const port = process.env.PORT || 5000;
const serveStatic = require('serve-static'); //node module used to make static path for public
const app = express();
const Cors = require('cors');
const path = require("path");


require('./models');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("view options", {layout : false});
app.set('view cache', false);


app.use(express.json());
app.use(Cors());
app.use("/api", require('./routes'));

app.use(serveStatic(path.join(__dirname, "/src")))

// Route for index
app.get("/", (req, res) => {
    res.render("index");
})

app.get("*", (req, res) => {
    res.redirect("/");
})


app.listen(port, () => {
    console.log("Server running on port "+port);
})