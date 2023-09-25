const respondJSON = (request, response, status, content) => {
    response.writeHead(status, { 'Content-Type': 'application/json'});
    response.write(content);
    response.end();
  };

  module.exports = {respond};