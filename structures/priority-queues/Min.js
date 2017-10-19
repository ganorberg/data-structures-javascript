/**
 * @description When root is replaced (such as upon deleteMin), new root value
 * is likely out of order. Sink checks children to properly place the swapped
 * element in the heap where it is smaller than its children but not its parent.
 *
 * Strategy: Check parent against smallest child repeatedly. If parent is
 * smaller than smallest child, it means it is smaller than both of them, so we
 * can stop sinking. If parent is larger than smallest child, then regardless
 * of whether it is larger than larger child, it will swap with smallest
 * child to maintain invariant.
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 * 
 * @param {Object} heap - the PriorityQueue instance's heap array
 * @param {Number} parentIndex - array index representing sinking element
 */
function sink(heap, parentIndex) {
  if (
    !Array.isArray(heap)
    || !Number.isInteger(parentIndex)
    || parentIndex < 0
    || parentIndex > heap.length
  ) {
    throw new Error('Please input valid inputs, my friend!');
  }

  const childIndexA = 2 * parentIndex;
  const childIndexB = 2 * parentIndex + 1;

  if (childIndexA > heap.length) { return; }

  // Child B may be undefined, in which case select childA. Tie also prefers A.
  const smallestChildIndex = heap[childIndexA] > heap[childIndexB]
    ? childIndexB
    : childIndexA;

  // Stop sinking when you're at least as small as your smallest child
  if (heap[smallestChildIndex] > heap[parentIndex]) { return; }

  // Child is smaller, so swap
  swap(heap, parentIndex, smallestChildIndex);

  // May need to keep sinking
  sink(heap, smallestChildIndex);
}

/**
 * @description Helper function to swap two array elements in-place.
 *
 * Strategy: Use array destructuring.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Array} arr - array with elements to be swapped
 * @param {Number} indexA - index of first element to be swapped
 * @param {Number} indexB - index of second element to be swapped
 */
function swap(arr, indexA, indexB) {
  if (
    !Array.isArray(arr)
    || !Number.isSafeInteger(indexA)
    || !Number.isSafeInteger(indexB)
    || indexA < 0
    || indexB < 0
    || indexA > arr.length
    || indexB > arr.length
  ) { throw new Error('Please insert valid inputs, my friend!'); }

  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

/**
 * @description When new values are added to the heap, they are likely not in
 * order. Swim checks parents to properly place these new elements in the heap.
 *
 * Strategy: Calculate parent index for size comparison. Swap with parent if
 * parent is larger. Continue process until parent is smaller.
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 * 
 * @param {Object} heap - the PriorityQueue instance's heap array
 * @param {Number} childIndex - array index representing the element swimming up
 */
function swim(heap, childIndex) {
  if (
    !Array.isArray(heap)
    || !Number.isSafeInteger(childIndex)
    || childIndex < 0
    || childIndex > heap.length
  ) {
    throw new Error('Please input valid inputs, my friend!');
  }

  // Child swims up until it's the root or not smaller than its parent
  if (childIndex < 2) { return; }
  const parentIndex = Math.floor(childIndex / 2);
  if (heap[childIndex] >= heap[parentIndex]) { return; }

  swap(heap, childIndex, parentIndex);
  swim(heap, parentIndex);
}

/** Class representing our priority queue */
class MinPriorityQueue {
  /**
   * This priority queue is a min binary heap.
   *
   * Heap is tracked using a dynamic array. Element at index N has children at
   * indices 2N and 2N+1. Begin with null at index 0 for easier math.
   *
   * @constructor
   */
  constructor() {
    this.heap = [null];
  }

  /**
   * @description Remove smallest value in heap and readjust heap to maintain
   * invariant that all parents are smaller than (or equal to) their children.
   *
   * Strategy: Swap min (root of tree) with last element in heap. Pop min out
   * and store in variable to eventually return. Sink swapped element sitting
   * at the root to find its proper place.
   *
   * Edge case(s): empty heap
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   * 
   * @return {Number|String} - min removed from heap
   */
  deleteMin() {
    if (this.isEmpty()) { throw new Error('Heap is empty, my friend!'); }
    swap(this.heap, 1, this.heap.length - 1);
    const min = this.heap.pop();
    sink(this.heap, 1);
    return min;
  }

  /**
   * @description Add key to proper place in heap.
   *
   * Strategy: Push to end of array, then swim up to proper location.
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
    swim(this.heap, this.heap.length - 1);
    return true;
  }

  /**
   * @description Check if heap is empty.
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
   * @description Look at min without deleting it.
   *
   * Strategy: Read from array at root.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   * 
   * @return {Number|String} - minimum value
   */
  peekMin() {
    if (this.isEmpty()) { throw new Error('Heap is empty, my friend!'); }
    return this.heap[1];
  }
}

module.exports = MinPriorityQueue;