var express = require('express')
var app = express()
const simpleGit = require('simple-git');
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
   const git = simpleGit(repositoryPath);
   git.pull('origin', 'master', (err, update) => {
      if (err) {
         console.error(`Git pull failed: ${err}`);
         res.status(500).send('Git pull failed');
         return;
      }

      if (update && update.summary.changes) {
         console.log(`Git pull successful. Changes: ${update.summary.changes}`);
      } else {
         console.log('Git pull successful. No changes.');
      }

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
