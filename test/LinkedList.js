const expect = require('chai').expect;

let LinkedList;
let list;

try {
  LinkedList = require('../structures/LinkedList');
  list = new LinkedList();
} catch (e) {
  throw new Error('LinkedList could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('LinkedList', () => {
  beforeEach(() => {
    list = new LinkedList();
  });

  it('should be extensible', () => {
    expect(list).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(list).to.have.all.keys('head', 'tail', 'size');
  });

  describe('#push()', () => {
    it('should set head and tail to new node with given value', () => {
      list.push(0);

      expect(list.head).to.be.an('object');
      expect(list.tail).to.be.an('object');
      expect(list.head.value).to.equal(0);
      expect(list.tail.value).to.equal(0);
    });

    it('should create a node with value and next properties', () => {
      list.push(0)

      expect(list.head).to.have.all.keys('value', 'next');
    });

    it('should append node with given value to end of list', () => {
      list.push(0);
      list.push(1);

      expect(list.tail.value).to.equal(1);
    });
    
    it('should increase size of list by 1', () => {
      list.push(0);

      expect(list.size).to.equal(1);
    });
    
    it('should throw an error for undefined input', () => {

    });
    
    it('should throw an error for null input', () => {

    });
  });
});