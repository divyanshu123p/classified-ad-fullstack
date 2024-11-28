const http = require('http');
const controllers = require('./controllers');

const routes = {
  '/api/users': controllers.users,
  '/api/categories': controllers.categories,
  '/api/cities': controllers.cities,
  '/api/ads': controllers.ads,
  '/api/comments': controllers.comments,
};

const router = (req, res) => {
  const { url, method } = req;
  const handler = routes[url] && routes[url][method.toLowerCase()];
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};

module.exports = router;