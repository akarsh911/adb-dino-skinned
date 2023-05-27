const user = require("../models/user.model");
const asyncHandeler = require("express-async-handler");

exports.login_get = asyncHandeler(async (req, res) => {
    res.send("this is a handelled login route");
});