/** Class representing our heap */
class MaxBinaryHeap {
  /**
   * Track heap using dynamic array. Element at index N has children at
   * indices 2N and 2N+1.
   *
   * @constructor
   */
  constructor() {
    this.heap = [null];
  }

  deleteMax() {
    if (this.heap[1] === undefined) {
      throw new Error('Cannot delete from an empty heap, my friend!');
    }

    this.swapInPlace(this.heap, 1, this.heap.length - 1);
    const max = this.heap.pop();
    this.sink(1);
    return max;
  }

  insert(key) {
    this.heap.push(key);
    this.swim(this.heap.length - 1);
  }

  isEmpty() {
    return this.heap[1] === undefined;
  }

  peekMax() {
    return this.heap[1];
  }

  sink(parentIndex) {
    // IDEA: check parent against children repeatedly
    // if parent > both children, stop
    // if parent < one child, swap
    // if parent < both children, swap with larger one
    // reset parentIndex and continue checking its children

    // IMPLEMENTATION:
    // while loop with condition that first child index exists
    // set childIndex to larger sibling with ternary. undefined B defaults to A.
    // if parent >= larger sibling, stop
    // else exchange and reset parentIndex

    while (2 * parentIndex < this.heap.length) {
      const parent = this.heap[parentIndex];
      const childIndexA = parentIndex * 2;
      const childIndexB = parentIndex * 2 + 1;

      // Possibly undefined child B will select childA. Tie also prefers A.
      const indexOfLargerChild = this.heap[childIndexB] > this.heap[childIndexA]
        ? childIndexB
        : childIndexA;
      
      // sank to correct place so stop
      if (parent >= this.heap[indexOfLargerChild]) { return; }

      // child is larger, so swap and reassign pointer for possibly another sink
      this.swapInPlace(this.heap, parentIndex, indexOfLargerChild);
      parentIndex = indexOfLargerChild;
    }
  }

  swapInPlace(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
  }

  swim(childIndex) {
    let parentIndex = Math.floor(childIndex / 2);

    // child swims up while greater than its parent AND index is in the heap
    while (this.heap[childIndex] > this.heap[parentIndex] && childIndex > 1) {
      this.swapInPlace(this.heap, childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor(childIndex / 2);
    }
  }

}

const heap = new MaxBinaryHeap();
heap.insert(6);
heap.insert(8);
heap.insert(9);
heap.insert(10);
heap.insert(12);
heap.insert(13);
heap.insert(14);
console.log('max: ', heap.deleteMax());
console.log(heap);
/* Insertions
6
8 6
9 6 8
10 9 8 6
12 10 8 6 9
13 10 12 6 9 8
14 10 13 6 9 8 12
*/

/* deleteMax
12 10 13 6 9 8 (14)
13 10 12 6 9 8
*/