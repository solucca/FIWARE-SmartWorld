const http = require("http");
const url = require("url");
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  var options = {
    hostname: "orion",
    port: 1026, // ORION Port
    path: reqUrl.path,
    method: req.method,
    headers: {
      Origin: "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, PATCH",
      "Access-Control-Allow-Origin": "*",
      "fiware-service": "openiot",
      "fiware-servicepath": "/",
      link: '<http://context/ngsi-context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json',
    },
  };

  if (req.method === "PATCH") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      options.headers["Content-Length"] = Buffer.byteLength(body);
      options.headers["Content-Type"] = "application/json";
      console.log("Got:");
      console.log(JSON.stringify(options.headers));

      const proxyReq = http.request(options, (proxyRes) => {
        var headers = proxyRes.headers;
        headers["Access-Control-Allow-Headers"] = "*";
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "GET, PATCH";
        res.writeHead(proxyRes.statusCode, headers);

        console.log("Sent:");
        console.log(JSON.stringify(headers));

        proxyRes.pipe(res);
      });
      
      proxyReq.write(body);
      proxyReq.end();
    });
  } else {
    const proxy = http.request(options, (proxyRes) => {
      var headers = proxyRes.headers;
      headers["Access-Control-Allow-Headers"] = "*";
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "GET, PATCH";
      res.writeHead(proxyRes.statusCode, headers);

      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
