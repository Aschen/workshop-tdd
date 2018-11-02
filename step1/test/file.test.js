describe('File', () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });

  describe('#read', () => {
    it('should read the content and store it in a member');

    it('should exit the program if the file is not readable');
  });

  describe('#write', () => {
    it('should write the content passed in parameter to the file');

    it('should throw an error if the file is not writable');
  });

  describe('#remove', () => {
    it('should remove the file');

    it('should reject with an error if the file does not exists');
  })
});
