const https = require('https');


function getRepos(username, done) {
  if (!username) return done(new Error('Enter username'));

  const options = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: { 'User-Agent': username }
  };

  const req = https.get(options, (res) => {
    if (res.statusCode !== 200) {
      return done(new Error(`Failed to get data from server (${res.statusCode} ${res.statusMessage})`));
    }

    res.setEncoding('utf-8');

    let body = '';

    res.on('data', (data) => body += data);

    res.on('end', () => {
      try {
        done(null, JSON.parse(body));
      } catch (err) {
        done(new Error(`Could not process data (${err.message})`));
      }
    });
  });

  req.on('error', (err) => done(new Error(`Failed to send request (${err.message})`)));
}


module.exports = { getRepos };
