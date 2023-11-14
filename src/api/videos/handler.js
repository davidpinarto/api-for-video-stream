const autoBind = require('auto-bind');

class VideoHandler {
  constructor(services) {
    this._services = services;

    autoBind(this);
  }

  async postVideoHandler(request, h) {
    const { data } = request.payload;

    const filename = await this._services.writeFile(data, data.hapi);

    const response = h.response({
      status: 'success',
      data: {
        fileLocation: `http://${process.env.DOMAIN_NAME}/videos/${filename}`,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = VideoHandler;
