const fs = require('fs-extra');

const localVar = 21;

class File {
  async read() {
    try {
      this.content =
        await fs.readFile(this.path);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
