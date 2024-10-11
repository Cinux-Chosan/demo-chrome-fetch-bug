const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

  let { query, pathname } = url.parse(req.url, true);

  pathname = pathname === '/' ? '/index.html' : pathname;

  if (fs.existsSync(__dirname + pathname)) {

    if ('no-store' in query) {
      res.setHeader('Cache-Control', 'no-store');
    }

    res.writeHead(200);
    fs.createReadStream(__dirname + pathname).pipe(res);
    return
  }

  res.writeHead(404);
  res.end('404 Not Found');
})

server.listen(8000, () => console.log('\nserver started: http://localhost:8000'))