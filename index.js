var express = require('express')
var app = express()
app.use(express.static('public'))
app.use('/static', express.static('public'));
var login = require('./sync_router.js')
app.get("/", function (req, res) {
   res.sendFile('index.html')
})
const SECRET_TOKEN = 'sbYjxt2v97';
const REPO_PATH = 'D:\NodeServer';
app.use(express.json());

app.post('/git-webhook', (req, res) => {
   console.log("Git init");
   const { ref } = req.body;
   if (ref === 'refs/heads/main' || ref === 'refs/heads/master') {
      const { repository, secret } = req.body;
      if (secret === SECRET_TOKEN) {
         const { name, clone_url } = repository;
         console.log(`Updating ${name} repository`);
         const git = spawn('git', ['pull'], { cwd: `${REPO_PATH}/${name}` });
         git.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
         });
         git.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
         });
         git.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
         });
         res.sendStatus(200);
      } else {
         res.sendStatus(401);
      }
   } else {
      res.sendStatus(200);
   }
});
app.listen(80, '0.0.0.0')

