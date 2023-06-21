const user = require("../models/owner.model");
const asyncHandeler = require("express-async-handler");

exports.login_get = asyncHandeler(async (req, res) => {
    console.log("login owner detected");
    res.send("this is a handelled login route");
});