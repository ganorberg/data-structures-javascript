/** Class representing stack */
class Stack {
  /**
   * Represents a stack for numbers
   *
   * @constructor
   *
   * @param {Number=} capacity
   *
   * @property {Array} maxes - tracks largest value in queue for constant lookup
   * @property {Array} storage - the stack itself
   * @property {Number} capacity - queue stops enqueuing at capacity
   */
  constructor(capacity = Infinity) {
    this.maxes = [-Infinity];
    this.storage = [];
    this.capacity = capacity;
  }

  /** 
   * @description Check maximum in stack
   * 
   * Strategy: Return last value added to maxes array
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {Number} - maximum value in stack
   */
  getMax() {
    return this.maxes[this.maxes.length - 1];
  }

  /** 
   * @description Check if stack is empty
   * 
   * Strategy: Use storage array length
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {Boolean} - true if empty, or false otherwise
   */
  isEmpty() {
    return this.storage.length === 0;
  }

  /** 
   * @description Check if stack has reached capacity
   * 
   * Strategy: Check if storage array length matches capacity value
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {Boolean} - true if full, or false otherwise
   */
  isFull() {
    return this.storage.length === this.capacity;
  }

  /**
   * @description View value at top of stack
   * 
   * Strategy: Look at storage array's final element using index
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {*} - value at top of stack
   */
  peek() {
    return this.storage[this.storage.length - 1];
  }

  /**
   * @description Add input value to top of stack
   * 
   * Strategy: Use native Array push method if under capacity. If value is
   * greater than previous max, make it the maximum.
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @param {*} val - value added to stack
   *
   * @returns {Number} - size of stack after value inserted
   */
  push(val) {
    if (this.storage.length < this.capacity) {
      this.storage.push(val);
      if (val >= this.maxes[this.maxes.length - 1]) { this.maxes.push(val); }
    }

    return this.storage.length;
  }

  /**
   * @description Remove value from top of stack
   * 
   * Strategy: Use native Array pop method. Check if maximum for removal.
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {Number} - value removed from stack, or undefined if empty
   */
  pop() {
    const popped = this.storage[this.storage.length - 1];
    const max = this.maxes[this.maxes.length - 1];
    if (popped === max) { this.maxes.pop(); }
    return this.storage.pop();
  }

  /**
   * @description Check size of stack
   * 
   * Strategy: Use storage length
   *
   * Time complexity: O(1)
   * 
   * Space complexity: O(1)
   *
   * @returns {Number} - total amount of items in stack
   */
  size() {
    return this.storage.length;
  }
}

module.exports = Stack;
