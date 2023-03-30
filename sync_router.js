const http = require('http');
const { exec } = require('child_process');

const PORT = 8082;
const REPO_PATH = 'D:\NodeJs Server';
const SECRET = 'your-webhook-secret';

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.headers['x-github-event'] === 'push') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const payload = JSON.parse(body);
            const repoName = payload.repository.name;
            const ref = payload.ref.replace('refs/heads/', '');
            const headCommit = payload.head_commit.id;
            const signature = req.headers['x-hub-signature'];

            const secret = Buffer.from(SECRET, 'utf8');
            const hmac = crypto.createHmac('sha1', secret);
            const digest = 'sha1=' + hmac.update(body).digest('hex');

            if (signature === digest) {
                console.log('Valid signature received');
                const gitCommand = `cd ${REPO_PATH}/${repoName} && git pull origin ${ref}`;
                exec(gitCommand, (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error pulling code');
                    } else {
                        console.log(stdout);
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Code synced successfully');
                    }
                });
            } else {
                console.error('Invalid signature received');
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Unauthorized');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Invalid request method or event');
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
