const VideoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'videos',
  version: '1.0.0',
  register: async (server, { service }) => {
    const videoHandler = new VideoHandler(service);
    server.route(routes(videoHandler));
  },
};
