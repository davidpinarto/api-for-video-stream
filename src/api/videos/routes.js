const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/videos',
    handler: handler.postVideoHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 25000000,
      },
    },
  },
  {
    method: 'GET',
    path: '/videos/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../files/videos'),
      },
    },
  },
];

module.exports = routes;
