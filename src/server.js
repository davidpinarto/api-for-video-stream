require('dotenv').config();

const Hapi = require('@hapi/hapi');
const path = require('path');
const Inert = require('@hapi/inert');

const videos = require('./api/videos');
const VideoServices = require('./services/video/VideoServices');

const init = async () => {
  const videoServices = new VideoServices(path.resolve(__dirname, 'files/videos'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  await server.register([
    {
      plugin: Inert,
    },
    {
      plugin: videos,
      options: {
        service: videoServices,
      },
    },
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
