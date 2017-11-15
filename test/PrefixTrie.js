const expect = require('chai').expect;

let PrefixTrie;
let trie;

try {
  PrefixTrie = require('../structures/PrefixTrie');
  trie = new PrefixTrie();
} catch (e) {
  throw new Error('PrefixTrie could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

describe('PrefixTrie', () => {
  beforeEach(() => {
    trie = new PrefixTrie();
  });

  it('should be extensible', () => {
    expect(trie).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(trie).to.have.all.keys('root');
  });

  it('should have a root that begins as an empty object', () => {
    expect(trie.root).to.deep.equal({});
  });

  describe('#autoComplete()', () => {
    it('should deliver an empty array for empty string input', () => {
      expect(trie.autoComplete('')).to.deep.equal([]);
    });

    it('should deliver all words with a one-character prefix', () => {
      trie.put('dog');
      trie.put('dad');
      trie.put('dag');
      trie.put('cat');

      expect(trie.autoComplete('d')).to.deep.equal(['dad', 'dag', 'dog']);
    });

    it('should deliver all words with a two-character prefix', () => {
      trie.put('dog');
      trie.put('dad');
      trie.put('dag');
      trie.put('cat');

      expect(trie.autoComplete('da')).to.deep.equal(['dad', 'dag']);
    });

    it('should deliver all prefix-matched words, including the word itself', () => {
      trie.put('she');
      trie.put('shell');
      trie.put('shells');
      trie.put('cat');

      expect(trie.autoComplete('she')).to.deep.equal(['she', 'shell', 'shells']);
    });

    it('should throw an error for number input', () => {
      expect(() => trie.autoComplete(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.autoComplete()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.autoComplete({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.autoComplete(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.autoComplete(NaN)).to.throw(Error);
    });
  });

  describe('#delete()', () => {
    it('should delete only word if it is a prefix of another word', () => {
      trie.put('she', 'is prefix to shell');
      trie.put('shell', 'has she as prefix');

      trie.delete('she');

      expect(trie.hasWord('shell')).to.be.true;
      expect(trie.hasWord('she')).to.be.false;
    });
   
    it('should only delete letters after another word that is a prefix', () => {
      trie.put('she', 'is prefix to shell');
      trie.put('shell', 'has she as prefix');

      trie.delete('shell');

      expect(trie.hasWord('she')).to.be.true;
      expect(trie.hasWord('shell')).to.be.false;
    });
   
    it('should only delete letters after a fork to another word', () => {
      trie.put('shelf', 'forks from shel');
      trie.put('shell', 'forks from shel');

      trie.delete('shelf');

      expect(trie.hasWord('shell')).to.be.true;
      expect(trie.hasWord('shelf')).to.be.false;
    });
   
    it('should remove whole word if no overlap with other words', () => {
      trie.put('dog', 'woof');
      trie.put('cat', 'meow');
      trie.put('hawk', 'screeeeeech');
      
      trie.delete('dog');

      expect(trie.hasWord('cat')).to.be.true;
      expect(trie.hasWord('hawk')).to.be.true;
      expect(trie.hasWord('dog')).to.be.false;
      expect(trie.root['d']).to.be.undefined;
    });

    it('should delete the last word in the trie', () => {
      trie.put('dog', 'woof');

      trie.delete('dog');

      expect(trie.root).to.deep.equal({});
    });

    it('should throw an error for keys that do not exist in the tree', () => {
      trie.put('dog', 'woof');

      expect(() => trie.delete('cat')).to.throw(Error);
    });

    it('should throw an error for empty trees', () => {
      expect(() => trie.delete('cat')).to.throw(Error);
    });

    it('should throw an error for number input', () => {
      expect(() => trie.get(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.get()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.get({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.get(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.get(NaN)).to.throw(Error);
    });
  });
  
  describe('#get()', () => {
    it('should return the value associated with the given key', () => {
      trie.put('dog', 'woof');
      trie.put('cat', 'meow');

      expect(trie.get('dog')).to.equal('woof');
    });
    
    it('should work with other words starting with the same letter', () => {
      trie.put('dog', 'woof');
      trie.put('dag', 'topo');
      trie.put('duck', 'quack');

      expect(trie.get('dog')).to.equal('woof');
    });
    
    it('should work as prefix of another word', () => {
      trie.put('dog', 'woof');
      trie.put('doggy', 'quiet');

      expect(trie.get('dog')).to.equal('woof');
    });
    
    it('should work if another word is a prefix', () => {
      trie.put('dog', 'woof');
      trie.put('do', 'quiet');

      expect(trie.get('dog')).to.equal('woof');
    });
    
    it('should work for forked words', () => {
      trie.put('dog', 'woof');
      trie.put('dot', 'quiet');

      expect(trie.get('dog')).to.equal('woof');
    });

    it('should return null for values that do not exist in the trie', () => {
      trie.put('cat', 'meow');

      expect(trie.get('dog')).to.be.null;
    });

    it('should return null for empty tries', () => {
      expect(trie.get('dog')).to.be.null;
    });

    it('should throw an error for number input', () => {
      expect(() => trie.get(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.get()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.get({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.get(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.get(NaN)).to.throw(Error);
    });
  });

  describe('#hasPrefix()', () => {
    it('should return true if the prefix is in the trie', () => {
      trie.put('dog', 'woof');

      expect(trie.hasPrefix('do')).to.be.true;
    });
   
    it('should return true if prefix is a whole word', () => {
      trie.put('dog', 'woof');

      expect(trie.hasPrefix('dog')).to.be.true;
    });

    it('should return false if prefix is not in the trie', () => {
      trie.put('dog', 'woof');

      expect(trie.hasPrefix('ca')).to.be.false;
    });

    it('should return false if trie is empty', () => {
      expect(trie.hasPrefix('ca')).to.be.false;
    });

    it('should throw an error for number input', () => {
      expect(() => trie.hasPrefix(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.hasPrefix()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.hasPrefix({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.hasPrefix(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.hasPrefix(NaN)).to.throw(Error);
    });
  });

  describe('#hasWord()', () => {
    it('should return true if word exists', () => {
      trie.put('dog', 'woof');

      expect(trie.hasWord('dog')).to.be.true;
    });
   
    it('should return false if word does not exist', () => {
      trie.put('dog', 'woof');
      
      expect(trie.hasWord('cat')).to.be.false;
    });

    it('should throw an error for empty trees', () => {
      expect(() => trie.delete('cat')).to.throw(Error);
    });

    it('should throw an error for number input', () => {
      expect(() => trie.get(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.get()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.get({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.get(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.get(NaN)).to.throw(Error);
    });
  });
  
  describe('#orderWords', () => {
    it('should return an array of all words in alphabetical order', () => {
      trie.put('dog', 'woof');
      trie.put('dag', 'toposort');
      trie.put('dad', 'dad jokes');
      trie.put('she', 'mom jokes');
      trie.put('shell', 'good jokes');
      trie.put('shelk', 'great jokes');
      trie.put('shel', 'knock knock');
      trie.put('shells', 'too many jokes');
     
      /*
                    root
                  /    \
                d       s
              /  \      |
            a    o     h
          /  \   |     |
         d    g  g     e*
                        |
                        l*
                      / \
                      k   l*
                          |
                          s
          
         NOTE: Stars (*) highlight that these prefixes are also words
      */

      expect(trie.orderWords()).to.deep.equal([
        'dad',
        'dag',
        'dog',
        'she',
        'shel',
        'shelk',
        'shell',
        'shells'
      ]);
    });

    it('should return an empty array for empty trees', () => {
      expect(trie.orderWords()).to.deep.equal([]);
    });
  });

  describe('#put()', () => {
    it('should add words with no prior prefix in trie', () => {
      trie.put('dog', 'woof');

      expect(trie.get('dog')).to.equal('woof');
    });
    
    it('should add words with a prior prefix in trie', () => {
      trie.put('doggy', 'bark');
      trie.put('dog', 'quiet');
      
      expect(trie.get('doggy')).to.equal('bark');
    });
    
    it('should work without a value inserted', () => {
      trie.put('dog');
      
      expect(trie.hasWord('dog')).to.be.true;
      expect(trie.get('dog')).to.be.undefined;
    });
    
    it('should update the value for words that already exist', () => {
      trie.put('dog', 'quiet');
      trie.put('dog', 'woof');
      
      expect(trie.get('dog')).to.equal('woof');
    });

    it('should throw an error for number input', () => {
      expect(() => trie.put(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => trie.put()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => trie.put({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => trie.put(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => trie.put(NaN)).to.throw(Error);
    });

    it('should throw an error for empty string input', () => {
      expect(() => trie.put('')).to.throw(Error);
    });
  });
});