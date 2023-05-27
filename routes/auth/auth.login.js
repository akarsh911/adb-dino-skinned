const express = require("express");
const router = express.Router();
const login_get = require("../../controllers/user.login.controller")
router.get("/", login_get.login_get);
module.exports = router;