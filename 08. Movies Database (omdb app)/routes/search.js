const url = require('url');

const omdb = require('../lib/omdb');


function search (req, res) {
  // /search?title=avengers

  const
    parsedUrl = url.parse(req.url, true),
    title = parsedUrl.query.title;

  omdb.get(title, (err, movie) => {
    if (err) {
      return  res.render('error.html', { error: err.message });
    }

    res.render('movie.html', movie);
  });
}


module.exports = search;
