const express = require('express');
const router = express.Router();
start_routes();
router.get("/", (req, res) => {
    res.send("Auth route is displaying data")
})
module.exports = router;
function start_routes() {
    const login_route = require("./auth.login.js");
    router.use("/login", login_route);
}


