const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://movie.copy.project.nomore.nomoredomains.work',
  'https://movie.copy.project.nomore.nomoredomains.work',
  'http://192.168.0.103:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};
