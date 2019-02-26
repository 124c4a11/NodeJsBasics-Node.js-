const
  http = require('http'),
  fs = require('fs'),
  path = require('path');


function handleError (err, res) {
  res.writeHead(500, { 'Content-type': 'text/plain' });
  res.end(err.message);
}


http.createServer((req, res) => {
  if (req.url === '/') {
    const stream = fs.createReadStream(path.join(__dirname, 'public', 'index.html'))

    stream.on('error', (err) => handleError(err, res));

    res.writeHead(200, { 'Content-type': 'text/html' });

    stream.pipe(res);
  } else if (req.url.match(/.css$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url))

    stream.on('error', (err) => handleError(err, res));

    res.writeHead(200, { 'Content-type': 'text/css' });

    stream.pipe(res);
  } else if (req.url.match(/.js$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url))

    stream.on('error', (err) => handleError(err, res));

    res.writeHead(200, { 'Content-type': 'text/javascript' });

    stream.pipe(res);
  } else if (req.url.match(/.png$/)) {
    const stream = fs.createReadStream(path.join(__dirname, 'public', req.url))

    stream.on('error', (err) => handleError(err, res));

    res.writeHead(200, { 'Content-type': 'image/png' });

    stream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('404 Not found');
  }
}).listen(3000, () => console.log('Server is running!'));
