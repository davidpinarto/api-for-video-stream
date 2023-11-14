const fs = require('fs');

class VideoServices {
  constructor(folder) {
    this._folder = folder;

    // cek apakah folder sudah ada
    if (!fs.existsSync(folder)) {
      // jika belum maka buat folder secara rekusif
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  // file yang merupakan Readable
  /* meta yang mengandung informasi dari berkas
    yang akan ditulis seperti nama berkas, content-type, dan sebagainya
  */
  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = VideoServices;
