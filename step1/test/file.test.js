const
  mockrequire = require('mock-require'),
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should');

require('should-sinon');

describe('File', () => {
  let
    File,
    consoleMock,
    processMock,
    fsMock;

  beforeEach(() => {
    fsMock = {
      readFile: sinon.stub().resolves(),
      access: sinon.stub().resolves(),
      writeFile: sinon.stub().resolves(),
      unlink: sinon.stub().resolves(),
      constants: {
        W_OK: 42
      }
    };

    consoleMock = {
      error: sinon.stub()
    };

    processMock = {
      exit: sinon.stub()
    };

    mockrequire('fs-extra', fsMock);

    File = rewire('../lib/file');
    File.__set__('console', consoleMock);
    File.__set__('process', processMock);
  });

  afterEach(() => {
    mockrequire.stopAll();
  });

  describe('#read', () => {

    // Simple stub
    it('read the file content', async () => {
      fsMock.readFile.resolves('puts "Hello"');
      const file = new File('./path/to/file.rb');

      await file.read();

      should(fsMock.readFile).be.calledOnce();
      should(fsMock.readFile).be.calledWith('./path/to/file.rb', 'utf8');
      should(file.content).be.eql('puts "Hello"');
    });

    // rewire console.log and process.exit
    it('exit the program if the file is not readable', async () => {
      fsMock.readFile.rejects(new Error('Not readable'));
      const file = new File('./path/to/file.rb');

      await file.read();

      should(consoleMock.error).be.calledOnce();
      should(consoleMock.error.firstCall.args[0]).be.instanceOf(Error);
      should(processMock.exit).be.calledWith(1);
    });
  });

  describe('#write', () => {
    // Multiple stubs
    it('write the content to the file', async () => {
      const file = new File('./path/to/file.rb');

      await file.write('puts "Hello"');

      should(fsMock.access).be.calledOnce();
      should(fsMock.access.firstCall.args[0]).be.eql('./path/to/file.rb');
      should(fsMock.writeFile).be.calledOnce();
      should(fsMock.writeFile).be.calledWith('./path/to/file.rb', 'puts "Hello"', 'utf8');
    });

    // Usage of done()
    it('throw an error if the file is not writable', done => {
      const file = new File('./path/to/file.rb');
      fsMock.access.rejects(new Error('Not writable'));


      file.write('puts "Hello"')
        .then(() => done(new Error('Should throw an error')))
        .catch(() => done());
    });
  });

  describe('#remove', () => {
    // Simple stub
    it('remove the file', async () => {
      const file = new File('./path/to/file.rb');

      await file.remove();

      should(fsMock.unlink).be.calledOnce();
      should(fsMock.unlink).be.calledWith('./path/to/file.rb');
    });

    // Test rejected promise
    it('reject with an error if the file does not exists', () => {
      const file = new File('./path/to/file.rb');
      fsMock.unlink.rejects(new Error('Not found'));

      const promise = file.remove();

      should(promise).be.rejected();
    });
  })
});
