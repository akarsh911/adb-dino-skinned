var express = require('express')
var app = express()
app.use(express.static('public'))
app.use('/static', express.static('public'));
app.get("/", function (req, res) {
   res.send("Hello Bro")
})
app.use(express.json());

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

