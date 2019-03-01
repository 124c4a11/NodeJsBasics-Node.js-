const
  http = require('http'),
  path = require('path'),
  fs = require('fs');


function parseBody (body) {
  const keyValuePairs = body.split('&');

  return keyValuePairs.reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value
    return acc;
  }, {});
}


function render (filename, data, done) {
  fs.readFile(path.join(__dirname, 'views', `${filename}.view`), 'utf-8', (err, file) => {
    if (err) return done(err);

    let html = file;

    for (let prop in data) {
      const regex = new RegExp(`{${prop}}`, 'g');
      html = html.replace(regex, data[prop]);
    }

    done(null, html);
  });
}


http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream(path.join(__dirname, 'views', 'form.view'));

      res.writeHead(200, { 'Content-Type': 'text/html'});
      stream.pipe(res);
      break;

    case 'POST':
      let body = '';

      req.setEncoding('utf-8');
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        let data = parseBody(body);

        render('post', data, (err, html) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end(err.message);
          }

          res.writeHead(200, { 'Content-type': 'text/html' });
          res.end(html);
        });
      });
      break;
  }
}).listen(3000, () => console.log('Server is running!'));
