const
  fs = require('fs-extra'),
  path = require('path');

class File {
  constructor (filePath) {
    this.path = filePath;
    this.name = path.basename(filePath);
    this.ext = path.extname(filePath);

    this.content = '';
  }

  async read () {
    try {
      this.content = await fs.readFile(this.path, 'utf8');
    } catch (error) {
      console.error(error);
      process.exit(42);
    }
  }

  async write (content) {
    await fs.access(this.path, fs.constants.R_OK);
    return fs.writeFile(this.path, content, 'utf8');
  }

  remove () {
    return fs.unlink(this.path);
  }
}

module.exports = File;
