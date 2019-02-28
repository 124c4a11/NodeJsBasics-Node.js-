const
  http = require('http'),
  fs = require('fs'),
  path = require('path');


function parseBody (body) {
  // name=Jane&password=123
  const keyValuePairs = body.split('&'); //['name=Jane', 'password=123']

  return keyValuePairs.reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value
    return acc;
  }, {});
}


http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream(path.join(__dirname, 'public', 'form.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      stream.pipe(res);
      break;

    case 'POST':
      let body = '';

      req.setEncoding('utf-8');
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        const data = parseBody(body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      });

      break;
  }
}).listen(3000, () => console.log('Server is running!'));
