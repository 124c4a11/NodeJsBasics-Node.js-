const http = require('http');

const todos = require('./data/todos.json');


http.createServer((req, res) => {
  if (req.url === '/todos') {
    res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(todos));
  } else if (req.url === '/todos/completed') {
    const completed = todos.filter((todo) => todo.completed);

    res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(completed));
  } else if (req.url.match(/\/todos\/\d+/)) {
    const
      id = parseInt(req.url.replace(/\D+/, '')),
      todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(todo));
    }
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Not found');
  }
}).listen(3000, () => console.log('Server is running!'));
