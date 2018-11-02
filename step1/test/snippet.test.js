const
  mockrequire = require('mock-require'),
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should');

require('should-sinon');

describe('Snippet', () => {
  let
    Snippet;

  beforeEach(() => {
    Snippet = require('../lib/snippet');
  });

  afterEach(() => {
  });

  describe('#prepare', () => {
    it('read the snippet definition from the path passed in the constructor', () => {
    });

    it('read the snippet and the template content', () => {
    });

    it('throw an error if the snippet definition is invalid', () => {
    });

    it('throw an error if the template does not exists', () => {
    });

    it('throw an error if the snippet does not exists', () => {
    });
  });

});
