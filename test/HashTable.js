const expect = require('chai').expect;

let HashTable;
let table;

try {
  HashTable = require('../structures/HashTable');
  table = new HashTable();
} catch (e) {
  throw new Error('Hash table could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// AAA (Arrange -> Act -> Assert) test pattern
describe('HashTable', () => {
  beforeEach(() => {
    table = new HashTable();
  });

  it('should be extensible', () => {
    expect(table).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(table).to.have.all.keys('entries', 'size', 'storage');
  });

  describe('#get()', () => {
    it('should return the value associated with the key', () => {
      table.insert('dog', 'woof');

      expect(table.get('dog')).to.equal('woof');
    });

    it('should return undefined if the key is not found in the table', () => {
      expect(table.get('dog')).to.equal(undefined);
    });
  });

  describe('#insert()', () => {
    it('should insert item into empty table', () => {
      table.insert('dog', 'woof');

      expect(table.get('dog')).to.equal('woof');
    });

    it('should insert item into table containing one item', () => {
      table.insert('dog', 'woof');
      table.insert('cat', 'meow');

      expect(table.get('cat')).to.equal('meow');
    });

    it('should overwrite previous value if same key is used', () => {
      table.insert('dog', 'woof');
      table.insert('dog', 'WOOOOOF');

      expect(table.get('dog')).to.equal('WOOOOOF');
    });

    it('should double table size if number of entries exceeds 75% of size', () => {
      table.insert('dog', 'woof');
      table.insert('cat', 'meow');
      table.insert('cow', 'moo');
      table.insert('fox', 'what does it say');
      table.insert('cheetah', 'runs fast');
      table.insert('dogs', 'woofs');
      table.insert('cats', 'meows');
      table.insert('cows', 'moos');
      table.insert('foxes', 'what do they say');
      table.insert('cheetahs', 'run fast');
      table.insert('running', 'out of animals');
      table.insert('have we resized yet', 'nope');
      table.insert('now resized', 'yes');

      expect(table.size).to.equal(32);
    });

    it('should not change size of table', () => {
      table.insert('dog', 'woof');

      expect(table.size).to.equal(16);
    });

    it('should increment number of entries', () => {
      table.insert('dog', 'woof');

      expect(table.entries).to.equal(1);
    });

    it('should return true upon successful insertion', () => {
      expect(table.insert('dog', 'woof')).to.equal(true);
    });
  });

  describe('#remove()', () => {
    it('should remove the associated key-value pair from the table', () => {
      table.insert('dog', 'woof');
      
      table.remove('dog');

      expect(table.get('dog')).to.equal(undefined);
    });

    it('should halve table size if number of entries drops below 25% of size', () => {
      table.insert('dog', 'woof');
      table.insert('cat', 'meow');
      table.insert('cow', 'moo');
      table.insert('fox', 'what does it say');
  
      table.remove('fox');

      expect(table.size).to.equal(8);
    });

    it('should halve table size if remove is used early in table lifecycle', () => {
      table.insert('dog', 'woof');
      table.insert('cat', 'meow');
  
      table.remove('cat');

      expect(table.size).to.equal(8);
    });

    it('should decrement number of entries', () => {
      table.insert('dog', 'woof');
      table.insert('cat', 'meow');

      table.remove('cat');
      
      expect(table.entries).to.equal(1);
    });

    it('should return removed value', () => {
      table.insert('dog', 'woof');

      expect(table.remove('dog')).to.equal('woof');
    });

    it('should return undefined if key is not found in table', () => {
      expect(table.remove('dog')).to.equal(undefined);
    });
  });
});