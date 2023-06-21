var express = require('express')
var app = express()
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/database");
app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('static'));
app.get("/", function (req, res) {
   res.send("Server is Up and Running at Port 49155")
})
app.post("/", function (req, res) {
   res.send(req.params);
})
start_routes();
app.post('/git-webhook', (req, res) => {
   console.log("Git init");
   const { exec } = require('child_process');
   exec('sudo git status', (error, stdout, stderr) => {
      if (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).send('Git pull failed');
         return;
      }

      if (stderr) {
         console.error(`Git pull error: ${stderr}`);
         res.status(500).send('Git pull failed');
         return;
      }

      console.log(`Git pull output: ${stdout}`);
      res.send('Git pull successful');

   });
});
app.listen(80, '0.0.0.0')
console.log("Server Running")
function start_routes() {
   const authRoute = require('./routes/auth.route');
   app.use("/auth", authRoute);
   const apkRoute = require('./routes/apk.route');
   app.use("/apk", apkRoute);
}
//test github
//tt a