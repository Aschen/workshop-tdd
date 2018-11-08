const fs = require('fs-extra');

// Replace only the fs.readFile function
const fsMock = Object.assign(fs, {
  readFile: sinon.stub().resolves()
});

mockrequire('fs-extra', fsMock);

// Import a File class with mocked fs-extra dependency
const File = mockrequire.rerequire('../lib/file');
