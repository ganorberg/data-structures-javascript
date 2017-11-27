const expect = require('chai').expect;

let Q;
let queue;

try {
  Q = require('../../structures/queue');
  queue = new Q();
} catch (e) {
  throw new Error('Queue could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

describe('Queue', () => {
  beforeEach(() => {
    queue = new Q();
  });

  it('should be extensible', () => {
    expect(queue).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(queue).to.have.all.keys('front', 'rear', 'size', 'capacity');
  });

  describe('#isEmpty()', () => {
    it('should return true if queue is empty', () => {
      expect(queue.isEmpty()).to.equal(true);
    });

    it('should return false if queue contains values', () => {
      queue.enqueue(0)

      expect(queue.isEmpty()).to.equal(false);
    });
  });

  describe('#dequeue()', () => {
    it('should decrease size of queue by 1', () => {
      queue.enqueue(0);
      queue.enqueue(1);

      queue.dequeue();

      expect(queue.size).to.equal(1);
    });

    it('should remove earliest item enqueued to queue (FIFO)', () => {
      queue.enqueue(0);
      queue.enqueue(1);

      queue.dequeue();

      expect(queue.front.value).to.equal(1);
    });

    it('should set front to null when dequeuing the last node', () => {
      queue.enqueue(1);

      queue.dequeue();

      expect(queue.front).to.be.null;
    });

    it('should set rear to null when dequeuing the last node', () => {
      queue.enqueue(1);

      queue.dequeue();

      expect(queue.rear).to.be.null;
    });

    it('should return removed value', () => {
      queue.enqueue(0);

      expect(queue.dequeue()).to.equal(0);
    });
  });


  describe('#enqueue()', () => {
    it('should increase size of queue by 1', () => {
      queue.enqueue(0);

      expect(queue.size).to.equal(1);
    });

    it('should append input to end of queue', () => {
      queue.enqueue(0);
      queue.enqueue(1);

      expect(queue.rear.value).to.equal(1);
    });

    it('should not insert item if queue is at capacity', () => {
      const cappedQueue = new Q(0);

      queue.enqueue('never enqueues');

      expect(cappedQueue.size).to.equal(0);
    });
  });

  describe('#getSize()', () => {
    it('should return 0 if queue is empty', () => {
      expect(queue.getSize()).to.equal(0);
    });

    it('should return 1 if queue contains one item', () => {
      queue.enqueue(0);

      expect(queue.getSize()).to.equal(1);
    });
  });

  describe('#isFull()', () => {
    it('should return false if queue has not reached capacity', () => {
      const cappedQueue = new Q(1);

      expect(cappedQueue.isFull()).to.equal(false);
    });

    it('should return true if queue has reached capacity', () => {
      const cappedQueue = new Q(1);

      cappedQueue.enqueue(0);

      expect(cappedQueue.isFull()).to.equal(true);
    });
  });

  describe('#peek()', () => {
    it('should return value at top of queue', () => {
      queue.enqueue(0);

      expect(queue.peek()).to.equal(0);
    });

    it('should return undefined for empty queue', () => {
      expect(queue.peek()).to.equal(undefined);
    });
  });
});