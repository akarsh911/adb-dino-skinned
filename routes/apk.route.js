const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
const apkFilePath = path.join("static", "apk", 'app-debug.apk');
router.get("/version", (req, res) => {
    res.send("1.0.1")
});
router.get("/file", (req, res) => {
    res.download(apkFilePath);
});
module.exports = router;



