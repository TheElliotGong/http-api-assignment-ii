/*
Author: Elliot Gong
Purpose: Create functions for url requests for html content.
Date 9/30/2023
*/

//Constant variables
const fs = require('fs'); // pull in the file system module
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
/**
 * This function returns the server's index page.
 * @param {*} request 
 * @param {*} response 
 */
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};
/**
 * This function returns the css of the index page
 * @param {*} request 
 * @param {*} response 
 */
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,

};
