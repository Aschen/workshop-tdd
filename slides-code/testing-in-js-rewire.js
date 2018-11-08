const processMock = Object.assign(process, {
  exit: sinon.stub()
});

const File = rewire('../lib/file');

File.__set__('process', processMock);
File.__set__('localVar', 42);
