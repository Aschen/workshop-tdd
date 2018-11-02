const
  path = require('path'),
  fs = require('fs-extra');

class File {
  constructor (filePath) {
    this.path = filePath;
    this.name = path.basename(filePath);
    this.ext = path.extname(filePath);
  }

  async read () {
    try {
      this.content = await fs.readFile(this.path, 'utf8');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async write (content) {
    await fs.access(this.path, fs.constants.W_OK);

    return fs.writeFile(this.path, content, 'utf8');
  }

  remove () {
    return fs.unlink(this.path);
  }
}

module.exports = File;
