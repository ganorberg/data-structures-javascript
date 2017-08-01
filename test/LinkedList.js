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
      expect(() => list.push(undefined)).to.throw(Error);
    });
    
    it('should throw an error for null input', () => {
      expect(() => list.push(null)).to.throw(Error);
    });
  });

  describe('#contains()', () => {
    it('should return true if value is in the middle of the list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      expect(list.contains(1)).to.equal(true);
    });

    it('should return true if value is in the head', () => {
      list.push(0);

      expect(list.contains(0)).to.equal(true);
    });

    it('should return true if value is in the tail', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      expect(list.contains(2)).to.equal(true);
    });

    it('should return false if value is not in the list', () => {
      list.push(0);
      list.push(2);

      expect(list.contains(1)).to.equal(false);
    });

    it('should return false if list is empty', () => {
      expect(list.contains(1)).to.equal(false);
    });
  });

  describe('#remove()', () => {
    it('should remove node from middle of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      list.remove(1);

      expect(list.head.next.value).to.equal(2);
    });

    it('should decrement size upon removing node from middle of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      list.remove(1);

      expect(list.size).to.equal(2);
    });

    it('should return removed node from middle of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      const removed = list.remove(1);

      expect(removed).to.be.an('object');
      expect(removed.value).to.equal(1);
    });

    it('should remove node from end of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      list.remove(2);

      expect(list.tail.value).to.equal(1);
      expect(list.tail.next).to.equal(null);
    });

    it('should decrement size upon removing node from end of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      list.remove(2);

      expect(list.size).to.equal(2);
    });

    it('should return removed node from end of list', () => {
      list.push(0);
      list.push(1);
      list.push(2);

      const removed = list.remove(2);

      expect(removed).to.be.an('object');
      expect(removed.value).to.equal(2);
    });

    it('should remove matching head node and set head to next node', () => {
      list.push(0);
      list.push(1);

      list.remove(0);

      expect(list.head.value).to.equal(1);
    });

    it('should decrement size upon removing head', () => {
      list.push(0);
      list.push(1);

      list.remove(0);

      expect(list.size).to.equal(1);
    });

    it('should return removed head', () => {
      list.push(0);
      list.push(1);

      const removed = list.remove(0);

      expect(removed).to.be.an('object');
      expect(removed.value).to.equal(0);
    });

    it('should remove single node and set head and tail pointers to null', () => {
      list.push(0);

      list.remove(0);

      expect(list.head).to.equal(null);
      expect(list.tail).to.equal(null);
    });

    it('should decrement size upon removing single node', () => {
      list.push(0);

      list.remove(0);

      expect(list.size).to.equal(0);
    });

    it('should return removed single node', () => {
      list.push(0);

      const removed = list.remove(0);

      expect(removed).to.be.an('object');
      expect(removed.value).to.equal(0);
    });

    it('should throw an error if list is empty', () => {
      expect(() => list.remove(1)).to.throw(Error);
    });

    it('should throw an error if attempting to remove value not in list', () => {
      list.push(0);

      expect(() => list.remove(1)).to.throw(Error);
    });
  });
});