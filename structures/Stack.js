class Stack {
  /**
   * Represents a stack
   * @constructor
   * @param {Number=} capacity 
   */
  constructor(capacity = Infinity) {
    this.storage = [];
    this.capacity = capacity;
  }

  /** 
   * Description: Check if stack is empty
   * Strategy: Use storage array length
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Boolean} - true if empty, or false otherwise
   */
  isEmpty() {
    return this.storage.length === 0;
  }

  /** 
   * Description: Check if stack has reached capacity
   * Strategy: Check if storage array length matches capacity value
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Boolean} - true if full, or false otherwise
   */
  isFull() {
    return this.storage.length === this.capacity;
  }

  /**
   * Description: View value at top of stack
   * Strategy: Look at storage array's final element using index
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {*} - value at top of stack
   */
  peek() {
    return this.storage[this.storage.length - 1];
  }

  /**
   * Description: Add input value to top of stack
   * Strategy: Use native Array push method if under capacity
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} val - value added to stack
   * @return {Number} - size of stack after value inserted
   */
  push(val) {
    if (this.storage.length < this.capacity) { this.storage.push(val); }
    return this.storage.length;
  }

  /**
   * Description: Remove value from top of stack
   * Strategy: Use native Array pop method
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {*} - value removed from stack, or undefined if empty
   */
  pop() {
    return this.storage.pop();
  }

  /**
   * Description: Check size of stack
   * Strategy: Use storage length
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Number} - total amount of items in stack
   */
  size() {
    return this.storage.length;
  }
}

module.exports = Stack;
