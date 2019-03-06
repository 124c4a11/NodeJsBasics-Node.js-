const
  express = require('express'),
  morgan = require('morgan');

const todos = require('./todos.json');


const app = express();
app.set('view engine', 'pug');


app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('index', { // index.pug
    title: 'Express Todo',
    todos
  });
});


app.get('/todos', (req, res) => {
  if (req.query.completed) {
    const completed = todos.filter((todo) => todo.completed.toString() === req.query.completed);
    return res.json(completed);
  }

  res.json(todos);
});


app.get('/todos/:id', (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);

  if (!todo) return res.sendStatus(404);

  res.json(todo);
});


app.listen(3000, () => console.log('Server is running!'));
