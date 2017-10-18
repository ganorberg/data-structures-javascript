const expect = require('chai').expect;

let PriorityQueue;
let maxHeap;

try {
  PriorityQueue = require('../structures/PriorityQueue');
  maxHeap = new PriorityQueue();
} catch (e) {
  throw new Error('PriorityQueue could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('PriorityQueue', () => {
  beforeEach(() => {
    maxHeap = new PriorityQueue();
  });

  it('should be extensible', () => {
    expect(maxHeap).to.be.extensible;
  });

  it('should have a heap property pointing to an array with one null value', () => {
    expect(maxHeap.heap).to.deep.equal([null]);
  });

  describe('#deleteMax()', () => {
    it('should remove the maximum value from the heap', () => {
      maxHeap.insert(6);
      maxHeap.insert(8);
      maxHeap.insert(9);
      maxHeap.insert(10);
      maxHeap.insert(12);
      maxHeap.insert(13);
      maxHeap.insert(14);

      maxHeap.deleteMax();

      expect(maxHeap.heap[1]).to.equal(13);
    });

    it('should return the deleted max value', () => {
      maxHeap.insert(0);

      expect(maxHeap.deleteMax()).to.equal(0);
    });

    it('should throw an error for empty heap', () => {
      expect(() => maxHeap.deleteMax()).to.throw(Error);
    });
  });

  describe('#insert()', () => {
    it('should insert the key into the heap in sorted order', () => {
      maxHeap.insert(6);
      maxHeap.insert(8);
      maxHeap.insert(9);
      maxHeap.insert(10);
      maxHeap.insert(12);
      maxHeap.insert(13);
      maxHeap.insert(14);

      /*
        6
        8 6
        9 6 8
        10 9 8 6
        12 10 8 6 9
        13 10 12 6 9 8
        14 10 13 6 9 8 12
      */

      expect(maxHeap.heap).to.deep.equal([null, 14, 10, 13, 6, 9, 8, 12]);
    });
    
    it('should throw an error for NaN input', () => {
      expect(() => maxHeap.insert(NaN)).to.throw(Error);
    });

    it('should throw an error for non-string non-numeric input', () => {
      expect(() => maxHeap.insert({})).to.throw(Error);
    });
  });

  describe('#isEmpty()', () => {
    it('should return true if heap is empty', () => {
      expect(maxHeap.isEmpty()).to.equal(true);
    });

    it('should return false if heap contains values', () => {
      maxHeap.insert(0);

      expect(maxHeap.isEmpty()).to.equal(false);
    });
  });

  describe('#peekMax', () => {
    it('should return the maximum value from the tree', () => {
      maxHeap.insert(6);
      maxHeap.insert(8);
      maxHeap.insert(9);
      maxHeap.insert(10);
      maxHeap.insert(12);
      maxHeap.insert(13);
      maxHeap.insert(14);

      expect(maxHeap.peekMax()).to.equal(14);
    });
  });
});