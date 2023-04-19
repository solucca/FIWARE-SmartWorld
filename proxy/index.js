const http = require('http');
const url = require('url');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  var options = {
    hostname: 'orion',
    port: 1026, // ORION Port
    path: reqUrl.path,
    method: 'GET',
    headers: {
      'Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*',
      'fiware-service': 'openiot',
      'fiware-servicepath': '/'
    }
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  
  req.pipe(proxy, { end: true });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});