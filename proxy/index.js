const http = require('http');
const url = require('url');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  var options = {
    hostname: 'orion',
    port: 1026, // ORION Port
    path: reqUrl.path,
    method: req.method,
    headers: {
      'Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, PATCH',
      'Access-Control-Allow-Origin': '*',
      'fiware-service': 'openiot',
      'fiware-servicepath': '/',
      'link': '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json'
    }
  };

  if (req.method === 'PATCH') {
    const jsonData = JSON.stringify({ "type": "Property",  "value": "" } );
    options.headers['Content-Length'] = jsonData.length;
    options.headers['Content-Type'] = "application/json";
    const proxyReq = http.request(options, (proxyRes) => {
        proxyRes.pipe(res);
    });
    proxyReq.write(jsonData);
    proxyReq.end();
  } else {
    const proxy = http.request(options, (proxyRes) => {

        var headers = proxyRes.headers;
        headers['access-control-allow-headers'] = "*";
        headers['access-control-allow-origin'] = "*";
        headers['access-control-allow-methods'] = "GET, PATCH";
        res.writeHead(proxyRes.statusCode, headers);

        proxyRes.pipe(res, { end: true });
      });
      
      req.pipe(proxy, { end: true });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});