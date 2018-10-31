const
  fs = require('fs-extra');

class File {
  constructor (path) {
    this.path = path;
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
