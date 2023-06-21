var express = require('express')
var app = express()
const git = require('git');
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
   console.log("Git init- " + process.cwd());
   const repositoryPath = '/home/server/Desktop/server'; // Replace with the actual path to your repository

   const repo = git(repositoryPath);
   repo.pull('origin', 'master', (err, result) => {
      if (err) {
         console.error(`Git pull failed: ${err}`);
         res.status(500).send('Git pull failed');
         return;
      }

      console.log(`Git pull successful: ${result.summary}`);
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
//tt abs test
//set