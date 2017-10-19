const expect = require('chai').expect;

let MaxPriorityQueue;
let maxPQ;

try {
  MaxPriorityQueue = require('../../structures/priority-queues/Max');
  maxPQ = new MaxPriorityQueue();
} catch (e) {
  throw new Error('MaxPriorityQueue could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('MaxPriorityQueue', () => {
  beforeEach(() => {
    maxPQ = new MaxPriorityQueue();
  });

  it('should be extensible', () => {
    expect(maxPQ).to.be.extensible;
  });

  it('should have a heap property pointing to an array with one null value', () => {
    expect(maxPQ.heap).to.deep.equal([null]);
  });

  describe('#deleteMax()', () => {
    it('should remove the maximum value from the heap', () => {
      maxPQ.insert(6);
      maxPQ.insert(8);
      maxPQ.insert(9);
      maxPQ.insert(10);
      maxPQ.insert(12);
      maxPQ.insert(13);
      maxPQ.insert(14);

      maxPQ.deleteMax();

      expect(maxPQ.heap[1]).to.equal(13);
    });

    it('should return the deleted max value', () => {
      maxPQ.insert(0);

      expect(maxPQ.deleteMax()).to.equal(0);
    });

    it('should throw an error for empty heap', () => {
      expect(() => maxPQ.deleteMax()).to.throw(Error);
    });
  });

  describe('#insert()', () => {
    it('should correctly insert keys when called in ascending order', () => {
      maxPQ.insert(6);
      maxPQ.insert(8);
      maxPQ.insert(9);
      maxPQ.insert(10);
      maxPQ.insert(12);
      maxPQ.insert(13);
      maxPQ.insert(14);

      /*
        6
        8 6
        9 6 8
        10 9 8 6
        12 10 8 6 9
        13 10 12 6 9 8
        14 10 13 6 9 8 12
      */

      expect(maxPQ.heap).to.deep.equal([null, 14, 10, 13, 6, 9, 8, 12]);
    });

    it('should correctly insert keys when called in descending order', () => {
      maxPQ.insert(14);
      maxPQ.insert(13);
      maxPQ.insert(12);
      maxPQ.insert(10);
      maxPQ.insert(9);
      maxPQ.insert(8);
      maxPQ.insert(6);

      expect(maxPQ.heap).to.deep.equal([null, 14, 13, 12, 10, 9, 8, 6]);
    });
    
    it('should throw an error for NaN input', () => {
      expect(() => maxPQ.insert(NaN)).to.throw(Error);
    });

    it('should throw an error for non-string non-numeric input', () => {
      expect(() => maxPQ.insert({})).to.throw(Error);
    });
  });

  describe('#isEmpty()', () => {
    it('should return true if heap is empty', () => {
      expect(maxPQ.isEmpty()).to.equal(true);
    });

    it('should return false if heap contains values', () => {
      maxPQ.insert(0);

      expect(maxPQ.isEmpty()).to.equal(false);
    });
  });

  describe('#peekMax', () => {
    it('should return the maximum value from the tree', () => {
      maxPQ.insert(6);
      maxPQ.insert(8);
      maxPQ.insert(9);
      maxPQ.insert(10);
      maxPQ.insert(12);
      maxPQ.insert(13);
      maxPQ.insert(14);

      expect(maxPQ.peekMax()).to.equal(14);
    });
  });
});