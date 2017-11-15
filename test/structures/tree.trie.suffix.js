const expect = require('chai').expect;

let SuffixTrie;
let trie;

try {
  SuffixTrie = require('../../structures/tree.trie.suffix');
  trie = new SuffixTrie('BANANA');
} catch (e) {
  throw new Error('SuffixTrie could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

describe('SuffixTrie', () => {
  beforeEach(() => {
    trie = new SuffixTrie('BANANA');
  });

  it('should be extensible', () => {
    expect(trie).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(trie).to.have.all.keys('root');
  });

  it('should throw an error for number input', () => {
    expect(() => new SuffixTrie(1)).to.throw(Error);
  });

  it('should throw an error for undefined input', () => {
    expect(() => new SuffixTrie()).to.throw(Error);
  });
  
  it('should throw an error for object input', () => {
    expect(() => new SuffixTrie({ objects: "not allowed" })).to.throw(Error);
  });

  it('should throw an error for null input', () => {
    expect(() => new SuffixTrie(null)).to.throw(Error);
  });

  it('should throw an error for NaN input', () => {
    expect(() => new SuffixTrie(NaN)).to.throw(Error);
  });

  describe('#hasSuffix()', () => {
    it('should return true if the suffix is in the trie', () => {
      expect(trie.hasSuffix('ana')).to.be.true;
    });
   
    it('should return true if suffix is a whole word', () => {
      expect(trie.hasSuffix('banana')).to.be.true;
    });

    it('should return false if suffix is not in the trie', () => {
      expect(trie.hasSuffix('cat')).to.be.false;
    });

    it('should throw an error for number input', () => {
      expect(() => trie.hasSuffix(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.hasSuffix()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.hasSuffix({ objects: "not allowed" })).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.hasSuffix(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.hasSuffix(NaN)).to.throw(Error);
    });
  });

  describe('#matchesPattern()', () => {
    it('should return true if the pattern is a suffix', () => {
      expect(trie.matchesPattern('ana')).to.be.true;
    });

    it('should return true if the pattern exists and is not a suffix', () => {
      expect(trie.matchesPattern('an')).to.be.true;
    });
   
    it('should return true if pattern is a whole word', () => {
      expect(trie.matchesPattern('banana')).to.be.true;
    });

    it('should return false if pattern is not in the trie', () => {
      expect(trie.matchesPattern('cat')).to.be.false;
    });
   
    it('should return true if pattern is an empty string', () => {
      expect(trie.matchesPattern('')).to.be.true;
    });

    it('should throw an error for number input', () => {
      expect(() => trie.matchesPattern(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.matchesPattern()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.matchesPattern({ objects: "not allowed" })).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.matchesPattern(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.matchesPattern(NaN)).to.throw(Error);
    });
  });
});