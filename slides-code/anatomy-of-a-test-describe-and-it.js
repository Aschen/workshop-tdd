describe('File', () => {
  beforeEach(() => {
    // Hook executed before all test
  });

  afterEach(() => {
    // Hook executed after all test
  });

  describe('#read', () => {
    beforeEach(() => {
      // Hook executed before the following 2 tests only
    });

    it('read the file content');

    it('exit the program if the file is not readable');
  });

  describe('#write', () => {
    it('write the content to the file');
  });
});
