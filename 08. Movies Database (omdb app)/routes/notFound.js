function notFound (req, res) {
  res.render('error.html', { error: 'Not found!'});
}


module.exports = notFound;

