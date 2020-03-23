/**
 * Class representing a node
 * @private
 */
class Node {
  /**
   * Quickly create nodes for linked lists
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

/** Class representing a linked list */
class LinkedList {
  /**
   * Track head, tail and key features of linked list. Provides access to tail
   * so tail operations can occur in constant time. Provides size property for
   * constant time access.
   *
   * @constructor
   *
   * @property {Object|Null} head - first node in linked list
   * @property {Object|Null} tail - last node in linked list
   * @property {Number} size - length of linked list
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * @description Add nodes with given value to end of list.
   *
   * Strategy: Since we have access to tail, append newly created Node to tail
   * and move tail pointer to new node.
   *
   * Edge case(s): empty list, inappropriate inputs
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} value - value to be inserted into new node
   */
  push(value) {
    if (value === null || value === undefined) {
      throw new Error(
        "This Linked List does not allow empty values like null and undefined"
      );
    }

    const node = new Node(value);
    this.size++;

    // Edge case: empty list
    if (this.head === null) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  /**
   * @description Check if node with given value exists in list.
   *
   * Strategy: Loop through list checking if value of any node equals input
   * value. End loop when we reach the last node.
   *
   * Time complexity: O(N)
   * Space complexity: O(1)
   *
   * @param {*} value - checked if exists in list
   *
   * @returns {Boolean} - whether or not value exists in list
   */

  contains(value) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.value === value) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  /**
   * @description Remove first node with given value from list.
   *
   * Strategy: Loop through LL tracking previous and current nodes so you can
   * remove reference to target node by pointing prev's next at current's next.
   *
   * Edge case(s): empty list, one node, remove head or tail, value not in list
   *
   * Time complexity: O(N)
   * Space complexity: O(1)
   *
   * @param {*} value - value to be removed from list
   *
   * @returns {Object} - node removed
   */
  remove(value) {
    // Edge case: empty list
    if (this.size === 0) {
      throw new Error("This Linked List is already empty");
    }

    // Edge case: if head matches, need to update head
    if (this.head.value === value) {
      const node = this.head;
      this.head = this.head.next;

      // Edge case: if removing final node in list
      if (this.size === 1) {
        this.tail = null;
      }

      this.size--;
      return node;
    }

    let prev = this.head;
    let curr = this.head.next;

    while (curr !== null) {
      if (curr.value === value) {
        // Edge case: if tail matches, need to update tail
        if (curr === this.tail) {
          this.tail = prev;
        }

        const node = curr;
        prev.next = curr.next;
        this.size--;
        return node;
      }

      prev = curr;
      curr = curr.next;
    }

    throw new Error("That value does not exist in this Linked List");
  }
}

module.exports = LinkedList;
