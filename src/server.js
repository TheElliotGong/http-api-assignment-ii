const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, callback) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    // Once we have the bodyParams object, we will call the handler function. We then
    // proceed much like we would with a GET request.
    callback(request, response, bodyParams);
  });
};
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, responseHandler.addUser);
  }
};

const handleGet = (request, response, parseUrl) => {
  switch (parseUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/getUsers':
      responseHandler.getUsers(request, response);
      break;
    case '/notReal':
      responseHandler.notFound(request, response);
      break;
    default:
      responseHandler.notFound(request, response);
      break;
  }
};

const handleHead = (request, response, parseUrl) => {
  switch (parseUrl.pathname) {
    case '/getUsers':
      responseHandler.getUsersMeta(request, response);
      break;
    case '/notReal':
      responseHandler.notFoundMeta(request, response);
      break;
    default:
      responseHandler.notFoundMeta(request, response);
      break;
  }
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
