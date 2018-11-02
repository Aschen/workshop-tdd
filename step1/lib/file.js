const
  path = require('path');

class File {
  constructor (filePath) {
    this.path = filePath;
    this.name = path.basename(filePath);
    this.ext = path.extname(filePath);
  }

  async read () {
  }

  async write (content) {
  }

  remove () {
  }
}

module.exports = File;
