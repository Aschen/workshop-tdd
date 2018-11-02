should(result).be.eql(42);

should(result).match({ falut: 'fuzzle' });

should(timestamp).be.approximately(Date.now(), 100);

should(result).be.an.Object().and.not.empty();
