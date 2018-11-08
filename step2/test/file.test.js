const
  fs = require('fs'),
  mockrequire = require('mock-require'),
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should');

require('should-sinon');

describe('File', () => {
  let
    consoleMock,
    processMock,
    fsMock,
    File;

  beforeEach(() => {
    fsMock = Object.assign(fs, {
      readFile: sinon.stub(),
      writeFile: sinon.stub(),
      unlink: sinon.stub(),
      access: sinon.stub()
    });

    processMock = Object.assign(process, {
      exit: sinon.stub()
    });

    consoleMock = Object.assign(console, {
      error: sinon.stub()
    });

    mockrequire('fs-extra', fsMock);

    File = rewire('../lib/file');
    File.__set__('process', processMock);
    File.__set__('console', consoleMock);
  });

  afterEach(() => {
    mockrequire.stopAll();
  });

  describe('#read', () => {
    it('should read the content and store it in a member', async () => {
      fsMock.readFile.resolves('puts 21 + 21');
      const file = new File('path/file.rb');

      await file.read();

      should(file.content).not.be.undefined().and.not.empty();
      should(fsMock.readFile).be.calledWith('path/file.rb');
    });

    it('should exit the program if the file is not readable', async () => {
      fsMock.readFile.rejects(new Error('Not readable'));
      const file = new File('path/file.rb');

      await file.read();

      should(processMock.exit).be.calledWith(42);
      should(consoleMock.error).be.calledOnce();
    });
  });

  describe('#write', () => {
    it('should write the content passed in parameter to the file', async () => {
      const file = new File('./path/file.rb');

      await file.write('puts 21 + 21');

      should(fsMock.access).be.calledOnce();
      should(fsMock.access.firstCall.args[0]).be.eql('./path/file.rb');
      should(fsMock.writeFile).be.calledOnce();
      should(fsMock.writeFile).be.calledWith('./path/file.rb', 'puts 21 + 21', 'utf8');
    });

    it('should throw an error if the file is not writable', done => {
      const file = new File('./path/file.rb');
      fsMock.access.rejects(new Error('Not writable'));

      file.write('puts "Hello"')
        .then(() => done(new Error('Should throw an error')))
        .catch(() => done());
    });
  });

  describe('#remove', () => {
    it('should remove the file', async () => {
      const file = new File('./path/file.rb');

      await file.remove();

      should(fsMock.unlink).be.calledOnce();
      should(fsMock.unlink).be.calledWith('./path/file.rb');
    });

    it('should reject with an error if the file does not exists', () => {
      fsMock.unlink.rejects(new Error('Not found'));
      const file = new File('./path/file.rb');

      const promise = file.remove();

      should(promise).be.rejected();
    });
  })
});
