function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const capitalizeSpy = sinon.spy(capitalize);

const result = capitalizeSpy('fuzzle me master');

should(capitalizeSpy).be.calledOnce();
should(capitalizeSpy).be.calledWith('fuzzle me master');
should(result).be.eql('Fuzzle me master');
