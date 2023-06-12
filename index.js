var express = require('express')
var app = express()
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/database");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));
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

   const repoPath = process.cwd(); // get the current working directory as the repository path
   const branch = 'master'; // replace with the branch you want to pull from

   exec(`cd ${repoPath} && git pull origin ${branch}`, (error, stdout, stderr) => {
      if (error) {
         console.error(`Error: ${error.message}`);
         return;
      }
      if (stderr) {
         console.error(`stderr: ${stderr}`);
         return;
      }
      console.log(`stdout: ${stdout}`);
   });

   res.sendStatus(200);

});
app.listen(80, '0.0.0.0')
console.log("Server Running")
function start_routes() {
   const authRoute = require('./routes/auth.route');
   app.use("/auth", authRoute);
   const apkRoute = require('./routes/apk.route');
   app.use("/apk", apkRoute);
}