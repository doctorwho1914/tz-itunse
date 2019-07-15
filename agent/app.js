const throng = require('throng');
const server = require('./server');

throng(5, (id) => {
  server();
  console.log(`Started worker ${id}`);
});