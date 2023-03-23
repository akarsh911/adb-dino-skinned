var express = require('express')
var app = express()
app.use(express.static('public'))
app.use('/static', express.static('public'));
var login = require('./login_router.js')
app.get("/", function (req, res) {
   res.sendFile('index.html', { root: __dirname });
})

app.listen(80, '0.0.0.0')

