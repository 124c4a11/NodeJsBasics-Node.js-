const
  status = document.getElementById('status'),
  messages = document.getElementById('messages'),
  form = document.getElementById('form'),
  input = document.getElementById('input');


const socket = io('http://localhost:3000');


function setStatus(value) {
  status.innerHTML = value;
}


function printMessage(value) {
  const li = document.createElement('li');

  li.innerHTML = value;
  messages.appendChild(li);
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', input.value);
  input.value = '';
});


socket.on('connect', () => setStatus('ONLINE'));
socket.on('disconnect', () => setStatus('DISCONNECTED'));
socket.on('ready', (message) => printMessage(message));
socket.on('message', (message) => printMessage(message));
