/**
 * @description Helper function for enqueue and dequeue methods in CircularQueue.
 *
 * Strategy: Check if index is currently pointing at last element in ring. If
 * so, wrap around by setting index to 0. If not, increment index by 1.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Number} index - pointer for oldest or newest element in queue
 * @param {Number} length - size of queue
 *
 * @returns {Number} - index increased by 1, or 0 if reached end of ring
 *
 * @private
 */
function incrementIndex(index, length) {
  return index === length - 1 ? 0 : index + 1;
}

/** Class representing a ring-buffered dynamic array */
class CircularQueue {
  /**
   * Given an array of fixed size, a queue can be implemented with two pointers
   * tracking the oldest and newest insertions.
   *
   * @constructor
   *
   * @param {Number} size - length of queue
   *
   * @property {Array} ring - circular queue itself
   * @property {Number} size - length of queue
   * @property {Number} oldest - index that points to location for deletion
   * @property {Number} newest - index that points to location for insertion
   */
  constructor(size) {
    this.ring = [];
    this.size = size;

    // enqueue moves pointer before insertion, so oldest begins 1 after newest
    this.oldest = 1;
    this.newest = 0;
  }

  /**
   * @description Remove oldest item from queue.
   *
   * Strategy: Use oldest pointer to delete value. Then increment oldest pointer.
   * Do nothing if no values to dequeue.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {*} - dequeued item
   */
  dequeue() {
    if (this.ring[this.oldest] === undefined) { return; }
    
    const removed = this.ring[this.oldest];
    delete this.ring[this.oldest];
    this.oldest = incrementIndex(this.oldest, this.size);
    return removed;
  }

  /**
   * @description Insert item into queue.
   *
   * Strategy: Use newest pointer to insert value. Increment newest pointer to
   * point to next position. If value is present, move oldest pointer before
   * overwriting. Then set value.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} value - item inserted into queue
   *
   * @returns {Boolean} - true to represent successful insertion
   */
  enqueue(value) {
    this.newest = incrementIndex(this.newest, this.size);

    // If overwriting oldest value, move pointer to track next oldest value
    if (this.ring[this.newest] !== undefined) {
      this.oldest = incrementIndex(this.oldest, this.size);
    }

    this.ring[this.newest] = value;
    return true;
  }
}

module.exports = CircularQueue;