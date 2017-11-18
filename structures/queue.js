/** 
 * Class representing each node in queue
 * @private
 */
class Node {
  /**
   * Quickly create nodes for queue
   *
   * @constructor
   *
   * @param {*} value - value held by node
   *
   * @property {*} value - value held by node
   * @property {Object|Null} next - point to next node in list
   */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/** Class representing a queue */
class Queue {
  /**
   * Use Linked List structure to trade space from extra pointers
   * for constant time complexity on all operations.
   *
   * @constructor
   *
   * @param {Number=} capacity - limits Queue size
   *
   * @property {Object|Null} front - start of queue
   * @property {Object|Null} rear - back of queue
   * @property {Number} size - length of queue
   * @property {Number} capacity - if size reaches capacity, queue stops enqueuing
   */
  constructor(capacity = Infinity) {
    this.front = null;
    this.rear = null;
    this.size = 0;
    this.capacity = capacity;
  }

  /**
   * @description Remove node from front of queue
   * 
   * Strategy: Reassign front to next node
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {*} - value removed from queue, or undefined if empty
   */
  dequeue() {
    if (this.size === 0) { return; }

    const value = this.front.value;
    this.front = this.front.next;
    this.size--;
    return value;
  }

  /**
   * @description Add node with given input value to end of queue
   * 
   * Strategy: Use native Array push method if under capacity
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} val - value added to queue
   *
   * @returns {Number} - size of queue after value inserted
   */
  enqueue(val) {
    if (this.size >= this.capacity) { return; }

    const node = new Node(val);
    this.size++;

    // if queue was empty
    if (this.front === null) {
      this.front = this.rear = node;
      return this.size;
    }

    this.rear.next = node;
    this.rear = this.rear.next;
    return this.size;
  }

  /** 
   * @description Check if queue is empty
   * 
   * Strategy: Use size property
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Boolean} - true if empty, or false otherwise
   */
  isEmpty() {
    return this.size === 0;
  }

  /** 
   * @description Check if queue has reached capacity
   * 
   * Strategy: Check if size equals capacity
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Boolean} - true if full, or false otherwise
   */
  isFull() {
    return this.size === this.capacity;
  }

  /**
   * @description View value at front of queue
   * 
   * Strategy: Look at front property
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {*} - value at front of queue
   */
  peek() {
    if (this.front !== null) { return this.front.value; };
  }

  /**
   * @description Check size of queue
   * 
   * Strategy: Use size property
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Number} - total amount of items in queue
   */
  getSize() {
    return this.size;
  }
}

module.exports = Queue;
