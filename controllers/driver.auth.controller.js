const user = require("../models/driver.model");
const asyncHandeler = require("express-async-handler");

exports.login_get = asyncHandeler(async (req, res) => {
    console.log("login driver detected");
    res.send("this is a handelled login route");
});