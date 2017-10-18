/**
 * @description When root is replaced (such as upon deleteMax), new root value
 * is likely out of order. Sink checks children to properly place the swapped
 * element in the heap where it is larger than its children but not its parent.
 *
 * Strategy: Check parent against largest child repeatedly. If parent is
 * larger than largest child, it means it is larger than both of them, so we
 * can stop sinking. If parent is smaller than largest child, then regardless
 * of whether it is smaller than smaller child, it will swap with largest
 * child to maintain invariant. 
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 * 
 * @param {Number} parentIndex - array index representing sinking element
 * @param {Object} heap - the PriorityQueue instance's heap array
 */
function sink(parentIndex, heap) {
  if (!Number.isInteger(parentIndex) || parentIndex < 0) {
    throw new Error('Please input positive integer for parent index, my friend!');
  }

  // Repeat if any children exist
  while (2 * parentIndex < heap.length) {
    const parent = heap[parentIndex];
    const childIndexA = parentIndex * 2;
    const childIndexB = parentIndex * 2 + 1;

    // Child B may be undefined, in which case select childA. Tie also prefers A.
    const indexOfLargerChild = heap[childIndexB] > heap[childIndexA]
      ? childIndexB
      : childIndexA;
    
    // Stop sinking when you're at least as large as your largest child
    if (parent >= heap[indexOfLargerChild]) { return; }

    // Child is larger, so swap
    swap(heap, parentIndex, indexOfLargerChild);

    // Reassign pointer for possibly another sink
    parentIndex = indexOfLargerChild;
  }
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
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

/**
 * @description When new values are added to the heap, they are likely not in
 * order. Swim checks parents to properly place these new elements in the heap.
 *
 * Strategy: Calculate parent index for size comparison. Swap with parent if
 * parent is smaller. Continue process until parent is greater.
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 * 
 * @param {Number} childsIndex - array index representing the element swimming up
 * @param {Object} heap - the PriorityQueue instance's heap array
 */
function swim(childsIndex, heap) {
  if (!Number.isInteger(childsIndex) || childsIndex < 0) {
    throw new Error('Please input positive integer for child index, thanks!');
  }

  // Avoid reassinging input parameters
  let childIndex = childsIndex;
  let parentIndex = Math.floor(childIndex / 2);

  // Child swims up while greater than its parent AND index is in the heap
  while (childIndex > 1 && heap[childIndex] > heap[parentIndex]) {
    swap(heap, childIndex, parentIndex);
    childIndex = parentIndex;
    parentIndex = Math.floor(childIndex / 2);
  }
}

/** Class representing our priority queue */
class PriorityQueue {
  /**
   * This priority queue is a max binary heap.
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
   * @description Remove largest value in heap and readjust heap to maintain
   * invariant that all parents are larger than their children.
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
    sink(1, this.heap);
    return max;
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
    swim(this.heap.length - 1, this.heap);
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
   * @description Look at max without deleting it.
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
}

module.exports = PriorityQueue;
