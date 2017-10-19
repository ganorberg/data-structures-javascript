const expect = require('chai').expect;

let MinPriorityQueue;
let minPQ;

try {
  MinPriorityQueue = require('../../structures/priority-queues/Min');
  minPQ = new MinPriorityQueue();
} catch (e) {
  throw new Error('MinPriorityQueue could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('MinPriorityQueue', () => {
  beforeEach(() => {
    minPQ = new MinPriorityQueue();
  });

  it('should be extensible', () => {
    expect(minPQ).to.be.extensible;
  });

  it('should have a heap property pointing to an array with one null value', () => {
    expect(minPQ.heap).to.deep.equal([null]);
  });

  describe('#deleteMin()', () => {
    it('should remove the minimum value from the heap', () => {
      minPQ.insert(14);
      minPQ.insert(13);
      minPQ.insert(12);
      minPQ.insert(10);
      minPQ.insert(9);
      minPQ.insert(8);
      minPQ.insert(6);

      minPQ.deleteMin();

      expect(minPQ.heap[1]).to.equal(8);
    });

    it('should return the deleted min value', () => {
      minPQ.insert(0);

      expect(minPQ.deleteMin()).to.equal(0);
    });

    it('should throw an error for empty heap', () => {
      expect(() => minPQ.deleteMin()).to.throw(Error);
    });
  });

  describe('#insert()', () => {
    it('should correctly insert keys when called in descending order', () => {
      minPQ.insert(14);
      minPQ.insert(13);
      minPQ.insert(12);
      minPQ.insert(10);
      minPQ.insert(9);
      minPQ.insert(8);
      minPQ.insert(6);

      /*
        14
        13 14
        12 14 13
        10 12 13 14
        9 10 13 14 12
        8 10 9 14 12 13
        6 10 8 14 12 13 9
      */

      expect(minPQ.heap).to.deep.equal([null, 6, 10, 8, 14, 12, 13, 9]);
    });

    it('should correctly insert keys when called in ascending order', () => {
      minPQ.insert(6);
      minPQ.insert(8);
      minPQ.insert(9);
      minPQ.insert(10);
      minPQ.insert(12);
      minPQ.insert(13);
      minPQ.insert(14);

      expect(minPQ.heap).to.deep.equal([null, 6, 8, 9, 10, 12, 13, 14]);
    });
    
    it('should throw an error for NaN input', () => {
      expect(() => minPQ.insert(NaN)).to.throw(Error);
    });

    it('should throw an error for non-string non-numeric input', () => {
      expect(() => minPQ.insert({})).to.throw(Error);
    });
  });

  describe('#isEmpty()', () => {
    it('should return true if heap is empty', () => {
      expect(minPQ.isEmpty()).to.equal(true);
    });

    it('should return false if heap contains values', () => {
      minPQ.insert(0);

      expect(minPQ.isEmpty()).to.equal(false);
    });
  });

  describe('#peekMin', () => {
    it('should return the minimum value from the tree', () => {
      minPQ.insert(6);
      minPQ.insert(8);
      minPQ.insert(9);
      minPQ.insert(10);
      minPQ.insert(12);
      minPQ.insert(13);
      minPQ.insert(14);

      expect(minPQ.peekMin()).to.equal(6);
    });
  });
});