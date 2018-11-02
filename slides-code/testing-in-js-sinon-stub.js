const stub = sinon.stub().returns('boo far');

const result = stub(21, 42, 84);

should(stub).be.calledOnce();
should(stub).be.calledWith(21, 42, 84);
should(result).be.eql('boo far');
