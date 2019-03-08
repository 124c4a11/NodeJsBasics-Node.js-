const
  status = document.getElementById('status'),
  messages = document.getElementById('messages'),
  form = document.getElementById('form'),
  input = document.getElementById('input');


const ws = new WebSocket('ws://localhost:3000');


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

  ws.send(input.value);
  input.value = '';
});


ws.onopen = () => setStatus('ONLINE');
ws.onclose = () => setStatus('DISCONNECTED');
ws.onmessage = (res) => printMessage(res.data);
