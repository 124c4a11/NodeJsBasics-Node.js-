const Server = require('socket.io');

const server = new Server(3000);


server.on('connection', (socket) => {
  socket.on('message', (message) => {
    server.emit('message', message);
  });

  socket.emit('ready', 'Welcome to WebSocket Chat!');
});
