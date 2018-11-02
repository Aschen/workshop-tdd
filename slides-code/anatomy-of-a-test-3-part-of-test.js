it('read the file content', async () => {
  // Setup your environment
  fsStub.readFile.resolves('some content');
  const file = new File('some/file.txt');

  // Execute the function
  await file.read();

  // Assert result
  should(file.content).be.eql('some content');
});
