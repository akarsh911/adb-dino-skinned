const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth route is displaying data")
});

const user = require("../controllers/user.auth.controller");
router.get("/login/user", user.login_get);
router.post("/login/user", user.login_post);
router.post("/register/user",user.register_post);
router.get("/register/user",user.register_get);
const driver = require("../controllers/driver.auth.controller");
router.get("/login/driver", driver.login_get);
const owner = require("../controllers/owner.auth.controller");
router.get("/login/owner", owner.login_get);
const admin = require("../controllers/admin.auth.controller");
router.get("/login/admin", admin.login_get);

module.exports = router;



