const expect = require('chai').expect;

let CircularQueue;
let queue;

try {
  CircularQueue = require('../../structures/queue.circular');
  queue = new CircularQueue(4);
} catch (e) {
  throw new Error('Queue could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

describe('CircularQueue', () => {
  beforeEach(() => {
    queue = new CircularQueue(4);
  });

  it('should be extensible', () => {
    expect(queue).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(queue).to.have.all.keys('ring', 'size', 'oldest', 'newest');
  });

  describe('#enqueue()', () => {
    it('should insert item into empty queue', () => {
      queue.enqueue(10);

      expect(queue.ring[1]).to.equal(10);
    });

    it('should insert item into queue containing one item', () => {
      queue.enqueue(10);
      queue.enqueue(9);

      expect(queue.ring[2]).to.equal(9);
    });

    it('should overwrite oldest item if queue is full', () => {
      queue.enqueue(10);
      queue.enqueue(9);
      queue.enqueue(8);
      queue.enqueue(7);
      queue.enqueue(6);

      expect(queue.ring[1]).to.equal(6);
    });

    it('should not change size of queue', () => {
      queue.enqueue(0);

      expect(queue.size).to.equal(4);
    });
  });

  describe('#dequeue()', () => {
    it('should remove oldest item from queue', () => {
      queue.enqueue(0);
      queue.enqueue(1);

      queue.dequeue();

      expect(queue.ring[1]).to.equal(undefined);
    });

    it('should remove last remaining item', () => {
      queue.enqueue(0);

      queue.dequeue();

      expect(queue.ring[1]).to.equal(undefined);
    });

    it('should return removed value', () => {
      queue.enqueue(0);

      expect(queue.dequeue()).to.equal(0);
    });

    it('should return undefined for empty queue', () => {
      expect(queue.dequeue()).to.equal(undefined);
    });
  });
});