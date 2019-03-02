const http = require('http');

const apikey = require('../apikey');


function get (title, done) {
  const req = http.get(`http://www.omdbapi.com/?apikey=${apikey}&t=${title}`, (res) => {
    if (res.statusCode !== 200) {
      done(new Error(`Ошибка: ${res.statusMessage} (${res.statusCode})`));
      res.resume();
      return;
    }

    res.setEncoding('utf-8');

    let body = '';

    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      let result = null;

      try {
        result = JSON.parse(body);
      } catch (err) {
        done(err);
      }

      if (result.Response === 'False') return done(new Error(result.Error));

      done(null, result);
    });
  });

  req.on('error', (err) => done(err));
}


module.exports = {
  get
};
