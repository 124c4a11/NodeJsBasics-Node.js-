const
  fs = require('fs'),
  path = require('path');


function public (req, res) {
  const
    extention = path.extname(req.url), // /css/app.css -> css
    filename = req.url.slice(1); // /css/app.css => css/app.css

  let contentType = '';

  switch (extention) {
    case '.html':
      contentType = 'text/html';
      break;

    case '.css':
      contentType = 'text/css';
      break;

    case '.js':
      contentType = 'text/javascript';
      break;

    case '.png':
      contentType = 'image/png';
      break;

    default:
      contentType = 'text/plain';
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);

  const stream = fs.createReadStream(path.resolve('public', filename));

  stream.pipe(res);
  stream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(err.message);
    }
  });
}


module.exports = public;
