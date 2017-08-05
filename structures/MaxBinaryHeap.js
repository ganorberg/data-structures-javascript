/**
 * @description Helper function to swap two array elements in-place
 *
 * Strategy: Use array destructuring
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Array} arr - array with elements to be swapped
 * @param {Number} indexA - index of first element to be swapped
 * @param {Number} indexB - index of second element to be swapped
 */
function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

/** Class representing our heap */
class MaxBinaryHeap {
  /**
   * Track heap using dynamic array. Element at index N has children at
   * indices 2N and 2N+1. Begin with null at index 0 for easier math.
   *
   * @constructor
   */
  constructor() {
    this.heap = [null];
  }

  /**
   * @description Remove largest value in heap and readjust heap to maintain
   * invariant that all parents are larger than their children
   *
   * Strategy: Swap max (root of tree) with last element in heap. Pop max out
   * and store in variable to eventually return. Sink swapped element sitting
   * at the root to find its proper place.
   *
   * Edge case(s): empty heap
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   * 
   * @return {Number|String} - old max
   */
  deleteMax() {
    if (this.heap[1] === undefined) {
      throw new Error('Cannot delete from an empty heap, my friend!');
    }

    swap(this.heap, 1, this.heap.length - 1);
    const max = this.heap.pop();
    this.sink(1);
    return max;
  }

  /**
   * @description Add key to proper place in heap
   *
   * Strategy: Push to end of array, then swim up to proper location.
   *
   * Edge case(s): non-numeric or non-string inputs
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   * 
   * @param {Number|String} key - value inserted into heap
   */
  insert(key) {
    if (isNaN(key) || (typeof key !== 'string' && typeof key !== 'number')) {
      throw new Error('Please insert valid number or string character into heap');
    }

    this.heap.push(key);
    this.swim(this.heap.length - 1);
  }

  /**
   * @description Check if heap is empty
   *
   * Strategy: See if we have a value at the root.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Boolean} - whether or not heap is empty
   */
  isEmpty() {
    return this.heap[1] === undefined;
  }

  /**
   * @description Look at max without deleting it
   *
   * Strategy: Read from array at root.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   * 
   * @return {Number|String} - maximum value
   */
  peekMax() {
    return this.heap[1];
  }

  /**
   * @description When root is replaced (such as upon deleteMax), new root value
   * is likely out of order. Sink checks children to properly place the
   * swapped element in the heap where it is larger than its children but not parent.
   *
   * Strategy: Check parent against largest child repeatedly. If parent is
   * larger than largest child, it means it is larger than both of them, so we
   * can stop sinking. If parent is smaller than largest child, then regardless
   * of whether it is smaller than smaller child, it will swap with largest
   * child to maintain invariant. 
   *
   * Edge case(s): non-integer or negative input
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   * 
   * @param {Number} parentIndex - array index representing sinking element
   */
  sink(parentIndex) {
    if (!Number.isInteger(parentIndex) || parentIndex < 0) {
      throw new Error('Please input positive integer for parent index, thanks!');
    }

    // repeat if any children exist
    while (2 * parentIndex < this.heap.length) {
      const parent = this.heap[parentIndex];
      const childIndexA = parentIndex * 2;
      const childIndexB = parentIndex * 2 + 1;

      // Child B may be undefined, in which case select childA. Tie also prefers A.
      const indexOfLargerChild = this.heap[childIndexB] > this.heap[childIndexA]
        ? childIndexB
        : childIndexA;
      
      // stop sinking when you're at least as large as your largest child
      if (parent >= this.heap[indexOfLargerChild]) { return; }

      // child is larger, so swap
      swap(this.heap, parentIndex, indexOfLargerChild);

      // reassign pointer for possibly another sink
      parentIndex = indexOfLargerChild;
    }
  }

  /**
   * @description When new values are added to the heap, they are likely not in
   * order. Swim checks parents to properly place these new elements in the heap.
   *
   * Strategy: Calculate parent index for size comparison. Swap with parent if
   * parent is smaller. Continue process until parent is greater.
   *
   * Edge case(s): non-integer or negative input
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   * 
   * @param {Number} childsIndex - array index representing the element swimming up
   */
  swim(childsIndex) {
    if (!Number.isInteger(childsIndex) || childsIndex < 0) {
      throw new Error('Please input positive integer for child index, thanks!');
    }

    // avoid reassinging input parameters
    let childIndex = childsIndex;
    let parentIndex = Math.floor(childIndex / 2);

    // child swims up while greater than its parent AND index is in the heap
    while (childIndex > 1 && this.heap[childIndex] > this.heap[parentIndex]) {
      swap(this.heap, childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor(childIndex / 2);
    }
  }
}

module.exports = MaxBinaryHeap;
