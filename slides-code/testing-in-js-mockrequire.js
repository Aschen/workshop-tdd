const fsMock = {
  readFile: sinon.stub().resolves(),
  writeFile: sinon.stub().resolves()
};

mockrequire('fs-extra', fsMock);

const File = mockrequire.rerequire('../lib/file');
