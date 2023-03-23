var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
});
router.post('/', function (req, res) {
    res.send('POST route on things starts verification.');
});
router.get('/user', function (req, res) {
    return res.redirect('/login');
});
router.post('/user', function (req, res) {
    var fs = require('fs');
    fs.readFile('private/login.html', function (err, data) {    
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });

});
//export this router to use in our index.js
module.exports = router;